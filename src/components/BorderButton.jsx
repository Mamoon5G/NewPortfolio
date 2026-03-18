import { motion } from "framer-motion";

export const BorderButton = ({ 
    children, 
    className = "",
    size = "default",
    ...props 
}) => {
    const sizeClasses = {
        sm: "px-5 py-2.5 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            className={`relative bg-transparent border border-border text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group ${sizeClasses[size]} ${className}`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            <svg
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
            >
                <path
                    d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="400 550"
                    strokeDashoffset="400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="border-path"
                />
            </svg>
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}

export default BorderButton;
