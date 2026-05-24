// ============================================================
// COMPONENT 2: Course Syllabus Sidebar (Slide-Out Navigation)
// Framer Motion: x-axis slide animation with variants
// Overlay on mobile, push on desktop
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, CheckCircle, Circle, Bookmark, ChevronRight } from "lucide-react";

// ── Framer Motion variants ──────────────────────────────────
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const sidebarVariants = {
  hidden:  { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
  exit: {
    x: "-100%",
    transition: { type: "tween", ease: "easeIn", duration: 0.22 },
  },
};
// ────────────────────────────────────────────────────────────

const modules = [
  {
    title: "Anatomy",
    icon: "🦴",
    chapters: [
      { name: "Upper Limb & Shoulder", done: true },
      { name: "Lower Limb & Hip Joint", done: true },
      { name: "Thorax & Heart", done: false },
      { name: "Abdomen & GIT", done: false },
    ],
  },
  {
    title: "Physiology",
    icon: "💓",
    chapters: [
      { name: "Cardiac Cycle & ECG", done: true },
      { name: "Renal Physiology", done: false },
      { name: "Respiratory Mechanics", done: false },
    ],
  },
  {
    title: "Pathology",
    icon: "🔬",
    chapters: [
      { name: "Cell Injury & Death", done: false },
      { name: "Inflammation", done: false },
      { name: "Neoplasia", done: false },
    ],
  },
  {
    title: "Pharmacology",
    icon: "💊",
    chapters: [
      { name: "Autonomic Drugs", done: false },
      { name: "Antibiotics", done: false },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop overlay ── */}
          <motion.div
            key="sidebar-overlay"
            className="fixed inset-0 z-40 bg-[#002D42]/40 backdrop-blur-sm lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* ── Sidebar Panel ── */}
          <motion.aside
            key="sidebar-panel"
            className="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAF6FF]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0077A8] to-[#6EC1E4] flex items-center justify-center">
                  <BookOpen size={14} className="text-white" />
                </div>
                <span
                  className="font-extrabold text-[#002D42] text-base"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Syllabus
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#EAF6FF] flex items-center justify-center text-[#5A7A8A] hover:bg-[#002D42] hover:text-white transition-all duration-200"
              >
                <X size={14} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-5 py-3 bg-[#F4F9FD]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#5A7A8A] font-medium">Overall Progress</span>
                <span className="font-bold text-[#0077A8]">33%</span>
              </div>
              <div className="h-2 bg-[#EAF6FF] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0077A8] to-[#6EC1E4] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "33%" }}
                  transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Bookmarks badge */}
            <div className="mx-5 mt-3 mb-1 flex items-center gap-2 bg-[#FFF4ED] rounded-xl px-3 py-2">
              <Bookmark size={13} className="text-orange-400" />
              <span className="text-xs font-semibold text-[#002D42]">3 Bookmarked Topics</span>
              <ChevronRight size={13} className="text-[#5A7A8A] ml-auto" />
            </div>

            {/* Modules list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {modules.map((mod) => (
                <div key={mod.title}>
                  <div className="flex items-center gap-2 px-1 mb-2">
                    <span className="text-base">{mod.icon}</span>
                    <span
                      className="font-bold text-[#002D42] text-sm"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {mod.title}
                    </span>
                  </div>
                  <ul className="space-y-1 ml-2">
                    {mod.chapters.map((ch) => (
                      <li
                        key={ch.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#EAF6FF] cursor-pointer transition-colors duration-150 group"
                      >
                        {ch.done
                          ? <CheckCircle size={14} className="text-[#0077A8] shrink-0" />
                          : <Circle size={14} className="text-[#CBD5E1] shrink-0" />
                        }
                        <span className={`text-xs leading-snug ${ch.done ? "text-[#0077A8] font-semibold" : "text-[#5A7A8A]"}`}>
                          {ch.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#EAF6FF]">
              <button className="w-full bg-[#002D42] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#0077A8] transition-all duration-200">
                📅 View Full Schedule
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
