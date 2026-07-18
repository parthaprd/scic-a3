import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 4,
  height = 'h-32',
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#e4dfd7] border-2 border-[#626A67] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#626A67] animate-pulse flex flex-col justify-between h-[320px]"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-20 bg-[#c4beb5] rounded-full border border-[#626A67]"></div>
              <div className="h-4 w-4 bg-[#c4beb5] rounded-full border border-[#626A67]"></div>
            </div>
            <div className="h-6 bg-[#c4beb5] rounded w-3/4 mb-3 border border-[#626A67]"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[#c4beb5] rounded w-full"></div>
              <div className="h-3 bg-[#c4beb5] rounded w-5/6"></div>
              <div className="h-3 bg-[#c4beb5] rounded w-2/3"></div>
            </div>
          </div>
          <div>
            <hr className="border-[#626A67] my-4" />
            <div className="flex justify-between items-center">
              <div className="h-5 w-16 bg-[#c4beb5] rounded"></div>
              <div className="h-8 w-24 bg-[#c4beb5] rounded border border-[#626A67]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
