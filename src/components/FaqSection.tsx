import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    category: 'NADCA Certification',
    question: 'What is NADCA certification and why is it important for air duct cleaning?',
    answer:
      'NADCA (National Air Duct Cleaners Association) sets the national standard for HVAC system assessment, cleaning, and restoration. Being NADCA Certified means CREWW DUCT CLEANING adheres strictly to ACR standards, utilizing continuous negative-air HEPA containment and motorized mechanical agitation to properly remove trapped dust, dander, and particulates without reintroducing them into your indoor air.',
  },
  {
    category: 'Air Duct Cleaning',
    question: 'How often should residential and commercial air ducts be cleaned?',
    answer:
      'Residential air duct systems generally benefit from a thorough inspection and professional cleaning every 3 to 5 years, or sooner following home remodeling, pest remediation, or moving into a new home. Commercial facilities, high-occupancy offices, and retail spaces often require annual or biannual inspection depending on foot traffic and ventilation usage.',
  },
  {
    category: 'Dryer Vent Cleaning',
    question: 'Why is professional dryer vent cleaning necessary and what are the warning signs?',
    answer:
      'Over repeated laundry cycles, combustible lint bypasses lint screens and adheres to internal exhaust lines and damper hoods. Warning signs include laundry taking multiple cycles to dry, dryer cabinet surfaces feeling excessively hot, and noticeable lint accumulation behind the unit. Professional rotary clearing restores exhaust airflow velocity and prevents heat buildup.',
  },
  {
    category: 'HVAC Cleaning',
    question: 'What components are cleaned during an HVAC cleaning service?',
    answer:
      'Our HVAC cleaning service focuses on indoor air handler mechanical components, including evaporator cooling coils, blower wheel assemblies, condensate drain pans, and air handler cabinet interiors. Removing particulate buildup from coils and blower motors supports smooth system airflow and proper heat exchange.',
  },
  {
    category: 'Chimney Cleaning',
    question: 'How do technicians ensure chimney cleaning stays mess-free inside the home?',
    answer:
      'CREWW DUCT CLEANING uses sealed hearth drop cloths and industrial HEPA-filtered vacuum containment at the firebox before mechanical flue sweep brushes are inserted. This negative-pressure containment captures dislodged soot, creosote, and debris at the source without releasing dust into your living room.',
  },
  {
    category: 'Commercial Services',
    question: 'Do you offer after-hours and weekend scheduling for commercial duct cleaning?',
    answer:
      'Yes. We regularly work with commercial building managers, property owners, corporate offices, retail storefronts, and industrial facilities. We provide flexible after-hours and weekend scheduling windows so your cleaning is completed without interrupting day-to-day business operations.',
  },
  {
    category: 'Free Quotes',
    question: 'How do I request a free quote and is there any obligation?',
    answer:
      'You can request a 100% free, no-obligation quote online anytime through our website by submitting your service requirements, property type, and address. Our team reviews your project specifications and provides transparent, upfront pricing details with zero hidden fees.',
  },
  {
    category: 'Scheduling',
    question: 'How does appointment scheduling work with CREWW DUCT CLEANING?',
    answer:
      'You can select your preferred appointment date and time directly through our online quote or booking request form. Our responsive scheduling team reviews your request and coordinates with you to confirm your service appointment window.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Clear, transparent answers about our NADCA Certified air duct, dryer vent, HVAC, and chimney cleaning services.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white dark:bg-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
