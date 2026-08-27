import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    step: '01',
    title: 'Diagnose',
    lead: 'Understand the problem.',
    description: 'We perform microscopic, electrical, and optical stress testing to locate the root cause — never just treating the surface symptoms.',
  },
  {
    step: '02',
    title: 'Repair',
    lead: 'Fix and calibrate the equipment.',
    description: 'Disassembly and rebuild using specialized micro-tooling, factory torque specs, and genuine replacement components.',
  },
  {
    step: '03',
    title: 'Test',
    lead: 'Make sure everything works as it should.',
    description: 'Every body and lens undergoes shutter timing benchmarks, autofocus accuracy tests, and laser optical collimation before release.',
  },
];

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="w-full bg-[#FAF9F6] py-28 sm:py-36 px-6 sm:px-10 lg:px-12 border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Eyebrow */}
        <div className="mb-16 sm:mb-20">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-3">
            PROCESS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111111]">
            How we work.
          </h2>
        </div>

        {/* Simple Three-Step Layout: Pure Typography & Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 pt-8 border-t border-black/10">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-start"
            >
              {/* Step Number & Title */}
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 font-tech mb-4 text-[#111111]">
                {item.step} — {item.title}
              </div>

              {/* Lead Headline */}
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] leading-snug mb-4">
                {item.lead}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
