import React, { InputHTMLAttributes, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const renderLabel = () => {
      if (!label) return null;
      if (label.endsWith(' *')) {
        const mainText = label.slice(0, -2);
        return (
          <label className="text-sm font-semibold text-text-secondary mb-1.5 select-none">
            {mainText}{' '}
            <span className="text-destructive font-bold select-none">*</span>
          </label>
        );
      }
      return (
        <label className="text-sm font-semibold text-text-secondary mb-1.5 select-none">
          {label}
        </label>
      );
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {renderLabel()}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={twMerge(
              clsx(
                'w-full px-3 py-2 border border-border-default rounded-lg shadow-sm bg-background-surface text-text-primary placeholder:text-text-muted text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
                error && 'border-destructive focus-visible:ring-destructive',
                isPassword && 'pr-10',
                className
              )
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-destructive font-medium mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150 block">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
