'use client';

import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/task.service';
import { ITask, TaskFiltersState } from '../../types';
import TaskCard from '../../components/tasks/TaskCard';
import TaskFilters from '../../components/tasks/TaskFilters';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { Search, Grid, List, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function TasksListing() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // View toggle
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters State
  const [filters, setFilters] = useState<TaskFiltersState>({
    category: [],
    priority: '',
    status: [],
    dueDateStart: '',
    dueDateEnd: '',
    search: '',
    sortBy: 'dueDate',
    order: 'asc',
  });

  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async (customFilters: TaskFiltersState = filters) => {
    setLoading(true);
    try {
      const queryParams: any = {
        page,
        limit: 12,
        priority: customFilters.priority,
        sortBy: customFilters.sortBy,
        order: customFilters.order,
        search: customFilters.search,
      };

      if (customFilters.category.length > 0) {
        // Just send first or join for server parse (our jsonDb queries by matching string)
        // If we choose category, we can send one if single select or customize the request
        if (customFilters.category.length === 1) {
          queryParams.category = customFilters.category[0];
        } else {
          // Send as array parameter or pick first
          queryParams.category = customFilters.category[0];
        }
      }

      if (customFilters.status.length > 0) {
        queryParams.status = customFilters.status[0];
      }

      const data = await taskService.getTasks(queryParams);
      if (data.success) {
        setTasks(data.tasks);
        setTotalPages(data.pages || 1);
        setTotalTasks(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load tasks listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFilters = { ...filters, search: searchVal };
    setFilters(updatedFilters);
    setPage(1);
    fetchTasks(updatedFilters);
  };

  const handleFiltersChange = (newFilters: TaskFiltersState) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchTasks();
  };

  const handleClearFilters = () => {
    const cleared: TaskFiltersState = {
      category: [],
      priority: '',
      status: [],
      dueDateStart: '',
      dueDateEnd: '',
      search: '',
      sortBy: 'dueDate',
      order: 'asc',
    };
    setFilters(cleared);
    setSearchVal('');
    setPage(1);
    fetchTasks(cleared);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Inline List View Item styling
  const renderListItem = (task: ITask) => {
    const categoryStyles: Record<string, string> = {
      Work: 'bg-blue-100 text-blue-800',
      Personal: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-green-100 text-green-800',
      Health: 'bg-red-100 text-red-800',
      Finance: 'bg-yellow-100 text-yellow-800',
      Education: 'bg-indigo-100 text-indigo-800',
      Other: 'bg-gray-100 text-gray-800',
    };

    return (
      <div
        key={task._id}
        className="w-full bg-[#F4F0E8] border-2 border-[#626A67] p-4 rounded-xl shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-grow truncate">
          <span className={`px-2 py-0.5 border text-[9px] font-bold rounded uppercase w-fit ${categoryStyles[task.category] || categoryStyles.Other}`}>
            {task.category}
          </span>
          <div className="truncate">
            <h4 className="font-sans font-bold text-sm text-[#111827] truncate uppercase">{task.title}</h4>
            <p className="font-sans text-[11px] text-gray-500 line-clamp-1 max-w-xl">{task.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0">
          <span className="font-bold text-gray-500 uppercase text-[10px]">
            {task.priority === 'high' ? '🔴 High' : task.priority === 'medium' ? '🟡 Med' : '⚪ Low'}
          </span>
          <span className="text-[10px] text-gray-600 font-bold">
            📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
          <span className="px-2 py-0.5 bg-white border border-[#626A67] font-bold uppercase rounded text-[9px]">
            {task.status}
          </span>
          <Link href={`/tasks/${task._id}`}>
            <button className="py-1 px-3 bg-[#74E7E0] border-2 border-[#626A67] rounded shadow-[1px_1px_0px_0px_#626A67] font-bold hover:translate-y-[-0.5px] cursor-pointer">
              View
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 space-y-8 font-mono">
      {/* Top Banner: Search and Layout Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#F4F0E8] border-2 border-[#626A67] p-5 rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search tasks by title, tag, or description..."
              className="w-full pl-10 pr-24 py-2 bg-white border-2 border-[#626A67] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#74E7E0]"
            />
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#74E7E0] border-2 border-[#626A67] rounded-md text-[10px] font-bold hover:bg-[#5cd6ce] cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* View Toggle */}
        <div className="flex items-center gap-3 justify-end">
          <span className="text-xs font-bold text-gray-500 uppercase">View Layout</span>
          <div className="flex border-2 border-[#626A67] rounded-lg overflow-hidden bg-white shadow-[2px_2px_0px_0px_#626A67]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 hover:bg-gray-100 ${viewMode === 'grid' ? 'bg-[#E7FF72] border-r-2 border-[#626A67]' : 'border-r-2 border-[#626A67]'}`}
              title="Grid View"
            >
              <Grid className="h-4 w-4 text-[#111827]" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 hover:bg-gray-100 ${viewMode === 'list' ? 'bg-[#E7FF72]' : ''}`}
              title="List View"
            >
              <List className="h-4 w-4 text-[#111827]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Sidebar + Right List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="lg:col-span-3">
          <TaskFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {loading ? (
            <SkeletonLoader count={4} />
          ) : tasks.length === 0 ? (
            <div className="bg-white border-2 border-[#626A67] p-12 rounded-2xl shadow-[4px_4px_0px_0px_#626A67] text-center space-y-4">
              <CheckSquare className="h-12 w-12 text-[#626A67] mx-auto opacity-40" />
              <h3 className="text-sm font-bold uppercase text-[#111827]">No Tasks Found</h3>
              <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto">
                No active tasks match your search criteria. Try modifying your filter checks or search keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="py-1.5 px-4 bg-[#74E7E0] border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] font-bold text-xs hover:translate-y-[-1px] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
                <span>Showing {tasks.length} of {totalTasks} Tasks</span>
                <span>Page {page} of {totalPages}</span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {tasks.map((task) => renderListItem(task))}
                </div>
              )}

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 bg-white border-2 border-[#626A67] rounded shadow-[2px_2px_0px_0px_#626A67] font-bold text-xs hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
                  >
                    &larr; Previous
                  </button>
                  <span className="text-xs font-bold text-gray-700">
                    Page {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 bg-white border-2 border-[#626A67] rounded shadow-[2px_2px_0px_0px_#626A67] font-bold text-xs hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
