import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

type CameraState = 'assembled' | 'opening' | 'exploded' | 'assembling';

export const Hero: React.FC<HeroProps> = () => {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);

  const [cameraState, setCameraState] = useState<CameraState>('assembled');
  const [activeTrack, setActiveTrack] = useState<'forward' | 'reverse'>('forward');

  // Initialize both video elements on mount
  useEffect(() => {
    const fv = forwardVideoRef.current;
    const rv = reverseVideoRef.current;

    if (fv) {
      fv.muted = true;
      fv.defaultMuted = true;
      fv.playsInline = true;
      fv.preload = 'auto';
      fv.load();
    }
    if (rv) {
      rv.muted = true;
      rv.defaultMuted = true;
      rv.playsInline = true;
      rv.preload = 'auto';
      rv.load();
    }
  }, []);

  // When forward video completes opening
  const handleForwardEnded = useCallback(() => {
    setCameraState('exploded');
    if (forwardVideoRef.current) {
      forwardVideoRef.current.pause();
    }
  }, []);

  // When reverse video completes assembly
  const handleReverseEnded = useCallback(() => {
    setCameraState('assembled');
    if (reverseVideoRef.current) {
      reverseVideoRef.current.pause();
    }
    if (forwardVideoRef.current) {
      forwardVideoRef.current.currentTime = 0;
    }
  }, []);

  // Play forward (Teardown / Open)
  const handleOpen = useCallback(() => {
    setActiveTrack('forward');
    setCameraState('opening');

    if (reverseVideoRef.current) {
      reverseVideoRef.current.pause();
    }

    if (forwardVideoRef.current) {
      const fv = forwardVideoRef.current;
      fv.muted = true;
      fv.currentTime = 0;
      const playPromise = fv.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Forward video play:', err);
        });
      }
    }
  }, []);

  // Play reverse (Re-assemble / Assemble)
  const handleAssemble = useCallback(() => {
    setActiveTrack('reverse');
    setCameraState('assembling');

    if (forwardVideoRef.current) {
      forwardVideoRef.current.pause();
    }

    if (reverseVideoRef.current) {
      const rv = reverseVideoRef.current;
      rv.muted = true;
      rv.currentTime = 0;
      const playPromise = rv.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Reverse video play:', err);
        });
      }
    }
  }, []);

  // Safety fallback using timeupdate
  const handleForwardTimeUpdate = () => {
    if (forwardVideoRef.current && cameraState === 'opening') {
      const dur = forwardVideoRef.current.duration;
      if (dur && dur > 0 && forwardVideoRef.current.currentTime >= dur - 0.08) {
        handleForwardEnded();
      }
    }
  };

  const handleReverseTimeUpdate = () => {
    if (reverseVideoRef.current && cameraState === 'assembling') {
      const dur = reverseVideoRef.current.duration;
      if (dur && dur > 0 && reverseVideoRef.current.currentTime >= dur - 0.08) {
        handleReverseEnded();
      }
    }
  };

  const isExploded = cameraState === 'exploded' || cameraState === 'opening';

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[660px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* FULL-BLEED BACKGROUND VIDEO: Dual hardware-accelerated 60fps video tracks */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Forward Video (Open Animation) */}
        <video
          ref={forwardVideoRef}
          id="hero-forward-video"
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={handleForwardEnded}
          onTimeUpdate={handleForwardTimeUpdate}
          aria-label="Camera opening teardown animation"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-200 ${
            activeTrack === 'forward' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Reverse Video (Assemble Animation) */}
        <video
          ref={reverseVideoRef}
          id="hero-reverse-video"
          src="/hero-video-reverse.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={handleReverseEnded}
          onTimeUpdate={handleReverseTimeUpdate}
          aria-label="Camera assembly animation"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-200 ${
            activeTrack === 'reverse' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      </div>

      {/* 02 — EDITORIAL HEADLINE (Top Left) & SUPPORTING COPY (Permanent Crisp White) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 sm:pt-28">
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

          {/* Supporting copy: Crisp White with soft drop shadow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs md:text-right mt-16 sm:mt-24 md:mt-32 ml-auto"
          >
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              Precision camera repair for the equipment behind your best work.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 03 — INTERACTIVE OPEN / ASSEMBLE CONTROLS (Hover & Click activated) */}
      <div className="relative z-20 mt-auto mb-10 sm:mb-14 md:mb-16 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {/* OPEN Button */}
          <button
            id="hero-control-open"
            onMouseEnter={handleOpen}
            onClick={handleOpen}
            onPointerDown={handleOpen}
            aria-label="Open camera exploded view"
            className={`group px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shadow-sm active:scale-95 ${
              !isExploded
                ? 'bg-[#111111] text-white border-[#111111] shadow-md hover:bg-black'
                : 'bg-white/95 backdrop-blur-sm text-[#111111] hover:text-black border-black/30 hover:border-black shadow-2xs hover:bg-white'
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
            onPointerDown={handleAssemble}
            aria-label="Assemble camera components"
            className={`group px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shadow-sm active:scale-95 ${
              isExploded
                ? 'bg-[#111111] text-white border-[#111111] shadow-md hover:bg-black'
                : 'bg-white/95 backdrop-blur-sm text-[#111111] hover:text-black border-black/30 hover:border-black shadow-2xs hover:bg-white'
            }`}
          >
            <span className="text-[10px] transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>ASSEMBLE</span>
          </button>
        </motion.div>
      </div>

      {/* 13 — TECHNICAL HERO METADATA (Bottom line within the video) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-6 sm:pb-8">
        <div className="pt-4 border-t border-black/25 flex items-center justify-between text-[11px] uppercase font-tech tracking-[0.25em] text-[#111111]/80 font-bold">
          <span>CAMERA REPAIR / SERVICING / RESTORATION</span>
          <span>LAGOS · NIGERIA</span>
        </div>
      </div>
    </section>
  );
};


