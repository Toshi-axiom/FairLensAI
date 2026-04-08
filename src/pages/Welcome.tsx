import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NeonButton } from '../components/NeonButton';
import { ShieldAlert, Activity, Database, CheckCircle2, Users, Scale, Bot } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Welcome = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-fidelity spring configurations mapped to window scroll position
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });
  
  // Severe Z-Depth Multipliers for deep parallax illusion
  const iconY = useTransform(smoothScrollY, [0, 1000], [0, 450]);
  const iconOpacity = useTransform(smoothScrollY, [0, 300], [1, 0]);
  
  const titleY = useTransform(smoothScrollY, [0, 1000], [0, 250]);
  const titleOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);
  
  const subtitleY = useTransform(smoothScrollY, [0, 1000], [0, 100]);
  const subtitleOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);
  
  const buttonY = useTransform(smoothScrollY, [0, 1000], [0, -50]);
  
  // Background Ambient Multipliers
  const blob1Y = useTransform(smoothScrollY, [0, 1200], [0, -800]);
  const blob2Y = useTransform(smoothScrollY, [0, 1200], [0, 800]);
  const blob1Scale = useTransform(smoothScrollY, [0, 800], [1, 1.5]);
  const blob2Scale = useTransform(smoothScrollY, [0, 800], [1, 1.5]);

  // Section 2 Background Grid Perspective
  const gridScale = useTransform(smoothScrollY, [0, 1500], [1, 2]);
  const gridRotateX = useTransform(smoothScrollY, [0, 1500], [40, 0]);
  const gridOpacity = useTransform(smoothScrollY, [0, 500], [0.5, 0.1]);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-dark-900 flex flex-col relative overflow-hidden text-primary w-screen transition-colors duration-500 perspective-[1000px]">
      
      {/* Immersive Grid Canvas */}
      <motion.div 
        style={{ scale: gridScale, rotateX: gridRotateX, opacity: gridOpacity }}
        className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDcpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjxwb2x5Z29uIHBvaW50cz0iNDAgMCAwIDAgMCA0MCIvPjwvZz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"
      />

      {/* Deep Parallax Animated Background Blobs */}
      <motion.div 
        style={{ y: blob1Y, scale: blob1Scale }} 
        className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-neon-cyan/20 rounded-full blur-[180px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        style={{ y: blob2Y, scale: blob2Scale }} 
        className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-violet/20 rounded-full blur-[180px] pointer-events-none mix-blend-screen" 
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center pt-20 px-6 z-10 relative">
        <div className="text-center max-w-4xl flex flex-col items-center relative perspective-[1200px]">
          
          <motion.div 
            style={{ y: iconY, opacity: iconOpacity, z: 100 }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex justify-center mb-8 absolute -top-24"
          >
            <div className="w-24 h-24 rounded-2xl bg-dark-900/80 backdrop-blur-xl border border-neon-cyan/50 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4),inset_0_0_20px_rgba(34,211,238,0.2)]">
              <ShieldAlert size={48} className="text-neon-cyan" />
            </div>
          </motion.div>
          
          <motion.h1 
            style={{ y: titleY, opacity: titleOpacity, z: 50 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter text-primary mt-12 relative drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            Uncover Bias with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet [text-shadow:0_0_40px_rgba(59,130,246,0.3)]">
              FairLens AI
            </span>
          </motion.h1>
          
          <motion.p 
            style={{ y: subtitleY, opacity: subtitleOpacity, z: 0 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary mb-16 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-xl"
          >
            An intelligent platform designed to help you physically identify, analyze, and mathematically understand deep routing biases within your datasets out-of-the-box.
          </motion.p>
          
          <motion.div 
            style={{ y: buttonY, z: -50 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            className="flex items-center justify-center gap-6"
          >
            <NeonButton 
              variant="cyan" 
              label="Initialize Platform" 
              onClick={() => navigate('/auth', { state: { isSignup: true } })} 
              className="text-xl px-12 py-5 shadow-[0_0_50px_rgba(34,211,238,0.3)] hover:shadow-[0_0_80px_rgba(34,211,238,0.6)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Floating 3D Cards Section */}
      <section className="min-h-screen py-24 px-6 z-10 flex items-center justify-center relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring" }}>
            <GlassCard accent="cyan" className="p-8 h-[350px] flex flex-col justify-center border-t-2 border-t-neon-cyan/50 hover:-translate-y-4 duration-500">
              <Database className="text-neon-cyan mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" size={48} />
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wide text-primary">Connect Data</h3>
              <p className="text-secondary text-base leading-relaxed">Instantly upload dynamic datasets or parse directly to your PostgreSQL clusters for real-time validation.</p>
            </GlassCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", delay: 0.1 }}>
            <GlassCard accent="violet" className="p-8 h-[350px] flex flex-col justify-center border-t-2 border-t-neon-violet/50 hover:-translate-y-4 duration-500">
              <Activity className="text-neon-violet mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" size={48} />
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wide text-primary">Detect Bias</h3>
              <p className="text-secondary text-base leading-relaxed">Launch our proprietary engine to autonomously flag disparate impacts across multi-dimensional feature graphs.</p>
            </GlassCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", delay: 0.2 }}>
            <GlassCard accent="blue" className="p-8 h-[350px] flex flex-col justify-center border-t-2 border-t-neon-blue/50 hover:-translate-y-4 duration-500">
              <ShieldAlert className="text-neon-blue mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" size={48} />
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wide text-primary">AI Mitigation</h3>
              <p className="text-secondary text-base leading-relaxed">Engage directly with the contextual Chat Assistant to rewrite biased parameters into actionable fairness logic.</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Why FairLens */}
      <section className="min-h-screen py-24 px-6 z-10 flex items-center justify-center relative">
        <div className="max-w-6xl w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-12">
              <div className="mb-8">
                <h2 className="text-5xl font-display font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">Why FairLens?</h2>
                <div className="h-1 w-20 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              </div>
              
              <motion.div whileHover={{ x: 10 }} className="flex gap-6 items-start transition-transform cursor-default">
                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-2xl mb-2 text-primary">Ethical Compliance</h4>
                  <p className="text-secondary text-base">Ensure your models comply with emerging AI regulations and ethical guidelines before reaching production.</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex gap-6 items-start transition-transform cursor-default">
                <div className="p-4 rounded-xl bg-neon-blue/10 text-neon-blue border border-neon-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Users size={32} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-2xl mb-2 text-primary">Protect Groups</h4>
                  <p className="text-secondary text-base">Highlight and mitigate statistical biases that disproportionately affect underrepresented demographics.</p>
                </div>
              </motion.div>
            </div>
            
            <div className="perspective-[1000px]">
              <GlassCard className="p-12 aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden group border-2 border-border/50">
                <div className="absolute inset-0 bg-gradient-to-bl from-neon-blue/20 via-transparent to-neon-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Bot size={80} className="text-primary mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] z-10 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-4xl font-display font-black mb-4 z-10 text-primary">Ready to deploy?</h3>
                <p className="text-secondary text-lg mb-10 z-10">Join elite ML engineering teams auditing thousands of production layers.</p>
                <NeonButton variant="blue" label="Access Dashboard" onClick={() => navigate('/auth', { state: { isSignup: true } })} className="px-10 py-4 text-lg" />
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-12 text-center text-tertiary text-sm z-10 bg-dark-900/80 backdrop-blur-md">
        <p className="font-display tracking-widest uppercase">&copy; 2026 FairLens AI. All rights reserved.</p>
      </footer>
    </div>
  );
};
