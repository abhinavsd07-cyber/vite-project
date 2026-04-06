import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const RightDrawer = ({ isOpen, onClose, title, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = (e) => {
    if (!isOpen && e.target === e.currentTarget) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div 
        className={`relative w-full max-w-[600px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between shrink-0">
          <h2 className="text-[19px] font-semibold text-slate-700 tracking-tight">{title}</h2>
          <button 
             onClick={onClose}
             className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
             <X size={20} strokeWidth={2} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto w-full">
           {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
