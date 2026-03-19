import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* =========================
   STAR
========================= */
const Star = memo(({ size, delay, duration, left, top }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
    }}
    animate={{
      opacity: [0.25, 0.9, 0.25],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
));

/* =========================
   NEBULA
========================= */
const Nebula = memo(
  ({ className, initialX, initialY, scaleRange, duration, delay = 0, style }) => (
    <motion.div
      className={`absolute rounded-full blur-[100px] ${className}`}
      style={style}
      animate={{
        x: [initialX, initialX + 50, initialX],
        y: [initialY, initialY + 30, initialY],
        scale: scaleRange,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  )
);

/* =========================
   SHOOTING STAR
========================= */
const ShootingStar = memo(({ delay, duration, startX, startY }) => (
  <motion.div
    className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
    style={{
      width: "150px",
      left: `${startX}%`,
      top: `${startY}%`,
    }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scaleX: [0, 1, 0],
      x: [0, 300],
      y: [0, 100],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
));

/* =========================
   COSMIC DUST
========================= */
const CosmicDust = memo(({ count }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })),
    [count]
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
});

/* =========================
   MAIN COMPONENT
========================= */
export const AnimatedBackground = memo(({ isDark }) => {
  const prefersReducedMotion = useReducedMotion();

  /* Stars */
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 1.5 + 1.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    []
  );

  /* =========================
     LIGHT MODE
  ========================= */
  if (!isDark) {
    return (
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_55%),linear-gradient(180deg,#030303,#09090f)]" />

        <Nebula
          className="w-[500px] h-[500px]"
          initialX={0}
          initialY={0}
          scaleRange={[1, 1.1, 1]}
          duration={20}
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.08), transparent)",
          }}
        />
      </div>
    );
  }

  /* =========================
     DARK MODE
  ========================= */
  return (
    <motion.div
      className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
      animate={prefersReducedMotion ? false : { rotateX: [-1.5, 1.5, -1.5], rotateY: [-2, 2, -2] }}
      transition={prefersReducedMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: 900 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_55%),linear-gradient(180deg,#030303,#09090f)]" />

      {/* Stars */}
      {stars.map((s) => (
        <Star key={s.id} {...s} />
      ))}

      {/* Nebulas */}
      <Nebula
        className="w-[600px] h-[600px]"
        initialX={-200}
        initialY={-200}
        scaleRange={[1, 1.2, 1]}
        duration={18}
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15), transparent)",
        }}
      />

      {/* Effects */}
      <CosmicDust count={20} />

      <ShootingStar delay={0} duration={2} startX={10} startY={10} />
      <ShootingStar delay={6} duration={2.5} startX={70} startY={5} />
    </motion.div>
  );
});

export default AnimatedBackground;