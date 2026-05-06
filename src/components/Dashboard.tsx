import React, { useState } from 'react';
import { Plus, Filter, RefreshCw } from 'lucide-react';
import { DashboardStats } from './DashboardStats';
import { MachineStatusCard } from './MachineStatusCard';
import { TicketCard } from './TicketCard';
import { TicketForm } from './TicketForm';
import { machines, tickets } from '../utils/data';
import { TicketPriority } from '../types';

export const Dashboard: React.FC = () => {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [filterArea, setFilterArea] = useState<string>('all');
  const [ticketList, setTicketList] = useState(tickets);

  const areas = ['all', ...new Set(machines.map(m => m.area))];
  
  const filteredMachines = filterArea === 'all' 
    ? machines 
    : machines.filter(m => m.area === filterArea);

  const criticalTickets = ticketList.filter(t => t.priority === 'critical');
  const activeTickets = ticketList.filter(t => t.status !== 'completed' && t.status !== 'closed');

  const handleNewTicket = (ticketData: { machineId: string; description: string; priority: TicketPriority }) => {
    const machine = machines.find(m => m.id === ticketData.machineId);
    if (!machine) return;
    
    const newTicket = {
      id: `T${String(ticketList.length + 1).padStart(3, '0')}`,
      machineId: ticketData.machineId,
      machineName: machine.name,
      line: machine.line,
      description: ticketData.description,
      priority: ticketData.priority,
      status: 'open' as const,
      reportedBy: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date(),
      downtimeMinutes: 0,
    };
    
    setTicketList([newTicket, ...ticketList]);
    setShowTicketForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Production Dashboard</h2>
          <p className="text-slate-500 text-sm">Real-time machine status and maintenance overview</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
          <button 
            onClick={() => setShowTicketForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Ticket</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Critical Alerts */}
      {criticalTickets.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Critical Alerts - Immediate Attention Required
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criticalTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} compact />
            ))}
          </div>
        </div>
      )}

      {/* Machine Status Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Machine Status</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {areas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Areas' : area}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMachines.map(machine => (
            <MachineStatusCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>

      {/* Active Tickets */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Active Tickets ({activeTickets.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTickets.slice(0, 6).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketForm 
          onSubmit={handleNewTicket}
          onClose={() => setShowTicketForm(false)} 
        />
      )}
    </div>
  );
};