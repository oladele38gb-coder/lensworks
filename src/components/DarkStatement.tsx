import React from 'react';
import { motion } from 'motion/react';

export const DarkStatement: React.FC = () => {
  return (
    <section className="w-full bg-[#111111] text-white py-32 sm:py-44 px-6 sm:px-10 lg:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-start justify-center">
        {/* Understated Tech Identifier */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 font-tech mb-6"
        >
          PHILOSOPHY & THE STANDARD
        </motion.p>

        {/* Large Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Your camera deserves more than a quick fix.
        </motion.h2>

        {/* Short Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl"
        >
          Every piece of equipment is meticulously diagnosed, disassembled in a controlled environment, serviced with certified components, and rigorously tested on optical collimators before it ever leaves our studio.
        </motion.p>

        {/* Minimal Bottom Specs Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 pt-8 w-full border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] uppercase tracking-[0.2em] font-tech"
        >
          <div>
            <span className="block text-white/40 mb-1">Environment</span>
            <span className="text-white/90 font-medium">ISO Class 5 Cleanroom</span>
          </div>
          <div>
            <span className="block text-white/40 mb-1">Measurement</span>
            <span className="text-white/90 font-medium">0.01mm Collimation</span>
          </div>
          <div>
            <span className="block text-white/40 mb-1">Parts</span>
            <span className="text-white/90 font-medium">OEM & Custom Sourced</span>
          </div>
          <div>
            <span className="block text-white/40 mb-1">Warranty</span>
            <span className="text-white/90 font-medium">90-Day Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
