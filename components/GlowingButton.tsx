"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    glowColor?: string;
}

export default function GlowingButton({
    children,
    variant = "primary",
    className = "",
    glowColor,
    ...props
}: GlowingButtonProps) {
    const isPrimary = variant === "primary";
    const defaultGlow = isPrimary ? "from-indigo-500 to-purple-500" : "from-neutral-400 to-neutral-600";
    const glowClass = glowColor || defaultGlow;

    return (
        <div className={`relative group w-full ${className}`}>
            {/* Animated Glow Layer behind the button */}
            <motion.div
                className={`absolute -inset-[2px] rounded-xl bg-gradient-to-r ${glowClass} opacity-40 blur-md transition duration-500 group-hover:opacity-100 group-active:opacity-50`}
                initial={{ opacity: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            />

            {/* The actual Button Layer */}
            <motion.button
                className={`relative w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300
          ${isPrimary
                        ? "bg-neutral-950 text-white border border-white/10 hover:bg-neutral-900"
                        : "bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10"
                    }
        `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </motion.button>
        </div>
    );
}
