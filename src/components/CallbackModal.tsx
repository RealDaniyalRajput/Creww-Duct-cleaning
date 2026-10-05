import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, PhoneCall, Calendar, Clock } from 'lucide-react';
import { CallbackFormData } from '../types';
import { submitCallback } from '../services/api';
import { DatePicker } from './ui/DatePicker';
import { TimePicker } from './ui/TimePicker';
import crewwLogo from '../assets/images/creww_official_logo_1791048839644.jpg';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CallbackFormData>({
    fullName: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CallbackFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CallbackFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.preferredDate.trim()) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }
    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = 'Please select a preferred time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await submitCallback(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError('Something went wrong while sending your request. Please try again.');
      }
    } catch (err: any) {
      setServerError('Something went wrong while sending your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setServerError(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close callback popup"
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={crewwLogo}
            alt="CREWW DUCT CLEANING"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              CREWW DUCT CLEANING
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Request a Callback
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Tell us when you&apos;d like our team to contact you.
        </p>

        {isSuccess ? (
          /* Polished Success State */
          <div className="text-center py-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Required Success Copy */}
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Callback Request Received
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you! Your callback request has been received. Our team will review your request and contact you at your preferred time.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        ) : (
          /* Short Callback Form */
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {serverError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="cbm-fullName" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cbm-fullName"
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="cbm-phone" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="cbm-phone"
                type="tel"
                required
                placeholder="e.g. (555) 765-4321"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
            </div>

            {/* Preferred Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <DatePicker
                id="cbm-date"
                label="Preferred Date"
                required
                value={formData.preferredDate}
                onChange={(val) => {
                  setFormData({ ...formData, preferredDate: val });
                  if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                }}
                error={errors.preferredDate}
              />

              <TimePicker
                id="cbm-time"
                label="Preferred Time"
                required
                value={formData.preferredTime}
                onChange={(val) => {
                  setFormData({ ...formData, preferredTime: val });
                  if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                }}
                error={errors.preferredTime}
              />
            </div>

            {/* Additional Details (Optional) */}
            <div>
              <label htmlFor="cbm-details" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Additional Details <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
              </label>
              <textarea
                id="cbm-details"
                rows={2}
                placeholder="Specific questions or notes for the call..."
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                className="w-full p-3 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-70"
              >
                {submitting ? (
                  <span>SENDING REQUEST...</span>
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>REQUEST A CALLBACK</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
