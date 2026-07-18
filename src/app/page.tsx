'use client';

import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import Statistics from '../components/home/Statistics';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Section */}
      <Features />

      {/* 3. Categories Showcase */}
      <Categories />

      {/* 4. Statistics with Recharts */}
      <Statistics />

      {/* 5. How It Works Steps */}
      <HowItWorks />

      {/* 6. User Testimonials */}
      <Testimonials />

      {/* 7. Accordion FAQs */}
      <FAQ />

      {/* 8. Newsletter Email Capture */}
      <Newsletter />
    </div>
  );
}
