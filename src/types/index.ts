export type Theme = 'light' | 'dark';

export type PropertyType = 'Residential' | 'Commercial';

export type ServiceType = 
  | 'Air Duct Cleaning'
  | 'Dryer Vent Cleaning'
  | 'HVAC Cleaning'
  | 'Chimney Cleaning'
  | 'Other';

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  serviceNeeded: ServiceType;
  fullAddress: string;
  zipCode: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails: string;
  promoApplied?: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  serviceNeeded: ServiceType;
  fullAddress: string;
  zipCode: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails?: string;
}
