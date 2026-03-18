import { Moon, Sun, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = ({ isDark, toggle }) => {
    return (
        <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={toggle}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3 md:p-4 glass-strong rounded-full hover:bg-primary/10 transition-all duration-300 shadow-lg group"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative w-5 h-5 md:w-6 md:h-6">
                <motion.div
                    animate={{
                        rotate: isDark ? 0 : 180,
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Moon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <motion.div
                    animate={{
                        rotate: isDark ? -180 : 0,
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Sun className="w-5 h-5 md:w-6 md:h-6 text-highlight" />
                </motion.div>
            </div>
            
            {isDark && (
                <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Sparkles className="w-3 h-3 text-primary" />
                </motion.div>
            )}
        </motion.button>
    );
};

export default ThemeToggle;
