import React from 'react';
import { Mail, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  onQuoteClick: () => void;
  onBookClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onQuoteClick,
  onBookClick,
}) => {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Reach Out
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Contact CREWW Duct Cleaning
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Have questions about our service capabilities or need specialized coordination? Connect with our team directly.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Email Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-start hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
              Direct Email
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Send questions or project specifications anytime.
            </p>
            <a
              href="mailto:crewwductcleaning@gmail.com"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors break-all"
            >
              <span>crewwductcleaning@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

          {/* Service Area Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-start hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
              Service Area
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Residential & commercial cleaning operations.
            </p>
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Serving Customers Across the USA
            </span>
          </div>

          {/* Social Channels Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-start hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
              Connect Online
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Follow our official media channels for updates.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/creww_duct.cleaning?utm_source=ig_web_button_share_sheet&stkn=ZDNlMz0wMzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CREWW Duct Cleaning on Instagram"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 transition-colors text-xs font-semibold"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61591930844966"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CREWW Duct Cleaning on Facebook"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors text-xs font-semibold"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Quick Action Banner */}
        <div className="p-8 rounded-3xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to schedule or need a fast estimate?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mt-1">
              Submit your property details or book your preferred service date today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-blue-700 font-bold text-sm rounded-xl shadow-sm transition-colors text-center cursor-pointer"
            >
              Get a Free Quote
            </button>
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-5 py-3 bg-blue-700 hover:bg-blue-800 border border-blue-400 text-white font-bold text-sm rounded-xl shadow-sm transition-colors text-center cursor-pointer"
            >
              Book Your Service
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
