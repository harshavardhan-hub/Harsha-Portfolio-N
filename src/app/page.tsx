"use client";

import { useRef, useEffect } from "react";
import ScrollyCanvas from "@/components/ui/ScrollyCanvas";
import Overlay from "@/components/ui/Overlay";
import Projects from "@/components/ui/Projects";
import Experience from "@/components/ui/Experience";
import Skills from "@/components/ui/Skills";
import Education from "@/components/ui/Education";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Lenis from "lenis";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div ref={containerRef} className="relative h-[800vh]">
        <ScrollyCanvas containerRef={containerRef} />
        <Overlay />
      </div>
      <div className="relative z-20 bg-background">
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </div>
    </main>
  );
}
