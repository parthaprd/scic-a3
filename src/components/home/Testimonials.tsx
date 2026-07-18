import React from 'react';
import Card from '../common/Card';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Connor',
      role: 'Project Director',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      text: 'The high-contrast layouts and responsive list view saved our team hours. Being able to filter tags and download task tables in one click is awesome!',
    },
    {
      name: 'Alex Mercer',
      role: 'Lead Architect',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      text: 'I love the mono fonts and flat shadow buttons. It feels extremely premium and runs incredibly fast. The local database fallback is genius for local testing.',
    },
    {
      name: 'Elena Fisher',
      role: 'Creative Designer',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      text: 'The Recharts charts on the dashboard are so readable. The status pie distribution tells me exactly where our bottlenecks are. Highly recommended!',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#F4F0E8] border-b-4 border-[#626A67]">
      <div className="max-w-7xl mx-auto space-y-16 font-mono text-[#111827]">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl uppercase">
            User Testimonials
          </h2>
          <p className="text-sm text-[#4B5563]">
            See how researchers, developers, and project managers organize work using Eventify.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <Card key={idx} className="flex flex-col justify-between hover:scale-102 border-2 border-[#626A67]">
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[#E7FF72] text-[#111827]" />
                  ))}
                </div>
                <p className="text-xs italic text-[#4B5563] leading-relaxed font-sans">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-dashed border-[#626A67] mt-6">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-10 w-10 rounded-full border-2 border-[#626A67] bg-[#74E7E0]"
                />
                <div>
                  <h4 className="text-xs font-bold">{rev.name}</h4>
                  <p className="text-[10px] text-gray-500 font-sans">{rev.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
