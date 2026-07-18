import React from 'react';
import { PencilLine, Search, BarChart3, Tag, Calendar, Activity } from 'lucide-react';
import Card from '../common/Card';

export const Features: React.FC = () => {
  const items = [
    {
      icon: <PencilLine className="h-6 w-6 text-[#111827]" />,
      title: '📝 Easy Task Creation',
      description: 'Quickly define tasks, set descriptions, add custom tag badges, and attach document references in seconds.',
    },
    {
      icon: <Search className="h-6 w-6 text-[#111827]" />,
      title: '🔍 Smart Filtering',
      description: 'Filter instantly by status flags, priority levels, categories, and due dates via our custom left sidebars.',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-[#111827]" />,
      title: '📊 Progress Tracking',
      description: 'Track your milestones and observe automatic calculations of completion ratios and due schedules.',
    },
    {
      icon: <Tag className="h-6 w-6 text-[#111827]" />,
      title: '🏷️ Category Management',
      description: 'Organize tasks under specific areas like Work, Personal, Shopping, Health, Finance, and Education.',
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#111827]" />,
      title: '⏰ Due Date Reminders',
      description: 'Set clear future due dates with real-time indicators to keep items from slipping past their schedules.',
    },
    {
      icon: <Activity className="h-6 w-6 text-[#111827]" />,
      title: '📈 Productivity Analytics',
      description: 'Visualize your performance with automated Recharts showing status lists, trends, and category counts.',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 bg-[#F4F0E8] border-b-4 border-[#626A67]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase">
            Powerful Workspace Features
          </h2>
          <p className="font-mono text-sm text-[#4B5563]">
            Everything you need to orchestrate projects, personal milestones, and team items in a solid technical environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feat, index) => (
            <Card key={index} className="flex flex-col justify-between hover:border-black font-mono">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#74E7E0] border-2 border-[#626A67] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#626A67] transform rotate-[-2deg]">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-[#111827]">{feat.title}</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed font-sans">{feat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
