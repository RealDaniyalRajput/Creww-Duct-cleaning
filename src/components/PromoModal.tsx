import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, Tag, Clock } from 'lucide-react';
import crewwLogo from '../assets/images/creww_official_logo_1791048839644.jpg';

interface PromoModalProps {
  onClaimPromo: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onClaimPromo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Fixed internal campaign expiration: November 6, 2026 23:59:59 UTC
  // CRITICAL: We NEVER display this date to the user. Only the countdown timer.
  const CAMPAIGN_END_TIMESTAMP = Date.UTC(2026, 10, 6, 23, 59, 59);

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = CAMPAIGN_END_TIMESTAMP - now;

    if (difference <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Check if user previously dismissed in this session
    const dismissedSession = sessionStorage.getItem('creww_promo_dismissed');
    if (dismissedSession) {
      setIsDismissed(true);
      return;
    }

    // Do not show automatically if offer already expired
    if (timeLeft.expired) {
      return;
    }

    // Show after 3.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [timeLeft.expired]);

  // Real countdown interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('creww_promo_dismissed', 'true');
  };

  const handleClaim = () => {
    handleClose();
    onClaimPromo();
  };

  if (!isOpen || isDismissed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close promotional offer modal"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Kicker */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={crewwLogo}
            alt="CREWW DUCT CLEANING"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            CREWW DUCT CLEANING
          </span>
        </div>

        {/* Headline */}
        <div className="text-left mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            LIMITED-TIME OFFER
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
              45% OFF
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Get 45% OFF your eligible cleaning service for a limited time.
          </p>
        </div>

        {/* Countdown Box */}
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 mb-6">
          {timeLeft.expired ? (
            <div className="text-center py-2 text-slate-500 font-bold uppercase tracking-wider text-sm">
              OFFER ENDED
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Time Remaining</span>
                </span>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  Act fast
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    DAYS
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    HOURS
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    MINUTES
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    SECONDS
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="space-y-3">
          {!timeLeft.expired ? (
            <button
              onClick={handleClaim}
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all duration-150 cursor-pointer"
            >
              <span>CLAIM YOUR 45% OFF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-500 text-center font-bold text-sm rounded-xl">
              OFFER ENDED
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full py-2.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer text-center"
          >
            CONTINUE TO WEBSITE
          </button>
        </div>

      </div>
    </div>
  );
};
