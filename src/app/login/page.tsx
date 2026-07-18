'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Lock, Mail, CheckSquare, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) {
      errs.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Email is invalid.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!validate()) return;

    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setEmail('demo@example.com');
      setPassword('demo123');
    } else {
      setEmail('admin@example.com');
      setPassword('admin123');
    }
    // Auto clear warnings
    setFormErrors({});
    setErrors([]);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 bg-[#E7FF72] bg-grid min-h-[80vh]">
      <Card className="w-full max-w-[420px] bg-[#F4F0E8] border-2 border-[#626A67] p-8 rounded-2xl shadow-[6px_6px_0px_0px_#626A67] font-mono">
        <div className="text-center space-y-2 mb-8 border-b-2 border-[#626A67] pb-4">
          <div className="inline-flex p-2 bg-[#74E7E0] border-2 border-[#626A67] rounded-xl shadow-[2px_2px_0px_0px_#626A67] mb-2">
            <CheckSquare className="h-6 w-6 text-[#111827]" />
          </div>
          <h2 className="font-sans font-bold text-2xl uppercase text-[#111827]">Welcome Back</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Access your task workspace</p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 border-2 border-red-500 p-3 rounded-lg text-red-700 text-xs font-bold mb-6 flex gap-2 items-start">
            <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <div>
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className={`neo-input text-xs pl-9 ${formErrors.email ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {formErrors.email && (
              <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {formErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider block">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`neo-input text-xs pl-9 ${formErrors.password ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {formErrors.password && (
              <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {formErrors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-4 h-4"
              />
              <span className="font-bold text-gray-600">Remember Me</span>
            </label>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full py-2.5">
            Log In
          </Button>
        </form>

        {/* Demo Logins */}
        <div className="mt-6 border-t-2 border-[#626A67] border-dashed pt-4 space-y-2">
          <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block text-center">
            Zero-Setup Sandbox Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('user')}
              className="py-1.5 px-3 bg-[#74E7E0] border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] active:translate-x-0 active:translate-y-0 text-[10px] font-bold text-[#111827] cursor-pointer"
            >
              👤 Demo User
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-1.5 px-3 bg-[#E7FF72] border-2 border-[#626A67] rounded-lg shadow-[2px_2px_0px_0px_#626A67] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#626A67] active:translate-x-0 active:translate-y-0 text-[10px] font-bold text-[#111827] cursor-pointer"
            >
              ⚡ Demo Admin
            </button>
          </div>
        </div>

        {/* Divider & registration link */}
        <div className="text-center mt-6 text-xs text-gray-600 border-t border-gray-300 pt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-[#74E7E0] hover:underline">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}
