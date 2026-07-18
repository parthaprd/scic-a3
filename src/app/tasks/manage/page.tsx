'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { taskService } from '../../../services/task.service';
import { ITask, TaskStatus } from '../../../types';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import TaskForm from '../../../components/tasks/TaskForm';
import { Eye, Edit, Trash2, Plus, Download, Search, CheckSquare, X, AlertTriangle, ChevronDown, Trash } from 'lucide-react';
import Link from 'next/link';

export default function ManageTasks() {
  const { token, loading, user } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Search and Tab controls
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | TaskStatus>('all');

  // Bulk actions selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  // Modals state
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Guard protected route
  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading]);

  useEffect(() => {
    if (token) {
      fetchMyTasks();
    }
  }, [token, searchQuery, activeTab]);

  const fetchMyTasks = async () => {
    setLoadingTasks(true);
    try {
      const tabFilter = activeTab === 'all' ? undefined : activeTab;
      const res = await taskService.getMyTasks({ status: tabFilter, search: searchQuery });
      if (res.success && res.tasks) {
        setTasks(res.tasks);
      }
    } catch (err) {
      console.error('Failed to load my tasks:', err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleEditClick = (task: ITask) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleEditSubmit = async (formData: any) => {
    if (!editingTask) return;
    try {
      const res = await taskService.updateTask(editingTask._id, formData);
      if (res.success) {
        setIsEditModalOpen(false);
        setEditingTask(null);
        fetchMyTasks();
        alert('Task updated successfully.');
      }
    } catch (err) {
      console.error('Failed to edit task:', err);
      alert('Error updating task.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTaskId) return;
    try {
      const res = await taskService.deleteTask(deletingTaskId);
      if (res.success) {
        setDeletingTaskId(null);
        fetchMyTasks();
        setSelectedIds(selectedIds.filter((id) => id !== deletingTaskId));
        alert('Task deleted successfully.');
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Error deleting task.');
    }
  };

  // Bulk deletion
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} tasks?`)) return;

    try {
      // Delete in parallel using tasks service
      await Promise.all(selectedIds.map((id) => taskService.deleteTask(id)));
      setSelectedIds([]);
      fetchMyTasks();
      alert('Selected tasks deleted successfully.');
    } catch (err) {
      console.error('Failed in bulk delete:', err);
      alert('Failed to delete some tasks. Please try again.');
    }
  };

  // Checkbox select all toggler
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(tasks.map((t) => t._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, taskId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== taskId));
    }
  };

  // CSV Exporter
  const handleExportCSV = () => {
    if (tasks.length === 0) {
      alert('No tasks available to export.');
      return;
    }

    const headers = ['Title', 'Description', 'Category', 'Priority', 'Status', 'Due Date', 'Tags'];
    const rows = tasks.map((t) => [
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.priority,
      t.status,
      new Date(t.dueDate).toISOString().split('T')[0],
      `"${t.tags.join(', ')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `my_tasks_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !token) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 font-mono text-xs text-[#626A67]">
        Verifying authorization state...
      </div>
    );
  }

  // Priority visual tags
  const priorityTags: Record<string, string> = {
    high: 'text-red-600 font-bold',
    medium: 'text-yellow-600 font-bold',
    low: 'text-gray-500 font-medium',
  };

  // Status visual tags
  const statusStyles: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-800 border-gray-200',
    'in-progress': 'bg-sky-100 text-sky-800 border-sky-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 space-y-8 font-mono text-[#111827]">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#626A67] pb-4">
        <div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl uppercase">My Task Workspace</h1>
          <p className="text-xs text-gray-500 font-bold mt-1">Logged in as {user?.name} ({user?.role}) | Total tasks: {tasks.length}</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none py-2 px-4 bg-white border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <Link href="/tasks/add" className="flex-1 sm:flex-none">
            <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />} className="w-full">
              Create New Task
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs & Search controls */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-[#F4F0E8] border-2 border-[#626A67] p-4 rounded-xl shadow-[4px_4px_0px_0px_#626A67]">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1">
          {(['all', 'todo', 'in-progress', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedIds([]); }}
              className={`px-3 py-1.5 text-xs font-bold rounded uppercase border-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#E7FF72] border-[#626A67] shadow-[1px_1px_0px_0px_#626A67]'
                  : 'bg-white border-[#626A67]/20 hover:border-[#626A67] text-gray-500 hover:text-black'
              }`}
            >
              {tab === 'all' ? 'All Tasks' : tab === 'todo' ? 'To Do' : tab === 'in-progress' ? 'In Progress' : 'Completed'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSelectedIds([]); }}
            placeholder="Search within my tasks..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border-2 border-[#626A67] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#74E7E0]"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Bulk actions utility */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-100 border-2 border-[#626A67] p-3 rounded-lg shadow-[2px_2px_0px_0px_#626A67] flex justify-between items-center text-xs">
          <span className="font-bold text-amber-900">
            Selected: {selectedIds.length} tasks
          </span>
          <button
            onClick={handleBulkDelete}
            className="py-1 px-3 bg-red-600 text-white border border-[#626A67] rounded font-bold hover:bg-red-700 flex items-center gap-1 cursor-pointer"
          >
            <Trash className="h-3.5 w-3.5" /> Delete Selected
          </button>
        </div>
      )}

      {/* Task table / grid container */}
      {loadingTasks ? (
        <div className="p-8 text-center text-xs font-bold text-gray-500">
          Loading active workspace data...
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white border-2 border-[#626A67] p-12 rounded-xl text-center shadow-[4px_4px_0px_0px_#626A67] space-y-4">
          <CheckSquare className="h-10 w-10 text-gray-400 mx-auto" />
          <h3 className="text-sm font-bold uppercase">No Tasks Registered</h3>
          <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto">
            You do not have any tasks in this view state. Click on &quot;Create New Task&quot; to define a task.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-[#F4F0E8] border-2 border-[#626A67] rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white border-b-2 border-[#626A67] uppercase font-bold text-gray-600">
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={tasks.length > 0 && selectedIds.length === tasks.length}
                      onChange={handleSelectAll}
                      className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#626A67]/20">
                {tasks.map((task) => {
                  const isSelected = selectedIds.includes(task._id);
                  return (
                    <tr
                      key={task._id}
                      className={`hover:bg-[#626A67]/5 transition-colors ${isSelected ? 'bg-amber-50/50' : ''}`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectOne(task._id, e.target.checked)}
                          className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 font-sans font-bold text-[#111827] max-w-[240px] truncate uppercase">
                        {task.title}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-dashed border-[#626A67] bg-white rounded font-bold uppercase text-[10px]">
                          {task.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold uppercase text-[10px]">
                        <span className={priorityTags[task.priority] || priorityTags.medium}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 border font-bold rounded uppercase text-[10px] ${statusStyles[task.status] || statusStyles.todo}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-600">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <Link href={`/tasks/${task._id}`}>
                          <button
                            title="View task Details"
                            className="p-1.5 bg-white border border-[#626A67] rounded hover:bg-[#74E7E0] transition-colors cursor-pointer"
                          >
                            <Eye className="h-4 w-4 text-[#111827]" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleEditClick(task)}
                          title="Edit Task"
                          className="p-1.5 bg-white border border-[#626A67] rounded hover:bg-[#E7FF72] transition-colors cursor-pointer"
                        >
                          <Edit className="h-4 w-4 text-[#111827]" />
                        </button>
                        <button
                          onClick={() => setDeletingTaskId(task._id)}
                          title="Delete Task"
                          className="p-1.5 bg-white border border-[#626A67] rounded hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid (with hover overlays) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {tasks.map((task) => {
              const isSelected = selectedIds.includes(task._id);
              return (
                <div
                  key={task._id}
                  className={`bg-[#F4F0E8] border-2 border-[#626A67] rounded-xl p-4 shadow-[2px_2px_0px_0px_#626A67] space-y-3 relative group transition-all ${
                    isSelected ? 'border-dashed bg-amber-50/20' : ''
                  }`}
                >
                  {/* Category & Checkbox */}
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectOne(task._id, e.target.checked)}
                        className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-3.5 h-3.5"
                      />
                      <span className="text-[10px] font-bold bg-white border border-[#626A67] px-2 py-0.5 rounded uppercase">
                        {task.category}
                      </span>
                    </label>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">
                      {task.priority === 'high' ? '🔴 High' : task.priority === 'medium' ? '🟡 Med' : '⚪ Low'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-sans font-bold text-xs uppercase text-[#111827] line-clamp-1">
                    {task.title}
                  </h4>

                  <hr className="border-[#626A67] my-1" />

                  {/* Due date & Status */}
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-600">
                    <span className={`px-2 py-0.2 border rounded uppercase ${statusStyles[task.status] || statusStyles.todo}`}>
                      {task.status}
                    </span>
                    <span>
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions Drawer Panel */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-dashed border-[#626A67]/20">
                    <Link href={`/tasks/${task._id}`}>
                      <button className="py-1 px-2.5 bg-white border border-[#626A67] rounded font-bold text-[10px] flex items-center gap-1">
                        <Eye className="h-3 w-3" /> View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="py-1 px-2.5 bg-white border border-[#626A67] rounded font-bold text-[10px] flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => setDeletingTaskId(task._id)}
                      className="py-1 px-2.5 bg-white border border-red-500 text-red-600 rounded font-bold text-[10px] flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Edit Dialog Modal Popup */}
      {isEditModalOpen && editingTask && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#F4F0E8] border-4 border-[#626A67] p-8 rounded-2xl shadow-[8px_8px_0px_0px_#626A67] relative my-8">
            <button
              onClick={handleEditCancel}
              className="absolute right-4 top-4 p-1 border border-[#626A67] rounded bg-white hover:bg-gray-100 focus:outline-none"
            >
              <X className="h-4.5 w-4.5 text-[#111827]" />
            </button>
            <h2 className="font-sans font-bold text-xl uppercase mb-6 text-[#111827] border-b-2 border-[#626A67] pb-2">
              ✏️ Inline Task Edit
            </h2>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleEditSubmit}
              onCancel={handleEditCancel}
              loading={updating}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTaskId && (
        <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white border-4 border-[#626A67] p-6 rounded-2xl shadow-[6px_6px_0px_0px_#626A67] text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase text-[#111827]">Delete Task?</h3>
              <p className="text-xs text-gray-500 font-sans mt-2">
                This action is permanent and cannot be undone. Are you sure you want to delete this task?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-1.5 bg-red-600 text-white rounded font-bold hover:bg-red-700 cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingTaskId(null)}
                className="flex-1 py-1.5 bg-white border border-gray-300 rounded font-bold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
