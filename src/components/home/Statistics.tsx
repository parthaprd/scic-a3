'use client';

import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/task.service';
import { DashboardStats } from '../../types';
import Card from '../common/Card';
import { CheckSquare, Users, BarChart3, TrendingUp, RefreshCw } from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const Statistics: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const res = await taskService.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const COLORS = ['#74E7E0', '#E7FF72', '#a78bfa', '#f87171', '#fbbf24', '#34d399', '#9ca3af'];
  const PIE_COLORS = ['#fbbf24', '#38bdf8', '#34d399']; // todo, in-progress, completed colors

  return (
    <section className="py-20 px-6 bg-[#F4F0E8] border-b-4 border-[#626A67]">
      <div className="max-w-7xl mx-auto space-y-16 font-mono">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase text-[#111827]">
              Productivity Statistics
            </h2>
            <p className="text-sm text-[#4B5563]">
              Real-time analytics gathered from our system logs. View total tasks, user engagement rates, and progress distributions.
            </p>
          </div>
          <button
            onClick={fetchStatistics}
            className="flex items-center gap-2 px-4 py-2 border-2 border-[#626A67] bg-white rounded-lg shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] transition-all text-xs font-bold text-[#111827]"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Logs
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric 1 */}
          <Card className="bg-[#74E7E0] hover:scale-[1.02] border-2 border-[#626A67]" hoverable={false}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase text-[#111827]">Total Tasks</span>
              <BarChart3 className="h-5 w-5 text-[#111827]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-sans font-extrabold text-[#111827]">
                {loading ? '...' : stats?.totalTasks ?? 0}
              </span>
            </div>
          </Card>

          {/* Metric 2 */}
          <Card className="bg-[#E7FF72] hover:scale-[1.02] border-2 border-[#626A67]" hoverable={false}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase text-[#111827]">Tasks Completed</span>
              <CheckSquare className="h-5 w-5 text-[#111827]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-sans font-extrabold text-[#111827]">
                {loading ? '...' : stats?.completedTasks ?? 0}
              </span>
            </div>
          </Card>

          {/* Metric 3 */}
          <Card className="bg-[#ffffff] hover:scale-[1.02] border-2 border-[#626A67]" hoverable={false}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase text-[#111827]">Active Users</span>
              <Users className="h-5 w-5 text-[#111827]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-sans font-extrabold text-[#111827]">
                {loading ? '...' : stats?.activeUsers ?? 0}
              </span>
            </div>
          </Card>

          {/* Metric 4 */}
          <Card className="bg-[#a78bfa] hover:scale-[1.02] border-2 border-[#626A67] text-white" hoverable={false}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase">Avg Progress</span>
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-sans font-extrabold">
                {loading ? '...' : `${stats?.avgCompletionRate ?? 0}%`}
              </span>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        {!loading && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Bar Chart: Tasks by Category */}
            <div className="lg:col-span-8 bg-white border-2 border-[#626A67] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
              <h3 className="text-sm font-bold uppercase text-[#111827] mb-6 border-b pb-2 border-gray-200">
                📊 Tasks by Category
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#626A67" fontSize={11} tickLine={false} />
                    <YAxis stroke="#626A67" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#F4F0E8',
                        border: '2px solid #626A67',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#111827',
                      }}
                    />
                    <Bar dataKey="value" fill="#74E7E0" stroke="#626A67" strokeWidth={1.5}>
                      {stats.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart: Status Distribution */}
            <div className="lg:col-span-4 bg-white border-2 border-[#626A67] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
              <h3 className="text-sm font-bold uppercase text-[#111827] mb-6 border-b pb-2 border-gray-200">
                🥧 Status Distribution
              </h3>
              <div className="h-80 w-full flex flex-col justify-between">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F4F0E8',
                          border: '2px solid #626A67',
                          borderRadius: '8px',
                          fontFamily: 'monospace',
                          fontSize: '11px',
                        }}
                      />
                      <Pie
                        data={stats.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats.statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#626A67" strokeWidth={1.5} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-xs mt-2 border-t border-dashed border-gray-200 pt-3">
                  {stats.statusData.map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded border border-[#626A67]" style={{ backgroundColor: PIE_COLORS[idx] }}></span>
                      <span className="text-[10px] font-bold text-gray-600">{item.name} ({item.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart: Completion Trend */}
            <div className="lg:col-span-12 bg-white border-2 border-[#626A67] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#626A67]">
              <h3 className="text-sm font-bold uppercase text-[#111827] mb-6 border-b pb-2 border-gray-200">
                📈 Task Completion Trend (Last 7 Days)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.completionTrend} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <XAxis dataKey="date" stroke="#626A67" fontSize={11} tickLine={false} />
                    <YAxis stroke="#626A67" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#F4F0E8',
                        border: '2px solid #626A67',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#111827',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#a78bfa"
                      strokeWidth={3}
                      dot={{ r: 5, strokeWidth: 2, stroke: '#626A67', fill: '#ffffff' }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Statistics;
