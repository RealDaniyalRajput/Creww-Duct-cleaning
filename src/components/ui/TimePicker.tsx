import React, { useState, useRef, useEffect } from 'react';
import { Clock, Check, ChevronDown } from 'lucide-react';

interface TimePickerProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (timeValue: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

interface TimeOption {
  value: string;
  label: string;
  badge?: string;
}

const PREFERRED_TIME_OPTIONS: TimeOption[] = [
  // Time Windows
  { value: 'Morning (8:00 AM – 11:00 AM)', label: 'Morning (8:00 AM – 11:00 AM)', badge: 'Window' },
  { value: 'Midday (11:00 AM – 2:00 PM)', label: 'Midday (11:00 AM – 2:00 PM)', badge: 'Window' },
  { value: 'Afternoon (2:00 PM – 5:00 PM)', label: 'Afternoon (2:00 PM – 5:00 PM)', badge: 'Window' },
  { value: 'Late Afternoon (5:00 PM – 7:00 PM)', label: 'Late Afternoon (5:00 PM – 7:00 PM)', badge: 'Window' },

  // Specific Hours
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM (Noon)' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' },
  { value: '6:00 PM', label: '6:00 PM' },
];

// Helper to convert technical 24-hr values (like "14:00") into friendly 12-hr display
export const formatDisplayTime = (val: string): string => {
  if (!val) return '';

  // If already formatted like "9:00 AM" or "Morning (8:00 AM - 11:00 AM)"
  if (val.includes('AM') || val.includes('PM')) {
    return val;
  }

  // If standard 24hr "HH:MM"
  if (/^\d{1,2}:\d{2}$/.test(val)) {
    const [hStr, mStr] = val.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr;
    const period = h >= 12 ? 'PM' : 'AM';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${m} ${period}`;
  }

  return val;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  label = 'Preferred Time',
  value,
  onChange,
  required = false,
  error,
  placeholder = 'Select preferred time',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (timeVal: string) => {
    onChange(timeVal);
    setIsOpen(false);
  };

  const displayString = formatDisplayTime(value);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Modern Custom Button Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[50px] px-3.5 text-left rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className={`text-sm sm:text-base truncate ${displayString ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            {displayString || placeholder}
          </span>
        </div>

        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}

      {/* Custom Time Selection Popover */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Preferred time options"
          className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-150 max-h-[290px] overflow-y-auto no-scrollbar"
        >
          <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Preferred Time Windows
          </div>

          <div className="space-y-0.5 mb-2">
            {PREFERRED_TIME_OPTIONS.filter((o) => o.badge === 'Window').map((opt) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800 pt-2">
            Specific Hourly Preferences
          </div>

          <div className="space-y-0.5">
            {PREFERRED_TIME_OPTIONS.filter((o) => !o.badge).map((opt) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-2 py-1 text-[11px] text-slate-400 dark:text-slate-500">
            Preferred Time Only • Verified with Dispatch
          </div>
        </div>
      )}
    </div>
  );
};
