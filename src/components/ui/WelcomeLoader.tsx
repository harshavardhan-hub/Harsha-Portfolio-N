"use client";

import { motion, AnimatePresence } from "framer-motion";

interface WelcomeLoaderProps {
    isLoading: boolean;
    progress: number; // 0 to 100
}

export default function WelcomeLoader({ isLoading, progress }: WelcomeLoaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#121212] text-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4 font-sans">
                            Welcome to Harsha’s Works
                        </h1>
                        <p className="text-white/60 text-sm md:text-base tracking-widest uppercase mb-8">
                            Preparing your experience…
                        </p>

                        {/* Progress Bar Container */}
                        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mx-auto">
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>

                        <p className="mt-4 text-xs text-white/40 font-mono">
                            {Math.round(progress)}%
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
