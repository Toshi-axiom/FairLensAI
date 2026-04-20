import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, Settings as SettingsIcon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const TopBar = ({ toggleMobileMenu }: { toggleMobileMenu?: () => void }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <AnimatePresence>
        {(showProfile || showNotifications) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-dark-900/40 backdrop-blur-md cursor-pointer"
            onClick={() => {
              setShowProfile(false);
              setShowNotifications(false);
            }}
          />
        )}
      </AnimatePresence>
      <div className="h-20 border-b border-border bg-dark-900/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 relative z-40">
      <div className="flex items-center gap-4 flex-1 md:flex-none md:w-96 relative group mr-4">
        {toggleMobileMenu && (
          <button onClick={toggleMobileMenu} className="md:hidden text-tertiary hover:text-primary transition-colors shrink-0">
            <Menu size={24} />
          </button>
        )}
        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary group-focus-within:text-[var(--neon-primary)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search models, dataset definitions, or anomalies..."
            className="w-full bg-dark-800/50 flex-1 border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-[var(--neon-primary)]/50 focus:shadow-[inset_0_0_10px_rgba(var(--neon-primary),0.1),_0_0_10px_rgba(var(--neon-primary),0.2)] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-secondary hover:text-primary transition-colors"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-violet rounded-full border border-dark-900 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-[-10px] sm:right-0 mt-4 w-[90vw] sm:w-80 bg-dark-800/40 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-display font-semibold text-primary">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-dark-800/50 cursor-pointer border-b border-border/50 transition-colors">
                    <p className="text-sm text-primary mb-1">New Anomaly Detected</p>
                    <p className="text-xs text-tertiary">Disparate impact found in 'CreditScore_V2'.</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-dark-800/50 cursor-pointer transition-colors">
                    <p className="text-sm text-primary mb-1">Weekly Report Ready</p>
                    <p className="text-xs text-tertiary">Global fairness index improved by 1.2%.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-6 border-l border-border hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-blue to-neon-violet flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block text-sm font-medium text-primary">{user?.name}</div>
            <ChevronDown size={14} className="hidden md:block text-tertiary" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-[-10px] sm:right-0 mt-4 w-48 bg-dark-800/40 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-border mb-2">
                  <p className="text-sm font-medium text-primary">{user?.name}</p>
                  <p className="text-xs text-tertiary">{user?.email}</p>
                </div>
                <button 
                  onClick={() => { setShowProfile(false); navigate('/settings'); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-dark-800/50 transition-colors"
                >
                  <SettingsIcon size={16} />
                  Preferences
                </button>
                <button 
                  onClick={() => { setShowProfile(false); logout(); navigate('/auth'); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors mt-1"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </>
  );
};
