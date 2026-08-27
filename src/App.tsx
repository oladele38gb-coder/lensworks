import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { DarkStatement } from './components/DarkStatement';
import { Process } from './components/Process';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { RepairModal } from './components/RepairModal';
import { InfoModal } from './components/AboutModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ isOpen: boolean; type: 'about' | 'contact' }>({
    isOpen: false,
    type: 'about',
  });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAbout = () => {
    setInfoModal({ isOpen: true, type: 'about' });
  };

  const handleOpenContact = () => {
    setInfoModal({ isOpen: true, type: 'contact' });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 1. Understated Navbar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAbout={handleOpenAbout}
        onOpenContact={handleOpenContact}
        onScrollTo={handleScrollTo}
      />

      {/* 2. Hero inspired by Framer Archiste template */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenAbout={handleOpenAbout}
          onOpenContact={handleOpenContact}
          onScrollTo={handleScrollTo}
        />

        {/* 3. Section 2: What We Do */}
        <WhatWeDo onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 4. Section 3: Simple Dark Section */}
        <DarkStatement />

        {/* 5. Section 4: Process (01 Diagnose, 02 Repair, 03 Test) */}
        <Process />

        {/* 6. Final CTA */}
        <FinalCta onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* 7. Minimal Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAbout={handleOpenAbout}
        onOpenContact={handleOpenContact}
        onScrollTo={handleScrollTo}
      />

      {/* Interactive Booking Modal */}
      <RepairModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Studio Info / Contact Modal */}
      <InfoModal
        isOpen={infoModal.isOpen}
        type={infoModal.type}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
