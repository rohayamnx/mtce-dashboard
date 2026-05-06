import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, User, AlertTriangle } from 'lucide-react';
import { TicketCard } from './TicketCard';
import { TicketForm } from './TicketForm';
import { tickets as initialTickets } from '../utils/data';
import { Ticket, TicketPriority, TicketStatus } from '../types';

export const TicketsView: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleNewTicket = (ticketData: { machineId: string; description: string; priority: TicketPriority }) => {
    // For simplicity, creating a basic ticket
    const newTicket: Ticket = {
      id: `T${String(tickets.length + 1).padStart(3, '0')}`,
      machineId: ticketData.machineId,
      machineName: 'Selected Machine',
      line: 'Line 1',
      description: ticketData.description,
      priority: ticketData.priority,
      status: 'open',
      reportedBy: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date(),
      downtimeMinutes: 0,
    };
    setTickets([newTicket, ...tickets]);
    setShowForm(false);
  };

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    waitingParts: tickets.filter(t => t.status === 'waiting-parts').length,
    completed: tickets.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">E-Tickets</h2>
          <p className="text-slate-500 text-sm">Repair request management and tracking</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Ticket</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Open</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.open}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Waiting Parts</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.waitingParts}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Completed</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-2 flex-1 min-w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm border-none focus:outline-none text-slate-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="waiting-parts">Waiting Parts</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">No tickets found</p>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TicketForm 
          onSubmit={handleNewTicket}
          onClose={() => setShowForm(false)} 
        />
      )}
    </div>
  );
};