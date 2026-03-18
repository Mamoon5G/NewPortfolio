import { Button } from "@/components/Button"
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
    const [isMobileMenu, setMobileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Active section detection
            const sections = navLinks.map(l => l.href.slice(1));
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = useCallback(() => setMobileMenu(false), []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? "py-3 md:py-4" 
                    : "py-5"
            }`}
        >
            <motion.div
                className={`transition-all duration-500 ${
                    isScrolled 
                        ? "glass-strong backdrop-blur-xl shadow-lg shadow-black/10" 
                        : "bg-transparent"
                }`}
            >
                <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <motion.a
                        href="#"
                        className="text-xl md:text-2xl font-bold tracking-tight hover:text-primary transition-colors duration-300 relative"
                        whileHover={{ scale: 1.05 }}
                    >
                        Mamoon Siddiqui <span className="text-primary">.</span>
                        <motion.span
                            className="absolute -top-1 -right-2"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-3 h-3 text-primary" />
                        </motion.span>
                    </motion.a>

                    <div className="hidden lg:flex items-center">
                        <motion.div
                            className="glass rounded-full px-3 py-2 flex items-center gap-1"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                        {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative ${
                                        isActive 
                                            ? "text-primary bg-primary/10" 
                                            : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                                        />
                                    )}
                                </motion.a>
                                );
                            })}
                        </motion.div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="sm" className="hidden md:flex">
                                Let's Talk
                            </Button>
                        </motion.a>
                    </div>

                    <motion.button
                        className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
                        onClick={() => setMobileMenu((prev) => !prev)}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isMobileMenu ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenu ? (
                            <X size={24} className="transition-transform duration-300" />
                        ) : (
                            <Menu size={24} className="transition-transform duration-300" />
                        )}
                    </motion.button>
                </nav>
            </motion.div>

            <AnimatePresence>
                {isMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden glass-strong backdrop-blur-xl mx-4 mt-2 rounded-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="py-3 px-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-surface/30 rounded-xl transition-all duration-300 flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-4 border-t border-border/50 mt-2"
                            >
                                <a href="#contact" onClick={handleNavClick}>
                                    <Button className="w-full">
                                        Let's Talk
                                    </Button>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar;
