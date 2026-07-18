import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyle = 'neo-btn cursor-pointer inline-flex items-center justify-center gap-2 select-none';
  
  const variantStyles = {
    primary: 'neo-btn-primary hover:bg-[#5cd6ce]',
    secondary: 'neo-btn-secondary hover:bg-[#d4f04c]',
    outline: 'neo-btn-outline border-[#626A67]',
    danger: 'neo-btn-danger bg-red-500 hover:bg-red-600 text-white',
  };

  const sizeStyles = {
    sm: 'py-1.5 px-4 text-xs font-semibold rounded-lg',
    md: 'py-2.5 px-6 text-sm font-semibold rounded-lg',
    lg: 'py-3.5 px-8 text-base font-bold rounded-xl',
  };

  const stateStyles = loading || props.disabled ? 'opacity-70 cursor-not-allowed transform-none shadow-sm' : '';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${stateStyles} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
export default Button;
