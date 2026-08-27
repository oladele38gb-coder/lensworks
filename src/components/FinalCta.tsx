import React from 'react';
import { motion } from 'motion/react';

interface FinalCtaProps {
  onOpenBooking: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-[#FAF9F6] py-32 sm:py-48 px-6 sm:px-10 lg:px-12 border-t border-black/10 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-start justify-center">
        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-4"
        >
          NEED A REPAIR?
        </motion.p>

        {/* Large Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#111111] leading-[1.05]"
        >
          Let’s get your camera working again.
        </motion.h2>

        {/* One Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12"
        >
          <button
            id="final-cta-book-repair-btn"
            onClick={onOpenBooking}
            className="group inline-flex items-center text-base sm:text-lg font-bold border-b-2 border-black pb-1 hover:opacity-70 transition-opacity cursor-pointer tracking-tight text-[#111111]"
          >
            <span>Book a Repair</span>
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
