import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Bot, Send, BrainCircuit, TriangleAlert } from 'lucide-react';

export const Analysis = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "I've detected a significant disparate impact related to gender in the latest model based on the zip_code feature. Would you like me to suggest re-weighing strategies?" },
    { role: 'user', text: "Show me the proxy variables." },
    { role: 'assistant', text: "The primary proxy variable is zip_code. Because historical redlining affects geographic distribution, using zip code introduces indirect bias. I recommend dropping this column or applying a fairness-aware adversarial debiasing technique." }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I am analyzing your model request. As a mock instance, I will append this to the fairness log." }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4">
      <div className="mb-2 shrink-0">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow">Bias Analysis Engine</h2>
        <p className="text-secondary font-light">Interactive exploration of dataset anomalies with AI assistance.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        {/* Bias Engine Pane */}
        <GlassCard className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h3 className="text-lg font-display font-semibold flex items-center gap-2">
              <BrainCircuit className="text-neon-cyan" size={20} /> Engine Outputs
            </h3>
            <div className="text-xs bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              Live Analysis
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Finding 1 */}
            <div className="p-5 rounded-xl bg-dark-800/80 border border-border border-l-2 border-l-neon-violet hover:bg-dark-800 transition-colors shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-primary">Gender Imbalance in "Applicant_Income"</h4>
                <TriangleAlert size={18} className="text-neon-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
              </div>
              <p className="text-sm text-secondary mb-4 leading-relaxed">Model assigns 15% lower scores to female applicants holding identical financial metrics. Feature 'zip_code' acts as a proxy.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 bg-neon-violet/5 rounded-md text-neon-violet border border-neon-violet/20">Proxy Variable</span>
                <span className="text-xs px-2.5 py-1 bg-dark-700 rounded-md text-secondary border border-border">Disparate Impact</span>
              </div>
            </div>

            {/* Finding 2 */}
            <div className="p-5 rounded-xl bg-dark-800/80 border border-border border-l-2 border-l-neon-blue hover:bg-dark-800 transition-colors shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-primary">Underrepresentation in Training Data</h4>
              </div>
              <p className="text-sm text-secondary mb-4 leading-relaxed">Demographic group 'Native American' constitutes only 0.4% of the dataset, leading to high variance in prediction accuracy.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 bg-neon-blue/5 rounded-md text-neon-blue border border-neon-blue/20">Sampling Bias</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* AI Chat Assistant Pane */}
        <GlassCard className="flex flex-col h-full overflow-hidden" accent="blue">
          <div className="flex items-center gap-3 mb-6 shrink-0 border-b border-border pb-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Bot className="text-neon-blue" size={20} />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-dark-900"></span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-primary">FairLens Assistant</h3>
              <p className="text-xs text-neon-blue tracking-wider uppercase font-medium">Online Engine</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div className={`max-w-[85%] border rounded-2xl p-4 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-neon-blue/15 border-neon-blue/30 rounded-tr-sm shadow-[0_4px_20px_rgba(59,130,246,0.15)]' 
                    : 'bg-dark-800 border-border rounded-tl-sm'
                }`}>
                  <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-primary' : 'text-secondary'}`}>
                    {msg.role === 'assistant' && msg.text.includes('zip_code') ? (
                      // Super simplified highlighting for mock up
                      <span dangerouslySetInnerHTML={{__html: msg.text.replace(/zip_code/g, '<span class="font-mono text-neon-violet px-1 bg-dark-700 rounded">zip_code</span>')}} />
                    ) : msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative shrink-0 mt-auto">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for explanations or debiasing strategies..." 
              className="w-full bg-dark-800 border border-border rounded-xl py-4 pl-4 pr-12 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-blue/50 focus:shadow-[inset_0_0_15px_rgba(59,130,246,0.15),_0_0_10px_rgba(59,130,246,0.2)] transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
