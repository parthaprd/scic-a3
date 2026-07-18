'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, User, ShoppingCart, Activity, DollarSign, BookOpen, Layers } from 'lucide-react';
import Card from '../common/Card';

export const Categories: React.FC = () => {
  const categoriesList = [
    { name: 'Work', icon: <Briefcase className="h-5 w-5" />, bg: 'bg-blue-100 text-blue-800', desc: '💼 Projects & Software Dev' },
    { name: 'Personal', icon: <User className="h-5 w-5" />, bg: 'bg-purple-100 text-purple-800', desc: '🏠 Chores & Personal Milestones' },
    { name: 'Shopping', icon: <ShoppingCart className="h-5 w-5" />, bg: 'bg-green-100 text-green-800', desc: '🛒 Groceries & Audited Items' },
    { name: 'Health', icon: <Activity className="h-5 w-5" />, bg: 'bg-red-100 text-red-800', desc: '💪 Workouts, Health & Diet' },
    { name: 'Finance', icon: <DollarSign className="h-5 w-5" />, bg: 'bg-yellow-100 text-yellow-800', desc: '💰 Bills, Budgets & Expenses' },
    { name: 'Education', icon: <BookOpen className="h-5 w-5" />, bg: 'bg-indigo-100 text-indigo-800', desc: '📚 Classes, Lectures & Books' },
    { name: 'Other', icon: <Layers className="h-5 w-5" />, bg: 'bg-gray-100 text-gray-800', desc: '➕ Uncategorized Action Items' },
  ];

  return (
    <section className="py-20 px-6 bg-[#E7FF72] border-b-4 border-[#626A67] bg-grid">
      <div className="max-w-7xl mx-auto space-y-12 font-mono">
        <div className="text-center space-y-4 max-w-2xl mx-auto text-[#111827]">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase">
            Browse Task Categories
          </h2>
          <p className="text-sm">
            Focus on specific sectors of your productivity. Select a category below to explore existing tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <Link key={cat.name} href={`/tasks?category=${cat.name}`}>
              <Card className="h-full flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer bg-[#F4F0E8] border-2 border-[#626A67]">
                <div className="space-y-4">
                  <div className={`p-2 border-2 border-[#626A67] rounded-lg inline-flex items-center justify-center ${cat.bg} shadow-[2px_2px_0px_0px_#626A67]`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827]">{cat.name}</h3>
                  <p className="text-xs text-gray-500 font-sans">{cat.desc}</p>
                </div>
                <div className="text-xs font-bold text-[#74E7E0] hover:underline pt-4 flex items-center gap-1">
                  View Tasks &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
