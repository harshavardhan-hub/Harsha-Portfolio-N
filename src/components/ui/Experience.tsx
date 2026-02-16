"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Software Engineering Intern",
        company: "OPTINYXUS",
        period: "Dec 2025 - Present",
        desc: "Working on full-stack and AI/ML systems using React, FastAPI, Python, and PostgreSQL. Designing and implemented FastAPI-based backend services for internal AI/ML applications.",
    },
    {
        role: "Web Development Intern",
        company: "RAIZZIFY",
        period: "Sep 2025 - Dec 2025",
        desc: "Developed full-stack web features using React, Node.js, PostgreSQL. Integrated AI-powered functionalities using OpenRouter API to enhance user experience.",
    },
];

export default function Experience() {
    return (
        <section className="relative z-20 py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-16"
            >
                Experience
            </motion.h2>

            <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="pl-8 md:pl-16 relative"
                    >
                        {/* Dot */}
                        <div className="absolute top-2 left-[-5px] w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                        <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors">
                            <span className="text-sm text-blue-400 font-mono tracking-wider">{exp.period}</span>
                            <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-1">{exp.role}</h3>
                            <h4 className="text-xl text-white/60 mb-6">{exp.company}</h4>
                            <p className="text-white/70 leading-relaxed max-w-2xl">
                                {exp.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
