import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Shield, Clock } from 'lucide-react';
import { PropertyType, ServiceType, QuoteFormData } from '../types';
import { submitQuote } from '../services/api';
import { DatePicker } from './ui/DatePicker';
import { TimePicker } from './ui/TimePicker';

interface QuoteSectionProps {
  selectedService?: ServiceType;
  selectedPropertyType?: PropertyType;
  promoApplied?: boolean;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  selectedService = 'Air Duct Cleaning',
  selectedPropertyType = 'Residential',
  promoApplied = false,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: selectedPropertyType,
    serviceNeeded: selectedService,
    fullAddress: '',
    zipCode: '',
    preferredDate: '',
    preferredTime: '',
    additionalDetails: '',
    promoApplied: promoApplied,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync props when user clicks a service card or promo
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: selectedService }));
    }
  }, [selectedService]);

  React.useEffect(() => {
    if (selectedPropertyType) {
      setFormData((prev) => ({ ...prev, propertyType: selectedPropertyType }));
    }
  }, [selectedPropertyType]);

  React.useEffect(() => {
    if (promoApplied) {
      setFormData((prev) => ({ ...prev, promoApplied: true }));
    }
  }, [promoApplied]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.propertyType) {
      newErrors.propertyType = 'Property Type is required';
    }
    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = 'Service Needed is required';
    }
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full Address is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Please enter a valid 5-digit US ZIP Code';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
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
      const res = await submitQuote(formData);
      if (res.success) {
        setSubmittedInquiryId(res.inquiryId || 'CONFIRMED');
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
    <section id="quote" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          {formData.promoApplied && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>45% OFF OFFER Applied</span>
            </div>
          )}
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
            Upfront & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
            Request Your Free Quote
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Provide your service requirements and property details. Our team will review your specifications and provide a free, no-obligation estimate.
          </p>
        </div>

        {/* Success Confirmation State */}
        {submittedInquiryId ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-300 dark:border-emerald-800 p-8 sm:p-12 text-center shadow-lg animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Quote Request Received
            </h3>
            <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold mb-4">
              Reference ID: {submittedInquiryId}
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
              Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>. Your detailed quote request for {formData.serviceNeeded} has been routed to the CREWW Duct Cleaning team. We will review your property specifications and reach out with your estimate.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1 mb-8">
              <p><strong>Property:</strong> {formData.propertyType} — {formData.fullAddress}, {formData.zipCode}</p>
              <p><strong>Contact Phone:</strong> {formData.phone}</p>
              {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
              {formData.promoApplied && <p className="text-blue-600 dark:text-blue-400 font-semibold">Promotion: 45% OFF Eligible Service Applied</p>}
            </div>
            <button
              onClick={() => {
                setSubmittedInquiryId(null);
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  propertyType: 'Residential',
                  serviceNeeded: 'Air Duct Cleaning',
                  fullAddress: '',
                  zipCode: '',
                  preferredDate: '',
                  preferredTime: '',
                  additionalDetails: '',
                  promoApplied: false,
                });
              }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-colors"
            >
              Submit Another Quote Request
            </button>
          </div>
        ) : (
          /* The Quote Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm"
          >
            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="space-y-6">
              
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-fullName" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Miller"
                    className={`w-full min-h-[52px] px-4 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="quote-phone" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. (555) 234-5678"
                    className={`w-full min-h-[52px] px-4 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div>
                <label htmlFor="quote-email" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Email Address <span className="text-xs font-normal text-slate-500">(Optional for auto-reply)</span>
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className={`w-full min-h-[52px] px-4 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                    errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Row 3: Property Type & Service Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-propertyType" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="quote-propertyType"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                    className="w-full min-h-[52px] px-4 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-serviceNeeded" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="quote-serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value as ServiceType })}
                    className="w-full min-h-[52px] px-4 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                  >
                    <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                    <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                    <option value="HVAC Cleaning">HVAC Cleaning</option>
                    <option value="Chimney Cleaning">Chimney Cleaning</option>
                    <option value="Other">Other / Multiple Services</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Full Address & ZIP Code (MUST BE SEPARATE) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-8">
                  <label htmlFor="quote-fullAddress" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-fullAddress"
                    type="text"
                    required
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    placeholder="Street address, unit/suite"
                    className={`w-full min-h-[52px] px-4 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.fullAddress ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.fullAddress && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullAddress}</p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="quote-zipCode" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-zipCode"
                    type="text"
                    required
                    maxLength={10}
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="e.g. 90210"
                    className={`w-full min-h-[52px] px-4 text-base rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.zipCode ? 'border-red-500 bg-red-50/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DatePicker
                  id="quote-preferredDate"
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
                  id="quote-preferredTime"
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

              {/* Row 6: Additional Details */}
              <div>
                <label htmlFor="quote-additionalDetails" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Additional Details <span className="text-xs font-normal text-slate-500">(Optional)</span>
                </label>
                <textarea
                  id="quote-additionalDetails"
                  rows={3}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  placeholder="Number of vents, square footage, chimney height, or special instructions..."
                  className="w-full p-4 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors resize-y"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[54px] inline-flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70 text-white font-bold text-base rounded-xl shadow-md transition-all duration-150 cursor-pointer"
                >
                  {submitting ? (
                    <span>SENDING REQUEST...</span>
                  ) : (
                    <>
                      <span>REQUEST MY FREE QUOTE</span>
                      <Send className="w-5 h-5" />
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
