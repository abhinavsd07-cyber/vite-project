import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const RightDrawer = ({ isOpen, onClose, title, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div 
        className={`relative w-full max-w-[600px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <button 
             onClick={onClose}
             className="p-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
             <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto w-full">
           {children}
        </div>
      </div>
    </div>
  );
};
