import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceDetail {
  title: string;
  scope: string;
  turnaround: string;
  supported: string;
}

interface WhatWeDoProps {
  onOpenBooking?: () => void;
}

const servicesData: ServiceDetail[] = [
  {
    title: 'Camera Bodies',
    scope: 'Shutter assembly replacement, IBIS sensor stabilization recalibration, motherboard/power PCB diagnostics, dial and EVF refurbishment.',
    turnaround: '3 – 5 Business Days',
    supported: 'Sony Alpha, Canon EOS R/Cinema, Leica M/Q/SL, Nikon Z, Fujifilm GFX/X, RED, Hasselblad',
  },
  {
    title: 'Lenses',
    scope: 'Optical alignment, laser collimation, fungus & internal element de-hazing, zoom/focus barrel rebuilds, aperture diaphragm repair.',
    turnaround: '2 – 4 Business Days',
    supported: 'G Master, Canon L-Series, Leica Summilux/Summicron, Zeiss, Cooke, ARRI, Sigma Art',
  },
  {
    title: 'Sensor Cleaning',
    scope: 'Class-100 cleanroom wet/dry microscopic sensor de-contamination, hot pixel mapping, optical low-pass filter inspection.',
    turnaround: 'Same-day / 4 Hours',
    supported: 'All full-frame, medium format, Super35 & cinema sensors',
  },
  {
    title: 'Diagnostics',
    scope: 'Comprehensive hardware analysis, battery draw profiling, drop/shock impact assessment, sensor pitch calibration verification.',
    turnaround: '24 Hours',
    supported: 'Complete technical breakdown report provided before any repair commences',
  },
  {
    title: 'Maintenance',
    scope: 'Periodic preventative overhaul, weather-seal gasket renewal, mechanical torque verification, firmware updates and optical benchmarking.',
    turnaround: '1 – 2 Business Days',
    supported: 'Recommended every 12 months for active production equipment',
  },
];

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenBooking }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section
      id="services"
      className="w-full bg-[#FAF9F6] py-28 sm:py-36 px-6 sm:px-10 lg:px-12 border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Label, Statement, Paragraph, and Blended Technician Card */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-4">
              WHAT WE DO
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-[1.08]">
              Precision for the equipment behind your work.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-md">
              We diagnose, repair and maintain cameras and lenses used by photographers, filmmakers and creators.
            </p>

            {/* Blended Technician Card */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-lg border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 sm:gap-5 max-w-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-md bg-neutral-100 shadow-2xs">
                  <img
                    src="/portrait-technician.jpg"
                    alt="Precision Camera Specialist"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between py-0.5">
                  <p className="text-xs sm:text-[13px] font-medium text-neutral-800 leading-snug mb-2">
                    We service gear creators and studios actually rely on.
                  </p>
                  <button
                    id="services-technician-cta"
                    onClick={onOpenBooking}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer text-left"
                  >
                    <span>Book a Repair</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 text-[10px] uppercase tracking-[0.25em] font-bold opacity-40 font-tech">
              CERTIFIED TOOLING · CLEANROOM LAB · OEM CALIBRATION
            </div>
          </div>

          {/* Right Column: Simple, Refined List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-black/10 border-t border-b border-black/10">
            {servicesData.map((item, idx) => {
              const isOpen = activeItem === idx;
              return (
                <div key={item.title} className="group py-5 sm:py-7 transition-colors">
                  <button
                    id={`service-item-${idx}`}
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <span className="text-2xl sm:text-3xl md:text-[32px] font-normal tracking-tight text-[#111111] group-hover:opacity-60 transition-opacity">
                      {item.title}
                    </span>
                    <span className="text-xs font-tech text-neutral-400 group-hover:text-black transition-colors pl-4">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl space-y-2">
                          <p>{item.scope}</p>
                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:gap-6 text-[11px] text-neutral-400 font-tech tracking-wider uppercase">
                            <span>Turnaround: {item.turnaround}</span>
                            <span className="hidden sm:inline">·</span>
                            <span>{item.supported}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
