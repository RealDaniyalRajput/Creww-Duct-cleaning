import React from 'react';
import { ShieldCheck, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Verified Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-3">
            Certifications & Credentials
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight mb-4">
            Certified. Professional. Customer Focused.
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            CREWW DUCT CLEANING is NADCA Certified. We hold our residential and commercial cleaning procedures to the industry’s most rigorous technical and containment standards.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* NADCA Standard Compliance */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              NADCA Certified Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We clean air conveyance systems in accordance with the National Air Duct Cleaners Association (NADCA) ACR standard, ensuring thorough source removal of dirt, particulates, and debris.
            </p>
          </div>

          {/* Negative-Air & HEPA Filtration */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              HEPA Containment Vacuuming
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Industrial negative-air vacuum extractors with multi-stage HEPA filtration maintain continuous vacuum pressure throughout the entire trunk line to capture all dislodged debris cleanly.
            </p>
          </div>

          {/* Mechanical Agitation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Source Removal Agitation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Motorized rotary whips, flexible scrubbing rods, and pneumatic agitation sweep every internal corner of supply registers, return plenums, and exhaust runs to clean bare galvanized surfaces.
            </p>
          </div>

        </div>

        {/* Trust Points Bar */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>NADCA Certified Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span>Residential & Commercial Compliance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span>Floor Runners & Corner Wall Guards</span>
          </div>
        </div>

      </div>
    </section>
  );
};
