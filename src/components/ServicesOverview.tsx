import React from 'react';
import { Wind, Flame, Fan, Layers, ArrowRight, Info } from 'lucide-react';
import { ServiceType } from '../types';
import basementDuctImg from '../assets/images/user_img_basement_duct_1791051389710.jpg';
import dryerVentImg from '../assets/images/user_img_dryer_vent_1791051405144.jpg';
import hvacCondenserImg from '../assets/images/user_img_hvac_condenser_1791051415912.jpg';
import cleanChimneyImg from '../assets/images/clean_chimney_technician_1791051427800.jpg';

interface ServicesOverviewProps {
  onBookService: (service: ServiceType) => void;
  onViewDetails: (service: ServiceType) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  onBookService,
  onViewDetails,
}) => {
  const services: {
    id: ServiceType;
    title: string;
    description: string;
    image: string;
    alt: string;
    icon: React.ElementType;
    highlights: string[];
  }[] = [
    {
      id: 'Air Duct Cleaning',
      title: 'Professional Air Duct Cleaning',
      description:
        'Comprehensive supply and return duct cleaning following NADCA standards using powerful negative-air vacuums and high-speed rotary brush systems to clear accumulated dust and debris.',
      image: basementDuctImg,
      alt: 'NADCA certified professional air duct cleaning service with negative-air agitation',
      icon: Wind,
      highlights: ['Full Supply & Return Runs', 'Rotary Agitation Equipment', 'Residential & Commercial'],
    },
    {
      id: 'Dryer Vent Cleaning',
      title: 'Professional Dryer Vent Cleaning',
      description:
        'Thorough lint extraction and booster vent line clearing from dryer backplate to exterior exhaust termination to restore proper airflow velocity and drying efficiency.',
      image: dryerVentImg,
      alt: 'Professional dryer vent cleaning and combustible lint clog removal service',
      icon: Flame,
      highlights: ['Deep Lint & Clog Extraction', 'Airflow Optimization', 'Exhaust Hood Inspection'],
    },
    {
      id: 'HVAC Cleaning',
      title: 'Professional HVAC Cleaning',
      description:
        'Detailed cleaning of indoor air handler components including evaporator cooling coils, blower fan assemblies, drain pans, and cabinet surfaces.',
      image: hvacCondenserImg,
      alt: 'Professional HVAC cleaning and evaporator coil maintenance service',
      icon: Fan,
      highlights: ['Evaporator Coil Cleaning', 'Blower Motor Decontamination', 'Drain Pan Maintenance'],
    },
    {
      id: 'Chimney Cleaning',
      title: 'Professional Chimney Cleaning',
      description:
        'Specialized mechanical flue sweeping, creosote removal, and smoke chamber clearing using dedicated steel sweep rods and HEPA-filtered dust containment.',
      image: cleanChimneyImg,
      alt: 'Professional chimney cleaning and fireplace flue sweeping with HEPA containment',
      icon: Layers,
      highlights: ['Flue & Chimney Sweep', 'Creosote & Soot Removal', 'Clean Hearth Dust Containment'],
    },
  ];

  return (
    <section id="services" className="py-14 sm:py-18 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            NADCA Certified Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-2">
            Professional Cleaning Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Precision cleaning services engineered for residential and commercial ventilation systems across the USA.
          </p>
        </div>

        {/* 4 Compact Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-200 group"
              >
                {/* Service Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-blue-400 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5 flex-grow">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-4 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800 pt-2.5">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Actions: VIEW DETAILS + BOOK YOUR SERVICE */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => onViewDetails(service.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-xs rounded-xl transition-all duration-150 cursor-pointer bg-white dark:bg-slate-800/80"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>VIEW DETAILS</span>
                    </button>

                    <button
                      onClick={() => onBookService(service.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
                    >
                      <span>BOOK YOUR SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
