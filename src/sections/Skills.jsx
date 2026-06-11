import { memo } from "react";
import { motion } from "framer-motion";
import { Code, Layers, Database, GitBranch } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: Code,
        color: "#00d4ff",
        skills: [
            { name: "React / Next.js", level: 80 },
            { name: "JavaScript / TypeScript", level: 82 },
            { name: "HTML5 / CSS3", level: 88 },
            { name: "Tailwind CSS", level: 80 },
        ]
    },
    {
        title: "Backend Development",
        icon: Database,
        color: "#8b5cf6",
        skills: [
            { name: "Node.js / Express", level: 72 },
            { name: "MongoDB", level: 68 },
            { name: "MySQL", level: 66 },
            { name: "REST APIs", level: 78 },
        ]
    },
    {
        title: "Tools & Others",
        icon: GitBranch,
        color: "#ec4899",
        skills: [
            { name: "Git / GitHub", level: 82 },
            { name: "VS Code", level: 86 },
            { name: "Antigravity / Claude Code / Open Code", level: 85 },
            { name: "Chrome DevTools", level: 80 },
        ]
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

const SkillBar = memo(({ skill, color, index }) => (
    <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
    >
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <span className="text-xs font-medium" style={{ color }}>{skill.level}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: "easeOut" }}
            />
        </div>
    </motion.div>
));

const SkillCard = memo(({ category, index }) => {
    const IconComponent = category.icon;

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 group"
        >
            <div className="flex items-center gap-4 mb-6">
                <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                </motion.div>
                <h3 className="text-xl font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                    {category.title}
                </h3>
            </div>

            <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                    <SkillBar key={idx} skill={skill} color={category.color} index={idx} />
                ))}
            </div>
        </motion.div>
    );
});


const codingProfiles = [
    { name: "LeetCode", handle: "Mamoon5G", href: "https://leetcode.com/u/Mamoon5G", color: "#f59e0b", stat: "150+", statLabel: "Solved" },
    { name: "GitHub", handle: "Mamoon5G", href: "https://github.com/Mamoon5G", color: "#8b5cf6", stat: "30+", statLabel: "Repos" },
    { name: "LinkedIn", handle: "mamoon-siddiquii", href: "https://linkedin.com/in/mamoon-siddiquii", color: "#0077b5", stat: "200+", statLabel: "Connects" },
];

export const Skills = memo(() => {
    return (
        <section id="skills" className="py-16 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-20 mx-auto max-w-3xl"
                >
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
                        <Layers className="w-4 h-4" />
                        Tech Stack
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
                        Skills & <span className="text-primary">Expertise</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                        Here are the technologies and tools I work with to bring ideas to life.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frontend - Large Block */}
                    <div className="md:col-span-2">
                        <SkillCard category={skillCategories[0]} index={0} />
                    </div>
                    {/* LeetCode - Small Block */}
                    <motion.a
                        href={codingProfiles[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-8 flex flex-col justify-center items-center text-center group"
                        whileHover={{ y: -4 }}
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${codingProfiles[0].color}15` }}>
                            <span className="text-2xl font-bold" style={{ color: codingProfiles[0].color }}>L</span>
                        </div>
                        <h4 className="text-xl font-bold mb-1">{codingProfiles[0].name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">@{codingProfiles[0].handle}</p>
                        <div className="text-3xl font-bold" style={{ color: codingProfiles[0].color }}>{codingProfiles[0].stat}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{codingProfiles[0].statLabel}</div>
                    </motion.a>

                    {/* GitHub - Small Block */}
                    <motion.a
                        href={codingProfiles[1].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-8 flex flex-col justify-center items-center text-center group order-last md:order-none"
                        whileHover={{ y: -4 }}
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${codingProfiles[1].color}15` }}>
                            <span className="text-2xl font-bold" style={{ color: codingProfiles[1].color }}>G</span>
                        </div>
                        <h4 className="text-xl font-bold mb-1">{codingProfiles[1].name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">@{codingProfiles[1].handle}</p>
                        <div className="text-3xl font-bold" style={{ color: codingProfiles[1].color }}>{codingProfiles[1].stat}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{codingProfiles[1].statLabel}</div>
                    </motion.a>

                    {/* Backend - Large Block */}
                    <div className="md:col-span-2">
                        <SkillCard category={skillCategories[1]} index={1} />
                    </div>

                    {/* Tools - Large Block */}
                    <div className="md:col-span-2">
                        <SkillCard category={skillCategories[2]} index={2} />
                    </div>

                    {/* LinkedIn - Small Block */}
                    <motion.a
                        href={codingProfiles[2].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-8 flex flex-col justify-center items-center text-center group"
                        whileHover={{ y: -4 }}
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${codingProfiles[2].color}15` }}>
                            <span className="text-2xl font-bold" style={{ color: codingProfiles[2].color }}>In</span>
                        </div>
                        <h4 className="text-xl font-bold mb-1">{codingProfiles[2].name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">@{codingProfiles[2].handle}</p>
                        <div className="text-3xl font-bold" style={{ color: codingProfiles[2].color }}>{codingProfiles[2].stat}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{codingProfiles[2].statLabel}</div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
});

export default Skills;
