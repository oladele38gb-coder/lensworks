import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, ShieldCheck, Mail, Phone } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  type: 'about' | 'contact';
  onClose: () => void;
  onOpenBooking: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  type,
  onClose,
  onOpenBooking,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF9F6] border border-black/10 shadow-2xl p-8 sm:p-12 z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              id="info-modal-close-btn"
              onClick={onClose}
              className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {type === 'about' ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-2">
                    ABOUT THE STUDIO
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-[#111111]">
                    LENSWORKS Lagos
                  </h2>
                </div>

                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  LENSWORKS is an independent precision camera servicing and optical restoration facility established to support working cinematographers, commercial photographers, and camera collectors in Nigeria and West Africa.
                </p>

                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  Equipped with an ISO Class 5 clean bench, laser collimation benches, electronic power diagnostics, and OEM torque calibrators, our laboratory handles intricate shutter replacements, optical de-centering, and sensor rebuilds.
                </p>

                <div className="pt-4 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 font-tech">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>90-Day Warranty on all mechanical & optical repairs</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>Emergency 24hr Turnaround available for active productions</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    id="about-modal-book-cta"
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="px-6 py-2.5 bg-black text-white text-xs font-tech uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Book a Repair →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-2">
                    GET IN TOUCH
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-[#111111]">
                    Studio & Intake Desk
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500 font-light">
                    Visit us in Victoria Island or coordinate insured mail-in shipping across Nigeria.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-black/10 text-sm text-neutral-700 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-black shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-black block">Studio Location</span>
                      <span className="text-neutral-500">
                        14B Adeola Odeku Street, Victoria Island, Lagos, Nigeria
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-black shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-black block">Operating Hours</span>
                      <span className="text-neutral-500">
                        Monday – Friday: 09:00 – 18:00 WAT <br />
                        Saturday: 10:00 – 15:00 WAT (Drop-offs only)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-black shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-black block">Direct & WhatsApp Line</span>
                      <a
                        href="https://wa.me/2348000000000"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-600 hover:text-black underline underline-offset-4"
                      >
                        +234 (0) 800 LENSWORKS (+234 800 000 0000)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-black shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-black block">Service Email</span>
                      <span className="text-neutral-500">service@lensworks.studio</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    id="contact-modal-book-cta"
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="px-6 py-2.5 bg-black text-white text-xs font-tech uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Start Repair Intake →
                  </button>
                  <a
                    id="contact-modal-whatsapp-cta"
                    href="https://wa.me/2348000000000?text=Hello%20Lensworks,%20I%20have%20a%20question%20regarding%20camera%20servicing."
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 border border-black/20 text-neutral-800 text-xs font-tech uppercase tracking-wider hover:border-black transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
