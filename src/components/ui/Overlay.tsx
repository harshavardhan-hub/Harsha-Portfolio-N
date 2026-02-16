"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // --- Animation Timings (0.0 to 1.0) ---
  // Container: 800vh

  // Section 1: Intro "Harsha Vardhan"
  const y1 = useTransform(scrollYProgress, [0, 0.08, 0.12], ["0vh", "-100vh", "-100vh"]);
  const o1 = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 0, 0]);

  // Section 2: "Building scalable..."
  // ENTER: 0.12 -> 0.22
  // HOLD:  0.22 -> 0.38 (Shorter hold to speed up S3 arrival)
  // EXIT:  0.38 -> 0.44 (Exits fast)
  const y2 = useTransform(scrollYProgress, [0.12, 0.22, 0.38, 0.44], ["100vh", "0vh", "0vh", "-100vh"]);
  const o2 = useTransform(scrollYProgress, [0.12, 0.22, 0.38, 0.44], [0, 1, 1, 0]);

  // Section 3: "Bridging design..."
  // ENTER: 0.40 -> 0.50 (Starts AT 0.40 - OVERLAPPING with S2 exit)
  // HOLD:  0.50 -> 0.95 (Maintains long hold)
  // EXIT:  0.95 -> 1.00
  const y3 = useTransform(scrollYProgress, [0.40, 0.50, 0.95, 1.00], ["100vh", "0vh", "0vh", "-100vh"]);
  const o3 = useTransform(scrollYProgress, [0.40, 0.50, 0.95, 1.00], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 z-10 pointer-events-none">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 w-full h-1 bg-white origin-left z-50 mix-blend-difference opacity-50"
      />

      {/* Section 1 */}
      <motion.div
        style={{ y: y1, opacity: o1 }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center p-4"
      >
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 text-white mix-blend-difference leading-none drop-shadow-2xl">
          Harsha Vardhan
        </h1>
        <p className="text-xl md:text-4xl text-white/80 font-light mix-blend-difference tracking-wide drop-shadow-xl">
          Creative Full Stack Developer
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        className="fixed inset-0 flex items-center justify-start p-8 md:pl-24 lg:pl-32"
        style={{ opacity: o2 }}
      >
        <motion.div
          style={{ y: y2 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] filter">
            Building scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-none">
              AI-powered
            </span> <br />
            digital experiences.
          </h2>
        </motion.div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        className="fixed inset-0 flex items-center justify-end p-8 md:pr-24 lg:pr-32 text-right"
        style={{ opacity: o3 }}
      >
        <motion.div
          style={{ y: y3 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)] filter">
            Bridging design, <br />
            engineering, and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-none">
              intelligence
            </span>.
          </h2>
        </motion.div>
      </motion.div>

    </div>
  );
}
