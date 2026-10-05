import React from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';
import { ServiceType } from '../types';
import crewwLogo from '../assets/images/creww_official_logo_1791048839644.jpg';

interface FooterProps {
  onSelectService: (service: ServiceType) => void;
  onNavigateToQuote: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectService,
  onNavigateToQuote,
  onOpenPrivacyPolicy,
  onOpenTerms,
}) => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-10 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#top');
              }}
              className="flex items-center gap-3 mb-3.5 group"
            >
              <img
                src={crewwLogo}
                alt="CREWW DUCT CLEANING"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain rounded-full transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-lg text-white leading-none">
                  CREWW
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400 mt-1">
                  Duct Cleaning
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 max-w-sm">
              Professional air duct, dryer vent, HVAC, and chimney cleaning services for residential and commercial properties across the USA.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/creww_duct.cleaning?utm_source=ig_web_button_share_sheet&stkn=ZDNlMz0wMzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61591930844966"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                'Air Duct Cleaning',
                'Dryer Vent Cleaning',
                'HVAC Cleaning',
                'Chimney Cleaning',
              ].map((svc) => (
                <li key={svc}>
                  <button
                    onClick={() => {
                      onSelectService(svc as ServiceType);
                      scrollTo('#services');
                    }}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: 'Services', href: '#services' },
                { name: 'About', href: '#about' },
                { name: 'Residential', href: '#residential' },
                { name: 'Commercial', href: '#commercial' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Conversion & Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Get Started
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm mb-4">
              <li>
                <button
                  onClick={onNavigateToQuote}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left font-medium"
                >
                  Get a Free Quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('Air Duct Cleaning')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left font-medium"
                >
                  Book Your Service
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
              Email
            </h4>
            <a
              href="mailto:crewwductcleaning@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors break-all"
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span>crewwductcleaning@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CREWW DUCT CLEANING. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={onOpenTerms}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
