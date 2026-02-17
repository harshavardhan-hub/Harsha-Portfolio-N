"use client";

import { motion } from "framer-motion";


export default function About() {
    return (
        <section id="about" className="relative z-20 py-24 px-6 md:px-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">About Me</h2>
                    <div className="h-1 w-24 bg-blue-500 mb-8 mx-auto" />

                    <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                        <p>
                            I am a <span className="text-blue-400 font-semibold">Creative Full Stack Developer</span> based in India,
                            passionate about building scalable, AI-powered digital experiences.
                        </p>
                        <p>
                            With a strong foundation in <span className="text-white">modern web technologies</span>,
                            I bridge the gap between complex engineering and intuitive design.
                        </p>
                        <p>
                            My journey involves working with <span className="text-white">Next.js, React, JavaScript and AI/ML models</span>
                            to create applications that are not just functional but also intelligent and visually stunning.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
