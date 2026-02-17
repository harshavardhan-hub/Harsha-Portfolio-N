"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
    onNavClick?: (id: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const PROFILE_IMG =
        "https://res.cloudinary.com/drit9nkha/image/upload/v1709268964/samples/people/qlq8w1bk0qdlvkpycxty.jpg";

    // Handle scroll to update active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["projects", "about", "contact"];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTo = (id: string) => {
        setIsOpen(false);
        if (onNavClick) {
            onNavClick(id);
        } else {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: "smooth",
                });
            }
        }
    };

    const navLinks = [
        { name: "My Projects", id: "projects" },
        { name: "About", id: "about" },
        { name: "Contact", id: "contact" }, // Keeping specific Contact link if section exists, or map it to Footer
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-white/50 transition-colors">
                            <Image
                                src={PROFILE_IMG}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 pointer-events-auto items-center bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleScrollTo(link.id)}
                            className={`text-sm font-medium transition-colors hover:text-white ${activeSection === link.id ? "text-white" : "text-white/60"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex gap-4 pointer-events-auto">
                    <a
                        href="https://github.com/harshavardhan-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white/60 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/harsha-vardhan-yanakandla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white/60 transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:yanakandlaharshavardhan@gmail.com"
                        className="hover:text-white/60 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden pointer-events-auto">
                    <button onClick={() => setIsOpen(true)} className="p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, type: "tween" }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleScrollTo(link.id)}
                                    className="text-3xl font-bold text-white/80 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-6 mt-12">
                            <a
                                href="https://github.com/harshavardhan-hub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/harsha-vardhan-yanakandla"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a
                                href="mailto:yanakandlaharshavardhan@gmail.com"
                                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

