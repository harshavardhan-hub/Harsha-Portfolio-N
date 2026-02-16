"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollyCanvasProps {
    containerRef: React.RefObject<HTMLElement>;
}

export default function ScrollyCanvas({ containerRef }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameCount = 160;

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const frameIndex = i.toString().padStart(3, "0");
                img.src = `/sequence/frame_${frameIndex}_delay-0.05s.png`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [images]);

    const getFrameIndex = useCallback((progress: number) => {
        // Non-linear mapping: Slow start (0-45%), Fast end (45%-100%)
        const splitPoint = 0.45;
        const splitFrame = 50;

        let frame = 0;
        if (progress <= splitPoint) {
            frame = (progress / splitPoint) * splitFrame;
        } else {
            frame = splitFrame + ((progress - splitPoint) / (1 - splitPoint)) * (frameCount - splitFrame);
        }

        return Math.min(frameCount - 1, Math.floor(frame));
    }, [frameCount]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        renderFrame(getFrameIndex(latest));
    });

    useEffect(() => {
        if (isLoaded) {
            renderFrame(getFrameIndex(scrollYProgress.get()));
        }
    }, [isLoaded, images, scrollYProgress, renderFrame, getFrameIndex]);

    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                renderFrame(getFrameIndex(scrollYProgress.get()));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress, renderFrame, getFrameIndex]);


    return (
        <div className="sticky top-0 left-0 w-full h-screen z-0 bg-black overflow-hidden">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-black z-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span className="text-sm tracking-widest uppercase">Loading Experience</span>
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
        </div>
    );
}
