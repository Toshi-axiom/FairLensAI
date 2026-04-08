import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { ShieldAlert, Mail, Lock, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import zxcvbn from 'zxcvbn';
import { useAuth } from '../contexts/AuthContext';

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(!location.state?.isSignup);
  const [authError, setAuthError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const passwordScore = zxcvbn(password).score; // 0 to 4
  const getStrengthMeta = () => {
    switch (passwordScore) {
      case 0: return { label: 'Very Weak', color: 'bg-red-500' };
      case 1: return { label: 'Weak', color: 'bg-orange-500' };
      case 2: return { label: 'Fair', color: 'bg-yellow-500' };
      case 3: return { label: 'Good', color: 'bg-neon-blue' };
      case 4: return { label: 'Strong', color: 'bg-neon-cyan' };
      default: return { label: '', color: 'bg-dark-700' };
    }
  };

  const meta = getStrengthMeta();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Validate generic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAuthError('Please enter a valid email format.');
      return;
    }
    
    let mockUsers: Record<string, any> = {};
    try { 
      mockUsers = JSON.parse(localStorage.getItem('fairlens-mock-users') || '{}'); 
    } catch(e) {}

    if (!isLogin) {
      if (mockUsers[email]) {
        setAuthError('User already exists. Please log in.');
        return;
      }
      mockUsers[email] = { name, email, password };
      localStorage.setItem('fairlens-mock-users', JSON.stringify(mockUsers));
      login(name, email);
    } else {
      if (!mockUsers[email]) {
        setAuthError('User does not exist. Please create an account.');
        return;
      }
      if (mockUsers[email].password !== password) {
        setAuthError('Incorrect password.');
        return;
      }
      login(mockUsers[email].name, email);
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-primary w-screen">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon-violet/20 rounded-full blur-[150px] pointer-events-none animate-blob z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-neon-cyan/20 rounded-full blur-[150px] pointer-events-none animate-blob z-0" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 px-6"
      >
        <div className="flex flex-col items-center mb-8">
          <ShieldAlert size={48} className="text-neon-cyan mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          <h2 className="text-3xl font-display font-bold tracking-wider">
            FAIR<span className="text-neon-cyan">LENS</span>
          </h2>
          <p className="text-secondary mt-2 text-sm text-center">Secure Authentication System</p>
        </div>

        <GlassCard accent={isLogin ? "cyan" : "violet"} className="p-8 relative z-10 bg-dark-900/50 backdrop-blur-xl">
          {authError && (
             <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg py-3 px-4 flex items-center gap-3">
               <ShieldAlert size={18} className="text-red-400 shrink-0" />
               <p className="text-sm font-medium text-red-200">{authError}</p>
             </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4 mb-6">
              <button 
                type="button" 
                onClick={() => navigate('/dashboard')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-dark-800 hover:bg-dark-700 transition-colors"
              >
                <FcGoogle size={18} />
                <span className="text-sm font-medium text-primary">Google</span>
              </button>
            </div>
            
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-tertiary text-xs uppercase font-display tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            {!isLogin && (
               <div className="space-y-1">
                <label className="text-xs font-display text-secondary pl-1 uppercase">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-800 border border-border rounded-lg py-3 pl-10 pr-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-violet/50 focus:shadow-[inset_0_0_10px_rgba(139,92,246,0.1),_0_0_10px_rgba(139,92,246,0.2)] transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-display text-secondary pl-1 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-800 border border-border rounded-lg py-3 pl-10 pr-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[inset_0_0_10px_rgba(34,211,238,0.1),_0_0_10px_rgba(34,211,238,0.2)] transition-all" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-display text-secondary pl-1 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-800 border border-border rounded-lg py-3 pl-10 pr-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[inset_0_0_10px_rgba(34,211,238,0.1),_0_0_10px_rgba(34,211,238,0.2)] transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {!isLogin && password.length > 0 && (
              <div className="space-y-2 mt-2 fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-tertiary font-display">Password Strength</span>
                  <span className={passwordScore > 2 ? 'text-neon-cyan' : 'text-tertiary'}>{meta.label}</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full">
                  {[0, 1, 2, 3].map((level) => (
                    <div 
                      key={level} 
                      className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                        passwordScore > level ? meta.color : 'bg-dark-700/30'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            )}

            <NeonButton 
              type="submit" 
              variant={isLogin ? "cyan" : "violet"} 
              label={isLogin ? 'Initialize Session' : 'Create Access Token'} 
              className="w-full mt-6"
            />
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-tertiary hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Request access" : "Already have a token? Initialize session"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
