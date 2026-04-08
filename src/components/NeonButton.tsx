import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'blue' | 'violet' | 'cyan';
  label: string;
  icon?: ReactNode;
}

export const NeonButton = ({ variant = 'cyan', label, icon, className = '', ...props }: NeonButtonProps) => {
  const baseClasses = "relative overflow-hidden rounded-lg px-6 py-3 font-display font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 z-10";
  
  const variants = {
    blue: "bg-dark-800 text-neon-blue border border-neon-blue/30 hover:border-neon-blue hover:shadow-neon-blue hover:bg-neon-blue/10",
    violet: "bg-dark-800 text-neon-violet border border-neon-violet/30 hover:border-neon-violet hover:shadow-neon-violet hover:bg-neon-violet/10",
    cyan: "bg-dark-800 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan hover:shadow-neon-cyan hover:bg-neon-cyan/10",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label}
    </motion.button>
  );
};
