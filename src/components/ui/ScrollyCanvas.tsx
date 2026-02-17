"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { loadImagesChunk } from "@/utils/image-loader";

interface ScrollyCanvasProps {
    containerRef: React.RefObject<HTMLElement>;
    onProgress?: (progress: number) => void;
    onLoaded?: () => void;
}

export default function ScrollyCanvas({ containerRef, onProgress, onLoaded }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Use a ref for images to avoid re-renders when pushing new chunks
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // UI States
    // const [isHeroLoaded, setIsHeroLoaded] = useState(false); // Managed by parent now via onLoaded
    // const [loadProgress, setLoadProgress] = useState(0); // Managed by parent now via onProgress

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const totalFrames = 159; // User mentioned 159 frames (0-158)
    // Part 1: 0-39 (40 frames)
    // Part 2: 40-79
    // Part 3: 80-119
    // Part 4: 120-158

    // Chunk definitions
    const CHUNK_1_END = 39;

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const images = imagesRef.current;

        // Ensure index is within bounds
        const safeIndex = Math.min(index, totalFrames - 1);
        let img = images[safeIndex];

        // Fallback: search for nearest loaded frame backwards if current is missing
        if (!img || !img.complete) {
            for (let i = safeIndex - 1; i >= 0; i--) {
                if (images[i] && images[i].complete) {
                    img = images[i];
                    break;
                }
            }
        }

        if (!canvas || !ctx || !img) return;

        // Resize Canvas if needed
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Draw Logic (Cover)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [totalFrames]);

    const getFrameIndex = useCallback((progress: number) => {
        const splitPoint = 0.45;
        const splitFrame = 50;
        let frameIndex = 0;

        if (progress <= splitPoint) {
            frameIndex = (progress / splitPoint) * splitFrame;
        } else {
            frameIndex = splitFrame + ((progress - splitPoint) / (1 - splitPoint)) * (totalFrames - splitFrame);
        }
        return Math.min(totalFrames - 1, Math.floor(frameIndex));
    }, [totalFrames]);

    // Progressive Loading Logic
    useEffect(() => {
        let isMounted = true;

        const loadSequence = async () => {
            // PART 1: Priority Load (Frames 0-39)
            let loadedCount = 0;
            const part1Count = CHUNK_1_END + 1;

            const imagesV1: HTMLImageElement[] = [];
            const part1Promises = [];

            for (let i = 0; i <= CHUNK_1_END; i++) {
                const img = new Image();
                const frameIndex = i.toString().padStart(3, "0");
                img.src = `/sequence/frame_${frameIndex}_delay-0.05s.png`;

                const p = new Promise<void>((resolve) => {
                    img.onload = () => {
                        if (!isMounted) return;
                        loadedCount++;
                        onProgress?.((loadedCount / part1Count) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed frame ${i}`);
                        if (!isMounted) return;
                        loadedCount++;
                        onProgress?.((loadedCount / part1Count) * 100);
                        resolve();
                    };
                });
                part1Promises.push(p);
                imagesV1.push(img);
            }

            await Promise.all(part1Promises);

            if (!isMounted) return;

            // Part 1 Complete
            imagesV1.forEach((img, idx) => {
                imagesRef.current[idx] = img;
            });

            // Initial render
            renderFrame(0);

            // Unlock UI
            setTimeout(() => {
                if (isMounted) onLoaded?.();
            }, 500);

            // Helper to update view if we are parked
            const updateCurrentView = () => {
                const currentProgress = scrollYProgress.get();
                renderFrame(getFrameIndex(currentProgress));
            };

            // BACKGROUND LOADING
            if (isMounted) {
                const chunk2 = await loadImagesChunk(40, 79);
                if (!isMounted) return;
                chunk2.forEach((img, idx) => { imagesRef.current[40 + idx] = img; });
                updateCurrentView();
            }

            if (isMounted) {
                const chunk3 = await loadImagesChunk(80, 119);
                if (!isMounted) return;
                chunk3.forEach((img, idx) => { imagesRef.current[80 + idx] = img; });
                updateCurrentView();
            }

            if (isMounted) {
                const chunk4 = await loadImagesChunk(120, 158);
                if (!isMounted) return;
                chunk4.forEach((img, idx) => { imagesRef.current[120 + idx] = img; });
                updateCurrentView();
            }
        };

        loadSequence();

        return () => {
            isMounted = false;
        };
    }, [renderFrame, getFrameIndex, scrollYProgress, onLoaded, onProgress]);

    // Scroll Handler
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (imagesRef.current.length > 0) {
            renderFrame(getFrameIndex(latest));
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            renderFrame(getFrameIndex(scrollYProgress.get()));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [renderFrame, getFrameIndex, scrollYProgress]);

    return (
        <div className="sticky top-0 left-0 w-full h-screen z-0 bg-black overflow-hidden">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
        </div>
    );
}
