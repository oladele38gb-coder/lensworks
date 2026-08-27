import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { RepairFormState } from '../types';

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const gearOptions = [
  'Camera Body',
  'Prime / Zoom Lens',
  'Sensor Cleaning',
  'Cinema Camera',
  'Mechanical Vintage Lens',
  'General Diagnostics',
];

const brandOptions = [
  'Sony Alpha / FX',
  'Canon EOS / Cinema',
  'Leica M / Q / SL',
  'Fujifilm X / GFX',
  'Nikon Z',
  'Hasselblad',
  'RED / Blackmagic',
  'Zeiss / Sigma / Other',
];

export const RepairModal: React.FC<RepairModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RepairFormState>({
    equipmentType: 'Camera Body',
    brand: 'Sony Alpha / FX',
    model: '',
    issueDescription: '',
    urgency: 'standard',
    customerName: '',
    contactMethod: 'whatsapp',
    contactValue: '',
    serviceType: 'dropoff',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model.trim() || !formData.customerName.trim()) {
      return;
    }
    const randomTicket = 'LW-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Lensworks, I would like to book a repair.\n\n*Equipment:* ${formData.brand} ${formData.model}\n*Type:* ${formData.equipmentType}\n*Issue:* ${formData.issueDescription || 'Inspection needed'}\n*Turnaround:* ${formData.urgency}\n*Name:* ${formData.customerName}`
    );
    return `https://wa.me/2348000000000?text=${text}`;
  };

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF9F6] border border-black/10 rounded-none shadow-2xl p-8 sm:p-12 z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              id="repair-modal-close-btn"
              onClick={onClose}
              className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-tech mb-2">
                    REPAIR INTAKE
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">
                    Book precision servicing.
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500 font-light">
                    Direct drop-off at our Victoria Island studio or mail-in intake across Nigeria.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-2">
                      Equipment Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {gearOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          id={`gear-option-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setFormData({ ...formData, equipmentType: opt })}
                          className={`text-left px-3 py-2 text-xs transition-colors cursor-pointer border ${
                            formData.equipmentType === opt
                              ? 'border-black bg-black text-white font-medium'
                              : 'border-black/10 bg-white/60 text-neutral-700 hover:border-black/30'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand & Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-1.5">
                        Brand / System
                      </label>
                      <select
                        id="repair-form-brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-white border border-black/10 px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-black"
                      >
                        {brandOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-1.5">
                        Model (e.g. Sony A7 IV, 24-70 GM II) *
                      </label>
                      <input
                        id="repair-form-model"
                        type="text"
                        required
                        placeholder="e.g. EOS R5 / Leica M10"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full bg-white border border-black/10 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Issue Description */}
                  <div>
                    <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-1.5">
                      Issue Description / Symptoms
                    </label>
                    <textarea
                      id="repair-form-issue"
                      rows={3}
                      placeholder="e.g. Shutter error code Err 20, optical element haze, autofocus hunt, sensor spot, dropped on shoot..."
                      value={formData.issueDescription}
                      onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                      className="w-full bg-white border border-black/10 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none"
                    />
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="repair-form-name"
                        type="text"
                        required
                        placeholder="Full name or Production team"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full bg-white border border-black/10 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech uppercase tracking-wider text-neutral-500 mb-1.5">
                        WhatsApp / Phone / Email
                      </label>
                      <input
                        id="repair-form-contact"
                        type="text"
                        placeholder="+234 800 000 0000 or email"
                        value={formData.contactValue}
                        onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                        className="w-full bg-white border border-black/10 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Service Intake Method */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-500">
                    <span className="font-tech uppercase tracking-wider">Turnaround: Standard 3–5 Days</span>
                    <span className="font-tech">Lagos Studio: Adeola Odeku, Victoria Island</span>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      id="repair-form-submit-btn"
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider font-tech hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Submit Intake Request →
                    </button>

                    <a
                      id="repair-form-whatsapp-btn"
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto text-center px-6 py-3 border border-black/20 text-neutral-800 text-xs font-semibold uppercase tracking-wider font-tech hover:border-black transition-colors cursor-pointer"
                    >
                      Direct WhatsApp Chat
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-6">
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center mx-auto text-black">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-tech uppercase tracking-widest text-neutral-400 mb-1">
                    INTAKE CONFIRMED
                  </p>
                  <h3 className="text-2xl font-light text-black">
                    Ticket Reference: {ticketId}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.customerName}. Our senior technician has logged your{' '}
                    <span className="font-medium text-black">
                      {formData.brand} {formData.model}
                    </span>{' '}
                    intake. Drop off at our Victoria Island studio or coordinate pickup with our courier desk.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    id="repair-confirmation-done-btn"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-black text-white text-xs font-tech uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                  <a
                    id="repair-confirmation-whatsapp-btn"
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 border border-black/20 text-black text-xs font-tech uppercase tracking-wider hover:border-black transition-colors"
                  >
                    Open in WhatsApp
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
