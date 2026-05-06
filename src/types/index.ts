export type MachineStatus = 'running' | 'stopped' | 'maintenance' | 'waiting-parts' | 'abnormal';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
export type TicketStatus = 'open' | 'assigned' | 'in-progress' | 'waiting-parts' | 'completed' | 'closed';
export type TechnicianRole = 'mechanical' | 'electrical' | 'automation' | 'general';

export interface Machine {
  id: string;
  name: string;
  line: string;
  area: string;
  status: MachineStatus;
  currentTicketId?: string;
  assignedTechnician?: string;
  downtimeMinutes: number;
  lastUpdated: Date;
}

export interface Ticket {
  id: string;
  machineId: string;
  machineName: string;
  line: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  reportedBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  downtimeMinutes: number;
  rootCause?: string;
  actionTaken?: string;
}

export interface Technician {
  id: string;
  name: string;
  role: TechnicianRole;
  shift: 'morning' | 'afternoon' | 'night';
  assignedTickets: string[];
  status: 'available' | 'busy' | 'on-break';
}

export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  stockQuantity: number;
  minStock: number;
  location: string;
  critical: boolean;
}

export interface DailyTask {
  id: string;
  type: 'breakdown' | 'preventive' | 'inspection';
  machineId: string;
  machineName: string;
  description: string;
  priority: TicketPriority;
  estimatedMinutes: number;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}