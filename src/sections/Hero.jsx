import { memo, useMemo } from "react";
import { Button } from "@/components/Button"
import { ArrowRight, ChevronDown, Github, Instagram, Linkedin, Twitter, Download, Code2 } from "lucide-react"
import { BorderButton } from "@/components/BorderButton"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"

const skills = [
    "HTML", "CSS", "C/C++", "Python", "JavaScript", "React", "TypeScript",
    "Tailwind CSS", "Node.js", "Express", "MongoDB", "MySQL", "Git",
    "Github", "REST APIs", "Vite", "AI Tools"
]

const FloatingBadge = memo(({ children, delay, className }) => (
    <motion.div
        className={`glass rounded-xl px-4 py-3 cursor-pointer ${className}`}
        animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{ 
            duration: 3 + delay, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
        }}
        whileHover={{ scale: 1.1, rotate: 0 }}
    >
        {children}
    </motion.div>
));

const SocialLink = memo(({ icon: Icon, href, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-muted-foreground transition-all p-2 rounded-full glass hover:bg-primary/10 hover:text-primary hover:scale-110 duration-300"
        whileHover={{ scale: 1.2, y: -2 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon className="w-5 h-5" />
    </motion.a>
));

const SkillItem = memo(({ skill }) => (
    <span className="text-xl font-semibold text-muted-foreground/50 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap group">
        {skill}
        <span className="mx-8 text-primary/30 group-hover:text-primary">◆</span>
    </span>
));

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
    }
}

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
}

const GlowText = memo(({ children, className }) => (
    <span className={`cosmic-text-gradient ${className}`}>
        {children}
    </span>
));

export const Hero = memo(() => {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const socialLinks = useMemo(() => [
        { icon: Github, href: "https://github.com/mamoon-5g", label: "GitHub Profile" },
        { icon: Linkedin, href: "https://linkedin.com/in/mamoon-siddiqui-5g", label: "LinkedIn Profile" },
        { icon: Instagram, href: "https://instagram.com/m_a__siddiqui_5g_", label: "Instagram Profile" },
        { icon: Twitter, href: "https://twitter.com/mamoon_4g", label: "Twitter Profile" },
        { icon: Code2, href: "https://leetcode.com/u/mamoon-5g", label: "LeetCode Profile" }
    ], []);

    const duplicatedSkills = useMemo(() => [...skills, ...skills, ...skills], []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
            <motion.div 
                className="absolute inset-0"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />
            </motion.div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-nebula-purple rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                    className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-highlight rounded-full"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <motion.span 
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.span 
                                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-primary">Computer Engineer</span>
                                <span className="text-muted-foreground">—</span>
                                <span className="text-muted-foreground">Full Stack Developer</span>
                            </motion.span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1 
                                variants={itemVariants} 
                                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                            >
                                <motion.span 
                                    variants={textVariants}
                                    className="block"
                                >
                                    Crafting
                                </motion.span>
                                <motion.span 
                                    variants={textVariants}
                                    className="block"
                                >
                                    <GlowText>Digital</GlowText>
                                </motion.span>
                                <motion.span 
                                    variants={textVariants}
                                    className="block"
                                >
                                    Experiences with
                                </motion.span>
                                <motion.span 
                                    variants={textVariants}
                                    className="block font-serif italic font-normal"
                                >
                                    <GlowText>Code</GlowText>
                                </motion.span>
                            </motion.h1>
                            <motion.p 
                                variants={itemVariants} 
                                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
                            >
                                Hi I'm <span className="text-primary font-medium">Mamoon Siddiqui</span> - a passionate Computer Engineer and Full Stack Developer. I specialize in creating dynamic and responsive web applications that provide seamless user experiences.
                            </motion.p>
                        </div>

                        <motion.div 
                            variants={itemVariants} 
                            className="flex flex-wrap gap-4"
                        >
                            <motion.a 
                                href="#contact"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="cosmic-button group">
                                    Contact Me 
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.a>
                            <motion.a 
                                href="https://drive.google.com/file/d/1JzBEKAFUVWGBX7kHiI-47WEb8AydSv2c/view" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <BorderButton>
                                    <Download className="w-5 h-5" />
                                    Download Resume
                                </BorderButton>
                            </motion.a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground font-medium">Follow Me:</span>
                            <div className="flex items-center gap-2">
                                {socialLinks.map((social, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                    >
                                        <SocialLink {...social} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="relative max-w-md mx-auto">
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                animate={{
                                    boxShadow: [
                                        "0 0 60px rgba(0, 212, 255, 0.2)",
                                        "0 0 100px rgba(0, 212, 255, 0.4)",
                                        "0 0 60px rgba(0, 212, 255, 0.2)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="relative glass rounded-3xl p-2 glow-border"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative overflow-hidden rounded-2xl">
                                    <motion.img
                                        src="/profile.png"
                                        alt="Mamoon Siddiqui"
                                        className="w-full aspect-4/5 object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-background/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>

                            <FloatingBadge delay={0} className="absolute -bottom-4 -right-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium">Open to Work</span>
                                </div>
                            </FloatingBadge>

                            <FloatingBadge delay={0.5} className="absolute -top-4 -left-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">1+</div>
                                    <div className="text-xs text-muted-foreground">Years Exp.</div>
                                </div>
                            </FloatingBadge>

                            <motion.div
                                className="absolute -top-8 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1.5"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="text-xs text-primary font-medium">Full Stack Developer</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-20 lg:mt-32"
                >
                    <p className="text-sm text-muted-foreground mb-6 text-center font-medium tracking-wider uppercase">
                        Technologies I Work With
                    </p>
                    <div className="relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />
                        <motion.div
                            className="flex gap-8 py-4"
                            animate={prefersReducedMotion ? { x: 0 } : { x: [0, -50 + "%"] }}
                            transition={{ 
                                duration: prefersReducedMotion ? 0 : 25, 
                                repeat: prefersReducedMotion ? 0 : Infinity, 
                                ease: "linear" 
                            }}
                        >
                            {duplicatedSkills.map((skill, index) => (
                                <SkillItem key={`${skill}-${index}`} skill={skill} />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <a 
                    href="#about" 
                    className="flex flex-col items-center text-muted-foreground hover:text-primary transition-all duration-300 group"
                    aria-label="Scroll to About section"
                >
                    <span className="text-xs uppercase tracking-widest font-medium mb-2 group-hover:tracking-wider transition-all">
                        Scroll Down
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    )
});

export default memo(Hero);
