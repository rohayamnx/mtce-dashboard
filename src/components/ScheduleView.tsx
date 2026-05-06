import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { dailyTasks, technicians } from '../utils/data';
import { StatusBadge } from './StatusBadge';
import { DailyTask } from '../types';

export const ScheduleView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<DailyTask[]>(dailyTasks);

  const taskTypeColors = {
    breakdown: 'bg-red-100 text-red-700',
    preventive: 'bg-blue-100 text-blue-700',
    inspection: 'bg-purple-100 text-purple-700',
  };

  const handleStatusChange = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const groupedTasks = technicians.map(tech => ({
    technician: tech,
    tasks: tasks.filter(t => t.assignedTo === tech.id),
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Daily Schedule</h2>
          <p className="text-slate-500 text-sm">Technician task assignments and workload</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-slate-600">Pending</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-slate-600">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {tasks.filter(t => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-slate-600">Completed</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Schedule by Technician */}
      <div className="space-y-4">
        {groupedTasks.map(group => (
          <div key={group.technician.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                    {group.technician.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{group.technician.name}</h4>
                    <p className="text-xs text-slate-500 capitalize">{group.technician.role} • {group.technician.shift} shift</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={group.technician.status} size="sm" />
                  <span className="text-sm text-slate-500">{group.tasks.length} tasks</span>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {group.tasks.length === 0 ? (
                <div className="px-4 py-6 text-center text-slate-400 text-sm">
                  No tasks assigned
                </div>
              ) : (
                group.tasks.map(task => (
                  <div key={task.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${taskTypeColors[task.type]}`}>
                        {task.type}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{task.machineName}</p>
                        <p className="text-xs text-slate-500">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {task.estimatedMinutes}m
                      </div>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as 'pending' | 'in-progress' | 'completed')}
                        className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};