import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Wrench, Sparkles, Wind, Flame, Fan, Layers } from 'lucide-react';
import { ServiceType } from '../types';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: ServiceType | null;
  onBookService: (service: ServiceType) => void;
}

interface ServiceData {
  title: string;
  tagline: string;
  image: string;
  icon: React.ElementType;
  intro: string;
  includes: string[];
  equipment: string[];
  applications: string;
}

const SERVICE_INFO: Record<ServiceType, ServiceData> = {
  'Air Duct Cleaning': {
    title: 'AIR DUCT CLEANING',
    tagline: 'Comprehensive Ventilation & Trunk Line Cleaning',
    image: '/src/assets/images/user_img_basement_duct_1791051389710.jpg',
    icon: Wind,
    intro:
      'Over time, heating and cooling ductwork accumulates household dust, construction residue, and airborne particulates. CREWW Duct Cleaning utilizes commercial-grade negative-air vacuum collectors paired with motorized rotary scrub brushes to systematically agitate and extract trapped matter from every supply register, return grille, and main trunk line.',
    includes: [
      'Professional negative-air vacuum containment',
      'Full supply & return ductwork trunk line cleaning',
      'Motorized rotary brush mechanical agitation & debris removal',
      'Trunk line, plenum box, and register grille cleaning',
      'Residential & commercial HVAC system applications',
    ],
    equipment: [
      'High-power commercial negative-air extractors with multi-stage HEPA filtration',
      'Motorized forward and reverse rotary whip and brush agitation tools',
      'Non-marking drop cloths, protective runners, and wall corner guards',
    ],
    applications: 'Engineered for single-family residences, townhomes, multi-unit buildings, retail spaces, and corporate offices.',
  },
  'Dryer Vent Cleaning': {
    title: 'DRYER VENT CLEANING',
    tagline: 'Deep Lint Extraction & Airflow Restoration',
    image: '/src/assets/images/user_img_dryer_vent_1791051405144.jpg',
    icon: Flame,
    intro:
      'Dryer vent exhaust lines accumulate combustible lint fluff and moisture over repeated laundry cycles, restricting exhaust airflow, extending drying times, and straining internal heating elements. CREWW Duct Cleaning provides mechanical rotary brush extraction from the appliance transition collar all the way through the exterior exhaust hood.',
    includes: [
      'Full duct line lint extraction from appliance backplate to outside hood',
      'Appliance transition hose inspection and debris clearance',
      'Exterior exhaust hood, gravity damper, and bird-guard cleaning',
      'Airflow velocity check and obstruction removal',
      'Residential laundry rooms, shared multi-family exhaust, and commercial facilities',
    ],
    equipment: [
      'Continuous flexible rotary rod lint cleaning systems driven by precision drills',
      'High-velocity vacuum extraction containment units to collect all lint',
      'Ladder-accessible exterior wall and roof vent termination equipment',
    ],
    applications: 'Ideal for residential laundry setups, second-story dryer lines, condominium shared risers, and commercial laundromats.',
  },
  'HVAC Cleaning': {
    title: 'HVAC CLEANING',
    tagline: 'Evaporator Coil & Blower Motor Care',
    image: '/src/assets/images/user_img_hvac_condenser_1791051415912.jpg',
    icon: Fan,
    intro:
      'The internal mechanical components of your heating and air conditioning system—including evaporator cooling coils, blower wheels, and internal housing chambers—collect fine particulate matter that standard filters miss. CREWW Duct Cleaning provides detailed physical and pneumatic cleaning of these critical mechanical components to support smooth system operation.',
    includes: [
      'Indoor evaporator coil fin comb cleaning and gentle vacuuming',
      'Blower wheel, motor housing, and squirrel-cage fan assembly decontamination',
      'Condensate drain pan clearing and drain line inspection',
      'Air handler cabinet interior, plenum box, and filter rack wipe-down',
      'Central heat pumps, split systems, gas furnaces, and packaged rooftop units',
    ],
    equipment: [
      'Precision aluminum fin comb straightening tools and soft-bristle brushes',
      'Commercial HEPA-filtered vacuum nozzles engineered for delicate coil surfaces',
      'Non-corrosive, non-toxic coil surface rinse and cleaner preparations',
    ],
    applications: 'Recommended for home central HVAC systems, heat pump split units, rental properties, and commercial rooftop package units.',
  },
  'Chimney Cleaning': {
    title: 'CHIMNEY CLEANING',
    tagline: 'Mechanical Flue Sweeping & HEPA Containment',
    image: '/src/assets/images/clean_chimney_technician_1791051427800.jpg',
    icon: Layers,
    intro:
      'Burning wood produces flammable creosote, soot, and glaze deposits that adhere to flue walls, restricting draft and introducing chimney hazard conditions. CREWW Duct Cleaning provides specialized mechanical flue sweeping and smoke chamber clearing using dedicated steel sweep rods and HEPA-filtered dust containment to keep your living room spotless.',
    includes: [
      'Complete chimney flue sweeping from firebox hearth up to chimney cap',
      'Creosote scraping and soot extraction along the entire liner length',
      'Smoke shelf, throat damper assembly, and firebox brick clearing',
      'Sealed hearth dust containment with industrial HEPA vacuum suction',
      'Residential fireplaces, wood-burning stove pipes, and masonry hearths',
    ],
    equipment: [
      'Heavy-duty round steel and polypropylene wire flue sweeping brushes',
      'Flexible interlocking fiberglass sweep extension rods',
      'Sealed hearth canvas covers with dedicated industrial HEPA containment vacuums',
    ],
    applications: 'Designed for residential brick/masonry fireplaces, zero-clearance prefabricated chimneys, freestanding wood stoves, and hospitality hearths.',
  },
  'Other': {
    title: 'CUSTOM & COMMERCIAL VENTILATION',
    tagline: 'Specialized Air System Solutions',
    image: '/src/assets/images/clean_commercial_technician_1791051438169.jpg',
    icon: Wind,
    intro:
      'CREWW Duct Cleaning handles specialized multi-system cleaning projects, facility ventilation corridors, commercial exhaust hoods, and custom commercial properties. Our technicians coordinate custom negative-air containment and mechanical agitation tailored to your property.',
    includes: [
      'Custom residential and commercial ventilation assessments',
      'Multiple service package combinations (Duct + Dryer + HVAC)',
      'Commercial kitchen makeup air and corridor air handler servicing',
      'Dedicated project coordination and flexible off-hours scheduling',
    ],
    equipment: [
      'Heavy-duty industrial negative air machines and rotary scrubbers',
      'Flexible high-reach scaffolding and access equipment',
    ],
    applications: 'Offices, medical clinics, schools, warehouses, retail storefronts, and custom residential estates.',
  },
};

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  onBookService,
}) => {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !serviceId) return null;

  const data = SERVICE_INFO[serviceId] || SERVICE_INFO['Air Duct Cleaning'];
  const Icon = data.icon;

  const handleBook = () => {
    onClose();
    onBookService(serviceId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close service details"
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-6">
          
          {/* Header & Badges */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  CREWW Service Overview
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {data.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {data.tagline}
              </p>
            </div>
          </div>

          {/* Service Image Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={data.image}
              alt={data.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="font-semibold">Professional Equipment & Technician Care</span>
              <span className="font-mono text-blue-300">CREWW DUCT CLEANING</span>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.intro}
            </p>
          </div>

          {/* What the Service Includes */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>What the Service Includes</span>
            </h4>
            <ul className="space-y-2.5">
              {data.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment & Methodology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-slate-400" />
              <span>Professional Equipment Used</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {data.equipment.map((eq) => (
                <li key={eq} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Applications */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300">
            <span className="font-bold">Applications: </span>
            <span>{data.applications}</span>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleBook}
            className="w-full sm:flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>BOOK YOUR SERVICE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
