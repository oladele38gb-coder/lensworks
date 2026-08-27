import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

type CameraState = 'assembled' | 'opening' | 'exploded' | 'assembling';

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverseAnimRef = useRef<number | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>('assembled');
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Play forward (Teardown / Open)
  const handleOpen = () => {
    if (cameraState === 'opening' || cameraState === 'exploded') return;
    
    if (reverseAnimRef.current) {
      cancelAnimationFrame(reverseAnimRef.current);
      reverseAnimRef.current = null;
    }

    if (videoRef.current) {
      setCameraState('opening');
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Play reverse (Re-assemble / Assemble)
  const handleAssemble = () => {
    if (cameraState === 'assembling' || cameraState === 'assembled') return;

    if (videoRef.current) {
      setCameraState('assembling');
      videoRef.current.pause();

      if (reverseAnimRef.current) {
        cancelAnimationFrame(reverseAnimRef.current);
      }

      let lastTime = performance.now();
      const reverseSpeed = 1.35;

      const stepReverse = (now: number) => {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (videoRef.current) {
          if (videoRef.current.currentTime > 0.04) {
            videoRef.current.currentTime = Math.max(
              0,
              videoRef.current.currentTime - delta * reverseSpeed
            );
            reverseAnimRef.current = requestAnimationFrame(stepReverse);
          } else {
            videoRef.current.currentTime = 0;
            setCameraState('assembled');
            if (reverseAnimRef.current) {
              cancelAnimationFrame(reverseAnimRef.current);
              reverseAnimRef.current = null;
            }
          }
        }
      };

      reverseAnimRef.current = requestAnimationFrame(stepReverse);
    }
  };

  // Track video progress to transition to 'exploded' at the end of the forward clip
  const handleTimeUpdate = () => {
    if (videoRef.current && cameraState === 'opening') {
      const dur = videoRef.current.duration;
      if (dur && videoRef.current.currentTime >= dur - 0.08) {
        videoRef.current.pause();
        setCameraState('exploded');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (reverseAnimRef.current) {
        cancelAnimationFrame(reverseAnimRef.current);
      }
    };
  }, []);

  const isTransitioning = cameraState === 'opening' || cameraState === 'assembling';
  const isExploded = cameraState === 'exploded' || cameraState === 'assembling';

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[660px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* FULL-BLEED BACKGROUND VIDEO: Covers 100% of the Hero with Zero Whitespace */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          id="hero-cinematic-bg-video"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          aria-label="Interactive camera teardown and assembly video"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 02 — EDITORIAL HEADLINE (Top Left) & SUPPORTING COPY (Dragged down ~3-4 inches on the right) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 sm:pt-28">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Eyebrow + Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold text-neutral-800 font-tech mb-2.5">
              PRECISION CAMERA SERVICE
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08]">
              We know what's inside.
            </h1>
          </motion.div>

          {/* Supporting copy (Dragged down by ~3-4 inches / mt-24 sm:mt-32 md:mt-40, and Book a Repair removed) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs md:text-right mt-16 sm:mt-24 md:mt-32 ml-auto"
          >
            <p className="text-xs sm:text-sm text-[#111111]/90 font-medium leading-relaxed">
              Precision camera repair for the equipment behind your best work.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 03 — INTERACTIVE OPEN / ASSEMBLE CONTROLS (Dragged down ~3 inches / seated at base of camera) */}
      <div className="relative z-10 mt-auto mb-10 sm:mb-14 md:mb-16 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className={`flex items-center justify-center gap-3 sm:gap-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-70 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* OPEN Button */}
          <button
            id="hero-control-open"
            onMouseEnter={handleOpen}
            onClick={handleOpen}
            disabled={isTransitioning}
            aria-label="Open camera exploded view"
            className={`group px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shadow-sm ${
              !isExploded
                ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                : 'bg-white/95 backdrop-blur-sm text-[#111111] hover:text-black border-black/30 hover:border-black shadow-2xs'
            }`}
          >
            <span>OPEN</span>
            <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>

          {/* ASSEMBLE Button */}
          <button
            id="hero-control-assemble"
            onMouseEnter={handleAssemble}
            onClick={handleAssemble}
            disabled={isTransitioning}
            aria-label="Assemble camera components"
            className={`group px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shadow-sm ${
              isExploded
                ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                : 'bg-white/95 backdrop-blur-sm text-[#111111] hover:text-black border-black/30 hover:border-black shadow-2xs'
            }`}
          >
            <span className="text-[10px] transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>ASSEMBLE</span>
          </button>
        </motion.div>
      </div>

      {/* 13 — TECHNICAL HERO METADATA (Bottom line within the video) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-6 sm:pb-8">
        <div className="pt-4 border-t border-black/25 flex items-center justify-between text-[11px] uppercase font-tech tracking-[0.25em] text-[#111111]/80 font-bold">
          <span>CAMERA REPAIR / SERVICING / RESTORATION</span>
          <span>LAGOS · NIGERIA</span>
        </div>
      </div>
    </section>
  );
};
