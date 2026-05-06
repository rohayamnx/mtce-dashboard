import { MachineStatus, TicketStatus } from '../types';

export const formatDowntime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const getStatusLabel = (status: MachineStatus): string => {
  const labels: Record<MachineStatus, string> = {
    running: 'Running',
    stopped: 'Stopped',
    maintenance: 'Under Maintenance',
    'waiting-parts': 'Waiting Parts',
    abnormal: 'Abnormal',
  };
  return labels[status];
};

export const getTicketStatusLabel = (status: TicketStatus): string => {
  const labels: Record<TicketStatus, string> = {
    open: 'Open',
    assigned: 'Assigned',
    'in-progress': 'In Progress',
    'waiting-parts': 'Waiting Parts',
    completed: 'Completed',
    closed: 'Closed',
  };
  return labels[status];
};

export const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};