import React, { useState } from 'react';
import { X, Camera, AlertCircle } from 'lucide-react';
import { machines } from '../utils/data';
import { TicketPriority } from '../types';

interface TicketFormProps {
  onSubmit: (ticket: {
    machineId: string;
    description: string;
    priority: TicketPriority;
  }) => void;
  onClose: () => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, onClose }) => {
  const [machineId, setMachineId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (machineId && description) {
      onSubmit({ machineId, description, priority });
    }
  };

  const priorityButtons: { value: TicketPriority; label: string; color: string }[] = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500 hover:bg-red-600' },
    { value: 'high', label: 'High', color: 'bg-orange-500 hover:bg-orange-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { value: 'low', label: 'Low', color: 'bg-slate-400 hover:bg-slate-500' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">New Repair Request</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Machine</label>
            <select
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700"
              required
            >
              <option value="">Select machine...</option>
              {machines.map(machine => (
                <option key={machine.id} value={machine.id}>
                  {machine.name} - {machine.area}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Problem Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700 resize-none"
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
            <div className="grid grid-cols-4 gap-2">
              {priorityButtons.map(btn => (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => setPriority(btn.value)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all
                    ${priority === btn.value 
                      ? btn.color + ' text-white ring-2 ring-offset-2 ring-slate-400' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Add Photo (optional)</span>
            </button>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};