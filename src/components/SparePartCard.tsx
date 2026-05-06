import React from 'react';
import { AlertTriangle, Package, MapPin } from 'lucide-react';
import { SparePart } from '../types';

interface SparePartCardProps {
  part: SparePart;
  onClick?: () => void;
}

export const SparePartCard: React.FC<SparePartCardProps> = ({ part, onClick }) => {
  const isLowStock = part.stockQuantity <= part.minStock;
  const isOutOfStock = part.stockQuantity === 0;

  return (
    <div 
      onClick={onClick}
      className={`rounded-lg p-4 transition-all cursor-pointer border-2
        ${isOutOfStock 
          ? 'bg-red-50 border-red-200 hover:border-red-300' 
          : isLowStock 
            ? 'bg-orange-50 border-orange-200 hover:border-orange-300'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-slate-800">{part.name}</h4>
          <p className="text-xs font-mono text-slate-400">{part.partNumber}</p>
        </div>
        {part.critical && (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Critical</span>
        )}
      </div>
      
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-1.5">
            <span className={`text-lg font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-slate-700'}`}>
              {part.stockQuantity}
            </span>
            <span className="text-sm text-slate-400">/ {part.minStock} min</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{part.location}</span>
        </div>
      </div>
      
      {(isLowStock || isOutOfStock) && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-200">
          <AlertTriangle className={`w-4 h-4 ${isOutOfStock ? 'text-red-500' : 'text-orange-500'}`} />
          <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-orange-600'}`}>
            {isOutOfStock ? 'Out of stock - reorder required' : 'Below minimum stock'}
          </span>
        </div>
      )}
    </div>
  );
};