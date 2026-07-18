'use client';

import React, { useState } from 'react';
import Button from '../common/Button';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Mail, Check, AlertCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 px-6 bg-[#74E7E0] border-b-4 border-[#626A67]">
      <div className="max-w-4xl mx-auto text-center space-y-8 font-mono text-[#111827]">
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase">Stay Updated</h2>
          <p className="text-sm text-[#4B5563] max-w-xl mx-auto">
            Get email digests on task productivity, system updates, and tips for working with brutalist design workspaces.
          </p>
        </div>

        {/* Subscribe form */}
        <div className="max-w-md mx-auto">
          {subscribed ? (
            <div className="bg-[#F4F0E8] border-2 border-[#626A67] p-4 rounded-xl shadow-[3px_3px_0px_0px_#626A67] flex items-center justify-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-xs font-bold">Successfully logged subscription log. Welcome!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#626A67] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#E7FF72] focus:shadow-[2px_2px_0px_0px_#626A67] text-[#111827]"
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
              {error && (
                <p className="text-[10px] text-red-600 font-bold flex items-center gap-1 justify-center">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </p>
              )}
            </form>
          )}
        </div>

        <div className="pt-8 border-t border-dashed border-[#626A67]/40">
          <h3 className="font-sans font-extrabold text-xl uppercase mb-4">Start Managing Tasks Today</h3>
          <Link href={user ? '/tasks/manage' : '/register'}>
            <Button size="lg" variant="outline" className="bg-[#F4F0E8]">
              {user ? 'Go to My Tasks' : 'Register Now'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;
