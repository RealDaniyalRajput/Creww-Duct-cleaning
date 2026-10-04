import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  isModalOpen?: boolean;
  isNearFooter?: boolean;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  isModalOpen = false,
  isNearFooter = false,
}) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appears only after the user has scrolled past the hero section (~450px)
      if (window.scrollY > 450) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When any modal is open, completely hide BackToTop so it never obstructs modal content
  if (isModalOpen || !scrolledPastHero) return null;

  return (
    <div
      className={`fixed z-30 left-4 sm:left-6 transition-all duration-300 pointer-events-auto ${
        isNearFooter ? 'bottom-16 sm:bottom-20' : 'bottom-5'
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xs transition-all duration-150 active:scale-95 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};
