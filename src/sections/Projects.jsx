import { memo, useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { BorderButton } from "@/components/BorderButton"
import { motion } from "framer-motion"

const projects = [
    {
        title: "Ammar Group of Companies",
        description: "A corporate website for Ammar Group of Companies. It showcases the company's products and services. It is built using React, Node.js, Express, and MySQL.",
        image: "/projects/ammar-group.png",
        technologies: ["React", "Node.js", "Express", "MySQL"],
        link: "https://www.ammargroup.in",
        category: "Corporate",
        color: "#00d4ff",
    },
    {
        title: "NutriScan - AI-Powered Nutrition Tracker",
        description: "A web application that allows users to track the nutritional and environmental value of their food they consume and make healthier choices. It uses AI to analyze the nutritional value of the food and provides personalized recommendations.",
        image: "/projects/nutriscan.png",
        technologies: ["React", "Node.js", "Express", "Python", "TensorFlow"],
        link: "https://nutri-scanner-one.vercel.app/",
        github: "https://github.com/Mamoon5G/NutriScan",
        category: "AI/ML",
        color: "#8b5cf6",
    },
    {
        title: "Old Portfolio",
        description: "My Old Portfolio website built using HTML, CSS, and JavaScript. It showcases my early projects and serves as a testament to my growth as a developer.",
        image: "/projects/oldport.png",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://Mamoon5G.github.io/MyPortfolio",
        category: "Personal",
        color: "#ec4899",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
}

const ProjectCard = memo(({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-full"
        >
            <div className="glass-card h-full flex flex-col border-border/10 bg-surface/30">
                <div className="relative overflow-hidden aspect-[4/3]">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-muted/20 animate-shimmer" />
                    )}
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        whileHover={{ scale: 1.05 }}
                    />

                    <div className="absolute top-4 right-4">
                        <span
                            className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full glass border-border/20"
                            style={{ color: project.color }}
                        >
                            {project.category}
                        </span>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                            aria-label="Demo"
                        >
                            <ExternalLink className="w-5 h-5 text-zinc-900 dark:text-white" />
                        </a>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                                aria-label="Github"
                            >
                                <Github className="w-5 h-5 text-zinc-900 dark:text-white" />
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/10">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-full uppercase"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export const Projects = memo(() => {
    return (
        <section id="projects" className="py-16 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16 mx-auto max-w-3xl"
                >
                    <motion.span
                        variants={itemVariants}
                        className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
                    >
                        Portfolio
                    </motion.span>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6"
                    >
                        My <span className="text-primary">Projects</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Here are some of the projects I've worked on. Each one represents a unique challenge and an opportunity to learn and grow.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <motion.a
                        href="https://github.com/Mamoon5G"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <BorderButton className="rounded-full">
                            View All Projects
                            <ArrowUpRight className="w-5 h-5 ml-2" />
                        </BorderButton>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
});

export default Projects;
