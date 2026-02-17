export const loadImagesChunk = (
    startIndex: number,
    endIndex: number,
    basePath: string = "/sequence/frame_",
    suffix: string = "_delay-0.05s.png"
): Promise<HTMLImageElement[]> => {
    return new Promise((resolve) => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;
        const total = endIndex - startIndex + 1;

        if (total === 0) {
            resolve([]);
            return;
        }

        for (let i = startIndex; i <= endIndex; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `${basePath}${frameIndex}${suffix}`;

            const checkComplete = () => {
                loadedCount++;
                if (loadedCount === total) {
                    // Sort images by index to ensure correct order
                    // Since we're pushing concurrently, order isn't guaranteed
                    // purely by push order, but we should actually place them 
                    // in the correct index if we were merging. 
                    // However, we are returning a chunk. 
                    // Changes: Let's actually return a map or sorted array.
                    // The simplest is to return an array where index 0 is startIndex.

                    // Actually, the caller will likely merge this into a master array.
                    // To ensure order in the result array, we can use the index directly.

                    resolve(images);
                }
            };

            img.onload = checkComplete;
            img.onerror = () => {
                console.warn(`Failed to load image: ${img.src}`);
                checkComplete();
            };

            // We place it at the correct relative index immediately
            images[i - startIndex] = img;
        }
    });
};
