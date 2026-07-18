'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { CheckSquare, AlertCircle, User, Mail, Lock, Shield } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validateFields();
  }, [name, email, password, confirmPassword, agreeTerms]);

  const validateFields = () => {
    const errs: Record<string, string> = {};

    if (name && name.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }

    if (password && password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (confirmPassword && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const errs: Record<string, string> = {};
    if (!name || name.length < 2) errs.name = 'Name is required (min 2 chars).';
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required.';
    if (!password || password.length < 6) errs.password = 'Password is required (min 6 chars).';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords must match.';
    if (!agreeTerms) errs.agreeTerms = 'You must agree to the Terms & Conditions.';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password, role });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. User may already exist.';
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 bg-[#74E7E0] bg-grid min-h-[85vh]">
      <Card className="w-full max-w-[440px] bg-[#F4F0E8] border-2 border-[#626A67] p-8 rounded-2xl shadow-[6px_6px_0px_0px_#626A67] font-mono">
        <div className="text-center space-y-2 mb-6 border-b-2 border-[#626A67] pb-4">
          <div className="inline-flex p-2 bg-[#E7FF72] border-2 border-[#626A67] rounded-xl shadow-[2px_2px_0px_0px_#626A67] mb-2">
            <CheckSquare className="h-6 w-6 text-[#111827]" />
          </div>
          <h2 className="font-sans font-bold text-2xl uppercase text-[#111827]">Create Account</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Join our task board system</p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 border-2 border-red-500 p-3 rounded-lg text-red-700 text-xs font-bold mb-5 flex gap-2 items-start">
            <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <div>
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`neo-input text-xs pl-9 ${formErrors.name ? 'border-red-500' : ''}`}
                disabled={loading}
                required
              />
            </div>
            {formErrors.name && (
              <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {formErrors.name}
              </p>
            )}
          </div>

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
                placeholder="john@example.com"
                className={`neo-input text-xs pl-9 ${formErrors.email ? 'border-red-500' : ''}`}
                disabled={loading}
                required
              />
            </div>
            {formErrors.email && (
              <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {formErrors.email}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider block">Choose Role</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Shield className="h-4 w-4" />
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
                className="w-full pl-9 pr-4 py-2 bg-white border-2 border-[#626A67] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#74E7E0] text-[#111827] focus:shadow-[2px_2px_0px_0px_#626A67]"
                disabled={loading}
              >
                <option value="user">User (Standard Access)</option>
                <option value="admin">Admin (Manage All Controls)</option>
              </select>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  required
                />
              </div>
              {formErrors.password && (
                <p className="text-[9px] text-red-600 font-bold">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider block">Confirm</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`neo-input text-xs pl-9 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                  disabled={loading}
                  required
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="text-[9px] text-red-600 font-bold">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-1 pt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] leading-snug">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-[#626A67] text-[#74E7E0] focus:ring-0 w-4 h-4 mt-0.5"
                required
              />
              <span className="font-semibold text-gray-600">
                I agree to the <a href="#" className="font-bold underline text-[#111827]">Terms &amp; Conditions</a> and data security declarations.
              </span>
            </label>
            {formErrors.agreeTerms && (
              <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {formErrors.agreeTerms}
              </p>
            )}
          </div>

          <Button type="submit" variant="secondary" loading={loading} className="w-full py-2.5">
            Register
          </Button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-600 border-t border-gray-300 pt-4">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#74E7E0] hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
