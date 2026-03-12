import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  disabled = false,
                                                  type = 'button',
                                                  className = '',
                                              }) => {
    const baseStyles = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </button>
    );
};