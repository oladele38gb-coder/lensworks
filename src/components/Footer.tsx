import React from 'react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onScrollTo,
}) => {
  return (
    <footer className="w-full bg-[#111111] text-white py-12 px-6 sm:px-10 lg:px-12 border-t border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Brand & Tagline */}
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="font-black tracking-tighter text-xl uppercase text-white">
            LENSWORKS
          </span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-tech">
            Precision camera service · © 2026
          </span>
        </div>

        {/* Center / Nav Links */}
        <div className="flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 font-tech">
          <button
            id="footer-link-services"
            onClick={() => onScrollTo('services')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            id="footer-link-about"
            onClick={onOpenAbout}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            id="footer-link-contact"
            onClick={onOpenContact}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 font-tech">
          <a
            id="footer-link-instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            id="footer-link-whatsapp"
            href="https://wa.me/2348000000000?text=Hello%20Lensworks,%20I%20would%20like%20to%20inquire%20about%20a%20camera%20repair."
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};
