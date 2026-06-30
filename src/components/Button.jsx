import React from 'react';

export default function Button({ children, variant = 'primary', onClick, className = '' }) {
  const baseStyles = "flex items-center justify-between gap-4 font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200";
  
  const variants = {
    primary: "bg-[#333333] text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] hover:bg-black active:scale-[0.98]",
    secondary: "border-2 border-black bg-white text-black hover:bg-neutral-100 active:scale-[0.98]"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}