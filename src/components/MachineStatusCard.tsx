import React from 'react';
import { Clock, Wrench, Package, AlertTriangle } from 'lucide-react';
import { Machine } from '../types';
import { getStatusColor } from '../utils/data';
import { formatDowntime } from '../utils/helpers';
import { StatusBadge } from './StatusBadge';

interface MachineStatusCardProps {
  machine: Machine;
  onClick?: () => void;
}

export const MachineStatusCard: React.FC<MachineStatusCardProps> = ({ machine, onClick }) => {
  const isProblematic = machine.status !== 'running';
  
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-200 cursor-pointer
        ${isProblematic 
          ? 'border-slate-300 bg-white shadow-md hover:shadow-lg hover:border-slate-400' 
          : 'border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md'
        }`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(machine.status)}`} />
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">{machine.name}</h3>
          <p className="text-sm text-slate-500">{machine.area} • {machine.line}</p>
        </div>
        <StatusBadge status={machine.status} size="sm" />
      </div>
      
      {isProblematic && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">{formatDowntime(machine.downtimeMinutes)}</span>
          </div>
          
          {machine.assignedTechnician && (
            <div className="flex items-center gap-1.5 text-sm">
              <Wrench className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{machine.assignedTechnician}</span>
            </div>
          )}
          
          {machine.status === 'waiting-parts' && (
            <div className="flex items-center gap-1.5 text-sm">
              <Package className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 font-medium">Parts needed</span>
            </div>
          )}
        </div>
      )}
      
      {machine.status === 'stopped' && (
        <div className="absolute top-2 right-2">
          <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};