import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ArrowRight, PhoneCall } from 'lucide-react';
import { ServiceType } from '../types';
import crewwLogo from '../assets/images/creww_official_logo_1791048839644.jpg';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: 'quote' | 'callback' | 'book';
}

interface AskCrewwChatbotProps {
  onOpenBooking: (service?: ServiceType) => void;
  onNavigateToQuote: () => void;
  onNavigateToCallback: () => void;
  onQuoteClick: () => void;
  isModalOpen?: boolean;
  isNearFooter?: boolean;
}

export const AskCrewwChatbot: React.FC<AskCrewwChatbotProps> = ({
  onOpenBooking,
  onNavigateToQuote,
  onNavigateToCallback,
  onQuoteClick,
  isModalOpen = false,
  isNearFooter = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isQuoteCtaVisible, setIsQuoteCtaVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: "Hi, I’m the CREWW Assistant. How can I help you today?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for the floating Quote CTA visibility (past ~350px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsQuoteCtaVisible(true);
      } else {
        setIsQuoteCtaVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    { label: 'Air Duct Cleaning', type: 'info', query: 'Tell me about Air Duct Cleaning' },
    { label: 'Dryer Vent Cleaning', type: 'info', query: 'Tell me about Dryer Vent Cleaning' },
    { label: 'HVAC Cleaning', type: 'info', query: 'Tell me about HVAC Cleaning' },
    { label: 'Chimney Cleaning', type: 'info', query: 'Tell me about Chimney Cleaning' },
    { label: 'Get a Free Quote', type: 'action', action: 'quote' },
    { label: 'Book a Service', type: 'action', action: 'book' },
    { label: 'Request a Callback', type: 'action', action: 'callback' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // ESC key listener to close chatbot window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Knowledge base resolution grounded strictly on verified site info
  const generateBotReply = (query: string): { text: string; action?: 'quote' | 'callback' | 'book' } => {
    const q = query.toLowerCase();

    if (q.includes('quote') || q.includes('cost') || q.includes('price') || q.includes('estimate') || q.includes('rate') || q.includes('how much')) {
      return {
        text: "We provide 100% free, no-obligation quotes customized to your property and system requirements. You can submit our quick online form to request your quote.",
        action: 'quote',
      };
    }

    if (q.includes('book') || q.includes('schedule service') || q.includes('appointment')) {
      return {
        text: "You can book your service directly online using our booking request form, and our team will coordinate the appointment details with you.",
        action: 'book',
      };
    }

    if (q.includes('call') || q.includes('callback') || q.includes('phone') || q.includes('reach') || q.includes('speak')) {
      return {
        text: "You can request a direct callback at your preferred date and time. Our team will review your preferred schedule and reach out to you directly.",
        action: 'callback',
      };
    }

    if (q.includes('duct') || q.includes('air duct') || q.includes('ventilation')) {
      return {
        text: "Our Air Duct Cleaning service thoroughly cleans supply registers, return grilles, and main trunk lines using commercial negative-air vacuum collectors and motorized rotary scrub brushes.",
        action: 'book',
      };
    }

    if (q.includes('dryer') || q.includes('lint')) {
      return {
        text: "Our Dryer Vent Cleaning service removes hazardous combustible lint accumulations from your appliance transition hose all the way through the exterior exhaust hood to optimize airflow and efficiency.",
        action: 'book',
      };
    }

    if (q.includes('hvac') || q.includes('coil') || q.includes('blower') || q.includes('furnace')) {
      return {
        text: "Our HVAC Cleaning service targets indoor air handlers, evaporator coils, blower fan wheels, and internal cabinet surfaces to support smooth system operation.",
        action: 'book',
      };
    }

    if (q.includes('chimney') || q.includes('fireplace') || q.includes('flue') || q.includes('creosote')) {
      return {
        text: "Our Chimney Cleaning service provides mechanical flue sweeping and creosote removal with sealed hearth HEPA dust containment to protect your home's interior.",
        action: 'book',
      };
    }

    if (q.includes('commercial') || q.includes('business') || q.includes('office') || q.includes('retail')) {
      return {
        text: "Yes, CREWW provides comprehensive commercial services for offices, retail stores, multi-unit properties, and industrial facilities. You can request a commercial quote directly on our site.",
        action: 'quote',
      };
    }

    if (q.includes('hour') || q.includes('time') || q.includes('when')) {
      return {
        text: "We accommodate your schedule with flexible appointment options. Simply let us know your preferred date and time in your quote, booking, or callback request.",
        action: 'callback',
      };
    }

    return {
      text: "I want to make sure you get accurate information. Our team can assist you directly with any specific questions. Would you like to request a free quote or have us call you at your preferred time?",
      action: 'quote',
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');

    // Generate responsive bot reply
    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMessage: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        timestamp: 'Just now',
        action: reply.action,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  const handleActionClick = (action: 'quote' | 'callback' | 'book') => {
    setIsOpen(false);
    if (action === 'quote') onNavigateToQuote();
    if (action === 'callback') onNavigateToCallback();
    if (action === 'book') onOpenBooking();
  };

  // If any form modal is open, completely hide all floating elements
  if (isModalOpen) return null;

  return (
    <>
      {/* 
        COORDINATED FLOATING ACTION CLUSTER
        - position: fixed ONLY, never affects document flow or footer layout
        - Contains BOTH 'Ask CREWW' and 'GET A FREE QUOTE' in a single flex-col container
        - Guaranteed to NEVER collide or overlap with each other
        - When footer is visible:
            - Floating Quote CTA is temporarily hidden (Option 3) so footer links are 100% clear
            - Ask CREWW button shifts slightly upward to bottom-16 / bottom-20 out of the way of the legal links
        - When chatbot window is open:
            - Quote CTA is hidden so chatbot window is clear
        - When any modal is open:
            - Entire cluster is hidden
      */}
      {!isOpen && (
        <div
          className={`fixed z-40 right-4 sm:right-6 lg:right-8 flex flex-col items-end gap-2.5 transition-all duration-300 pointer-events-none ${
            isNearFooter ? 'bottom-16 sm:bottom-20' : 'bottom-5'
          }`}
        >
          {/* Ask CREWW Launcher Button */}
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Ask CREWW Assistant"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-150 border border-slate-700 dark:border-slate-200 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-3 h-3" />
              </div>
              <span>Ask CREWW</span>
            </button>
          </div>

          {/* GET A FREE QUOTE Floating CTA (Shown while scrolling page; hidden when near footer to keep footer 100% clear) */}
          {isQuoteCtaVisible && !isNearFooter && (
            <div className="pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
                onClick={onQuoteClick}
                aria-label="Get a Free Quote"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-150 border border-blue-400/40 cursor-pointer px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 
        CHATBOT WINDOW MODAL
        - Positioned cleanly with fixed position on bottom-right
        - Full mobile responsive sheet / card
        - Quote CTA is hidden while chatbot is open to prevent any collision
      */}
      {isOpen && (
        <div className="fixed z-50 bottom-5 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] max-h-[82vh] sm:max-h-[540px] h-[510px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={crewwLogo}
                alt="CREWW Logo"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm leading-tight">Ask CREWW</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-slate-300 font-medium">Online Assistant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 dark:bg-slate-950/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button if suggested by bot */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {msg.action === 'quote' && (
                        <button
                          onClick={() => handleActionClick('quote')}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                        >
                          <span>Get a Free Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.action === 'book' && (
                        <button
                          onClick={() => handleActionClick('book')}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                        >
                          <span>Book a Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.action === 'callback' && (
                        <button
                          onClick={() => handleActionClick('callback')}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer border border-slate-700"
                        >
                          <PhoneCall className="w-3 h-3 text-blue-400" />
                          <span>Request a Callback</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                type="button"
                onClick={() => {
                  if (qa.type === 'action' && qa.action) {
                    handleActionClick(qa.action as 'quote' | 'callback' | 'book');
                  } else if (qa.query) {
                    handleSend(qa.query);
                  }
                }}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-medium border border-slate-200/80 dark:border-slate-700/80 transition-colors flex-shrink-0 cursor-pointer"
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 min-h-[42px] px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send Message"
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
