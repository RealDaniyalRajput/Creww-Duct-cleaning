import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import heroResidentialDuctImg from '../assets/images/user_img_residential_duct_1791051375504.jpg';

interface HeroProps {
  onQuoteClick: () => void;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onBookClick }) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/60 py-12 sm:py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>PROFESSIONAL HOME SERVICE</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] mb-5">
              Cleaner Air Starts With a Cleaner System.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              Professional air duct, dryer vent, HVAC, and chimney cleaning services for residential and commercial properties across the USA.
            </p>

            {/* CTA Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-6">
              <button
                onClick={onQuoteClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
              >
                <span>BOOK YOUR SERVICE</span>
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>

            {/* Small Supporting Text */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Residential & Commercial Services</span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Serving Customers Across the USA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image Showcase */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-900 group">
              <img
                src={heroResidentialDuctImg}
                alt="CREWW Duct Cleaning technician operating professional negative-air suction equipment at residential air return duct"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/60 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/30 rounded-lg text-blue-400 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Specialized Care</p>
                    <p className="text-sm font-bold text-white">Commercial & Residential Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
