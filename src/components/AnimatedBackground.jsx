import { memo, useMemo } from "react";
import { motion } from "framer-motion";

const Star = memo(({ size, delay, duration, left, top }) => (
  <motion.div
    className="absolute rounded-full bg-star-white"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
));

const Nebula = memo(({ className, initialX, initialY, scaleRange, duration, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] ${className}`}
    animate={{
      x: [initialX, initialX + 50, initialX],
      y: [initialY, initialY + 30, initialY],
      scale: scaleRange,
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
));

const ShootingStar = memo(({ delay, duration, startX, startY }) => (
  <motion.div
    className="absolute h-0.5 bg-linear-to-r from-transparent via-primary to-transparent"
    style={{
      width: "150px",
      left: `${startX}%`,
      top: `${startY}%`,
      transformOrigin: "left center",
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

const CosmicDust = memo(({ count }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })), [count]
  );

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

const GridPattern = memo(() => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="space-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path 
          d="M 60 0 L 0 0 0 60" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          className="text-primary"
        />
      </pattern>
      <pattern id="hex-grid" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
        <path
          d="M15 0 L30 7.5 L30 22 L15 30 L0 22 L0 7.5 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-primary"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#space-grid)" />
  </svg>
));

const OrbitRing = memo(({ size, duration, delay, opacity }) => (
  <motion.div
    className="absolute border border-primary/10 rounded-full"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{
      rotate: [0, 360],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
    initial={{ opacity: 0 }}
  />
));

export const AnimatedBackground = memo(({ isDark }) => {
  const stars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })), []
  );

  if (!isDark) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-highlight/5 blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <GridPattern />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}

      <Nebula 
        className="w-[700px] h-[700px] bg-nebula-purple/15"
        initialX={-200}
        initialY={-200}
        scaleRange={[1, 1.2, 1]}
        duration={25}
      />
      <Nebula 
        className="w-[600px] h-[600px] bg-nebula-pink/10"
        initialX={100}
        initialY={200}
        scaleRange={[1, 1.15, 1]}
        duration={30}
        delay={5}
      />
      <Nebula 
        className="w-[800px] h-[800px] bg-primary/10"
        initialX={0}
        initialY={0}
        scaleRange={[1, 1.1, 1]}
        duration={40}
        delay={10}
      />
      <Nebula 
        className="w-[400px] h-[400px] bg-cosmic-blue/15"
        initialX={-100}
        initialY={100}
        scaleRange={[1, 1.3, 1]}
        duration={20}
        delay={15}
      />

      <CosmicDust count={30} />

      <ShootingStar delay={0} duration={3} startX={10} startY={10} />
      <ShootingStar delay={8} duration={4} startX={70} startY={5} />
      <ShootingStar delay={15} duration={3.5} startX={40} startY={15} />

      <OrbitRing size={400} duration={60} delay={0} />
      <OrbitRing size={600} duration={90} delay={10} opacity={0.5} />
      <OrbitRing size={900} duration={120} delay={20} opacity={0.3} />

      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(0, 212, 255, 0.3)",
            "0 0 20px 5px rgba(0, 212, 255, 0.5)",
            "0 0 10px 2px rgba(0, 212, 255, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-nebula-purple rounded-full"
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(139, 92, 246, 0.3)",
            "0 0 15px 4px rgba(139, 92, 246, 0.5)",
            "0 0 8px 2px rgba(139, 92, 246, 0.3)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/6 w-1 h-1 bg-highlight rounded-full"
        animate={{
          boxShadow: [
            "0 0 6px 1px rgba(255, 107, 157, 0.3)",
            "0 0 12px 3px rgba(255, 107, 157, 0.5)",
            "0 0 6px 1px rgba(255, 107, 157, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <GridPattern />
    </div>
  );
});

export default AnimatedBackground;
