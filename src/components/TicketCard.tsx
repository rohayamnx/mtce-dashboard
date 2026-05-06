import React from 'react';
import { Clock, User } from 'lucide-react';
import { Ticket } from '../types';
import { getPriorityColor } from '../utils/data';
import { formatDowntime, formatTime, getInitials } from '../utils/helpers';
import { StatusBadge } from './StatusBadge';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
  compact?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick, compact = false }) => {
  const priorityStyles = {
    critical: 'border-l-4 border-l-red-500',
    high: 'border-l-4 border-l-orange-500',
    medium: 'border-l-4 border-l-yellow-500',
    low: 'border-l-4 border-l-slate-300',
  };

  if (compact) {
    return (
      <div 
        onClick={onClick}
        className={`bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all cursor-pointer ${priorityStyles[ticket.priority]}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400">{ticket.id}</span>
          <div className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.toUpperCase()}
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700 truncate">{ticket.machineName}</p>
        <p className="text-xs text-slate-500 truncate mt-1">{ticket.description}</p>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${priorityStyles[ticket.priority]}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400">{ticket.id}</span>
              <StatusBadge status={ticket.status} size="sm" />
            </div>
            <h4 className="font-semibold text-slate-800">{ticket.machineName}</h4>
            <p className="text-sm text-slate-500">{ticket.line}</p>
          </div>
          <div className={`px-2.5 py-1 rounded text-xs font-bold text-white ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.toUpperCase()}
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-4">{ticket.description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700">{formatDowntime(ticket.downtimeMinutes)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{ticket.assignedTo ? getInitials(ticket.assignedTo) : 'Unassigned'}</span>
            </div>
          </div>
          <span className="text-xs text-slate-400">{formatTime(ticket.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};