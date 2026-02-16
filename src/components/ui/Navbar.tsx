"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
        >
            <div className="pointer-events-auto">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    HY.
                </Link>
            </div>

            <div className="hidden md:flex gap-8 pointer-events-auto">
                <Link href="#projects" className="text-sm font-medium hover:text-white/60 transition-colors">Projects</Link>
                <Link href="#about" className="text-sm font-medium hover:text-white/60 transition-colors">About</Link>
                <Link href="#contact" className="text-sm font-medium hover:text-white/60 transition-colors">Contact</Link>
            </div>

            <div className="flex gap-4 pointer-events-auto">
                <a href="https://github.com/yanakandlaharshavardhan" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                    <Github className="w-5 h-5" />
                </a>
                <a href="mailto:yanakandlaharshavardhan@gmail.com" className="hover:text-white/60 transition-colors">
                    <Mail className="w-5 h-5" />
                </a>
            </div>
        </motion.nav>
    );
}
