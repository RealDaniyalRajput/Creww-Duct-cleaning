import React, { useEffect } from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
          aria-label="Close terms and conditions"
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Legal Documentation
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Terms & Conditions
            </h3>
          </div>
        </div>

        {/* Scrollable Terms Content */}
        <div className="overflow-y-auto pr-2 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            Effective Date: October 2026 • CREWW DUCT CLEANING
          </p>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              1. Acceptance of Terms
            </h4>
            <p>
              By accessing the website of CREWW DUCT CLEANING or submitting a quote or booking inquiry, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please refrain from using the site or submitting requests.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              2. Service Scope & Estimates
            </h4>
            <p>
              All online quotes and preliminary estimates provided via this website are approximations based on customer-supplied specifications (such as register count, system configuration, home square footage, or duct run length). Formal work scope and final pricing are confirmed upon technician on-site evaluation prior to the commencement of cleaning.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              3. Scheduling & Availability
            </h4>
            <p>
              Preferred dates and times submitted through our web forms represent customer scheduling preferences. Appointment booking requests are not guaranteed until our dispatch team contacts you to verify availability, service area logistics, and access requirements.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              4. Property Access & Customer Responsibilities
            </h4>
            <p>
              To perform thorough air duct, dryer vent, HVAC, or chimney cleaning, customers agree to provide reasonable, safe access to registers, returns, furnace/air handler units, exterior exhaust caps, electrical outlets, and water/hearth fixtures. Technicians reserve the right to decline service if hazardous working conditions or structural impediments exist.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              5. Intellectual Property
            </h4>
            <p>
              All trademarks, service marks, logo designs, photography, site copy, and interface elements appearing on this website are the proprietary property of CREWW DUCT CLEANING. Unauthorized duplication or commercial distribution is prohibited.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              6. Limitation of Liability
            </h4>
            <p>
              While CREWW DUCT CLEANING strives to maintain accurate and up-to-date website information, website content is provided on an &ldquo;as is&rdquo; basis without warranties of any kind. In no event shall CREWW DUCT CLEANING be liable for indirect or consequential damages arising from website use or reliance on preliminary digital estimates.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              7. Governing Law
            </h4>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the applicable laws of the United States and the jurisdiction in which cleaning services are delivered.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              8. Contact Information
            </h4>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact:
            </p>
            <div className="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              <p className="font-semibold">CREWW DUCT CLEANING</p>
              <p className="font-mono text-blue-600 dark:text-blue-400">crewwductcleaning@gmail.com</p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            I UNDERSTAND & CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
