import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const RightDrawer = ({ isOpen, onClose, title, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`relative w-full max-w-[520px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between shrink-0 border-b border-gray-100">
          <h2 className="text-[16px] font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
