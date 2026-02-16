"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        name: "Frontend",
        skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"],
    },
    {
        name: "Backend",
        skills: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs"],
    },
    {
        name: "Database",
        skills: ["PostgreSQL", "MongoDB", "Supabase"],
    },
    {
        name: "AI & Tools",
        skills: ["OpenRouter API", "Prompt Engineering", "Git", "Docker", "Vercel"],
    },
];

export default function Skills() {
    return (
        <section className="relative z-20 py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-16"
            >
                Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className="text-xl font-mono text-white/40 mb-6 uppercase tracking-widest">{category.name}</h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-white/5 rounded-full text-white/80 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
