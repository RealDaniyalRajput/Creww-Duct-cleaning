import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePickerProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (formattedDate: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Helper to format Date into American format: "Month Day, Year"
export const formatAmericanDate = (d: Date): string => {
  const month = MONTH_NAMES[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

// Helper to parse either "YYYY-MM-DD" or "Month Day, Year" or ISO string
export const parseAnyDate = (val: string): Date | null => {
  if (!val) return null;

  // Handle standard ISO or YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [y, m, d] = val.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  // Handle "Month Day, Year" e.g. "October 14, 2026"
  const match = val.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const monthIndex = MONTH_NAMES.findIndex(
      (m) => m.toLowerCase() === match[1].toLowerCase()
    );
    if (monthIndex !== -1) {
      return new Date(Number(match[3]), monthIndex, Number(match[2]));
    }
  }

  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label = 'Preferred Date',
  value,
  onChange,
  required = false,
  error,
  placeholder = 'Select preferred date',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Today reference for past date restriction
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Selected date parsed
  const selectedDate = parseAnyDate(value);

  // Current calendar view month and year
  const [viewDate, setViewDate] = useState<Date>(() => {
    return selectedDate ? new Date(selectedDate) : new Date(today);
  });

  // When value changes from outside, sync viewDate
  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate));
    }
  }, [value]);

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

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prevent navigating to months completely before today
    const prevMonthDate = new Date(viewYear, viewMonth - 1, 1);
    const endOfPrevMonth = new Date(viewYear, viewMonth, 0);
    if (endOfPrevMonth < today) return; // cannot go to past month
    setViewDate(prevMonthDate);
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Allow up to 2 years in the future
    const maxFuture = new Date(today.getFullYear() + 2, 11, 31);
    const nextMonthDate = new Date(viewYear, viewMonth + 1, 1);
    if (nextMonthDate > maxFuture) return;
    setViewDate(nextMonthDate);
  };

  // Calendar days generation
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday

  const days: { date: Date; isCurrentMonth: boolean; isPast: boolean; isSelected: boolean; isToday: boolean }[] = [];

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dObj = new Date(viewYear, viewMonth, d);
    dObj.setHours(0, 0, 0, 0);
    const isPast = dObj < today;
    const isToday = dObj.getTime() === today.getTime();
    const isSelected = !!selectedDate && dObj.getTime() === selectedDate.getTime();

    days.push({
      date: dObj,
      isCurrentMonth: true,
      isPast,
      isSelected,
      isToday,
    });
  }

  const handleSelectDate = (d: Date, isPast: boolean) => {
    if (isPast) return;
    const formatted = formatAmericanDate(d);
    onChange(formatted);
    setIsOpen(false);
  };

  // Check if prev month is in the past
  const endOfPrevMonth = new Date(viewYear, viewMonth, 0);
  const isPrevMonthDisabled = endOfPrevMonth < today;

  // Display text formatted cleanly
  const displayText = selectedDate ? formatAmericanDate(selectedDate) : '';

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
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`w-full min-h-[50px] px-3.5 text-left rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className={`text-sm sm:text-base truncate ${displayText ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            {displayText || placeholder}
          </span>
        </div>

        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0 ml-2">
          {isOpen ? 'Close' : 'Choose'}
        </span>
      </button>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}

      {/* Polished Calendar Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Calendar date selector"
          className="absolute z-50 left-0 sm:left-auto sm:right-0 mt-2 w-full min-w-[290px] max-w-[340px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150 select-none"
        >
          {/* Calendar Header with Month/Year & Navigation */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={isPrevMonthDisabled}
              aria-label="Previous month"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday Column Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAY_LABELS.map((label) => (
              <span
                key={label}
                className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-1"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty offset slots */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="w-full aspect-square" />
            ))}

            {/* Days in Month */}
            {days.map((item) => {
              const dayNum = item.date.getDate();

              let buttonClasses = 'w-full aspect-square text-xs sm:text-sm font-medium rounded-xl flex items-center justify-center transition-all duration-100 relative';

              if (item.isPast) {
                buttonClasses += ' text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed';
              } else if (item.isSelected) {
                buttonClasses += ' bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 scale-105 z-10 cursor-pointer';
              } else if (item.isToday) {
                buttonClasses += ' text-blue-600 dark:text-blue-400 font-bold border border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer';
              } else {
                buttonClasses += ' text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer';
              }

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  disabled={item.isPast}
                  onClick={() => handleSelectDate(item.date, item.isPast)}
                  className={buttonClasses}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Helper Footer: Today shortcut & Note */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => handleSelectDate(today, false)}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Today
            </button>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Preferred Date Only
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
