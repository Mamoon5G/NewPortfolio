import { ParticleField } from "@/components/ParticleField";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
// import { AnimatedBackground } from "@/components/AnimatedBackground";
import { lazy, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const Hero3D = lazy(() => import("@/components/Hero3D"));

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme !== 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev;
      if (newValue) {
        // newValue = true means dark mode
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        // newValue = false means light mode
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
      return newValue;
    });
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = useMemo(() => ({ damping: 25, stiffness: 700 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <CustomCursor cursorXSpring={cursorXSpring} cursorYSpring={cursorYSpring} />
      {/* <AnimatedBackground isDark={isDark} /> */}
      <ParticleField />
      <Navbar />
      <main>
        <div className="relative">
          <Hero />
          <Suspense fallback={null}>
            <Hero3D isDark={isDark} />
          </Suspense>
        </div>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />
    </div>
  )
}

export default App
