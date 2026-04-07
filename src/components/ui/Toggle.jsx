import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export const Toggle = ({ initialState, checked, onChange, disabled = false }) => {
  const controlled = checked !== undefined;
  const [isChecked, setIsChecked] = useState(initialState ?? checked ?? false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (controlled) setIsChecked(checked);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (initialState !== undefined) setIsChecked(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, initialState]);

  const toggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    if (!controlled) setIsChecked(newState);
    if (onChange) onChange(newState);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
        isChecked ? "bg-emerald-400" : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200",
          isChecked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
};
