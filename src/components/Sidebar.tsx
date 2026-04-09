import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Activity, Settings, ShieldAlert } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Datasets', icon: <Database size={20} />, path: '/datasets' },
    { name: 'Analysis', icon: <Activity size={20} />, path: '/analysis' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen max-w-[250px] glass-panel border-r border-border flex flex-col pt-6 z-20">
      <div className="px-6 mb-12 flex items-center gap-3">
        <ShieldAlert className="text-[var(--neon-primary)]" size={28} />
        <h1 className="font-display font-bold text-2xl tracking-wider text-primary">
          FAIR<span className="text-[var(--neon-primary)]">LENS</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 tour-step-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--neon-primary)]/10 text-[var(--neon-primary)] border border-[var(--neon-primary)]/20 shadow-[inset_0_0_10px_rgba(var(--neon-primary),0.2)]'
                  : 'text-tertiary hover:text-primary hover:bg-dark-700/50'
              }`
            }
          >
            {item.icon}
            <span className="font-medium tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <div className="text-xs text-tertiary font-display">SYSTEM STATUS</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-[var(--neon-primary)] animate-pulse"></div>
          <span className="text-sm text-secondary">AI Engine Online</span>
        </div>
      </div>
    </div>
  );
};
