import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export const Toggle = ({ initialState = false, onChange, disabled = false }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    setIsChecked(initialState);
  }, [initialState]);

  const toggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) onChange(newState);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        isChecked ? "bg-[#34d399]" : "bg-slate-200", // Tailwind emerald-400 equivalent for that green
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          isChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};
