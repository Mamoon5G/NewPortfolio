import { memo, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = memo(({ cursorXSpring, cursorYSpring }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') || 
        target.closest('.cosmic-button');
        
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

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

  const primaryColor = isDark ? "#f43f5e" : "#10b981";
  const secondaryColor = isDark ? "#fb7185" : "#34d399";
  const tertiaryColor = isDark ? "#fda4af" : "#a7f3d0";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div 
          className="w-10 h-10 rounded-full border border-primary/50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ borderColor: isHovering ? secondaryColor : primaryColor }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 0 : 1,
          backgroundColor: isHovering ? secondaryColor : primaryColor,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="w-2 h-2 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: primaryColor }} />
      </motion.div>
    </>
  );
});

export default CustomCursor;
