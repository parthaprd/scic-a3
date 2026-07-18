'use client';

import React, { useState } from 'react';
import { TaskFiltersState } from '../../types';
import { Filter, X, Calendar, ArrowUpDown } from 'lucide-react';
import Button from '../common/Button';

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onFiltersChange: (filters: TaskFiltersState) => void;
  onApply: () => void;
  onClear: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  onApply,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Education', 'Other'];
  const priorities = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: '⚪ Low' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'high', label: '🔴 High' },
  ];
  const statuses = [
    { value: 'todo', label: 'Todo' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleCheckboxChange = (field: 'category' | 'status', value: string) => {
    const currentValues = filters[field];
    let newValues: string[];

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    onFiltersChange({ ...filters, [field]: newValues });
  };

  const handleFieldChange = (field: keyof TaskFiltersState, value: any) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const filterContent = (
    <div className="space-y-6 font-mono text-[#111827]">
      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-[#626A67]/20 pb-1">
          📁 Categories
        </h4>
        <div className="space-y-1.5 pt-1">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckboxChange('category', cat)}
                className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5"
              />
              <span className="font-medium">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-[#626A67]/20 pb-1">
          ⭐ Priority
        </h4>
        <div className="space-y-1.5 pt-1">
          {priorities.map((prio) => (
            <label key={prio.value} className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="radio"
                name="priority"
                value={prio.value}
                checked={filters.priority === prio.value}
                onChange={() => handleFieldChange('priority', prio.value)}
                className="border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5"
              />
              <span className="font-medium">{prio.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-[#626A67]/20 pb-1">
          🔄 Status
        </h4>
        <div className="space-y-1.5 pt-1">
          {statuses.map((stat) => (
            <label key={stat.value} className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.status.includes(stat.value)}
                onChange={() => handleCheckboxChange('status', stat.value)}
                className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5"
              />
              <span className="font-medium">{stat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Due Date Range */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-[#626A67]/20 pb-1">
          📅 Due Date Range
        </h4>
        <div className="space-y-2 pt-1 font-sans">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Start Date</label>
            <input
              type="date"
              value={filters.dueDateStart}
              onChange={(e) => handleFieldChange('dueDateStart', e.target.value)}
              className="w-full px-3 py-1.5 border-2 border-[#626A67] rounded bg-white text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">End Date</label>
            <input
              type="date"
              value={filters.dueDateEnd}
              onChange={(e) => handleFieldChange('dueDateEnd', e.target.value)}
              className="w-full px-3 py-1.5 border-2 border-[#626A67] rounded bg-white text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-[#626A67]/20 pb-1">
          Sort By
        </h4>
        <div className="space-y-2 pt-1">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFieldChange('sortBy', e.target.value)}
            className="w-full px-2 py-1.5 border-2 border-[#626A67] rounded bg-white text-xs font-bold font-mono focus:outline-none"
          >
            <option value="dueDate">📅 Due Date</option>
            <option value="priority">⭐ Priority</option>
            <option value="createdAt">⏳ Created Date</option>
            <option value="title">📝 Title (A-Z)</option>
          </select>
          
          <select
            value={filters.order}
            onChange={(e) => handleFieldChange('order', e.target.value as 'asc' | 'desc')}
            className="w-full px-2 py-1.5 border-2 border-[#626A67] rounded bg-white text-xs font-bold font-mono focus:outline-none"
          >
            <option value="asc">Ascending &uarr;</option>
            <option value="desc">Descending &darr;</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-4">
        <Button variant="primary" size="sm" onClick={() => { onApply(); setIsOpen(false); }} className="w-full">
          Apply Filters
        </Button>
        <Button variant="outline" size="sm" onClick={() => { onClear(); setIsOpen(false); }} className="w-full bg-[#ffffff]">
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-full bg-[#F4F0E8] border-2 border-[#626A67] p-5 rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
        <div className="flex items-center gap-2 mb-4 text-[#111827] border-b-2 border-[#626A67] pb-2">
          <Filter className="h-4.5 w-4.5" />
          <h3 className="font-bold text-xs uppercase">Filter Workspace</h3>
        </div>
        {filterContent}
      </div>

      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden w-full flex justify-end">
        <button
          onClick={toggleSidebar}
          className="neo-btn neo-btn-outline bg-[#F4F0E8] flex items-center gap-2 text-xs"
        >
          <Filter className="h-4 w-4" /> Filter / Sort
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end lg:hidden">
          <div className="w-[300px] h-full bg-[#F4F0E8] border-l-4 border-[#626A67] p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-[#626A67]">
                <span className="flex items-center gap-2 text-xs font-bold uppercase text-[#111827]">
                  <Filter className="h-4 w-4" /> Filters
                </span>
                <button
                  onClick={toggleSidebar}
                  className="p-1 border border-[#626A67] rounded bg-white hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-[#111827]" />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskFilters;
