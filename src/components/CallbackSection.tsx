import React, { useState } from 'react';
import { PhoneCall, CheckCircle2, AlertCircle, Clock, Calendar, Send } from 'lucide-react';
import { CallbackFormData } from '../types';
import { submitCallback } from '../services/api';
import { DatePicker } from './ui/DatePicker';
import { TimePicker } from './ui/TimePicker';

export const CallbackSection: React.FC = () => {
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

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CallbackFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.preferredDate.trim()) {
      newErrors.preferredDate = 'Preferred Date is required';
    }
    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = 'Preferred Time is required';
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

  return (
    <section id="callback" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-6">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <PhoneCall className="w-4 h-4" />
            <span>Fast Call Request</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Need Us to Call You?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Tell us when you&apos;d like to hear from the CREWW Duct Cleaning team.
          </p>
        </div>

        {/* Success Confirmation State */}
        {isSuccess ? (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-emerald-300 dark:border-emerald-800 p-8 sm:p-10 text-center shadow-lg animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            {/* Exact Required Success Message */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Callback Request Received
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
              Thank you! Your callback request has been received. Our team will review your request and contact you at your preferred time.
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Preferred Time:</strong> {formData.preferredDate} at {formData.preferredTime}</p>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: '',
                  phone: '',
                  preferredDate: '',
                  preferredTime: '',
                  additionalDetails: '',
                });
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Request Another Callback
            </button>
          </div>
        ) : (
          /* Simplified Callback Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-slate-50 dark:bg-slate-900/70 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"
          >
            {serverError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label htmlFor="cb-fullName" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="cb-fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="cb-phone" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. (555) 765-4321"
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Preferred Date * & Preferred Time * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <DatePicker
                  id="cb-preferredDate"
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
                  id="cb-preferredTime"
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

              {/* Optional: Additional Details */}
              <div>
                <label htmlFor="cb-additionalDetails" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Additional Details <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
                </label>
                <textarea
                  id="cb-additionalDetails"
                  rows={2}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  placeholder="Any particular questions or instructions for the call..."
                  className="w-full p-3 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all duration-150 cursor-pointer"
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

            </div>
          </form>
        )}

      </div>
    </section>
  );
};
