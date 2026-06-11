import { memo, useMemo, useRef } from "react";
import { Button } from "@/components/Button";
import { ArrowRight, ChevronDown, Github, Instagram, Linkedin, Twitter, Code2 } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const skills = [
    "HTML", "CSS", "C/C++", "Python", "JavaScript", "React", "TypeScript",
    "Tailwind CSS", "Node.js", "Express", "MongoDB", "MySQL", "Git",
    "Github", "REST APIs", "Antigravity", "Claude Code", "Open Code", "AI Tools"
];

const FloatingBadge = memo(({ children, delay, className }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={`glass rounded-xl px-4 py-3 cursor-pointer ${className}`}
            animate={prefersReducedMotion ? {} : {
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
    );
});

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
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

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
        { icon: Github, href: "https://github.com/Mamoon5G", label: "GitHub Profile" },
        { icon: Linkedin, href: "https://linkedin.com/in/mamoon-siddiquii", label: "LinkedIn Profile" },
        { icon: Instagram, href: "https://instagram.com/m_a_siddiqui_5g", label: "Instagram Profile" },
        { icon: Twitter, href: "https://twitter.com/mamoon_4g", label: "Twitter Profile" },
        { icon: Code2, href: "https://leetcode.com/u/Mamoon5G", label: "LeetCode Profile" }
    ], []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />
            </motion.div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto"
                >
                    <div className="space-y-8 lg:col-span-7 xl:col-span-7">
                        <motion.div variants={itemVariants}>
                            <motion.span
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-primary">Computer Engineer</span>
                                <span className="text-muted-foreground">—</span>
                                <span className="text-muted-foreground">Full Stack Developer</span>
                            </motion.span>
                        </motion.div>

                        <div className="space-y-4 md:space-y-6">
                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tighter"
                            >
                                <motion.span variants={textVariants} className="block">
                                    Engineering
                                </motion.span>
                                <motion.span variants={textVariants} className="block text-primary">
                                    Digital
                                </motion.span>
                                <motion.span variants={textVariants} className="block">
                                    Solutions.
                                </motion.span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light"
                            >
                                A Computer Engineer and Full Stack Developer translating complex problems into simple, beautiful, and <span className="text-foreground font-medium underline underline-offset-8 decoration-primary/30">performant</span> web applications.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="rounded-full px-8 group bg-foreground text-background hover:bg-foreground/90 border-none">
                                    Get in Touch
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.a>

                            <div className="flex gap-4">
                                {socialLinks.slice(0, 3).map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link.href}
                                        className="p-3 rounded-full glass border-border/10 hover:border-primary/40 hover:text-primary transition-all"
                                        whileHover={{ y: -4 }}
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-10">
                            <div className="flex items-center gap-10">
                                <div>
                                    <div className="text-3xl font-bold">30+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Repositories</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">150+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Problems Solved</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="relative lg:col-span-5"
                    >
                        <div className="relative max-w-sm mx-auto xl:max-w-md">
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                animate={{
                                    boxShadow: [
                                        "0 0 30px var(--primary-color)",
                                        "0 0 60px var(--primary-color)",
                                        "0 0 30px var(--primary-color)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{ opacity: 0.15 }}
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
                    <div className="relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />
                        <div className="flex gap-8 py-4 animate-marquee whitespace-nowrap">
                            {[...skills, ...skills].map((skill, index) => (
                                <SkillItem key={`${skill}-${index}`} skill={skill} />
                            ))}
                        </div>
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
    );
});

export default Hero;