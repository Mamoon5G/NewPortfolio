import { Github, Instagram, Linkedin, Twitter, Code2, Heart, Rocket } from "lucide-react"
import { motion } from "framer-motion"

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
];

const socialLinks = [
    { icon: Github, href: "https://github.com/mamoon-5g", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mamoon-siddiqui-5g", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/m_a__siddiqui_5g_", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/mamoon_4g", label: "Twitter" },
    { icon: Code2, href: "https://leetcode.com/u/mamoon-5g", label: "LeetCode" }
]

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 border-t border-border/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-strong rounded-2xl p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                        <div className="text-center md:text-left">
                            <motion.a
                                href="#"
                                className="text-2xl md:text-3xl font-bold tracking-tight hover:text-primary transition-colors inline-block"
                                whileHover={{ scale: 1.05 }}
                            >
                                Mamoon Siddiqui <span className="text-primary">.</span>
                            </motion.a>
                            <p className="text-sm text-muted-foreground mt-2">
                                Full Stack Developer | Problem Solver
                            </p>
                            <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                                <Rocket className="w-4 h-4 text-primary animate-bounce" />
                                <span className="text-xs text-primary font-medium">Building the future, one line at a time</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 px-2 py-1 rounded hover:bg-primary/5"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center justify-center md:justify-end gap-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-muted-foreground transition-all p-2 md:p-2.5 rounded-xl glass hover:bg-primary/10 hover:text-primary duration-300"
                                    whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                            <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap justify-center">
                                <span>Created with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <span>by Mamoon Ahmad Siddiqui</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                © {currentYear} All Rights Reserved
                            </p>
                        </div>
                        <div className="mt-4 text-center">
                            <motion.a
                                href="#"
                                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ y: -2 }}
                            >
                                <span>Back to top</span>
                                <Rocket className="w-3 h-3" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer;
