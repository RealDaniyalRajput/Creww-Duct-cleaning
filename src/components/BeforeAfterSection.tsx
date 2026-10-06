import React, { useState, useRef, useCallback } from 'react';
import { Wind, Flame, Fan, Layers, Sliders, ArrowLeftRight } from 'lucide-react';
import { ServiceType } from '../types';
import airDuctBeforeImg from '../assets/images/air_duct_before_1791049717457.jpg';
import airDuctAfterImg from '../assets/images/air_duct_after_1791049729790.jpg';
import dryerVentBeforeImg from '../assets/images/dryer_vent_before_1791049742373.jpg';
import dryerVentAfterImg from '../assets/images/dryer_vent_after_1791049752417.jpg';
import hvacCoilBeforeImg from '../assets/images/hvac_coil_before_1791049762628.jpg';
import hvacCoilAfterImg from '../assets/images/hvac_coil_after_1791049773444.jpg';
import chimneyBeforeImg from '../assets/images/chimney_before_1791049783371.jpg';
import chimneyAfterImg from '../assets/images/chimney_after_1791049796143.jpg';

interface ComparisonItem {
  id: string;
  service: ServiceType;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  icon: React.ElementType;
}

interface BeforeAfterSectionProps {
  onBookService: (service: ServiceType) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onBookService }) => {
  const comparisons: ComparisonItem[] = [
    {
      id: 'comp-air-duct',
      service: 'Air Duct Cleaning',
      title: 'Air Duct Cleaning',
      category: 'Ventilation System',
      description:
        'Supply ductwork heavily coated with dust and lint buildup before motorized brush agitation and negative-air vacuum extraction versus the spotless galvanized duct interior after service.',
      beforeImage: airDuctBeforeImg,
      afterImage: airDuctAfterImg,
      beforeAlt: 'Air duct interior heavily coated with dust before cleaning',
      afterAlt: 'Air duct interior completely clean and cleared of dust after cleaning',
      icon: Wind,
    },
    {
      id: 'comp-dryer-vent',
      service: 'Dryer Vent Cleaning',
      title: 'Dryer Vent Cleaning',
      category: 'Exhaust Line',
      description:
        'Exhaust line severely choked with compacted laundry lint restricting airflow before snake-brush clearing versus the unobstructed pipe opening after thorough lint extraction.',
      beforeImage: dryerVentBeforeImg,
      afterImage: dryerVentAfterImg,
      beforeAlt: 'Dryer vent pipe clogged with thick lint before cleaning',
      afterAlt: 'Dryer vent exhaust completely clear of lint after cleaning',
      icon: Flame,
    },
    {
      id: 'comp-hvac-coil',
      service: 'HVAC Cleaning',
      title: 'HVAC Evaporator Coils',
      category: 'Indoor Air Handler',
      description:
        'Evaporator A-coil aluminum fins caked with sticky dust layers that impede heat exchange before cleaning versus restored, gleaming clean cooling fins after precision service.',
      beforeImage: hvacCoilBeforeImg,
      afterImage: hvacCoilAfterImg,
      beforeAlt: 'HVAC evaporator coils clogged with grime and dust before cleaning',
      afterAlt: 'HVAC evaporator coils gleaming clean after precision cleaning',
      icon: Fan,
    },
    {
      id: 'comp-chimney',
      service: 'Chimney Cleaning',
      title: 'Chimney Flue Sweeping',
      category: 'Masonry Flue',
      description:
        'Fireplace flue liner coated with hazardous creosote and soot buildup before wire brush mechanical sweeping versus clear, brushed masonry brickwork after sweeping.',
      beforeImage: chimneyBeforeImg,
      afterImage: chimneyAfterImg,
      beforeAlt: 'Fireplace chimney flue coated with dark soot before sweeping',
      afterAlt: 'Fireplace chimney flue clear and clean after sweeping',
      icon: Layers,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(comparisons[0].id);

  const activeComparison = comparisons.find((c) => c.id === activeTab) || comparisons[0];
  const Icon = activeComparison.icon;

  // Interactive slider state (0 to 100 percent)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="before-after" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Before & After Cleaning Results
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A professional cleaning service delivers visible results. Explore before and after examples of our NADCA-standard cleaning work.
          </p>
        </div>

        {/* Service Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {comparisons.map((item) => {
            const TabIcon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Featured Interactive Comparison */}
        <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-sm">
          
          {/* Comparison Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {activeComparison.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeComparison.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <ArrowLeftRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Drag slider to compare</span>
            </div>
          </div>

          {/* Interactive Before / After Slider Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-300 dark:border-slate-700 bg-slate-950 shadow-inner"
          >
            {/* AFTER Image (Full background) */}
            <img
              src={activeComparison.afterImage}
              alt={activeComparison.afterAlt}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* AFTER Label */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-emerald-600/90 text-white font-extrabold text-xs uppercase tracking-wider shadow-md backdrop-blur-xs">
              AFTER
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeComparison.beforeImage}
                alt={activeComparison.beforeAlt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
                }}
              />
              {/* BEFORE Label */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-slate-900/90 text-white font-extrabold text-xs uppercase tracking-wider shadow-md backdrop-blur-xs border border-slate-700">
                BEFORE
              </div>
            </div>

            {/* Slider Dividing Bar & Handle */}
            <div
              className="absolute inset-y-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
              <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-700 shadow-xl flex items-center justify-center pointer-events-auto">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Description & Action */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {activeComparison.description}
            </p>
            <button
              onClick={() => onBookService(activeComparison.service)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors flex-shrink-0"
            >
              <span>BOOK THIS SERVICE</span>
            </button>
          </div>

          {/* Transparent Notice */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Illustrative visual examples demonstrating mechanical cleaning transformations. Individual system results vary based on age, usage, and ductwork layout.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
