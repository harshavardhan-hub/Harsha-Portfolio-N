"use client";

import { useRef, useEffect, useState } from "react";
import ScrollyCanvas from "@/components/ui/ScrollyCanvas";
import Overlay from "@/components/ui/Overlay";
import Projects from "@/components/ui/Projects";
import About from "@/components/ui/About";
import Experience from "@/components/ui/Experience";
import Skills from "@/components/ui/Skills";
import Education from "@/components/ui/Education";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Lenis from "lenis";
import WelcomeLoader from "@/components/ui/WelcomeLoader";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element);
    }
  };

  return (
    <main className="min-h-screen">
      <WelcomeLoader isLoading={!isLoaded} progress={progress} />
      <Navbar onNavClick={handleNavClick} />
      <div ref={containerRef} className="relative h-[800vh]">
        <ScrollyCanvas
          containerRef={containerRef}
          onProgress={setProgress}
          onLoaded={() => setIsLoaded(true)}
        />
        <Overlay />
      </div>
      <div className="relative z-20 bg-background">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </div>
    </main>
  );
}
