import emailjs from '@emailjs/browser';
import { QuoteFormData, BookingFormData } from '../types';
import { EMAILJS_CONFIG } from '../config/emailjs';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  inquiryId?: string;
  data?: T;
}

// User-friendly standard error message (never exposing internal IDs or technical details)
const STANDARD_ERROR_MESSAGE = 'Something went wrong while sending your request. Please try again.';

// Initialize EmailJS with the official public key
try {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
  });
} catch (err) {
  console.error('EmailJS initialization check:', err);
}

/**
 * Format submission timestamp
 */
function getSubmissionTimestamp(): string {
  try {
    return new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Dispatch EmailJS with intelligent fallback in case configured service ID is not found on the account
 */
async function sendWithServiceFallback(
  serviceId: string,
  templateId: string,
  templateParams: Record<string, unknown>,
  publicKey: string
) {
  try {
    return await emailjs.send(serviceId, templateId, templateParams, publicKey);
  } catch (err: any) {
    const errorText = err?.text || err?.message || JSON.stringify(err);
    // If the configured service ID is not found in the account, automatically fall back to the active service
    if (
      (errorText.includes('service ID not found') || err?.status === 400) &&
      serviceId !== EMAILJS_CONFIG.FALLBACK_SERVICE_ID
    ) {
      console.warn(`EmailJS service ID "${serviceId}" not found. Automatically using verified "${EMAILJS_CONFIG.FALLBACK_SERVICE_ID}"...`);
      return await emailjs.send(
        EMAILJS_CONFIG.FALLBACK_SERVICE_ID,
        templateId,
        templateParams,
        publicKey
      );
    }
    throw err;
  }
}

/**
 * Helper to trigger customer auto-reply email if customer provided an email address
 */
async function triggerCustomerAutoReply(params: {
  customerName: string;
  customerEmail: string;
  requestType: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
}): Promise<void> {
  if (!params.customerEmail || !params.customerEmail.trim() || !params.customerEmail.includes('@')) {
    return;
  }

  // If a dedicated auto-reply template ID is configured, send the auto-reply
  if (
    EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID &&
    EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID !== 'EMAILJS_AUTO_REPLY_TEMPLATE_ID'
  ) {
    try {
      const autoReplyParams = {
        to_email: params.customerEmail.trim(),
        reply_to: EMAILJS_CONFIG.BUSINESS_EMAIL,
        from_name: EMAILJS_CONFIG.BUSINESS_NAME,
        subject: 'We Received Your Request | CREWW DUCT CLEANING',
        customer_name: params.customerName,
        request_type: params.requestType,
        service: params.service,
        preferred_date: params.preferredDate || 'Not specified',
        preferred_time: params.preferredTime || 'Not specified',
      };

      await sendWithServiceFallback(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
        autoReplyParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
    } catch (err) {
      // Log silently in dev, never break primary successful submission
      console.warn('Customer auto-reply separate dispatch check:', err);
    }
  }
}

/**
 * 1. GET A FREE QUOTE FORM SUBMISSION
 * Uses official template_wydedqf with exact required variable mapping
 */
export async function submitQuote(data: QuoteFormData): Promise<ApiResponse> {
  try {
    const timestamp = getSubmissionTimestamp();
    const hasEmail = Boolean(data.email && data.email.trim());

    // Map exact required template variables
    const templateParams = {
      request_type: 'Free Quote',
      customer_name: data.fullName,
      phone: data.phone,
      email: hasEmail ? data.email.trim() : 'Not provided',
      property_type: data.propertyType,
      service: data.serviceNeeded,
      address: data.fullAddress,
      zip_code: data.zipCode,
      preferred_date: data.preferredDate || 'Not specified',
      preferred_time: data.preferredTime || 'Not specified',
      message: data.additionalDetails || 'None provided',
      submission_date: timestamp,
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
      from_name: EMAILJS_CONFIG.BUSINESS_NAME,
      reply_to: hasEmail ? data.email.trim() : EMAILJS_CONFIG.BUSINESS_EMAIL,
      subject: 'New Free Quote | CREWW DUCT CLEANING',
    };

    // Send primary notification through EmailJS
    const response = await sendWithServiceFallback(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.QUOTE_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (response.status === 200 || response.text === 'OK') {
      // Trigger customer auto-reply if email was provided
      if (hasEmail) {
        await triggerCustomerAutoReply({
          customerName: data.fullName,
          customerEmail: data.email,
          requestType: 'Free Quote',
          service: data.serviceNeeded,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        });
      }

      return {
        success: true,
        message: 'Thank you! Your quote request has been received. Our team will review your information and contact you with the next steps.',
        inquiryId: `Q-${Date.now().toString().slice(-6)}`,
      };
    } else {
      return {
        success: false,
        error: STANDARD_ERROR_MESSAGE,
      };
    }
  } catch (err: any) {
    console.error('EmailJS quote submission failed:', err);
    return {
      success: false,
      error: STANDARD_ERROR_MESSAGE,
    };
  }
}

/**
 * 2. BOOK YOUR SERVICE FORM SUBMISSION
 * Connects service booking to EmailJS
 */
export async function submitBooking(data: BookingFormData): Promise<ApiResponse> {
  try {
    const timestamp = getSubmissionTimestamp();
    const hasEmail = Boolean(data.email && data.email.trim());

    // Map exact required template variables
    const templateParams = {
      request_type: 'Book Your Service',
      customer_name: data.fullName,
      phone: data.phone,
      email: hasEmail ? data.email.trim() : 'Not provided',
      property_type: data.propertyType || 'Residential',
      service: data.serviceNeeded,
      address: data.fullAddress,
      zip_code: data.zipCode,
      preferred_date: data.preferredDate || 'Not specified',
      preferred_time: data.preferredTime || 'Not specified',
      message: data.additionalDetails || 'None provided',
      submission_date: timestamp,
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
      from_name: EMAILJS_CONFIG.BUSINESS_NAME,
      reply_to: hasEmail ? data.email.trim() : EMAILJS_CONFIG.BUSINESS_EMAIL,
      subject: 'New Service Request | CREWW DUCT CLEANING',
    };

    // Send through EmailJS
    const response = await sendWithServiceFallback(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.BOOKING_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (response.status === 200 || response.text === 'OK') {
      // Trigger customer auto-reply if email was provided
      if (hasEmail) {
        await triggerCustomerAutoReply({
          customerName: data.fullName,
          customerEmail: data.email,
          requestType: 'Book Your Service',
          service: data.serviceNeeded,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        });
      }

      return {
        success: true,
        message: 'Thank you! Your service request has been received. Our team will review your details and contact you regarding scheduling.',
        inquiryId: `B-${Date.now().toString().slice(-6)}`,
      };
    } else {
      return {
        success: false,
        error: STANDARD_ERROR_MESSAGE,
      };
    }
  } catch (err: any) {
    console.error('EmailJS booking submission failed:', err);
    return {
      success: false,
      error: STANDARD_ERROR_MESSAGE,
    };
  }
}
