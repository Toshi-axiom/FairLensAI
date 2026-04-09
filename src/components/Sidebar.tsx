import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Activity, Settings, ShieldAlert, X } from 'lucide-react';

export const Sidebar = ({ mobileMenuOpen, closeMenu }: { mobileMenuOpen?: boolean; closeMenu?: () => void }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Datasets', icon: <Database size={20} />, path: '/datasets' },
    { name: 'Analysis', icon: <Activity size={20} />, path: '/analysis' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 h-screen max-w-[250px] glass-panel border-r border-border flex flex-col pt-6 z-50 bg-dark-900/95 md:bg-transparent`}>
      <div className="px-6 mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-[var(--neon-primary)]" size={28} />
          <h1 className="font-display font-bold text-2xl tracking-wider text-primary">
            FAIR<span className="text-[var(--neon-primary)]">LENS</span>
          </h1>
        </div>
        {closeMenu && (
          <button onClick={closeMenu} className="md:hidden text-tertiary hover:text-primary transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 tour-step-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
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
