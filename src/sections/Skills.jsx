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
            { name: "Vite / Webpack", level: 78 },
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
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
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

const SkillCard = memo(({ category }) => {
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
    { name: "LeetCode", handle: "mamoon-5g", href: "https://leetcode.com/u/mamoon-5g", color: "#f59e0b" },
    { name: "GitHub", handle: "mamoon-5g", href: "https://github.com/mamoon-5g", color: "#8b5cf6" },
    { name: "LinkedIn", handle: "mamoon-siddiqui-5g", href: "https://linkedin.com/in/mamoon-siddiqui-5g", color: "#0077b5" },
];

const CodingProfiles = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
    >
        <h3 className="text-xl font-bold text-secondary-foreground mb-6 text-center">Coding Profiles</h3>
        <div className="grid sm:grid-cols-3 gap-4">
            {codingProfiles.map((profile, i) => (
                <motion.a
                    key={i}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 flex items-center gap-4 group"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${profile.color}20` }}>
                        <span className="text-sm font-bold" style={{ color: profile.color }}>{profile.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{profile.name}</div>
                        <div className="text-xs text-muted-foreground truncate">@{profile.handle}</div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-lg font-bold" style={{ color: profile.color }}>{profile.stat}</div>
                        <div className="text-xs text-muted-foreground">{profile.statLabel}</div>
                    </div>
                </motion.a>
            ))}
        </div>
    </motion.div>
));

export const Skills = memo(() => {
    return (
        <section id="skills" className="py-32 relative overflow-hidden">
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
                        Skills & <span className="cosmic-text-gradient">Expertise</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                        Here are the technologies and tools I work with to bring ideas to life.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {skillCategories.map((category, index) => (
                        <SkillCard key={index} category={category} index={index} />
                    ))}
                </motion.div>

                <CodingProfiles />
            </div>
        </section>
    );
});

export default Skills;
