import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Contenedor Expandido Premium Neo-brutalista */}
      <div className="bg-white border-2 border-black p-6 md:p-10 rounded-3xl max-w-5xl w-full relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black text-lg font-bold transition-colors p-2 z-20"
        >
          ✕
        </button>

        {/* Contenido */}
        {children}
      </div>
    </div>
  );
}