import React from 'react';
import { Wind, Flame, Fan, Layers } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      title: 'Air Duct Cleaning',
      subtitle: 'Complete dust & buildup extraction',
      icon: Wind,
    },
    {
      title: 'Dryer Vent Cleaning',
      subtitle: 'Deep lint & block removal',
      icon: Flame,
    },
    {
      title: 'HVAC Cleaning',
      subtitle: 'Blower & coil maintenance',
      icon: Fan,
    },
    {
      title: 'Chimney Cleaning',
      subtitle: 'Flue sweeping & debris clearing',
      icon: Layers,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-blue-500/40"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
