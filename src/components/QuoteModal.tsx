import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, MapPin, Sparkles } from 'lucide-react';
import { ServiceType, PropertyType, QuoteFormData } from '../types';
import { submitQuote } from '../services/api';
import { DatePicker } from './ui/DatePicker';
import { TimePicker } from './ui/TimePicker';
import crewwLogo from '../assets/images/creww_official_logo_1791048839644.jpg';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  initialPropertyType?: PropertyType;
  promoApplied?: boolean;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Air Duct Cleaning',
  initialPropertyType = 'Residential',
  promoApplied = false,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: initialPropertyType,
    serviceNeeded: initialService,
    fullAddress: '',
    zipCode: '',
    preferredDate: '',
    preferredTime: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialPropertyType) {
      setFormData((prev) => ({ ...prev, propertyType: initialPropertyType }));
    }
  }, [initialPropertyType]);

  if (!isOpen) return null;

  const isZipValid = /^\d{5}(-\d{4})?$/.test(formData.zipCode.trim());

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type.';
    }
    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = 'Please select the service needed.';
    }
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Please enter your full address.';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter your ZIP Code.';
    } else if (!isZipValid) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP Code.';
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
      const res = await submitQuote({ ...formData, promoApplied });
      if (res.success) {
        setInquiryId(res.inquiryId || 'QUOTE-OK');
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
    setInquiryId(null);
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
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close quote popup"
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
              Get Your Free Quote
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Tell us a few details about your property and the service you need.
        </p>

        {inquiryId ? (
          /* Polished Success State */
          <div className="text-center py-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            {/* Required Success Copy */}
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Quote Request Submitted
            </h4>
            <p className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Reference: {inquiryId}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you! Your quote request has been received. Our team will review your information and contact you with the next steps.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        ) : (
          /* Quote Request Form */
          <form onSubmit={handleSubmit} noValidate className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {serverError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Property Type & Service Needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="qm-propertyType" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="qm-propertyType"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                  className="w-full min-h-[50px] px-3.5 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {errors.propertyType && <p className="mt-1 text-[11px] text-red-500">{errors.propertyType}</p>}
              </div>

              <div>
                <label htmlFor="qm-serviceNeeded" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Service Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="qm-serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value as ServiceType })}
                  className="w-full min-h-[50px] px-3.5 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                  <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                  <option value="HVAC Cleaning">HVAC Cleaning</option>
                  <option value="Chimney Cleaning">Chimney Cleaning</option>
                  <option value="Other">Other</option>
                </select>
                {errors.serviceNeeded && <p className="mt-1 text-[11px] text-red-500">{errors.serviceNeeded}</p>}
              </div>
            </div>

            {/* Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="qm-fullName" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="qm-fullName"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="qm-phone" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="qm-phone"
                  type="tel"
                  required
                  placeholder="e.g. (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="qm-email" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Email Address <span className="text-[11px] font-normal text-slate-500">(Optional for auto-reply)</span>
              </label>
              <input
                id="qm-email"
                type="email"
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
            </div>

            {/* Full Address & ZIP Code */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              <div className="sm:col-span-8">
                <label htmlFor="qm-address" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="qm-address"
                  type="text"
                  required
                  placeholder="Street address, unit"
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.fullAddress ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.fullAddress && <p className="mt-1 text-[11px] text-red-500">{errors.fullAddress}</p>}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="qm-zip" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="qm-zip"
                  type="text"
                  required
                  maxLength={10}
                  placeholder="e.g. 90210"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className={`w-full min-h-[50px] px-3.5 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.zipCode ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.zipCode && <p className="mt-1 text-[11px] text-red-500">{errors.zipCode}</p>}
              </div>
            </div>

            {/* Clean ZIP Code Availability Status Area */}
            {isZipValid && (
              <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-200 animate-in fade-in duration-200">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Thanks! Your ZIP Code has been received. Please complete the form below and our team will confirm service availability.
                </p>
              </div>
            )}

            {/* Preferred Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <DatePicker
                id="qm-date"
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
                id="qm-time"
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

            {/* Additional Details */}
            <div>
              <label htmlFor="qm-details" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Additional Details <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
              </label>
              <textarea
                id="qm-details"
                rows={2}
                placeholder="Access details, system specifications, or special requests..."
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
                    <span>REQUEST MY FREE QUOTE</span>
                    <Send className="w-4 h-4" />
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
