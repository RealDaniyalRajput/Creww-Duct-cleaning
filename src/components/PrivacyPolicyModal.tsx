import React, { useEffect } from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
          aria-label="Close privacy policy"
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Legal Documentation
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Privacy Policy
            </h3>
          </div>
        </div>

        {/* Scrollable Legal Content */}
        <div className="overflow-y-auto pr-2 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            Last Updated: October 2026 • CREWW DUCT CLEANING
          </p>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              1. Information We Collect
            </h4>
            <p>
              CREWW DUCT CLEANING respects your personal privacy. We only collect information that you voluntarily provide to us when using our website, submitting an inquiry, requesting a free estimate, or scheduling service appointments.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              2. Information You Provide
            </h4>
            <p className="mb-2">
              When you submit a quote request or booking request via our forms, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address (for confirmations and service documentation)</li>
              <li>Property Type (Residential or Commercial)</li>
              <li>Service Needed (Air Duct, Dryer Vent, HVAC, Chimney, or Other)</li>
              <li>Physical Service Address and ZIP Code</li>
              <li>Preferred Scheduling Dates and Times</li>
              <li>Any optional system specifications or property access notes you include</li>
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              3. How Information Is Used
            </h4>
            <p>
              The information you submit is used solely to evaluate your service requirements, estimate labor and scope, verify geographic service availability, contact you to confirm appointment schedules, and coordinate dispatch of professional technicians.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              4. Form Submissions & Email Notification
            </h4>
            <p>
              When you submit a form on this website, your inquiry details are formatted securely and transmitted directly to our service dispatch team at{' '}
              <strong className="text-slate-900 dark:text-white font-mono">crewwductcleaning@gmail.com</strong>. We do not sell, rent, or trade your contact information to marketing brokers, third-party advertisers, or lead generation aggregators.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              5. Cookies and Local Storage
            </h4>
            <p>
              This website uses browser local storage strictly for functional application preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 mt-1">
              <li>Remembering your selected light or dark display mode.</li>
              <li>Remembering if you dismissed the temporary promotional banner in your current browser session.</li>
            </ul>
            <p className="mt-2">
              We do not deploy invasive cross-site tracking cookies or surveillance analytics.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              6. Third-Party Services
            </h4>
            <p>
              Our website may utilize secure cloud hosting infrastructure to serve web assets. These service providers process data only as necessary to deliver website functionality under strict confidentiality standards.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              7. Data Security
            </h4>
            <p>
              We apply standard technical protections, including SSL/TLS encryption for all in-transit form transmissions, to safeguard your personal details against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              8. Data Retention
            </h4>
            <p>
              Customer service inquiries are retained only for the duration required to complete customer inquiries, fulfill scheduled work, maintain customer service records, and comply with standard business and tax accounting practices.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              9. Your Choices & Data Rights
            </h4>
            <p>
              You have the right to review, update, or request the deletion of any contact information you have previously provided to us. To exercise these choices, please email us directly with your request.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              10. Contact Information
            </h4>
            <p>
              For any questions regarding this Privacy Policy or our data handling practices, please contact:
            </p>
            <div className="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              <p className="font-semibold">CREWW DUCT CLEANING</p>
              <p className="font-mono text-blue-600 dark:text-blue-400">crewwductcleaning@gmail.com</p>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              11. Policy Updates
            </h4>
            <p>
              We may revise this Privacy Policy periodically to reflect changes in our service operations or legal requirements. Any modifications will be posted directly within this modal with an updated revision date.
            </p>
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
