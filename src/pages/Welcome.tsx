import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { NeonButton } from '../components/NeonButton';
import { ShieldAlert, Activity, Database, CheckCircle2, Users, Scale, Bot } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Welcome = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [particlesInit, setParticlesInit] = useState(false);

  const particlesOptions = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.8, color: "#22d3ee" } },
        push: { quantity: 3 },
      },
    },
    particles: {
      color: { value: ["#22d3ee", "#8b5cf6"] },
      links: {
        color: "#8b5cf6",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: { default: "bounce" as const },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: { density: { enable: true, height: 800, width: 800 }, value: 80 },
      opacity: { value: 0.6 },
      shape: { type: "circle" as const },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);
  
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
    <div ref={containerRef} className="min-h-[250vh] bg-dark-900 flex flex-col relative overflow-hidden text-primary w-full transition-colors duration-500 perspective-[1000px]">
      
      {/* Interactive Neural Network Particles */}
      {particlesInit && (
        <Particles
          id="tsparticles-welcome"
          className="fixed inset-0 z-0 mix-blend-screen"
          options={particlesOptions}
        />
      )}

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
            className="text-4xl sm:text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter text-primary mt-12 relative drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
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

      {/* Abstract Dashboard Visualization */}
      <section className="relative z-10 flex justify-center pb-32 px-6 mt-[-10vh] pointer-events-none">
        <motion.div 
          style={{ y: useTransform(smoothScrollY, [0, 800], [50, -50]) }}
          className="w-full max-w-5xl rounded-3xl border border-border/80 bg-dark-800/40 backdrop-blur-2xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden"
        >
          {/* Mac window dots */}
          <div className="flex gap-2 mb-8 ml-2">
             <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
             <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
             <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Graph Mock 1 */}
               <div className="col-span-1 md:col-span-2 h-auto min-h-[16rem] rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden p-6 flex flex-col justify-end">
                <div className="absolute top-6 left-6 z-10">
                   <div className="text-white/40 text-xs md:text-sm font-medium mb-1 tracking-wider uppercase">Disparate Impact Ratio</div>
                   <div className="text-3xl md:text-4xl font-display font-medium text-white flex items-end gap-3">
                     0.86 <span className="text-emerald-400 text-base md:text-lg mb-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Fair</span>
                   </div>
                </div>
                {/* Embedded SVG Graph */}
                <svg className="w-full h-40 overflow-visible absolute bottom-0 left-0 pointer-events-none" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2"/>
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                    </linearGradient>
                    <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,20 L400,100 L0,100 Z" fill="url(#gradientFill)" />
                  <path d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,20" fill="none" stroke="url(#gradientLine)" strokeWidth="3" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  
                  {/* Glowing data points */}
                  <circle cx="100" cy="50" r="5" fill="#fff" className="drop-shadow-[0_0_10px_#fff]" />
                  <circle cx="200" cy="30" r="5" fill="#fff" className="drop-shadow-[0_0_10px_#fff]" />
                  <circle cx="300" cy="60" r="5" fill="#fff" className="drop-shadow-[0_0_10px_#fff]" />
                </svg>
             </div>

             {/* Graph Mock 2 */}
             <div className="col-span-1 h-72 rounded-2xl bg-black/40 border border-white/5 relative p-6 flex flex-col items-center justify-center">
                <div className="absolute top-6 left-6">
                   <div className="text-white/40 text-sm font-medium mb-1 tracking-wider uppercase">Protected Class</div>
                </div>
                {/* Circular indicator mock */}
                <div className="relative w-40 h-40 mt-6 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff0a" strokeWidth="6"/>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="283" strokeDashoffset="40" className="drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white text-4xl font-display font-medium">85%</span>
                    <span className="text-white/40 text-xs tracking-widest uppercase mt-1">Parity</span>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
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

      {/* Stats Section */}
      <section className="py-24 px-6 relative z-10 border-t border-border bg-gradient-to-b from-black/40 to-dark-900/40">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Models Monitored', value: '10M+', color: 'text-neon-cyan', shadow: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]' },
            { label: 'Biases Mitigated', value: '8.4B', color: 'text-neon-violet', shadow: 'drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]' },
            { label: 'Uptime', value: '99.9%', color: 'text-neon-blue', shadow: 'drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' },
            { label: 'Enterprise Teams', value: '400+', color: 'text-emerald-400', shadow: 'drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="text-center p-8 border border-border/50 rounded-2xl bg-dark-800/30 backdrop-blur-sm hover:bg-dark-800/80 transition-colors"
            >
              <h4 className={`text-4xl md:text-5xl font-display font-black mb-3 ${stat.color} ${stat.shadow}`}>
                {stat.value}
              </h4>
              <p className="text-secondary tracking-wide uppercase text-sm font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 bg-black/5 z-10 border-t border-b border-border relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-secondary max-w-2xl mx-auto">From messy data to fair models in three distinct steps.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neon-violet before:to-transparent">
            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-dark-800 group-hover:border-neon-cyan text-tertiary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <span className="font-display font-bold text-neon-cyan">1</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-dark-800/80 backdrop-blur shadow">
                <div className="flex items-center mb-2">
                  <Database className="text-neon-cyan mr-2" size={20} />
                  <h4 className="font-display font-bold text-lg">Ingest & Profile</h4>
                </div>
                <p className="text-secondary text-sm">Connect your raw datasets. FairLens immediately profiles the distributions and identifies proxy variables.</p>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-dark-800 group-hover:border-neon-violet text-tertiary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <span className="font-display font-bold text-neon-violet">2</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-dark-800/80 backdrop-blur shadow">
                <div className="flex items-center mb-2">
                  <Activity className="text-neon-violet mr-2" size={20} />
                  <h4 className="font-display font-bold text-lg">Analyze Metrics</h4>
                </div>
                <p className="text-secondary text-sm">Our dual-pane Bias Engine calculates Disparate Impact, Equal Opportunity, and Demographic Parity.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-dark-800 group-hover:border-neon-blue text-tertiary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <span className="font-display font-bold text-neon-blue">3</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-dark-800/80 backdrop-blur shadow">
                <div className="flex items-center mb-2">
                  <Bot className="text-neon-blue mr-2" size={20} />
                  <h4 className="font-display font-bold text-lg">AI Mitigation</h4>
                </div>
                <p className="text-secondary text-sm">Consult the FairLens Chat Assistant to receive tailored re-weighing strategies and code snippets.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Marquee */}
      <section className="py-20 overflow-hidden relative z-10 border-y border-border bg-black/40">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-20 pointer-events-none" />
        
        <div className="text-center mb-10 z-10 relative">
          <h3 className="text-sm font-display tracking-[0.2em] text-secondary uppercase">Seamlessly integrates with your ecosystem</h3>
        </div>

        <div className="flex gap-12 text-secondary/40 font-display font-bold text-3xl whitespace-nowrap items-center">
           <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            className="flex gap-24 items-center"
          >
             {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'HuggingFace', 'Pandas', 'Apache Spark', 'AWS SageMaker', 'Google Cloud AI'].map((tech) => (
               <div key={tech} className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                 <div className="w-4 h-4 rounded-full bg-neon-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                 {tech}
               </div>
             ))}
             {/* Duplicate for infinite effect */}
             {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'HuggingFace', 'Pandas', 'Apache Spark', 'AWS SageMaker', 'Google Cloud AI'].map((tech, i) => (
               <div key={`dup-${i}`} className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                 <div className="w-4 h-4 rounded-full bg-neon-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                 {tech}
               </div>
             ))}
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
            className="max-w-3xl mx-auto"
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

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-12 mt-12 border-t border-border flex flex-col items-center text-center"
              >
                <h3 className="text-3xl font-display font-bold text-primary mb-4">Ready to build fairer AI?</h3>
                <p className="text-secondary mb-8 max-w-lg">
                  Sign in to access your dashboard and start auditing your models.
                </p>
                <NeonButton 
                  variant="violet" 
                  label="Sign In Now" 
                  onClick={() => navigate('/auth', { state: { isSignup: false } })} 
                  className="px-10 py-4 text-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]"
                />
              </motion.div>
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
