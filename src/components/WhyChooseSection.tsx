import React from 'react';
import { ShieldCheck, Building, Sparkles, Calendar, FileText, HeartHandshake } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      title: 'Professional Service',
      desc: 'Uniformed, respectful technicians equipped with commercial negative-air vacuums, motorized brushes, and clean containment tools.',
      icon: ShieldCheck,
    },
    {
      title: 'Residential & Commercial',
      desc: 'Versatile capabilities tailored for private homes, apartments, commercial offices, healthcare clinics, and retail properties.',
      icon: Building,
    },
    {
      title: 'Quality-Focused Cleaning',
      desc: 'We clean supply registers, return trunks, and blower assemblies thoroughly without taking shortcuts or rushing through jobs.',
      icon: Sparkles,
    },
    {
      title: 'Convenient Scheduling',
      desc: 'Select preferred dates and times directly online to coordinate easily with your daily routine.',
      icon: Calendar,
    },
    {
      title: 'Free Quotes',
      desc: 'Transparent, upfront project estimates with zero obligation so you know the full scope of work before service begins.',
      icon: FileText,
    },
    {
      title: 'Customer-Focused Service',
      desc: 'Direct communication, respectful property care with floor guards and shoe covers, and dependable support from start to finish.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            The CREWW Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Why Choose CREWW Duct Cleaning?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Our systematic approach and commitment to service excellence make maintaining clean indoor ventilation simple and dependable.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all duration-200 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
