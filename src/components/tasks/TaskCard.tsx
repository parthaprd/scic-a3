import React from 'react';
import Link from 'next/link';
import { ITask } from '../../types';
import { Calendar, Tag } from 'lucide-react';

interface TaskCardProps {
  task: ITask;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Category badge mapping
  const categoryStyles: Record<string, string> = {
    Work: 'bg-blue-100 text-blue-800 border-blue-200',
    Personal: 'bg-purple-100 text-purple-800 border-purple-200',
    Shopping: 'bg-green-100 text-green-800 border-green-200',
    Health: 'bg-red-100 text-red-800 border-red-200',
    Finance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Education: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Other: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  // Status badge mapping
  const statusStyles: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-800 border-gray-200',
    'in-progress': 'bg-sky-100 text-sky-800 border-sky-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  // Priority indicator mapping
  const priorityDots: Record<string, { dot: string; text: string }> = {
    high: { dot: 'bg-red-500', text: '🔴 High' },
    medium: { dot: 'bg-yellow-400', text: '🟡 Medium' },
    low: { dot: 'bg-gray-400', text: '⚪ Low' },
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full h-[320px] bg-[#F4F0E8] border-2 border-[#626A67] rounded-xl p-5 shadow-[4px_4px_0px_0px_#626A67] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#626A67] transition-all flex flex-col justify-between font-mono">
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={`px-2 py-0.5 border text-[10px] font-bold rounded-md uppercase ${categoryStyles[task.category] || categoryStyles.Other}`}>
            {task.category}
          </span>
          <span className="text-[10px] font-bold text-gray-600">
            {priorityDots[task.priority]?.text || 'Medium'}
          </span>
        </div>

        {/* Title (2 lines max) */}
        <h3 className="font-sans font-bold text-sm text-[#111827] line-clamp-2 leading-snug mb-2 uppercase">
          {task.title}
        </h3>

        {/* Description (3 lines max) */}
        <p className="font-sans text-xs text-[#4B5563] line-clamp-3 leading-relaxed mb-3">
          {task.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div>
        <hr className="border-[#626A67] my-3" />
        
        {/* Status Badge & Due Date */}
        <div className="flex justify-between items-center mb-3 text-[10px]">
          <span className={`px-2 py-0.5 border font-bold rounded uppercase ${statusStyles[task.status] || statusStyles.todo}`}>
            {task.status}
          </span>
          <span className="flex items-center gap-1 text-gray-600 font-bold">
            <Calendar className="h-3 w-3 text-gray-400" /> {formatDate(task.dueDate)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap overflow-hidden h-5 items-center mb-3">
          {task.tags && task.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] font-bold bg-white text-gray-600 border border-[#626A67] px-1.5 py-0.2 rounded flex items-center gap-0.5">
              #{tag}
            </span>
          ))}
          {task.tags && task.tags.length > 3 && (
            <span className="text-[9px] font-bold text-gray-400">+{task.tags.length - 3}</span>
          )}
        </div>

        {/* View Details Button */}
        <Link href={`/tasks/${task._id}`} className="block">
          <button className="w-full py-1.5 text-xs font-bold text-[#111827] bg-[#74E7E0] border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#626A67] transition-all cursor-pointer text-center">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
export default TaskCard;
