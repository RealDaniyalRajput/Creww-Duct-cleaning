import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesOverview } from './components/ServicesOverview';
import { ResidentialSection } from './components/ResidentialSection';
import { CommercialSection } from './components/CommercialSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HowItWorks } from './components/HowItWorks';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { QuoteSection } from './components/QuoteSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { PromoModal } from './components/PromoModal';
import { QuoteModal } from './components/QuoteModal';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { AskCrewwChatbot } from './components/AskCrewwChatbot';
import { useFooterDetection } from './hooks/useFooterDetection';
import { ServiceType, PropertyType } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('Air Duct Cleaning');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('Residential');
  const [promoApplied, setPromoApplied] = useState(false);

  // Footer Detection Hook for intelligent floating avoidance
  const { isNearFooter } = useFooterDetection();

  // Conversion Modals States (All major conversion buttons open polished popups)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalService, setQuoteModalService] = useState<ServiceType>('Air Duct Cleaning');
  const [quoteModalPropType, setQuoteModalPropType] = useState<PropertyType>('Residential');
  const [quoteModalPromo, setQuoteModalPromo] = useState(false);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalService, setBookingModalService] = useState<ServiceType>('Air Duct Cleaning');

  // Service Details Modal State
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceType | null>(null);

  // Legal Modals States
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Check if any modal is currently open to hide all floating elements
  const isAnyModalOpen =
    isQuoteModalOpen ||
    isBookingModalOpen ||
    isServiceDetailsOpen ||
    isPrivacyPolicyOpen ||
    isTermsOpen;

  // Modal Open Handlers
  const openQuoteModal = (service?: ServiceType, propType?: PropertyType, promo: boolean = false) => {
    if (service) setQuoteModalService(service);
    if (propType) setQuoteModalPropType(propType);
    setQuoteModalPromo(promo || promoApplied);
    setIsQuoteModalOpen(true);
  };

  const openBookingModal = (service: ServiceType = 'Air Duct Cleaning') => {
    setBookingModalService(service);
    setIsBookingModalOpen(true);
  };

  const openServiceDetails = (service: ServiceType) => {
    setSelectedDetailService(service);
    setIsServiceDetailsOpen(true);
  };

  const handleClaimPromo = () => {
    setPromoApplied(true);
    openQuoteModal(undefined, undefined, true);
  };

  return (
    <ThemeProvider>
      <div id="top" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
        
        {/* Header (Non-sticky as strictly required; buttons open modals) */}
        <Header
          onNavigateToQuote={() => openQuoteModal()}
          onBookService={() => openBookingModal()}
        />

        {/* Main Content Area */}
        <main>
          {/* Hero Section (Buttons open Quote and Booking modals) */}
          <Hero
            onQuoteClick={() => openQuoteModal()}
            onBookClick={() => openBookingModal()}
          />

          {/* Trust Strip */}
          <TrustStrip />

          {/* Compact Services Overview Cards (VIEW DETAILS & BOOK YOUR SERVICE) */}
          <ServicesOverview
            onBookService={openBookingModal}
            onViewDetails={openServiceDetails}
          />

          {/* Residential Section (Compact overview of homeowner services) */}
          <ResidentialSection
            onQuoteClick={() => openQuoteModal(undefined, 'Residential')}
            onSelectService={(service) => openBookingModal(service)}
          />

          {/* Commercial Section (Compact commercial solutions) */}
          <CommercialSection
            onRequestCommercialQuote={() => openQuoteModal(undefined, 'Commercial')}
          />

          {/* About Section */}
          <AboutSection />

          {/* Why Choose CREWW Section */}
          <WhyChooseSection />

          {/* Certifications & Credentials Section (NADCA Certified trust signal) */}
          <CertificationsSection />

          {/* How It Works Section (Compact 4-step process) */}
          <HowItWorks />

          {/* Before & After Section (Interactive comparison) */}
          <BeforeAfterSection
            onBookService={openBookingModal}
          />

          {/* In-Page Quote Section for Complete Information */}
          <QuoteSection
            selectedService={selectedService}
            selectedPropertyType={selectedPropertyType}
            promoApplied={promoApplied}
          />

          {/* Frequently Asked Questions Section */}
          <FaqSection />

          {/* Contact Section (Buttons open Quote and Booking modals) */}
          <ContactSection
            onQuoteClick={() => openQuoteModal()}
            onBookClick={() => openBookingModal()}
          />
        </main>

        {/* Footer (Compact and professional with Legal Modals triggers) */}
        <Footer
          onSelectService={(service) => openBookingModal(service)}
          onNavigateToQuote={() => openQuoteModal()}
          onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
          onOpenTerms={() => setIsTermsOpen(true)}
        />

        {/* Discreet Back to Top Button (Hidden when modals open, lifts near footer) */}
        <BackToTop
          isModalOpen={isAnyModalOpen}
          isNearFooter={isNearFooter}
        />

        {/* Coordinated Floating Actions Cluster & Ask CREWW Chatbot */}
        <AskCrewwChatbot
          onOpenBooking={openBookingModal}
          onNavigateToQuote={() => openQuoteModal()}
          onQuoteClick={() => openQuoteModal()}
          isModalOpen={isAnyModalOpen}
          isNearFooter={isNearFooter}
        />

        {/* 45% OFF Promotional Modal */}
        <PromoModal onClaimPromo={handleClaimPromo} />

        {/* Service Details Modal Popup (Clean progressive disclosure) */}
        <ServiceDetailsModal
          isOpen={isServiceDetailsOpen}
          onClose={() => setIsServiceDetailsOpen(false)}
          serviceId={selectedDetailService}
          onBookService={openBookingModal}
        />

        {/* Get Your Free Quote Modal Popup */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialService={quoteModalService}
          initialPropertyType={quoteModalPropType}
          promoApplied={quoteModalPromo}
        />

        {/* Book Your Service Modal Popup */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialService={bookingModalService}
        />

        {/* Privacy Policy Modal Overlay */}
        <PrivacyPolicyModal
          isOpen={isPrivacyPolicyOpen}
          onClose={() => setIsPrivacyPolicyOpen(false)}
        />

        {/* Terms & Conditions Modal Overlay */}
        <TermsModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
