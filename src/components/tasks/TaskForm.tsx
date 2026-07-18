'use client';

import React, { useState, useEffect } from 'react';
import { ITask, TaskCategory, TaskPriority, TaskStatus } from '../../types';
import Button from '../common/Button';
import { X, Plus, Calendar, AlertCircle } from 'lucide-react';

interface TaskFormProps {
  initialData?: ITask;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState<TaskCategory>(initialData?.category || 'Work');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority || 'medium');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status || 'todo');
  
  // Format due date to YYYY-MM-DD for date picker
  const getInitialDate = () => {
    if (initialData?.dueDate) {
      try {
        return new Date(initialData.dueDate).toISOString().split('T')[0];
      } catch {
        return '';
      }
    }
    return '';
  };
  const [dueDate, setDueDate] = useState(getInitialDate());

  // Tags & attachments
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const [attachments, setAttachments] = useState<string[]>(initialData?.attachments || []);
  const [attachmentInput, setAttachmentInput] = useState('');

  // Field validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    validateForm();
  }, [title, description, dueDate]);

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (title && title.trim().length < 3) {
      nextErrors.title = 'Title must be at least 3 characters.';
    }

    if (description && description.trim().length < 10) {
      nextErrors.description = 'Description must be at least 10 characters.';
    }

    if (dueDate) {
      const selected = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime()) || selected < today) {
        nextErrors.dueDate = 'Due date must be in the future (or today).';
      }
    }

    setErrors(nextErrors);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  // Add Tag
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter' && (e as React.KeyboardEvent).key !== ' ') {
      return;
    }
    e.preventDefault();
    const cleanTag = tagInput.trim().toLowerCase().replace(/#/g, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Add Attachment Link
  const handleAddAttachment = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanLink = attachmentInput.trim();
    if (cleanLink && !attachments.includes(cleanLink)) {
      setAttachments([...attachments, cleanLink]);
      setAttachmentInput('');
    }
  };

  // Remove Attachment Link
  const handleRemoveAttachment = (linkToRemove: string) => {
    setAttachments(attachments.filter((l) => l !== linkToRemove));
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    // Trigger touched for all
    setTouched({ title: true, description: true, dueDate: true });

    if (!title || title.trim().length < 3) return;
    if (!description || description.trim().length < 10) return;
    if (!dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: 'Due date is required' }));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(dueDate) < today) return;

    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status: isDraft ? 'todo' : status,
      dueDate: new Date(dueDate),
      tags,
      attachments,
    };

    onSubmit(taskPayload);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form className="space-y-6 font-mono text-[#111827]" onSubmit={(e) => handleSubmit(e, false)}>
      {/* Title */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          placeholder="Enter task title..."
          className={`neo-input text-xs ${touched.title && errors.title ? 'border-red-500 focus:border-red-500' : ''}`}
          required
        />
        {touched.title && errors.title && (
          <p className="text-[10px] text-red-600 font-bold flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block">Description* (Min 10 Chars)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          rows={5}
          placeholder="Describe your task in details..."
          className={`neo-input text-xs font-sans ${touched.description && errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
          required
        ></textarea>
        {touched.description && errors.description && (
          <p className="text-[10px] text-red-600 font-bold flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.description}
          </p>
        )}
      </div>

      {/* Category & Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block">Category*</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className="w-full px-3 py-2 border-2 border-[#626A67] rounded-lg bg-white text-xs font-bold font-mono focus:outline-none focus:border-[#74E7E0] focus:shadow-[2px_2px_0px_0px_#626A67]"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block">Due Date*</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onBlur={() => handleBlur('dueDate')}
              min={todayStr}
              className={`w-full px-3 py-2 border-2 border-[#626A67] rounded-lg bg-white text-xs font-mono focus:outline-none focus:border-[#74E7E0] focus:shadow-[2px_2px_0px_0px_#626A67] ${
                touched.dueDate && errors.dueDate ? 'border-red-500' : ''
              }`}
              required
            />
          </div>
          {touched.dueDate && errors.dueDate && (
            <p className="text-[10px] text-red-600 font-bold flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.dueDate}
            </p>
          )}
        </div>
      </div>

      {/* Priority & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider block">Priority*</label>
          <div className="flex gap-4 items-center h-10">
            {['low', 'medium', 'high'].map((p) => (
              <label key={p} className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer select-none">
                <input
                  type="radio"
                  name="form-priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p as TaskPriority)}
                  className="border-[#626A67] text-[#74E7E0] focus:ring-0 w-4 h-4"
                />
                <span>{p === 'high' ? '🔴 High' : p === 'medium' ? '🟡 Medium' : '⚪ Low'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-3 py-2 border-2 border-[#626A67] rounded-lg bg-white text-xs font-bold font-mono focus:outline-none focus:border-[#74E7E0] focus:shadow-[2px_2px_0px_0px_#626A67]"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tags Chips Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider block">Tags (chips)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag and press Enter..."
            className="neo-input text-xs flex-grow"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="p-2.5 bg-[#E7FF72] border-2 border-[#626A67] rounded-lg hover:bg-[#d4f04c] flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#626A67]"
          >
            <Plus className="h-4.5 w-4.5 text-[#111827]" />
          </button>
        </div>

        {/* Tags list */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold bg-[#74E7E0] text-[#111827] border border-[#626A67] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[1px_1px_0px_0px_#626A67]"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="focus:outline-none text-[#111827] hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider block">Attachments (Optional)</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={attachmentInput}
            onChange={(e) => setAttachmentInput(e.target.value)}
            placeholder="Enter file URL (e.g. https://domain/file.pdf)..."
            className="neo-input text-xs flex-grow"
          />
          <button
            type="button"
            onClick={handleAddAttachment}
            className="p-2.5 bg-[#E7FF72] border-2 border-[#626A67] rounded-lg hover:bg-[#d4f04c] flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#626A67]"
          >
            <Plus className="h-4.5 w-4.5 text-[#111827]" />
          </button>
        </div>

        {/* Attachments list */}
        {attachments.length > 0 && (
          <ul className="space-y-1.5 pt-1 text-xs">
            {attachments.map((link) => (
              <li
                key={link}
                className="flex items-center justify-between p-2 bg-white border border-[#626A67] rounded-lg font-sans text-gray-600 truncate"
              >
                <span className="truncate pr-4">{link}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(link)}
                  className="text-gray-400 hover:text-red-600 focus:outline-none font-mono"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-dashed border-[#626A67]">
        <Button type="submit" variant="primary" loading={loading} className="flex-1">
          {initialData ? 'Save Changes' : 'Create Task'}
        </Button>
        {!initialData && (
          <Button
            type="button"
            variant="secondary"
            loading={loading}
            onClick={(e) => handleSubmit(e, true)}
            className="flex-1"
          >
            Save as Draft
          </Button>
        )}
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-[#ffffff]">
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default TaskForm;
