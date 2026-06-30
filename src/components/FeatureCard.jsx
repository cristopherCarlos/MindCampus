import React from 'react';

export default function FeatureCard({ id, title, desc, icon }) {
  return (
    <div className="bg-transparent border-2 border-black p-6 rounded-[2.5rem] flex flex-col justify-between h-48 hover:bg-white/60 transition-all duration-300 group">
      <div className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center bg-neutral-100/50 group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm text-neutral-900 mb-1">
          {id}. {title}
        </h3>
        <p className="text-xs text-neutral-500 leading-normal font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}