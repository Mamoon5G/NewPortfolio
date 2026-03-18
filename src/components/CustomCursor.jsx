import { memo, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = memo(({ cursorXSpring, cursorYSpring }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  const primaryColor = isDark ? "#00d4ff" : "#0891b2";
  const secondaryColor = isDark ? "#ec4899" : "#f59e0b";
  const tertiaryColor = isDark ? "#8b5cf6" : "#6366f1";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          borderColor: isHovering ? secondaryColor : primaryColor,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          fill="none"
          className="transform -translate-x-1/2 -translate-y-1/2"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke={isHovering ? secondaryColor : primaryColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          <circle
            cx="24"
            cy="24"
            r="16"
            stroke={isHovering ? secondaryColor : primaryColor}
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          {isHovering && (
            <>
              <motion.circle
                cx="24"
                cy="24"
                r="12"
                stroke={tertiaryColor}
                strokeWidth="2"
                fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
              <motion.circle
                cx="24"
                cy="24"
                r="8"
                stroke={secondaryColor}
                strokeWidth="1"
                fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.05 }}
              />
            </>
          )}
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? secondaryColor : primaryColor,
          boxShadow: isHovering 
            ? `0 0 20px ${secondaryColor}, 0 0 40px ${secondaryColor}40`
            : `0 0 10px ${primaryColor}40`,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="w-2 h-2 rounded-full" />
      </motion.div>

      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div 
            className="w-4 h-4 rounded-full animate-ping"
            style={{ 
              backgroundColor: isHovering ? secondaryColor : primaryColor,
              animationDuration: '2s',
            }}
          />
        </motion.div>
      )}
    </>
  );
});

export default CustomCursor;
