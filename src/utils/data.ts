import { Machine, Ticket, Technician, SparePart, DailyTask, MachineStatus, TicketPriority } from '../types';

export const machines: Machine[] = [
  { id: 'M001', name: 'Welding Robot A1', line: 'Line 1', area: 'Body Shop', status: 'running', downtimeMinutes: 0, lastUpdated: new Date() },
  { id: 'M002', name: 'Press Machine B2', line: 'Line 2', area: 'Stamping', status: 'stopped', currentTicketId: 'T001', assignedTechnician: 'TECH001', downtimeMinutes: 45, lastUpdated: new Date() },
  { id: 'M003', name: 'Paint Booth C1', line: 'Line 3', area: 'Paint Shop', status: 'maintenance', currentTicketId: 'T002', assignedTechnician: 'TECH002', downtimeMinutes: 120, lastUpdated: new Date() },
  { id: 'M004', name: 'Assembly Conveyor D1', line: 'Line 4', area: 'Final Assembly', status: 'waiting-parts', currentTicketId: 'T003', downtimeMinutes: 240, lastUpdated: new Date() },
  { id: 'M005', name: 'CNC Machine E2', line: 'Line 2', area: 'Machining', status: 'abnormal', currentTicketId: 'T004', assignedTechnician: 'TECH001', downtimeMinutes: 30, lastUpdated: new Date() },
  { id: 'M006', name: 'AGV System F1', line: 'Line 1', area: 'Logistics', status: 'running', downtimeMinutes: 0, lastUpdated: new Date() },
  { id: 'M007', name: 'Furnace G1', line: 'Line 3', area: 'Heat Treatment', status: 'running', downtimeMinutes: 0, lastUpdated: new Date() },
  { id: 'M008', name: 'Inspection Cell H2', line: 'Line 4', area: 'Quality', status: 'stopped', currentTicketId: 'T005', assignedTechnician: 'TECH003', downtimeMinutes: 90, lastUpdated: new Date() },
];

export const tickets: Ticket[] = [
  { id: 'T001', machineId: 'M002', machineName: 'Press Machine B2', line: 'Line 2', description: 'Hydraulic leak detected, pressure dropping', priority: 'critical', status: 'in-progress', reportedBy: 'John Smith', assignedTo: 'TECH001', createdAt: new Date(Date.now() - 45 * 60000), updatedAt: new Date(), downtimeMinutes: 45 },
  { id: 'T002', machineId: 'M003', machineName: 'Paint Booth C1', line: 'Line 3', description: 'Scheduled PM - filter replacement', priority: 'medium', status: 'in-progress', reportedBy: 'System', assignedTo: 'TECH002', createdAt: new Date(Date.now() - 120 * 60000), updatedAt: new Date(), downtimeMinutes: 120 },
  { id: 'T003', machineId: 'M004', machineName: 'Assembly Conveyor D1', line: 'Line 4', description: 'Belt snapped, production stopped', priority: 'critical', status: 'waiting-parts', reportedBy: 'Mike Johnson', assignedTo: 'TECH001', createdAt: new Date(Date.now() - 240 * 60000), updatedAt: new Date(), downtimeMinutes: 240, rootCause: 'Belt wear - exceeded service life' },
  { id: 'T004', machineId: 'M005', machineName: 'CNC Machine E2', line: 'Line 2', description: 'Unusual vibration during operation', priority: 'high', status: 'assigned', reportedBy: 'Sarah Lee', assignedTo: 'TECH001', createdAt: new Date(Date.now() - 30 * 60000), updatedAt: new Date(), downtimeMinutes: 30 },
  { id: 'T005', machineId: 'M008', machineName: 'Inspection Cell H2', line: 'Line 4', description: 'Vision system calibration drift', priority: 'high', status: 'assigned', reportedBy: 'Tom Wilson', assignedTo: 'TECH003', createdAt: new Date(Date.now() - 90 * 60000), updatedAt: new Date(), downtimeMinutes: 90 },
];

