import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { useAssistant } from '../contexts/AssistantContext';

export const GlobalAssistant = () => {
  const { isOpen, closeAssistant } = useAssistant();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "I've detected a significant disparate impact related to gender in the latest model based on the zip_code feature. Would you like me to suggest re-weighing strategies?" },
    { role: 'user', text: "Show me the proxy variables." },
    { role: 'assistant', text: "The primary proxy variable is zip_code. Because historical redlining affects geographic distribution, using zip code introduces indirect bias. I recommend dropping this column or applying a fairness-aware adversarial debiasing technique." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I am analyzing your model request..." }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={closeAssistant}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-dark-900 border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0 bg-dark-800/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-neon-primary/20 flex items-center justify-center border border-neon-primary/50 shadow-[0_0_15px_var(--neon-primary)]">
                    <Bot className="text-neon-primary drop-shadow-[0_0_5px_currentColor]" size={24} />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-900 shadow-[0_0_10px_#34d399]"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">FairLens Assistant</h3>
                  <p className="text-xs text-neon-primary tracking-widest uppercase font-semibold">Online Engine</p>
                </div>
              </div>
              <button 
                onClick={closeAssistant}
                className="p-2 rounded-lg text-tertiary hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                  <div className={`max-w-[85%] border rounded-2xl p-4 shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-neon-primary/10 border-neon-primary/30 rounded-tr-sm shadow-[0_4px_20px_rgba(var(--neon-primary),0.15)]' 
                      : 'bg-dark-800 border-border rounded-tl-sm'
                  }`}>
                    <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-primary' : 'text-secondary'}`}>
                      {msg.role === 'assistant' && msg.text.includes('zip_code') ? (
                        <span dangerouslySetInnerHTML={{__html: msg.text.replace(/zip_code/g, '<span class="font-mono text-neon-violet px-1 py-0.5 bg-dark-700 rounded border border-white/5">zip_code</span>')}} />
                      ) : msg.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-dark-800/30 backdrop-blur-md shrink-0">
              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask for debiasing strategies..." 
                  className="w-full bg-dark-800 border border-border rounded-xl py-4 pl-4 pr-12 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-primary/50 focus:shadow-[inset_0_0_15px_rgba(var(--neon-primary),0.15),_0_0_10px_rgba(var(--neon-primary),0.2)] transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-neon-primary transition-colors hover:bg-neon-primary/10 rounded-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
