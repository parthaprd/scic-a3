import React from 'react';
import { UserPlus, PlusCircle, Award, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <UserPlus className="h-6 w-6 text-[#111827]" />,
      title: 'Create Account',
      description: 'Sign up in seconds. Instantly toggle between User or Admin modes depending on your requirements.',
    },
    {
      num: '02',
      icon: <PlusCircle className="h-6 w-6 text-[#111827]" />,
      title: 'Add Tasks',
      description: 'Define your tasks, choose categories, write descriptions, specify tags, and set future due dates.',
    },
    {
      num: '03',
      icon: <Award className="h-6 w-6 text-[#111827]" />,
      title: 'Stay Productive',
      description: 'Review details, transition status variables in real time, export CSV lists, and observe productivity metrics.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#E7FF72] border-b-4 border-[#626A67] bg-grid">
      <div className="max-w-7xl mx-auto space-y-16 font-mono text-[#111827]">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase">
            How It Works
          </h2>
          <p className="text-sm">
            Three simple, structured processes to start coordinating task workspaces like a professional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center bg-[#F4F0E8] border-2 border-[#626A67] p-8 rounded-2xl shadow-[4px_4px_0px_0px_#626A67] group hover:translate-y-[-2px] transition-all">
              {/* Step Number Tag */}
              <span className="absolute top-4 right-4 text-3xl font-extrabold text-[#626A67]/20 font-sans">
                {step.num}
              </span>

              {/* Icon Container */}
              <div className="w-14 h-14 bg-[#74E7E0] border-2 border-[#626A67] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#626A67] -mt-12 mb-6 transform group-hover:rotate-6 transition-transform">
                {step.icon}
              </div>

              <h3 className="text-base font-bold mb-3">{step.title}</h3>
              <p className="text-xs text-center text-[#4B5563] leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
