import React from 'react';
import { Shield, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Our Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
              About CREWW Duct Cleaning
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Dedicated to clean air systems, thorough service execution, and a seamless customer experience.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              At <strong className="text-slate-900 dark:text-white">CREWW Duct Cleaning</strong>, our focus is simple: provide thorough, honest, and high-quality mechanical cleaning for residential and commercial heating, cooling, ventilation, and chimney systems.
            </p>
            <p>
              We approach every property with a customer-focused mindset. From the moment you request an estimate or book a service, we prioritize clear communication, straightforward scheduling, and respect for your property. Our technicians utilize specialized rotary agitation tools, high-capacity negative-air collection vacuums, and clean dust containment practices to complete every job properly.
            </p>
            <p>
              Whether clearing household dryer vent lint, deep cleaning supply and return duct runs, servicing central HVAC components, or sweeping fireplace flues, CREWW Duct Cleaning brings the focus, equipment, and dedication needed to keep systems clean.
            </p>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Professional Service</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-grade equipment & tidy work practices</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Quality-Focused</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Thorough agitation and extraction</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Convenient Scheduling</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Prompt coordination and flexible dates</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
