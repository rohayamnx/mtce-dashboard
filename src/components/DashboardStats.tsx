import React from 'react';
import { AlertTriangle, Clock, CheckCircle, Package, TrendingDown, Users } from 'lucide-react';
import { machines, tickets, spareParts, technicians } from '../utils/data';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  bgColor: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend, trendValue, bgColor, iconBg }) => (
  <div className={`${bgColor} rounded-xl p-5 shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        {trend && trendValue && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium
            ${trend === 'down' ? 'text-emerald-600' : trend === 'up' ? 'text-red-600' : 'text-slate-500'}`}
          >
            <TrendingDown className={`w-3 h-3 ${trend === 'up' ? 'rotate-180' : ''}`} />
            {trendValue}
          </div>
        )}
      </div>
      <div className={`${iconBg} p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  const stoppedMachines = machines.filter(m => m.status === 'stopped' || m.status === 'waiting-parts').length;
  const totalDowntime = machines.reduce((sum, m) => sum + m.downtimeMinutes, 0);
  const openTickets = tickets.filter(t => t.status !== 'completed' && t.status !== 'closed').length;
  const criticalTickets = tickets.filter(t => t.priority === 'critical').length;
  const lowStockParts = spareParts.filter(p => p.stockQuantity <= p.minStock).length;
  const availableTechs = technicians.filter(t => t.status === 'available').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        title="Machines Down"
        value={stoppedMachines}
        subtitle="of 8 total"
        icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
        bgColor="bg-red-50"
        iconBg="bg-red-100"
        trend="up"
        trendValue="+2 from yesterday"
      />
      
      <StatCard
        title="Total Downtime"
        value={`${Math.floor(totalDowntime / 60)}h`}
        subtitle={`${totalDowntime % 60}m today`}
        icon={<Clock className="w-6 h-6 text-amber-600" />}
        bgColor="bg-amber-50"
        iconBg="bg-amber-100"
      />
      
      <StatCard
        title="Open Tickets"
        value={openTickets}
        subtitle={`${criticalTickets} critical`}
        icon={<CheckCircle className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
        iconBg="bg-blue-100"
      />
      
      <StatCard
        title="Low Stock"
        value={lowStockParts}
        subtitle="parts below min"
        icon={<Package className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
        iconBg="bg-orange-100"
        trend="up"
        trendValue="2 critical"
      />
      
      <StatCard
        title="Technicians"
        value={`${availableTechs}/${technicians.length}`}
        subtitle="available"
        icon={<Users className="w-6 h-6 text-emerald-600" />}
        bgColor="bg-emerald-50"
        iconBg="bg-emerald-100"
      />
      
      <StatCard
        title="Avg Response"
        value="18m"
        subtitle="target: 15m"
        icon={<TrendingDown className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
        iconBg="bg-purple-100"
        trend="down"
        trendValue="3m faster"
      />
    </div>
  );
};