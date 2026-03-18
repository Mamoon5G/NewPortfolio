import { motion } from "framer-motion";

export const Button = ({ 
    className = "", 
    size = "default", 
    variant = "primary",
    children,
    ...props 
}) => {
    const baseClasses = "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer transition-all duration-300 flex items-center justify-center gap-2";

    const sizeClasses = {
        sm: "px-5 py-2.5 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const variantClasses = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 shadow-lg shadow-primary/25",
        secondary: "glass border border-border text-foreground hover:bg-surface/50 hover:border-primary/50",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-surface/30"
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
        <motion.button
            className={classes}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                initial={{ translateX: "-100%" }}
                whileHover={{ translateX: "100%" }}
                transition={{ duration: 0.6 }}
            />
        </motion.button>
    )
}

export default Button;
