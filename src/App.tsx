import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { TicketsView } from './components/TicketsView';
import { ScheduleView } from './components/ScheduleView';
import { TeamView } from './components/TeamView';
import { InventoryView } from './components/InventoryView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <TicketsView />;
      case 'schedule':
        return <ScheduleView />;
      case 'team':
        return <TeamView />;
      case 'inventory':
        return <InventoryView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;