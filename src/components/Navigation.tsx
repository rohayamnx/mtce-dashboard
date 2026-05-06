import React from 'react';
import { LayoutDashboard, ClipboardList, Users, Package, Calendar, Settings } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all text-left
      ${active 
        ? 'bg-blue-50 text-blue-700 font-medium' 
        : 'text-slate-600 hover:bg-slate-100'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'tickets', icon: <ClipboardList className="w-5 h-5" />, label: 'E-Tickets' },
    { id: 'schedule', icon: <Calendar className="w-5 h-5" />, label: 'Schedule' },
    { id: 'team', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { id: 'inventory', icon: <Package className="w-5 h-5" />, label: 'Inventory' },
  ];

  return (
    <nav className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          MaintainX
        </h1>
        <p className="text-xs text-slate-400 mt-1">Production Maintenance</p>
      </div>
      
      <div className="space-y-1 flex-1">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-200">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-medium text-slate-500 mb-1">Current Shift</p>
          <p className="text-sm font-semibold text-slate-700">Morning Shift</p>
          <p className="text-xs text-slate-400">06:00 - 14:00</p>
        </div>
      </div>
    </nav>
  );
};