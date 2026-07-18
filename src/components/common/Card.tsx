import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = true,
}) => {
  const baseStyle = 'bg-[#F4F0E8] border-2 border-[#626A67] rounded-2xl p-6';
  const shadowStyle = 'shadow-[4px_4px_0px_0px_#626A67]';
  const hoverStyle = hoverable
    ? 'transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#626A67]'
    : '';
  const clickStyle = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${shadowStyle} ${hoverStyle} ${clickStyle} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
