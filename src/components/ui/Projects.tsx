"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";


interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
}

const projects: Project[] = [
    {
        title: "LearnLoop AI",
        description: "An adaptive learning platform that personalizes content delivery using AI models.",
        tags: ["Next.js", "Python", "OpenAI", "Tailwind"],
    },
    {
        title: "AI Travel Planner",
        description: "Smart itinerary generator that plans your trips based on preferences and budget.",
        tags: ["React", "Node.js", "Google Maps API"],
    },
    {
        title: "Badminton Booking",
        description: "A seamless booking system for sports facilities with real-time availability.",
        tags: ["TypeScript", "PostgreSQL", "Supabase"],
    },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-6 rounded-2xl glass-card hover:bg-white/5 transition-all duration-300"
        >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-white/60 mb-4 line-clamp-2">
                        {project.description}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <Github className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/5 text-white/60"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">My Projects</h2>
                <div className="h-1 w-24 bg-blue-500" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
