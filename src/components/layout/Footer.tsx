import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] border-t-4 border-[#626A67] text-[#F4F0E8] py-16 px-6 font-mono mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: About */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#74E7E0] p-1.5 border-2 border-[#626A67] rounded-lg">
              <CheckSquare className="h-5 w-5 text-[#111827]" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight uppercase">Eventify</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            A premium, high-contrast neo-brutalist task management workspace. Organize your software projects, personal items, weekly shopping, and daily workouts in context.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#626A67] border-2 border-white rounded-lg hover:bg-[#74E7E0] hover:text-[#111827] transition-all hover:translate-y-[-2px]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#626A67] border-2 border-white rounded-lg hover:bg-[#74E7E0] hover:text-[#111827] transition-all hover:translate-y-[-2px]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#626A67] border-2 border-white rounded-lg hover:bg-[#74E7E0] hover:text-[#111827] transition-all hover:translate-y-[-2px]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#626A67] border-2 border-white rounded-lg hover:bg-[#74E7E0] hover:text-[#111827] transition-all hover:translate-y-[-2px]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-[#E7FF72] border-b border-[#626A67] pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#74E7E0] transition-colors">
                &gt; Home
              </Link>
            </li>
            <li>
              <Link href="/tasks" className="hover:text-[#74E7E0] transition-colors">
                &gt; Tasks
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#74E7E0] transition-colors">
                &gt; About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#74E7E0] transition-colors">
                &gt; Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="space-y-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-[#E7FF72] border-b border-[#626A67] pb-2">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/tasks?category=Work" className="hover:text-[#74E7E0] transition-colors">
                &gt; Work Tasks
              </Link>
            </li>
            <li>
              <Link href="/tasks?category=Personal" className="hover:text-[#74E7E0] transition-colors">
                &gt; Personal Tasks
              </Link>
            </li>
            <li>
              <Link href="/tasks?category=Shopping" className="hover:text-[#74E7E0] transition-colors">
                &gt; Shopping Lists
              </Link>
            </li>
            <li>
              <Link href="/tasks?category=Health" className="hover:text-[#74E7E0] transition-colors">
                &gt; Health & Gym
              </Link>
            </li>
            <li>
              <Link href="/tasks?category=Finance" className="hover:text-[#74E7E0] transition-colors">
                &gt; Finance & Bills
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-[#E7FF72] border-b border-[#626A67] pb-2">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-sans">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-[#74E7E0] flex-shrink-0 mt-0.5" />
              <span>100 Innovation Way, Suite A, Metro City</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4.5 w-4.5 text-[#74E7E0] flex-shrink-0" />
              <span>+1 (555) 349-2026</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4.5 w-4.5 text-[#74E7E0] flex-shrink-0" />
              <span>support@eventify.io</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#626A67] mt-12 pt-8 text-center text-xs text-gray-500 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {currentYear} Eventify Task Workspace. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
