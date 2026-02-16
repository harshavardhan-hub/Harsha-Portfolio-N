"use client";

import { motion } from "framer-motion";

export default function Education() {
    return (
        <section className="relative z-20 py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-12"
            >
                Education
            </motion.h2>

            <div className="grid grid-cols-1 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-8 glass-card rounded-2xl"
                >
                    <div>
                        <h3 className="text-2xl font-bold">Jawaharlal Nehru Technological University</h3>
                        <p className="text-white/60 mt-2">Bachelor of Technology, Electronics & Communication Engineering</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <span className="text-white/40 font-mono">2022 – 2026</span>
                        <p className="text-white/40 text-sm mt-1">Anantapur</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-8 glass-card rounded-2xl"
                >
                    <div>
                        <h3 className="text-2xl font-bold">Narayana Junior College</h3>
                        <p className="text-white/60 mt-2">Intermediate, MPC</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <span className="text-white/40 font-mono">2020 – 2022</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-8 glass-card rounded-2xl"
                >
                    <div>
                        <h3 className="text-2xl font-bold">Sri Chaithanya School</h3>
                        <p className="text-white/60 mt-2">School, High School</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <span className="text-white/40 font-mono">2016 – 2020</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
