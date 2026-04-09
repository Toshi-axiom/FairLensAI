import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, Database, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const biasData = [
  { name: 'Model V1', score: 65 },
  { name: 'Model V2', score: 72 },
  { name: 'Model V3', score: 85 },
  { name: 'Model V4', score: 88 },
  { name: 'Model V5', score: 94 },
];

const demographicData = [
  { group: 'Segment A', pass: 85, fail: 15 },
  { group: 'Segment B', pass: 42, fail: 58 },
  { group: 'Segment C', pass: 78, fail: 22 },
  { group: 'Segment D', pass: 88, fail: 12 },
];

const LoadingSkeleton = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-dark-900/50 rounded-xl border border-white/5 relative overflow-hidden">
    <motion.div 
      animate={{ y: [-50, 300] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-[var(--neon-primary)]/20 to-transparent pointer-events-none" 
    />
    <Activity className="text-[var(--neon-primary)] mb-4 animate-pulse relative z-10" size={32} />
    <p className="text-[var(--neon-primary)] font-mono text-sm tracking-[0.3em] uppercase animate-pulse relative z-10">Parsing Matrices...</p>
    <div className="mt-6 w-48 h-1 bg-dark-800 rounded-full overflow-hidden relative z-10 border border-white/5">
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="h-full bg-[var(--neon-primary)]" 
      />
    </div>
  </div>
);

export const Dashboard = () => {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 tour-step-1">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow flex items-center gap-3">
          System Overview
          {isScanning && <span className="text-xs px-2 py-1 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded-md animate-pulse">SCANNING</span>}
        </h2>
        <p className="text-tertiary font-light">Real-time fairness metrics and anomaly detection across all models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard accent="cyan" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tertiary text-xs font-display uppercase tracking-widest mb-2">Active Datasets</p>
              <h3 className="text-3xl font-bold text-primary tracking-wider">{isScanning ? '--' : '14'}</h3>
            </div>
            <div className="p-3 bg-dark-800 rounded-xl border border-neon-cyan/30 text-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Database size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard accent="violet" hoverable className="tour-step-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tertiary text-xs font-display uppercase tracking-widest mb-2">Anomalies Detected</p>
              <h3 className="text-3xl font-bold text-primary tracking-wider">{isScanning ? '--' : '3'}</h3>
            </div>
            <div className="p-3 bg-dark-800 rounded-xl border border-neon-violet/30 text-neon-violet shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <AlertTriangle size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard accent="blue" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tertiary text-xs font-display uppercase tracking-widest mb-2">Global Fairness</p>
              <h3 className="text-3xl font-bold text-primary tracking-wider">{isScanning ? '--' : '94'}<span className="text-lg text-tertiary">%</span></h3>
            </div>
            <div className="p-3 bg-dark-800 rounded-xl border border-neon-blue/30 text-neon-blue shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Activity size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard accent="none" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tertiary text-xs font-display uppercase tracking-widest mb-2">Protected Orgs</p>
              <h3 className="text-3xl font-bold text-primary tracking-wider">{isScanning ? '--' : '8'}</h3>
            </div>
            <div className="p-3 bg-dark-800 rounded-xl border border-border text-secondary">
              <ShieldCheck size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <GlassCard className="h-96">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            Fairness Progression
          </h3>
          <div className="h-[280px] w-full relative">
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <LoadingSkeleton />
                </motion.div>
              ) : (
                <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={biasData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0A0A0F', borderColor: '#22D3EE', borderRadius: '8px', boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#22D3EE" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>

        <GlassCard className="h-96">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-violet shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
            Demographic Outcomes Distribution
          </h3>
          <div className="h-[280px] w-full relative">
             <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <LoadingSkeleton />
                </motion.div>
              ) : (
                <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="group" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: '#ffffff05'}}
                        contentStyle={{ backgroundColor: '#0A0A0F', borderColor: '#8B5CF6', borderRadius: '8px', boxShadow: '0 0 20px rgba(139,92,246,0.2)' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="pass" stackId="a" fill="#3B82F6" name="Positive Outcome" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="fail" stackId="a" fill="#8B5CF6" name="Negative Outcome" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
