import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Technician } from '../types';
import { StatusBadge } from './StatusBadge';
import { getInitials } from '../utils/helpers';

interface TechnicianCardProps {
  technician: Technician;
  onClick?: () => void;
}

export const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician, onClick }) => {
  const roleColors: Record<string, string> = {
    mechanical: 'bg-blue-100 text-blue-700',
    electrical: 'bg-amber-100 text-amber-700',
    automation: 'bg-purple-100 text-purple-700',
    general: 'bg-slate-100 text-slate-700',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
          {getInitials(technician.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-slate-800 truncate">{technician.name}</h4>
            <StatusBadge status={technician.status} size="sm" />
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleColors[technician.role]}`}>
              {technician.role.charAt(0).toUpperCase() + technician.role.slice(1)}
            </span>
            <span className="text-xs text-slate-400 capitalize">{technician.shift} shift</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-slate-700">{technician.assignedTickets.length} active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};