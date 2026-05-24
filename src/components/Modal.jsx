// ============================================================
// COMPONENT 1: Quick-Study Modal (Exam Configurator)
// Framer Motion: scale + opacity spring animation
// AnimatePresence handles clean exit animation on unmount
// ============================================================

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, BookOpen, AlertTriangle } from "lucide-react";

// ── Framer Motion variants ──────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0, scale: 0.92, y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
// ────────────────────────────────────────────────────────────

const Modal = ({ isOpen, onClose, subject }) => {
  // Esc key se close karo
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Body scroll lock jab modal open ho
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    // AnimatePresence — exit animation ke liye zaroori
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-[#002D42]/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}  // bahar click se close
          />

          {/* ── Modal Card ── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Exam Configurator"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 relative"
              onClick={(e) => e.stopPropagation()} // andar click close nahi karega
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-[#0077A8] uppercase tracking-widest mb-0.5">
                    Configure Test
                  </p>
                  <h2
                    className="font-extrabold text-[#002D42] text-xl"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {subject || "Anatomy"} Mock Test
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#EAF6FF] flex items-center justify-center text-[#5A7A8A] hover:bg-[#002D42] hover:text-white transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-7">
                {/* Duration */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#002D42] mb-2">
                    <Clock size={15} className="text-[#0077A8]" /> Test Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["30 min", "60 min", "90 min"].map((d) => (
                      <button
                        key={d}
                        className="py-2 rounded-xl border-2 border-[#EAF6FF] bg-[#EAF6FF] text-[#002D42] text-sm font-semibold hover:border-[#0077A8] hover:bg-white transition-all duration-200 focus:outline-none focus:border-[#0077A8]"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#002D42] mb-2">
                    <BookOpen size={15} className="text-[#0077A8]" /> No. of Questions
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["10", "25", "50", "100"].map((q) => (
                      <button
                        key={q}
                        className="py-2 rounded-xl border-2 border-[#EAF6FF] bg-[#EAF6FF] text-[#002D42] text-sm font-semibold hover:border-[#0077A8] hover:bg-white transition-all duration-200 focus:outline-none focus:border-[#0077A8]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Negative Marking */}
                <div className="flex items-center justify-between bg-[#FFF4ED] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={15} className="text-orange-400" />
                    <span className="text-sm font-semibold text-[#002D42]">Negative Marking</span>
                    <span className="text-xs text-[#5A7A8A]">(-0.25 per wrong)</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-10 h-6 bg-[#CBD5E1] rounded-full peer peer-checked:bg-[#0077A8] transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform after:duration-200 peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-[#002D42] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0077A8] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#002D42]/20">
                🚀 Start Mock Test
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
