'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, User as UserIcon, Plus, CheckSquare } from 'lucide-react';
import Button from '../common/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handleToggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleToggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const isActive = (path: string) => pathname === path;

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'About', href: '/about' },
  ];

  const privateLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Add Task', href: '/tasks/add' },
    { label: 'My Tasks', href: '/tasks/manage' },
  ];

  const links = user ? privateLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-[#F4F0E8] border-b-2 border-[#626A67] px-4 sm:px-6 py-3 font-mono">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#74E7E0] p-1.5 border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_#626A67] transition-all">
            <CheckSquare className="h-5 w-5 text-[#111827]" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-[#111827] uppercase">
            Eventify
          </span>
        </Link>

        {/* Desktop Menu links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 hover:text-[#74E7E0] ${
                isActive(link.href)
                  ? 'text-[#111827] font-bold border-b-2 border-[#626A67]'
                  : 'text-[#4B5563]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Contact page link always available */}
          <Link
            href="/contact"
            className={`text-sm font-semibold transition-colors duration-150 py-1 hover:text-[#74E7E0] ${
              isActive('/contact')
                ? 'text-[#111827] font-bold border-b-2 border-[#626A67]'
                : 'text-[#4B5563]'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Action Buttons / User Info */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="flex items-center gap-2 border-2 border-[#626A67] bg-white rounded-lg p-1.5 shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] transition-all focus:outline-none"
              >
                {/* Avatar */}
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name}`}
                  alt={user.name}
                  className="h-7 w-7 rounded-full border border-[#626A67]"
                />
                <span className="text-xs font-semibold pr-1 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F4F0E8] border-2 border-[#626A67] rounded-xl shadow-[4px_4px_0px_0px_#626A67] py-2 z-50 text-[#111827]">
                  <div className="px-4 py-2 border-b border-[#626A67] text-xs">
                    <p className="font-semibold text-gray-500">Signed in as</p>
                    <p className="font-bold truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#E7FF72] text-[10px] font-bold border border-[#626A67] rounded-full uppercase">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/tasks/manage"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <CheckSquare className="h-4 w-4" /> My Tasks
                  </Link>
                  <Link
                    href="/tasks/add"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Task
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-red-100 hover:text-red-600 border-t border-[#626A67] text-left transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={handleToggleMobileMenu}
            className="p-1.5 border-2 border-[#626A67] rounded-lg bg-white shadow-[2px_2px_0px_0px_#626A67] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#626A67] mt-3 pt-3 flex flex-col gap-3 pb-2 transition-all">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold p-2 rounded-lg hover:bg-gray-200 ${
                isActive(link.href) ? 'bg-gray-200 border-l-4 border-[#626A67] pl-3' : 'text-[#4B5563]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-semibold p-2 rounded-lg hover:bg-gray-200 ${
              isActive('/contact') ? 'bg-gray-200 border-l-4 border-[#626A67] pl-3' : 'text-[#4B5563]'
            }`}
          >
            Contact
          </Link>

          <hr className="border-[#626A67] my-1" />

          {user ? (
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border border-[#626A67]"
                />
                <div className="text-xs">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-gray-500 truncate text-[10px]">{user.email}</p>
                </div>
              </div>
              <Link href="/tasks/manage" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckSquare className="h-4 w-4" /> My Tasks
                </Button>
              </Link>
              <Link href="/tasks/add" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4" /> Add Task
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="secondary" size="sm" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
