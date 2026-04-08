import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  accent?: 'blue' | 'violet' | 'cyan' | 'none';
  hoverable?: boolean;
}

export const GlassCard = ({ children, accent = 'none', hoverable = false, className = '', ...props }: GlassCardProps) => {
  const accentBorders = {
    none: '',
    blue: 'border-t-neon-blue/50 border-t-2',
    violet: 'border-t-neon-violet/50 border-t-2',
    cyan: 'border-t-neon-cyan/50 border-t-2',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...(hoverable ? { whileHover: { y: -5, transition: { duration: 0.2 } } } : {})}
      className={`glass-panel rounded-xl p-6 ${accentBorders[accent]} ${hoverable ? 'glass-panel-hover cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
