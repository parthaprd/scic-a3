import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Link from 'next/link';
import { Target, Users, Landmark, Flame, Compass, ChevronRight } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Samnang Aing',
      role: 'Founding Engineer & Designer',
      bio: 'Creator of the Nexus interface. Specializes in dithered canvas effects, high-contrast layouts, and WebGL depth layers.',
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Sam',
    },
    {
      name: 'Linus W.',
      role: 'Principal Backend Developer',
      bio: 'Enforces JWT authorization systems, rate limits, schema constraints, and database fallback architectures.',
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Linus',
    },
    {
      name: 'Ada Lovelace',
      role: 'Product Lead',
      bio: 'Oversees visual hierarchy, section rhythm, customer testimonials, and user statistics analysis dashboards.',
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Ada',
    },
  ];

  const timeline = [
    { year: '2026-05', title: 'Nexus Effect Drafted', text: 'Samnang Aing publishes initial semantic design guidelines, focusing on #74E7E0 and #E7FF72 dithered styles.' },
    { year: '2026-06', title: 'Express & DB Failbacks Integrated', text: ' Linus implements file-system JSON fallback mechanisms so that servers compile out-of-the-box.' },
    { year: '2026-07', title: 'Next.js App Router Release', text: 'Eventify releases its full React App Router platform, fully loaded with Recharts visualization widgets.' },
  ];

  return (
    <div className="flex-grow max-w-5xl mx-auto w-full py-16 px-4 sm:px-6 space-y-16 font-mono text-[#111827]">
      {/* Page Title */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1 bg-[#E7FF72] border-2 border-[#626A67] px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_#626A67]">
          About Our Platform
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-4xl uppercase">The Eventify Mission</h1>
        <p className="text-sm text-gray-500">
          Blending raw technical aesthetics with premium user productivity tracking. Engineered to be zero-configuration and context-aware.
        </p>
      </div>

      {/* Grid: Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <Card className="flex flex-col gap-4 border-2 border-[#626A67] bg-[#74E7E0] hover:translate-x-0" hoverable={false}>
          <div className="w-10 h-10 bg-white border-2 border-[#626A67] rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#626A67]">
            <Target className="h-5 w-5 text-[#111827]" />
          </div>
          <h2 className="font-sans font-bold text-lg uppercase">Our Target</h2>
          <p className="text-xs leading-relaxed font-sans text-gray-700">
            We aim to remove the bloat from standard task software. No heavy animations, no complex nested options, and no subscription walls. Instead, we offer a clean, robust, high-performance dashboard that gives project architects clear control over their timelines.
          </p>
        </Card>

        <Card className="flex flex-col gap-4 border-2 border-[#626A67] bg-[#E7FF72] hover:translate-x-0" hoverable={false}>
          <div className="w-10 h-10 bg-white border-2 border-[#626A67] rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#626A67]">
            <Flame className="h-5 w-5 text-[#111827]" />
          </div>
          <h2 className="font-sans font-bold text-lg uppercase">Core Values</h2>
          <p className="text-xs leading-relaxed font-sans text-gray-700">
            Design honesty, performance stability, and local-first execution. Whether you have MongoDB running locally, in Atlas, or offline, the platform relies on isolated fallbacks to continue executing operations without system crashes.
          </p>
        </Card>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8 pt-8">
        <h2 className="font-sans font-bold text-xl uppercase text-center border-b border-[#626A67] pb-2 max-w-xs mx-auto">
          Development Timeline
        </h2>
        <div className="relative border-l-2 border-[#626A67] max-w-xl mx-auto pl-6 space-y-8 font-sans">
          {timeline.map((time, idx) => (
            <div key={idx} className="relative">
              {/* timeline point dot */}
              <span className="absolute -left-[31px] top-1 w-4 h-4 bg-[#74E7E0] border-2 border-[#626A67] rounded-full"></span>
              <span className="text-[10px] font-bold font-mono bg-white border border-[#626A67] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#626A67]">
                {time.year}
              </span>
              <h3 className="text-sm font-bold mt-2 text-[#111827] uppercase font-mono">{time.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{time.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8 pt-8">
        <h2 className="font-sans font-bold text-xl uppercase text-center">Meet The Workspace Architects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="flex flex-col gap-4 border-2 border-[#626A67] bg-white text-[#111827] hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 border-2 border-[#626A67] bg-[#E7FF72] rounded-xl shadow-[2px_2px_0px_0px_#626A67]"
                />
                <div>
                  <h3 className="text-sm font-bold uppercase">{member.name}</h3>
                  <p className="text-[9px] font-bold text-[#74E7E0] bg-[#111827] px-1.5 py-0.2 w-fit rounded uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                {member.bio}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="bg-[#111827] border-4 border-[#626A67] p-8 rounded-2xl text-center shadow-[6px_6px_0px_0px_#626A67] text-[#F4F0E8] space-y-4">
        <h3 className="font-sans font-bold text-lg uppercase text-[#E7FF72]">Start Coordinating Work</h3>
        <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto">
          Create accounts, register workspace tasks, and query productivity metrics.
        </p>
        <Link href="/register" className="inline-block pt-2">
          <Button variant="primary" size="md">
            Join the Workspace &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