export const technicians: Technician[] = [
  { id: 'TECH001', name: 'Alex Rivera', role: 'mechanical', shift: 'morning', assignedTickets: ['T001', 'T003', 'T004'], status: 'busy' },
  { id: 'TECH002', name: 'Jordan Chen', role: 'electrical', shift: 'morning', assignedTickets: ['T002'], status: 'busy' },
  { id: 'TECH003', name: 'Sam Martinez', role: 'automation', shift: 'morning', assignedTickets: ['T005'], status: 'busy' },
  { id: 'TECH004', name: 'Casey Thompson', role: 'general', shift: 'afternoon', assignedTickets: [], status: 'available' },
  { id: 'TECH005', name: 'Morgan Williams', role: 'mechanical', shift: 'afternoon', assignedTickets: [], status: 'available' },
];

export const spareParts: SparePart[] = [
  { id: 'P001', name: 'Hydraulic Seal Kit', partNumber: 'HSK-2024', stockQuantity: 8, minStock: 5, location: 'Bin A-12', critical: true },
  { id: 'P002', name: 'Conveyor Belt (5m)', partNumber: 'CB-5000', stockQuantity: 2, minStock: 3, location: 'Bin B-04', critical: true },
  { id: 'P003', name: 'Servo Motor 2kW', partNumber: 'SM-2000', stockQuantity: 1, minStock: 2, location: 'Bin C-01', critical: true },
  { id: 'P004', name: 'Pneumatic Cylinder', partNumber: 'PC-100', stockQuantity: 12, minStock: 5, location: 'Bin A-08', critical: false },
  { id: 'P005', name: 'Bearing Set (SKF)', partNumber: 'BS-SKF', stockQuantity: 0, minStock: 4, location: 'Bin D-02', critical: true },
  { id: 'P006', name: 'Filter Element', partNumber: 'FE-300', stockQuantity: 15, minStock: 10, location: 'Bin A-15', critical: false },
];

export const dailyTasks: DailyTask[] = [
  { id: 'DT001', type: 'breakdown', machineId: 'M002', machineName: 'Press Machine B2', description: 'Repair hydraulic leak', priority: 'critical', estimatedMinutes: 60, status: 'in-progress', assignedTo: 'TECH001' },
  { id: 'DT002', type: 'preventive', machineId: 'M003', machineName: 'Paint Booth C1', description: 'Filter replacement - scheduled PM', priority: 'medium', estimatedMinutes: 45, status: 'in-progress', assignedTo: 'TECH002' },
  { id: 'DT003', type: 'breakdown', machineId: 'M004', machineName: 'Assembly Conveyor D1', description: 'Replace conveyor belt', priority: 'critical', estimatedMinutes: 120, status: 'pending', assignedTo: 'TECH001' },
  { id: 'DT004', type: 'inspection', machineId: 'M001', machineName: 'Welding Robot A1', description: 'Weekly inspection - weld quality check', priority: 'low', estimatedMinutes: 30, status: 'pending', assignedTo: 'TECH004' },
  { id: 'DT005', type: 'preventive', machineId: 'M007', machineName: 'Furnace G1', description: 'Monthly temperature sensor calibration', priority: 'medium', estimatedMinutes: 30, status: 'pending', assignedTo: 'TECH005' },
  { id: 'DT006', type: 'breakdown', machineId: 'M005', machineName: 'CNC Machine E2', description: 'Investigate vibration issue', priority: 'high', estimatedMinutes: 90, status: 'pending', assignedTo: 'TECH001' },
];

export const getStatusColor = (status: MachineStatus): string => {
  const colors: Record<MachineStatus, string> = {
    running: 'bg-emerald-500',
    stopped: 'bg-red-500',
    maintenance: 'bg-amber-500',
    'waiting-parts': 'bg-orange-500',
    abnormal: 'bg-yellow-500',
  };
  return colors[status];
};

export const getPriorityColor = (priority: TicketPriority): string => {
  const colors: Record<TicketPriority, string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-slate-400',
  };
  return colors[priority];
};