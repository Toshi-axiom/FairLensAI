import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NeonButton } from '../components/NeonButton';
import { ShieldAlert, Activity, Database, CheckCircle2, Users, Scale, Bot } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Welcome = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const blob1Y = useTransform(scrollY, [0, 1000], [0, -500]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col relative overflow-hidden text-primary w-screen transition-colors duration-500">
      {/* Animated Background ambient glow with Parallax shifts */}
      <motion.div 
        style={{ y: blob1Y }} 
        className="fixed top-[10%] left-[10%] w-[50%] h-[50%] bg-neon-cyan/20 rounded-full blur-[150px] pointer-events-none animate-blob" 
      />
      <motion.div 
        style={{ y: blob2Y, animationDelay: '2s', animationDirection: 'reverse' }} 
        className="fixed bottom-[10%] right-[10%] w-[50%] h-[50%] bg-neon-blue/20 rounded-full blur-[150px] pointer-events-none animate-blob" 
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 z-10 relative">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-dark-800 border border-neon-cyan/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <ShieldAlert size={40} className="text-neon-cyan" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-primary">
            Uncover Bias with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet text-glow">
              FairLens AI
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-secondary mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            An intelligent platform designed to help you identify, analyze, and understand bias in your datasets and AI models. Ensure fairness through clarity.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <NeonButton 
              variant="cyan" 
              label="Get Started" 
              onClick={() => navigate('/auth', { state: { isSignup: true } })} 
              className="text-lg px-8 py-4"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 mb-16 max-w-5xl w-full">
          <GlassCard accent="cyan" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Database className="text-neon-cyan mb-4" size={32} />
            <h3 className="text-xl font-display font-bold mb-2">Connect Data</h3>
            <p className="text-secondary text-sm">Upload datasets or connect directly to your databases for real-time analysis.</p>
          </GlassCard>
          
          <GlassCard accent="violet" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Activity className="text-neon-violet mb-4" size={32} />
            <h3 className="text-xl font-display font-bold mb-2">Detect Bias</h3>
            <p className="text-secondary text-sm">Automatic scanning for anomalies, imbalances, and demographic disparities.</p>
          </GlassCard>
          
          <GlassCard accent="blue" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <ShieldAlert className="text-neon-blue mb-4" size={32} />
            <h3 className="text-xl font-display font-bold mb-2">AI Assistant</h3>
            <p className="text-secondary text-sm">Conversational interface that explains fairness concepts in simple language.</p>
          </GlassCard>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 bg-black/5 z-10 border-t border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-secondary max-w-2xl mx-auto">From messy data to fair models in three distinct steps.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neon-violet before:to-transparent">
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
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
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
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
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
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
            </div>
          </div>
        </div>
      </section>

      {/* Why FairLens */}
      <section className="py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Why FairLens?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 border border-emerald-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl mb-1">Ethical Compliance</h4>
                  <p className="text-secondary text-sm">Ensure your models comply with emerging AI regulations and ethical guidelines before reaching production.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue shrink-0 border border-neon-blue/20">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl mb-1">Protect Marginalized Groups</h4>
                  <p className="text-secondary text-sm">Highlight and mitigate statistical biases that disproportionately affect underrepresented demographics.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-neon-violet/10 text-neon-violet shrink-0 border border-neon-violet/20">
                  <Scale size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl mb-1">Brand Trust</h4>
                  <p className="text-secondary text-sm">Demonstrate transparency to your users by actively monitoring and reporting on algorithmic fairness.</p>
                </div>
              </div>
            </div>
            
            <div>
              <GlassCard className="p-8 aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/10 to-neon-violet/10 group-hover:scale-110 transition-transform duration-700" />
                <ShieldAlert size={64} className="text-primary mb-6 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10" />
                <h3 className="text-2xl font-display font-bold mb-2 z-10">Ready to secure your models?</h3>
                <p className="text-secondary mb-8 z-10">Join leading AI teams using FairLens.</p>
                <NeonButton variant="blue" label="Create Free Account" onClick={() => navigate('/auth', { state: { isSignup: true } })} />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-tertiary text-sm z-10">
        <p>&copy; 2026 FairLens AI. All rights reserved.</p>
      </footer>
    </div>
  );
};
