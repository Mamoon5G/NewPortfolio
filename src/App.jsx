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
import { AnimatedBackground } from "@/components/AnimatedBackground";

import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const Hero3D = lazy(() => import("@/components/Hero3D"));

/* =========================
   HELPERS
========================= */
const getInitialTheme = () => {
  if (typeof window === "undefined") return true;

  const saved = localStorage.getItem("theme");
  if (saved) return saved !== "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

function App() {
  const prefersReducedMotion = useReducedMotion();

  /* =========================
     STATE
  ========================= */
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [isMobile, setIsMobile] = useState(false);

  /* =========================
     MOBILE DETECTION (optimized)
  ========================= */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handleChange = () => setIsMobile(media.matches);
    handleChange();

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  /* =========================
     THEME TOGGLE (single source of truth)
  ========================= */
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;

      document.documentElement.classList.toggle("light", !next);
      localStorage.setItem("theme", next ? "dark" : "light");

      return next;
    });
  }, []);

  /* =========================
     SCROLL OPTIMIZATION
  ========================= */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            "--scroll-y",
            `${window.scrollY}px`
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     CURSOR (optimized)
  ========================= */
  const enableEffects = !isMobile && !prefersReducedMotion;

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = useMemo(
    () => ({ damping: 25, stiffness: 700 }),
    []
  );

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const CURSOR_SIZE = 32;

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableEffects) return;

      cursorX.set(e.clientX - CURSOR_SIZE / 2);
      cursorY.set(e.clientY - CURSOR_SIZE / 2);
    },
    [cursorX, cursorY, enableEffects]
  );

  useEffect(() => {
    if (!enableEffects) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, enableEffects]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen overflow-x-hidden">
      <LoadingScreen skip={!enableEffects} />

      {enableEffects && (
        <CustomCursor
          cursorXSpring={cursorXSpring}
          cursorYSpring={cursorYSpring}
        />
      )}

      {enableEffects && <AnimatedBackground isDark={isDark} />}
      {enableEffects && <ParticleField />}

      <Navbar />

      <main>
        <div className="relative">
          <Hero />

          {enableEffects && (
            <Suspense fallback={<div className="h-[300px]" />}>
              <Hero3D isDark={isDark} />
            </Suspense>
          )}
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
  );
}

export default App;