import React, { useState } from 'react';
import { Search, Package, AlertTriangle, Plus } from 'lucide-react';
import { SparePartCard } from './SparePartCard';
import { spareParts } from '../utils/data';
import { SparePart } from '../types';

export const InventoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [parts, setParts] = useState<SparePart[]>(spareParts);

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          part.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCritical = !showCriticalOnly || part.critical;
    return matchesSearch && matchesCritical;
  });

  const stats = {
    total: parts.length,
    lowStock: parts.filter(p => p.stockQuantity <= p.minStock).length,
    outOfStock: parts.filter(p => p.stockQuantity === 0).length,
    critical: parts.filter(p => p.critical).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory</h2>
          <p className="text-slate-500 text-sm">Spare parts stock management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Part</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-slate-600">Total Parts</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{stats.lowStock}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-red-800">{stats.outOfStock}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">Critical Parts</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{stats.critical}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-2 flex-1 min-w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm border-none focus:outline-none text-slate-700"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCriticalOnly}
            onChange={(e) => setShowCriticalOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">Critical parts only</span>
        </label>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParts.map(part => (
          <SparePartCard key={part.id} part={part} />
        ))}
      </div>
    </div>
  );
};