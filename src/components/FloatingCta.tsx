import React from 'react';

interface FloatingCtaProps {
  onQuoteClick?: () => void;
}

/**
 * Floating CTA is now managed through the synchronized Floating Actions Cluster
 * inside AskCrewwChatbot to eliminate UI collisions, respect open modals, and
 * intelligently avoid footer content as strictly required.
 */
export const FloatingCta: React.FC<FloatingCtaProps> = () => null;
