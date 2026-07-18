'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { taskService } from '../../../services/task.service';
import Card from '../../../components/common/Card';
import TaskForm from '../../../components/tasks/TaskForm';
import { CheckSquare, AlertCircle, CheckCircle } from 'lucide-react';

export default function AddTask() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Protect Route Client-side
  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading]);

  const handleSubmit = async (formData: any) => {
    setSubmitting(true);
    setError('');
    try {
      const data = await taskService.createTask(formData);
      if (data.success) {
        setSuccess(true);
        // Redirect to my tasks page after 2 seconds
        setTimeout(() => {
          router.push('/tasks/manage');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Failed to create task:', err);
      const errMsg = err.response?.data?.message || 'Error occurred during task creation. Try again.';
      setError(errMsg);
      setSubmitting(false);
    }
  };

  if (loading || !token) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 font-mono text-xs text-[#626A67]">
        Verifying authorization state...
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 bg-[#F4F0E8] bg-grid min-h-[80vh]">
      <Card className="w-full max-w-xl bg-[#F4F0E8] border-2 border-[#626A67] p-8 rounded-2xl shadow-[6px_6px_0px_0px_#626A67] font-mono hover:translate-x-0 hover:shadow-[4px_4px_0px_0px_#626A67]" hoverable={false}>
        <div className="text-center space-y-2 mb-8 border-b-2 border-[#626A67] pb-4">
          <div className="inline-flex p-2 bg-[#74E7E0] border-2 border-[#626A67] rounded-xl shadow-[2px_2px_0px_0px_#626A67] mb-2">
            <CheckSquare className="h-6 w-6 text-[#111827]" />
          </div>
          <h2 className="font-sans font-bold text-2xl uppercase text-[#111827]">Create New Task</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Configure workspace task constraints</p>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-green-700 text-xs font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p>Task created successfully!</p>
              <p className="text-[10px] text-gray-500 font-normal mt-0.5">Redirecting to task manager in 2s...</p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg text-red-700 text-xs font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form component */}
        {!success && (
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={() => router.push('/tasks/manage')}
            loading={submitting}
          />
        )}
      </Card>
    </div>
  );
}
