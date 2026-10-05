import React from 'react';
import { FileEdit, CheckSquare, CalendarDays, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'REQUEST A QUOTE',
      desc: 'Submit your property details and service needs online to receive your personalized estimate.',
      icon: FileEdit,
    },
    {
      num: '02',
      title: 'CHOOSE YOUR SERVICE',
      desc: 'Select air duct, dryer vent, HVAC, or chimney cleaning tailored to your building requirements.',
      icon: CheckSquare,
    },
    {
      num: '03',
      title: 'SCHEDULE YOUR SERVICE',
      desc: 'Confirm your convenient appointment date and time window with our responsive support team.',
      icon: CalendarDays,
    },
    {
      num: '04',
      title: 'PROFESSIONAL CLEANING',
      desc: 'Our uniformed crew arrives on time with commercial negative-air equipment and gets to work.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Simple & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From initial inquiry to completed service, our four-step process is engineered for ease and precision.
          </p>
        </div>

        {/* Process Steps (Horizontal on desktop, Vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:border-blue-500/50"
              >
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-blue-600/30 dark:text-blue-400/20 font-mono tracking-tight">
                    {step.num}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Desktop connector line between steps */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 dark:bg-slate-800 z-10" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
