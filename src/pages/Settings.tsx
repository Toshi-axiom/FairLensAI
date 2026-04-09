import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Shield, Moon, Key, Smartphone, User, Bell } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';
import { useTheme } from '../contexts/ThemeContext';
import type { AccentColor } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const { theme, toggleTheme, accent, setAccent } = useTheme();
  const darkMode = theme === 'dark';
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Security');

  const tabs = [
    { name: 'Security', icon: Shield },
    { name: 'Appearance', icon: Moon },
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow">System Configuration</h2>
        <p className="text-secondary font-light">Manage your organizational structure, security, and appearance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <GlassCard accent="none" className="md:col-span-1 p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === tab.name
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                    : 'text-secondary hover:bg-dark-800/50 hover:text-primary'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.name ? "text-neon-cyan" : "text-tertiary"} />
                {tab.name}
              </button>
            ))}
          </nav>
        </GlassCard>

        <div className="md:col-span-3 space-y-6 fade-in">
          {activeTab === 'Security' && (
            <>
              <GlassCard accent="blue" className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-neon-blue/10 rounded-lg shrink-0">
                    <Key className="text-neon-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-primary">Access Control</h3>
                    <p className="text-sm text-secondary">Update your session keys and password lifecycle.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <input type="password" placeholder="Current Password" className="w-full bg-dark-800 border border-border rounded-lg py-3 px-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[inset_0_0_10px_rgba(34,211,238,0.1)] transition-all" />
                  <input type="password" placeholder="New Password" className="w-full bg-dark-800 border border-border rounded-lg py-3 px-4 text-sm text-primary placeholder-tertiary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[inset_0_0_10px_rgba(34,211,238,0.1)] transition-all" />
                  <div className="pt-2">
                    <NeonButton label="Update Credentials" variant="cyan" className="py-2" />
                  </div>
                </div>
              </GlassCard>

              <GlassCard accent="none" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-neon-violet/10 rounded-lg shrink-0">
                      <Smartphone className="text-neon-violet" size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">Two-Factor Authentication</h3>
                      <p className="text-sm text-secondary">Require a hardware token or authenticator app.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${twoFactorEnabled ? 'bg-neon-cyan' : 'bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </GlassCard>
            </>
          )}

          {activeTab === 'Appearance' && (
            <div className="space-y-6">
            <GlassCard accent="violet" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-violet/10 rounded-lg shrink-0">
                    <Moon className="text-neon-violet" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-primary">Dark Theme Mode</h3>
                    <p className="text-sm text-secondary">Switch between Light / Dark UI profiles.</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${darkMode ? 'bg-neon-violet' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </GlassCard>

            <GlassCard accent="cyan" className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">System Accent Color</h3>
                  <p className="text-sm text-secondary">Choose the global highlight color for the FairLens engine.</p>
                </div>
                <div className="flex gap-4">
                  {(['cyan', 'violet', 'blue', 'emerald'] as AccentColor[]).map(color => (
                    <button
                      key={color}
                      onClick={() => setAccent(color)}
                      className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center
                        ${color === 'cyan' ? 'bg-[#0891B2] dark:bg-[#22D3EE]' : ''}
                        ${color === 'violet' ? 'bg-[#7C3AED] dark:bg-[#8B5CF6]' : ''}
                        ${color === 'blue' ? 'bg-[#2563EB] dark:bg-[#3B82F6]' : ''}
                        ${color === 'emerald' ? 'bg-[#10B981] dark:bg-[#34D399]' : ''}
                        ${accent === color ? 'scale-110 shadow-[0_0_20px_currentColor] border-2 border-white' : 'opacity-50 hover:opacity-100'}
                      `}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>
            </div>
          )}

          {activeTab === 'Profile' && (
            <GlassCard accent="cyan" className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-cyan/10 rounded-lg shrink-0">
                  <User className="text-neon-cyan" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">Personal Profile</h3>
                  <p className="text-sm text-secondary">Manage your identity and team roles.</p>
                </div>
              </div>
              <div className="space-y-4">
                <input type="text" defaultValue={user?.name} className="w-full bg-dark-800 border border-border rounded-lg py-3 px-4 text-sm text-primary focus:outline-none focus:border-neon-cyan/50 transition-all" />
                <input type="email" defaultValue={user?.email} className="w-full bg-dark-800 border border-border rounded-lg py-3 px-4 text-sm text-primary focus:outline-none focus:border-neon-cyan/50 transition-all" />
                <div className="pt-2">
                  <NeonButton label="Save Changes" variant="blue" className="py-2" />
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === 'Notifications' && (
            <GlassCard accent="blue" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-blue/10 rounded-lg shrink-0">
                    <Bell className="text-neon-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-primary">System Alerts</h3>
                    <p className="text-sm text-secondary">Receive daily anomaly reports.</p>
                  </div>
                </div>
                <button className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors bg-neon-blue`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`} />
                </button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
