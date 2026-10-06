import React from 'react';
import { Building2, ArrowRight, ShieldCheck, CheckCircle2, Factory, Briefcase, Hotel, Store } from 'lucide-react';
import cleanCommercialTechImg from '../assets/images/clean_commercial_technician_1791051438169.jpg';

interface CommercialSectionProps {
  onRequestCommercialQuote: () => void;
}

export const CommercialSection: React.FC<CommercialSectionProps> = ({
  onRequestCommercialQuote,
}) => {
  const categories = [
    {
      title: 'Offices & Corporate Facilities',
      desc: 'Overhead spiral and rectangular ductwork cleaning for active business centers.',
      icon: Briefcase,
    },
    {
      title: 'Multi-Unit Housing & Hospitality',
      desc: 'Shared dryer exhausts, central corridor air handlers, and hospitality ventilation.',
      icon: Hotel,
    },
    {
      title: 'Retail & Commercial Storefronts',
      desc: 'Customer-facing sales floors, rooftop units, and retail distribution centers.',
      icon: Store,
    },
    {
      title: 'Industrial Facilities & Warehouses',
      desc: 'Heavy-duty negative-air cleaning tailored for high-volume commercial footprints.',
      icon: Factory,
    },
  ];

  return (
    <section id="commercial" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Building2 className="w-4 h-4" />
            <span>Facility Maintenance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Commercial Cleaning Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Professional cleaning services for businesses, commercial properties, offices, and facilities.
          </p>
        </div>

        {/* 2-Column Commercial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Commercial Facility Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
              <img
                src={cleanCommercialTechImg}
                alt="CREWW Duct Cleaning commercial ventilation ductwork cleaning technician inside office building"
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[16/10] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Custom Facility Scheduling</p>
                  <p className="text-sm font-bold text-white">After-Hours & Weekend Availability</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Categories & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.title}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 mb-8 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Every commercial project includes itemized scope documentation, flexible scheduling windows to avoid business disruption, and dedicated project coordination.
                </p>
              </div>
            </div>

            <button
              onClick={onRequestCommercialQuote}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150"
            >
              <span>REQUEST A COMMERCIAL QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
