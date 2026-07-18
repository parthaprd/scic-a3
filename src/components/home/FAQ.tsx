'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What is Eventify Task Management System?',
      a: 'Eventify is a premium task workspace utilizing the Nexus design architecture. It allows users to register, log in, create, edit, filter, search, and manage project deliverables.',
    },
    {
      q: 'Is it free to use?',
      a: 'Yes, Eventify is fully open-source and free for developers and busy individuals to organize their daily workflows.',
    },
    {
      q: 'How do I create a task?',
      a: 'Once authenticated, click on "Add Task" in the sticky navbar navigation, fill in the title, category, priority, due date, and tags chips, then hit "Create Task". You will be redirected to your dashboard.',
    },
    {
      q: 'Can I filter tasks by category?',
      a: 'Absolutely! On the "Tasks" listing page, you can filter tasks by category, priority, status, and custom due date ranges using the collapsible left sidebar.',
    },
    {
      q: 'How secure is my data?',
      a: 'Our backend utilizes JWT (JSON Web Tokens) for route authorization and bcryptjs for password hashing. If MongoDB is offline, it automatically falls back to an isolated JSON local datastore in the workspace.',
    },
    {
      q: 'Can I export my tasks?',
      a: 'Yes! Inside the "My Tasks" protected manager panel, click on the "Export to CSV" button. It will generate a downloadable CSV of all tasks matching your current status list.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#E7FF72] border-b-4 border-[#626A67] bg-grid">
      <div className="max-w-3xl mx-auto space-y-12 font-mono text-[#111827]">
        <div className="text-center space-y-4">
          <h2 className="font-sans font-bold text-3xl uppercase">Frequently Asked Questions</h2>
          <p className="text-sm">Quick answers to common inquiries regarding the Eventify workspace.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F4F0E8] border-2 border-[#626A67] rounded-xl shadow-[2px_2px_0px_0px_#626A67] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4.5 w-4.5 text-[#626A67] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 text-[#626A67] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 border-t border-dashed border-[#626A67]">
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
