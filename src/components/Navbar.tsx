import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAbout,
  onOpenContact,
  onScrollTo,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
      <div
        className={`w-full pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'w-[94%] sm:w-[90%] max-w-5xl mt-3 sm:mt-4 py-2 px-5 sm:px-8 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
            : 'max-w-7xl mx-auto py-6 sm:py-8 px-6 sm:px-10 lg:px-12 bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-10">
          {/* Left: Brand */}
          <button
            id="nav-brand-btn"
            onClick={() => onScrollTo('hero')}
            className="font-extrabold tracking-tight text-base sm:text-lg uppercase text-[#111111] hover:opacity-75 transition-opacity cursor-pointer text-left"
          >
            LENSWORKS
          </button>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-[13px] md:text-sm uppercase tracking-[0.16em] font-semibold text-[#111111]">
            <button
              id="nav-link-services"
              onClick={() => onScrollTo('services')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              Services
            </button>
            <button
              id="nav-link-about"
              onClick={onOpenAbout}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              About
            </button>
            <button
              id="nav-link-contact"
              onClick={onOpenContact}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right: Book a Repair CTA encased in a pill just like OPEN button */}
          <div className="flex items-center">
            <button
              id="nav-book-repair-btn"
              onClick={onOpenBooking}
              className="group px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold text-white bg-[#111111] hover:bg-black/85 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 border border-[#111111] shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>BOOK A REPAIR</span>
              <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
