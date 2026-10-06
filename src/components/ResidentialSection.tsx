import React from 'react';
import { Home, ArrowRight, CheckCircle2, Wind, Flame, Fan, Layers } from 'lucide-react';
import { ServiceType } from '../types';
import residentialDuctImg from '../assets/images/user_img_residential_duct_1791051375504.jpg';

interface ResidentialSectionProps {
  onQuoteClick: () => void;
  onSelectService: (service: ServiceType) => void;
}

export const ResidentialSection: React.FC<ResidentialSectionProps> = ({
  onQuoteClick,
  onSelectService,
}) => {
  const homeServices = [
    {
      name: 'Air Duct Cleaning' as ServiceType,
      desc: 'Whole-house supply and return register cleaning to clear household dust buildup.',
      icon: Wind,
    },
    {
      name: 'Dryer Vent Cleaning' as ServiceType,
      desc: 'Complete lint clearing from laundry machines through exterior walls or roof terminations.',
      icon: Flame,
    },
    {
      name: 'HVAC Cleaning' as ServiceType,
      desc: 'Precision indoor evaporator coil and blower motor cleaning for home HVAC systems.',
      icon: Fan,
    },
    {
      name: 'Chimney Cleaning' as ServiceType,
      desc: 'Fireplace flue sweeping and creosote removal with dedicated dust containment.',
      icon: Layers,
    },
  ];

  return (
    <section id="residential" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                <Home className="w-4 h-4" />
                <span>Homeowner Solutions</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Residential Cleaning Services
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Your home’s heating, ventilation, laundry exhaust, and fireplace systems work continuously throughout every season. CREWW Duct Cleaning delivers NADCA Certified cleaning standards with specialized rotary equipment, negative-air HEPA containment, and respectful technicians directly to your residence with zero mess left behind.
              </p>

              {/* Service Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                {homeServices.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <div
                      key={svc.name}
                      onClick={() => onSelectService(svc.name)}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {svc.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Residential CTA */}
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Residential Home Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
                <img
                  src={residentialDuctImg}
                  alt="NADCA certified technician performing residential air duct cleaning with negative-air vacuum system"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-[16/10] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 text-white flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-medium text-slate-200">
                    Floor coverings, corner guards, and HEPA filtration used on every residential appointment.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
