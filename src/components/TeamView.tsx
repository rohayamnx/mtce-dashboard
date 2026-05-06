import React, { useState } from 'react';
import { Search, Users as UsersIcon } from 'lucide-react';
import { TechnicianCard } from './TechnicianCard';
import { technicians } from '../utils/data';
import { Technician, TechnicianRole } from '../types';

export const TeamView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<TechnicianRole | 'all'>('all');
  const [team] = useState<Technician[]>(technicians);

  const filteredTeam = team.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || tech.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    available: team.filter(t => t.status === 'available').length,
    busy: team.filter(t => t.status === 'busy').length,
    total: team.length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Team</h2>
          <p className="text-slate-500 text-sm">Technician availability and workload management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-700">Available</span>
          </div>
          <p className="text-2xl font-bold text-emerald-800">{stats.available}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">Busy</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{stats.busy}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Total Team</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-2 flex-1 min-w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search technicians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm border-none focus:outline-none text-slate-700"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as TechnicianRole | 'all')}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="automation">Automation</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map(tech => (
          <TechnicianCard key={tech.id} technician={tech} />
        ))}
      </div>
    </div>
  );
};