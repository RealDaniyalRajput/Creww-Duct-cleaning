/**
 * CREWW DUCT CLEANING
 * Centralized EmailJS Configuration
 * 
 * ONLY Quote and Booking forms use this EmailJS integration.
 * (Callback EmailJS is excluded and will be connected separately later.)
 */
export const EMAILJS_CONFIG = {
  // Official Public Key provided
  PUBLIC_KEY: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) || 'n3Ulu7VepWS3tiOVM',

  // Official Service ID provided
  SERVICE_ID: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_SERVICE_ID) || 'service_j6mg33',

  // Active verified fallback Service ID for account n3Ulu7VepWS3tiOVM
  FALLBACK_SERVICE_ID: 'default_service',

  // Official Quote Template ID provided (MUST be used for Quote & Booking)
  QUOTE_TEMPLATE_ID: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_QUOTE_TEMPLATE_ID) || 'template_wydedqf',

  // Booking uses the same verified template
  BOOKING_TEMPLATE_ID: 'template_wydedqf',

  // Customer Auto-Reply Template ID placeholder (if configured as separate template in EmailJS dashboard)
  AUTO_REPLY_TEMPLATE_ID: 'EMAILJS_AUTO_REPLY_TEMPLATE_ID',

  // Official Business Receiving Email
  BUSINESS_EMAIL: 'crewwductcleaning@gmail.com',

  // Official Business Name (Exact spelling with two Ws: CREWW DUCT CLEANING)
  BUSINESS_NAME: 'CREWW DUCT CLEANING',
};
