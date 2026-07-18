'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../common/Button';
import { ArrowRight, Play, CheckCircle, Clock, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Hero: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center bg-[#E7FF72] border-b-4 border-[#626A67] py-12 px-6 overflow-hidden bg-grid">
      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#74E7E0] border-2 border-[#626A67] rounded-xl shadow-[4px_4px_0px_0px_#626A67] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#F4F0E8] border-2 border-[#626A67] rounded-full shadow-[4px_4px_0px_0px_#626A67] opacity-15"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 space-y-6 text-[#111827]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#626A67] rounded-full text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#626A67]">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            NEXUS ENGINE v2.0 INSTALLED
          </div>
          
          <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
            Organize Your <br />
            <span className="bg-[#74E7E0] px-2 py-0.5 border-2 border-[#626A67] inline-block shadow-[3px_3px_0px_0px_#626A67] transform rotate-[-1.5deg]">
              Tasks Efficiently
            </span>
          </h1>

          <p className="font-mono text-sm sm:text-base md:text-md text-[#4B5563] max-w-xl leading-relaxed">
            Simple, powerful task management for busy people. Secure authorization, deep query searching, category tagging, and automatic progress trends in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href={user ? '/tasks/manage' : '/register'}>
              <Button size="lg" icon={<ArrowRight className="h-5 w-5" />} className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" icon={<Play className="h-4 w-4" />} className="w-full sm:w-auto bg-[#F4F0E8]">
                See How It Works
              </Button>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Mockup Card */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="w-full max-w-[420px] bg-[#F4F0E8] border-2 border-[#626A67] rounded-2xl p-6 shadow-[8px_8px_0px_0px_#626A67] font-mono transform rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
            <div className="flex justify-between items-center mb-6 border-b-2 border-[#626A67] pb-3">
              <div className="flex gap-2">
                <span className="w-3 w-3 h-3 bg-red-400 border border-[#626A67] rounded-full inline-block"></span>
                <span className="w-3 w-3 h-3 bg-yellow-400 border border-[#626A67] rounded-full inline-block"></span>
                <span className="w-3 w-3 h-3 bg-green-400 border border-[#626A67] rounded-full inline-block"></span>
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-500">task_workspace.sys</span>
            </div>

            {/* Mock Task List */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#626A67] p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#626A67] flex justify-between items-center hover:translate-x-[-1px] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-[#E7FF72] border border-[#626A67] rounded-lg">
                    <CheckCircle className="h-4 w-4 text-[#111827]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold truncate max-w-[180px]">Deploy Next.js build</h4>
                    <p className="text-[9px] text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" /> In Progress</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[8px] font-bold border border-[#626A67] rounded-full">HIGH</span>
              </div>

              <div className="bg-white border-2 border-[#626A67] p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#626A67] flex justify-between items-center hover:translate-x-[-1px] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-[#74E7E0] border border-[#626A67] rounded-lg">
                    <CheckCircle className="h-4 w-4 text-[#111827]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold truncate max-w-[180px]">Design system guidelines</h4>
                    <p className="text-[9px] text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" /> Completed</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[8px] font-bold border border-[#626A67] rounded-full">LOW</span>
              </div>

              <div className="bg-white border-2 border-[#626A67] p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#626A67] flex justify-between items-center opacity-70">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-gray-200 border border-[#626A67] rounded-lg">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold line-through text-gray-400 truncate max-w-[180px]">Setup git workspace</h4>
                    <p className="text-[9px] text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" /> Completed</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[8px] font-bold border border-[#626A67] rounded-full">MEDIUM</span>
              </div>
            </div>

            {/* Micro stats indicators */}
            <div className="flex justify-between items-center mt-6 pt-3 border-t border-dashed border-[#626A67] text-[10px]">
              <span className="flex items-center gap-1 font-bold text-gray-600"><Star className="h-3.5 w-3.5 fill-[#74E7E0]" /> 86% Done</span>
              <span className="bg-[#74E7E0] border border-[#626A67] px-2 py-0.5 rounded font-bold uppercase text-[8px]">6 Tasks Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
