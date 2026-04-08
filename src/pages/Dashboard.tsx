import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, Database, AlertTriangle, ShieldCheck } from 'lucide-react';

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

export const Dashboard = () => {
  return (
    <div className="space-y-8 tour-step-1">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow">System Overview</h2>
        <p className="text-tertiary font-light">Real-time fairness metrics and anomaly detection across all models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard accent="cyan" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tertiary text-xs font-display uppercase tracking-widest mb-2">Active Datasets</p>
              <h3 className="text-3xl font-bold text-primary tracking-wider">14</h3>
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
              <h3 className="text-3xl font-bold text-primary tracking-wider">3</h3>
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
              <h3 className="text-3xl font-bold text-primary tracking-wider">94<span className="text-lg text-tertiary">%</span></h3>
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
              <h3 className="text-3xl font-bold text-primary tracking-wider">8</h3>
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
          <div className="h-[280px] w-full">
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
          </div>
        </GlassCard>

        <GlassCard className="h-96">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-violet shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
            Demographic Outcomes Distribution
          </h3>
          <div className="h-[280px] w-full">
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
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
