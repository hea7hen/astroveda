
import React from 'react';

export const Button: React.FC<{
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, className = '', variant = 'primary', children, disabled }) => {
  const base = "px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gold text-slate-900 hover:brightness-110 gold-glow",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-gold text-gold hover:bg-gold/10"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`glass p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
  />
);

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm text-slate-400 mb-2 uppercase tracking-widest">{children}</label>
);
