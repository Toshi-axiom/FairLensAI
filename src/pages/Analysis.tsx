import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { BrainCircuit, TriangleAlert, Sparkles } from 'lucide-react';
import { useAssistant } from '../contexts/AssistantContext';
import { NeonButton } from '../components/NeonButton';

export const Analysis = () => {
  const { openAssistant } = useAssistant();

  return (
    <div className="flex flex-col h-auto md:h-[calc(100vh-140px)] space-y-4">
      <div className="mb-2 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow">Bias Analysis Engine</h2>
          <p className="text-secondary font-light">Interactive exploration of dataset anomalies with AI assistance.</p>
        </div>
        <div className="self-start md:self-auto">
          <NeonButton 
            variant="blue" 
            label="Open AI Assistant" 
            icon={<Sparkles size={18} />} 
            onClick={openAssistant} 
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl min-h-0">
        {/* Bias Engine Pane */}
        <GlassCard className="flex flex-col h-[600px] md:h-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0 border-b border-border pb-4">
            <h3 className="text-xl font-display font-semibold flex items-center gap-3">
              <BrainCircuit className="text-neon-cyan" size={24} /> Engine Outputs
            </h3>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-xs bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                Live Analysis
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Finding 1 */}
            <div className="p-6 rounded-2xl bg-dark-800/80 border border-border border-l-4 border-l-neon-violet hover:bg-dark-800 transition-colors shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <h4 className="font-medium text-lg text-primary">Gender Imbalance in "Applicant_Income"</h4>
                <button onClick={openAssistant} className="flex self-start items-center gap-2 text-xs font-semibold text-neon-violet hover:text-white transition-colors bg-neon-violet/10 px-3 py-1.5 rounded-lg border border-neon-violet/30">
                  <Sparkles size={14} /> Mitigate
                </button>
              </div>
              <p className="text-secondary mb-4 leading-relaxed">Model assigns 15% lower scores to female applicants holding identical financial metrics. Feature 'zip_code' acts as a proxy.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 bg-neon-violet/5 rounded-md text-neon-violet border border-neon-violet/20 font-mono tracking-wider">PROXY_VARIABLE</span>
                <span className="text-xs px-2.5 py-1 bg-dark-700 rounded-md text-secondary border border-border uppercase tracking-widest font-semibold">Disparate Impact</span>
              </div>
            </div>

            {/* Finding 2 */}
            <div className="p-6 rounded-2xl bg-dark-800/80 border border-border border-l-4 border-l-neon-blue hover:bg-dark-800 transition-colors shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <h4 className="font-medium text-lg text-primary">Underrepresentation in Training Data</h4>
                <button onClick={openAssistant} className="flex self-start items-center gap-2 text-xs font-semibold text-neon-blue hover:text-white transition-colors bg-neon-blue/10 px-3 py-1.5 rounded-lg border border-neon-blue/30">
                  <Sparkles size={14} /> Mitigate
                </button>
              </div>
              <p className="text-secondary mb-4 leading-relaxed">Demographic group 'Native American' constitutes only 0.4% of the dataset, leading to high variance in prediction accuracy.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 bg-neon-blue/5 rounded-md text-neon-blue border border-neon-blue/20 font-mono tracking-wider">SAMPLING_BIAS</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
