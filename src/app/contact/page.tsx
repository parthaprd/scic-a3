'use client';

import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Mail, Phone, MapPin, Clock, CheckSquare, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required.';
    if (!subject.trim()) errs.subject = 'Subject is required.';
    if (!message.trim() || message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setFormErrors({});
    }
  };

  return (
    <div className="flex-grow max-w-5xl mx-auto w-full py-16 px-4 sm:px-6 space-y-12 font-mono text-[#111827]">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1 bg-[#74E7E0] border-2 border-[#626A67] px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_#626A67]">
          Get in Touch
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-4xl uppercase">Contact Eventify Team</h1>
        <p className="text-sm text-gray-500">
          Have an inquiry, custom design feature proposal, or require administrative sandbox access? Drop us a log.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Maps Mockup */}
        <div className="lg:col-span-5 space-y-6">
          {/* Info Card */}
          <Card className="p-6 border-2 border-[#626A67] bg-[#F4F0E8] hover:translate-x-0" hoverable={false}>
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-6 border-b border-[#626A67]/20 pb-2">
              ☎️ Office Coordinates
            </h3>
            <ul className="space-y-4 text-xs font-sans text-gray-700">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-[#74E7E0] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#111827] block font-mono text-[10px] uppercase">Corporate Address</span>
                  <span>100 Innovation Way, Suite A, Metro City, NY 10001</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="h-5 w-5 text-[#74E7E0] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#111827] block font-mono text-[10px] uppercase">Phone Line</span>
                  <span>+1 (555) 349-2026</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="h-5 w-5 text-[#74E7E0] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#111827] block font-mono text-[10px] uppercase">Email Channel</span>
                  <span>support@eventify.io</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Clock className="h-5 w-5 text-[#74E7E0] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#111827] block font-mono text-[10px] uppercase">Office Hours</span>
                  <span>Mon - Fri, 09:00 AM - 05:00 PM EST</span>
                </div>
              </li>
            </ul>
          </Card>

          {/* Neo-brutalist Map Mockup */}
          <div className="relative h-64 bg-[#E7FF72] border-2 border-[#626A67] rounded-2xl shadow-[4px_4px_0px_0px_#626A67] overflow-hidden flex flex-col justify-end p-4 group">
            {/* Grid overlay for map visual */}
            <div className="absolute inset-0 bg-grid opacity-35"></div>

            {/* Mock roads */}
            <div className="absolute top-1/3 left-0 w-full h-8 bg-[#626A67]/20 border-y border-[#626A67]/40 transform -rotate-12"></div>
            <div className="absolute top-0 left-1/2 w-8 h-full bg-[#626A67]/20 border-x border-[#626A67]/40 transform rotate-45"></div>

            {/* Map pin */}
            <div className="absolute top-[45%] left-[45%] z-20 flex flex-col items-center">
              <div className="bg-[#74E7E0] text-[#111827] border-2 border-[#626A67] p-2 rounded-lg font-mono text-[8px] font-extrabold uppercase shadow-[2px_2px_0px_0px_#626A67] mb-1 animate-bounce">
                Eventify HQ
              </div>
              <div className="w-4 h-4 bg-red-500 border-2 border-[#626A67] rounded-full shadow-[1px_1px_0px_0px_#626A67]"></div>
            </div>

            {/* Controls overlay */}
            <div className="relative z-10 w-full bg-[#F4F0E8] border-2 border-[#626A67] p-2 rounded-lg shadow-[2px_2px_0px_0px_#626A67] text-[9px] font-bold text-center">
              📍 GEO LOC: 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8 border-2 border-[#626A67] bg-[#F4F0E8] hover:translate-x-0" hoverable={false}>
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-6 border-b border-[#626A67]/20 pb-2">
              ✉️ Send Log Message
            </h3>

            {submitted ? (
              <div className="bg-green-100 border-2 border-green-500 p-6 rounded-xl text-green-700 text-xs font-bold text-center space-y-3">
                <CheckSquare className="h-8 w-8 text-green-600 mx-auto" />
                <h4 className="uppercase text-sm">Message Logged Successfully</h4>
                <p className="font-sans text-gray-500 font-normal leading-relaxed">
                  Thank you! Your message has been logged in our customer contact logs. An operator will review it shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-1 px-4 bg-white border-2 border-[#626A67] rounded-lg text-xs font-bold text-[#111827] shadow-[2px_2px_0px_0px_#626A67] hover:translate-y-[-1px] cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name..."
                    className={`neo-input text-xs ${formErrors.name ? 'border-red-500' : ''}`}
                  />
                  {formErrors.name && (
                    <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className={`neo-input text-xs ${formErrors.email ? 'border-red-500' : ''}`}
                  />
                  {formErrors.email && (
                    <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider block">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Topic description..."
                    className={`neo-input text-xs ${formErrors.subject ? 'border-red-500' : ''}`}
                  />
                  {formErrors.subject && (
                    <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider block">Message (Min 10 Chars)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Provide detailed logs of your query..."
                    className={`neo-input text-xs font-sans ${formErrors.message ? 'border-red-500' : ''}`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="primary" className="w-full py-2.5">
                  Send Message Log &rarr;
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
