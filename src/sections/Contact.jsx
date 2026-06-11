import { memo, useState, useCallback } from "react";
import { Mail, Linkedin, Github, Send, MessageCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

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

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "siddiquimamoon2004ms@gmail.com",
        href: "mailto:siddiquimamoon2004ms@gmail.com",
        color: "#00d4ff",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "Mamoon Siddiqui",
        href: "https://www.linkedin.com/in/mamoon-siddiquii",
        color: "#0077b5",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "Mamoon5G",
        href: "https://github.com/Mamoon5G",
        color: "#8b5cf6",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Mumbai, India",
        href: null,
        color: "#ec4899",
    },
    {
        icon: Clock,
        label: "Availability",
        value: "Open to Opportunities",
        href: null,
        color: "#10b981",
    },
]

export const Contact = memo(() => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = useCallback((e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mailtoLink = `mailto:siddiquimamoon2004ms@gmail.com?subject=Portfolio Contact: ${formData.name}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.open(mailtoLink, '_blank');

        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    }, [formData]);

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-20 mx-auto max-w-3xl"
                >
                    <motion.span variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
                        <MessageCircle className="w-4 h-4" />
                        Get in Touch
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
                        Contact that
                        <span className="font-serif italic font-normal"> Connects</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                    Name
                                </label>
                                <motion.div
                                    animate={{
                                        boxShadow: focusedField === 'name' ? "0 0 0 2px rgba(0, 212, 255, 0.3)" : "0 0 0 0 transparent"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className="w-full px-4 py-3.5 glass rounded-xl border border-border focus:border-primary focus:outline-none transition-all duration-300 bg-surface/30 text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="Your name"
                                    />
                                </motion.div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <motion.div
                                    animate={{
                                        boxShadow: focusedField === 'email' ? "0 0 0 2px rgba(0, 212, 255, 0.3)" : "0 0 0 0 transparent"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className="w-full px-4 py-3.5 glass rounded-xl border border-border focus:border-primary focus:outline-none transition-all duration-300 bg-surface/30 text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="your.email@example.com"
                                    />
                                </motion.div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                                    Message
                                </label>
                                <motion.div
                                    animate={{
                                        boxShadow: focusedField === 'message' ? "0 0 0 2px rgba(0, 212, 255, 0.3)" : "0 0 0 0 transparent"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3.5 glass rounded-xl border border-border focus:border-primary focus:outline-none transition-all duration-300 bg-surface/30 text-foreground placeholder:text-muted-foreground/50 resize-none"
                                        placeholder="Your message..."
                                    />
                                </motion.div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cosmic-button text-primary-foreground px-6 py-4 rounded-xl font-medium shadow-sm shadow-primary/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-70"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6 min-w-0">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-secondary-foreground">Let's Connect</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Whether you have a question, want to collaborate, or just want to say hello, feel free to get in touch. I'm always excited to hear about new opportunities!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href || undefined}
                                    target={item.href ? "_blank" : undefined}
                                    rel={item.href ? "noopener noreferrer" : undefined}
                                    className={`flex items-center gap-4 glass-card p-4 group min-w-0 ${!item.href ? 'cursor-default' : ''}`}
                                    whileHover={item.href ? { scale: 1.02, x: 5 } : {}}
                                >
                                    <motion.div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: `${item.color}15` }}
                                        whileHover={{ scale: 1.1, backgroundColor: `${item.color}25` }}
                                    >
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-muted-foreground">{item.label}</div>
                                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            {item.value}
                                        </div>
                                    </div>
                                    {item.href && (
                                        <motion.div
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Send className="w-4 h-4 text-primary" />
                                        </motion.div>
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            className="glass-card p-6 mt-8 text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="text-6xl mb-4">🚀</div>
                            <p className="text-foreground font-medium mb-2">
                                Open to Work
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Currently available for internships and entry-level positions
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

export default Contact;
