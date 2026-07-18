'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { taskService } from '../../../services/task.service';
import { ITask } from '../../../types';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import TaskCard from '../../../components/tasks/TaskCard';
import TaskForm from '../../../components/tasks/TaskForm';
import { Calendar, Tag, Paperclip, Clock, Shield, AlertTriangle, ArrowLeft, Edit, Trash2, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

export default function TaskDetails() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useAuth();

  const [task, setTask] = useState<ITask | null>(null);
  const [relatedTasks, setRelatedTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Status dropdown edit
  const [newStatus, setNewStatus] = useState<any>('todo');

  // Edit Modal trigger
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTaskById(id);
      if (data.success && data.task) {
        setTask(data.task);
        setNewStatus(data.task.status);

        // Fetch related tasks (same category)
        const relData = await taskService.getTasks({ category: data.task.category, limit: 5 });
        if (relData.success && relData.tasks) {
          // Exclude current task
          const filtered = relData.tasks.filter((t: ITask) => t._id !== data.task._id).slice(0, 4);
          setRelatedTasks(filtered);
        }
      }
    } catch (err) {
      console.error('Failed to load task details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!task) return;
    setUpdating(true);
    try {
      const data = await taskService.updateTask(task._id, { status: newStatus });
      if (data.success && data.task) {
        setTask(data.task);
        alert('Status updated successfully!');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Error updating status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!task) return;
    setDeleting(true);
    try {
      const data = await taskService.deleteTask(task._id);
      if (data.success) {
        alert('Task deleted successfully.');
        router.push('/tasks/manage');
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Error deleting task.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditSubmit = async (formData: any) => {
    if (!task) return;
    setUpdating(true);
    try {
      const data = await taskService.updateTask(task._id, formData);
      if (data.success && data.task) {
        setTask(data.task);
        setIsEditModalOpen(false);
        alert('Task updated successfully!');
      }
    } catch (err) {
      console.error('Failed to update task:', err);
      alert('Error updating task details.');
    } finally {
      setUpdating(false);
    }
  };

  const isOwner = user && task && task.createdBy.userId === user._id;

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 font-mono text-xs">
        <div className="text-center space-y-4">
          <Clock className="h-8 w-8 text-[#626A67] mx-auto animate-spin" />
          <p>Loading task metrics & details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 font-mono text-xs text-center">
        <div className="space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold">TASK NOT FOUND</h2>
          <p className="text-gray-500">The requested task details do not exist or have been archived.</p>
          <Link href="/tasks">
            <Button variant="outline" size="sm">Back to Tasks</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Formatting date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Badges mappings
  const categoryStyles: Record<string, string> = {
    Work: 'bg-blue-100 text-blue-800 border-blue-200',
    Personal: 'bg-purple-100 text-purple-800 border-purple-200',
    Shopping: 'bg-green-100 text-green-800 border-green-200',
    Health: 'bg-red-100 text-red-800 border-red-200',
    Finance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Education: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Other: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const priorityStyles: Record<string, string> = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const statusStyles: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-800 border-gray-200',
    'in-progress': 'bg-sky-100 text-sky-800 border-sky-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 space-y-12 font-mono">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="neo-btn neo-btn-outline bg-[#F4F0E8] flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {isOwner && (
          <span className="text-[10px] font-bold bg-[#E7FF72] border-2 border-[#626A67] px-2 py-0.5 rounded-full shadow-[2px_2px_0px_0px_#626A67] uppercase">
            Workspace Owner Access
          </span>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Description & Metadata */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-8 border-2 border-[#626A67] bg-[#F4F0E8] hover:translate-x-0 hover:shadow-[4px_4px_0px_0px_#626A67]" hoverable={false}>
            {/* Header Section */}
            <div className="border-b-2 border-dashed border-[#626A67] pb-6 mb-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-0.5 border text-[10px] font-bold rounded uppercase ${categoryStyles[task.category] || categoryStyles.Other}`}>
                  {task.category}
                </span>
                <span className={`px-2 py-0.5 border text-[10px] font-bold rounded uppercase ${priorityStyles[task.priority] || priorityStyles.medium}`}>
                  ⚡ {task.priority} Priority
                </span>
                <span className={`px-2 py-0.5 border text-[10px] font-bold rounded uppercase ${statusStyles[task.status] || statusStyles.todo}`}>
                  🔄 {task.status}
                </span>
              </div>

              <h1 className="font-sans font-bold text-2xl sm:text-3xl text-[#111827] uppercase leading-tight">
                {task.title}
              </h1>

              {/* Creator details */}
              <div className="flex items-center gap-3 pt-2 text-xs text-gray-500 font-sans">
                <img
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${task.createdBy.name}`}
                  alt={task.createdBy.name}
                  className="h-8 w-8 rounded-full border border-[#626A67] bg-[#74E7E0]"
                />
                <div>
                  <p className="font-bold text-gray-700">Created by {task.createdBy.name}</p>
                  <p className="text-[10px] text-gray-400">Email: {task.createdBy.email}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-gray-400">Description</h3>
              <div className="bg-white border-2 border-[#626A67] rounded-xl p-6 text-xs leading-relaxed font-sans text-gray-700 whitespace-pre-wrap">
                {task.description}
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="bg-white p-3 rounded-lg border border-[#626A67] text-[10px]">
                <span className="font-bold text-gray-400 uppercase block mb-1">📅 Due Date</span>
                <span className="font-bold text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#626A67] text-[10px]">
                <span className="font-bold text-gray-400 uppercase block mb-1">⏰ Created At</span>
                <span className="font-bold text-gray-700">{formatDate(task.createdAt)}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#626A67] text-[10px]">
                <span className="font-bold text-gray-400 uppercase block mb-1">📝 Last Updated</span>
                <span className="font-bold text-gray-700">{formatDate(task.updatedAt)}</span>
              </div>
            </div>

            {/* Tags Section */}
            {task.tags && task.tags.length > 0 && (
              <div className="mt-8 space-y-2">
                <h3 className="text-xs font-bold uppercase text-gray-400">Tags</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {task.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold bg-[#74E7E0] text-gray-800 border border-[#626A67] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#626A67]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments Section */}
            {task.attachments && task.attachments.length > 0 && (
              <div className="mt-8 space-y-2">
                <h3 className="text-xs font-bold uppercase text-gray-400">Attachments ({task.attachments.length})</h3>
                <div className="space-y-2 font-sans">
                  {task.attachments.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 bg-white border border-[#626A67] rounded-lg text-xs font-semibold text-gray-600 hover:text-[#74E7E0] hover:border-[#74E7E0] transition-colors truncate"
                    >
                      <Paperclip className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{link}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Actions (Status Update & Quick Actions) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Update Card */}
          {isOwner && (
            <Card className="p-6 border-2 border-[#626A67] bg-[#F4F0E8]" hoverable={false}>
              <h3 className="text-xs font-bold uppercase text-gray-500 mb-4 border-b border-[#626A67]/20 pb-2 flex items-center gap-1.5">
                🔄 Status Update
              </h3>
              <div className="space-y-4">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-2 py-1.5 border-2 border-[#626A67] rounded bg-white text-xs font-bold focus:outline-none"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <Button
                  onClick={handleUpdateStatus}
                  loading={updating}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Save Status
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Actions (Owner only) */}
          {isOwner && (
            <Card className="p-6 border-2 border-[#626A67] bg-[#F4F0E8]" hoverable={false}>
              <h3 className="text-xs font-bold uppercase text-gray-500 mb-4 border-b border-[#626A67]/20 pb-2 flex items-center gap-1.5">
                🛠️ Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  variant="secondary"
                  size="sm"
                  icon={<Edit className="h-4 w-4" />}
                  className="w-full"
                >
                  Edit Task Details
                </Button>

                {deleting ? (
                  <div className="border border-red-200 bg-red-50 p-3 rounded-lg space-y-2 text-[10px] leading-relaxed">
                    <p className="font-bold text-red-800 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" /> Confirm Deletion?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteTask}
                        className="py-1 px-2.5 bg-red-600 text-white rounded font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setDeleting(false)}
                        className="py-1 px-2.5 bg-white border border-gray-300 rounded font-bold hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setDeleting(true)}
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="h-4 w-4" />}
                    className="w-full text-white"
                  >
                    Delete Task
                  </Button>
                )}
              </div>
            </Card>
          )}

          {/* Metadata Card */}
          <Card className="p-6 border-2 border-[#626A67] bg-[#F4F0E8]" hoverable={false}>
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-4 border-b border-[#626A67]/20 pb-2 flex items-center gap-1.5">
              📊 Task Metadata
            </h3>
            <ul className="space-y-3 text-[10px]">
              <li className="flex justify-between border-b border-dashed border-[#626A67]/20 pb-1.5">
                <span className="font-bold text-gray-500">Completeness</span>
                <span className="font-bold text-gray-700">{task.status === 'completed' ? '100%' : task.status === 'in-progress' ? '50%' : '0%'}</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-[#626A67]/20 pb-1.5">
                <span className="font-bold text-gray-500">Estimated Duration</span>
                <span className="font-bold text-gray-700">4 Hours</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-[#626A67]/20 pb-1.5">
                <span className="font-bold text-gray-500">Category Tag</span>
                <span className="font-bold text-gray-700 uppercase">{task.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold text-gray-500">Last activity</span>
                <span className="font-bold text-gray-700">Modified recently</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Bottom Section: Related Tasks */}
      {relatedTasks.length > 0 && (
        <div className="space-y-6 pt-12 border-t-2 border-dashed border-[#626A67]">
          <h2 className="font-sans font-bold text-lg sm:text-xl uppercase text-[#111827]">
            Related Tasks (Same Category)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTasks.map((t) => (
              <TaskCard key={t._id} task={t} />
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal (Owner only) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#F4F0E8] border-4 border-[#626A67] p-8 rounded-2xl shadow-[8px_8px_0px_0px_#626A67] relative my-8">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-4 top-4 p-1 border border-[#626A67] rounded bg-white hover:bg-gray-100"
            >
              <X className="h-4.5 w-4.5 text-[#111827]" />
            </button>
            <h2 className="font-sans font-bold text-xl uppercase mb-6 text-[#111827] border-b-2 border-[#626A67] pb-2">
              ✏️ Edit Task Details
            </h2>
            <TaskForm
              initialData={task}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditModalOpen(false)}
              loading={updating}
            />
          </div>
        </div>
      )}
    </div>
  );
}
