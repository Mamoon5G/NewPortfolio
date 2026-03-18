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
        github: "https://github.com/Mamoon-5G/NutriScan",
        category: "AI/ML",
        color: "#8b5cf6",
    },
    {
        title: "Old Portfolio",
        description: "My Old Portfolio website built using HTML, CSS, and JavaScript. It showcases my early projects and serves as a testament to my growth as a developer.",
        image: "/projects/oldport.png",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://mamoon-5g.github.io/MyPortfolio",
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
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
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
            className="group relative"
        >
            <motion.div
                className="glass-card p-0 overflow-hidden rounded-2xl [&:hover]:transform-none"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="relative overflow-hidden aspect-16/10">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-nebula-purple/10 animate-pulse" />
                    )}
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onLoad={() => setImageLoaded(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: isHovered ? 0.9 : 0.6 }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="absolute top-4 left-4">
                        <motion.span
                            className="px-3 py-1 text-xs font-medium rounded-full glass"
                            style={{ color: project.color }}
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                        >
                            {project.category}
                        </motion.span>
                    </div>

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`View ${project.title} live demo`}
                        >
                            <ExternalLink className="w-6 h-6 text-primary" />
                        </motion.a>
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`View ${project.title} on GitHub`}
                            >
                                <Github className="w-6 h-6 text-primary" />
                            </motion.a>
                        )}
                    </motion.div>

                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: project.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div className="p-6 space-y-4">
                    <motion.h3 
                        className="text-xl md:text-2xl font-bold text-secondary-foreground group-hover:text-primary transition-colors"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.title}
                    </motion.h3>
                    
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                            <motion.span
                                key={i}
                                className="bg-secondary text-muted-foreground border border-border/50 px-3 py-1 rounded-full text-xs font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    borderColor: project.color,
                                    color: project.color
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-2">
                        <motion.a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                            whileHover={{ x: 5 }}
                        >
                            Live Demo
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                        {project.github && (
                            <motion.a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary hover:gap-3 transition-all"
                                whileHover={{ x: 5 }}
                            >
                                GitHub
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.a>
                        )}
                    </div>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        boxShadow: `0 0 40px ${project.color}20`,
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>
        </motion.div>
    );
});

export const Projects = memo(() => {
    return (
        <section id="projects" className="py-32 relative overflow-hidden">
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
                        My <span className="cosmic-text-gradient">Projects</span>
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
                        href="https://github.com/mamoon-5g"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <BorderButton>
                            View All Projects
                            <ArrowUpRight className="w-5 h-5 ml-2" />
                        </BorderButton>
                    </motion.a>
                </motion.div>
            </div>

            <motion.div
                className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-0 w-80 h-80 bg-nebula-purple/5 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </section>
    );
});

export default Projects;
