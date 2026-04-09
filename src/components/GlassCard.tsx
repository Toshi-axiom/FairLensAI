import React from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps extends React.ComponentProps<typeof motion.div> {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'cyan' | 'violet' | 'none';
  hoverable?: boolean;
}

export const GlassCard = ({ children, className = '', accent = 'none', ...props }: GlassCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const accents = {
    blue: 'glass-panel-blue',
    cyan: 'glass-panel-cyan',
    violet: 'glass-panel-violet',
    none: 'glass-panel'
  };

  const baseStyles = accents[accent];

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl group overflow-hidden ${baseStyles} ${className}`}
      {...props}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          left: glareX,
          top: glareY,
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%'
        }}
      />
      <div 
        className="relative z-10 w-full h-full" 
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};
