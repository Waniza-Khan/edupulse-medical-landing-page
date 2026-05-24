// ============================================================
// COMPONENT 3: High-Yield Medical Q&A Accordion
// Framer Motion: AnimatePresence + height auto animation
// Exclusive pattern: sirf ek item ek waqt open hoga
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ── Framer Motion variants ──────────────────────────────────
const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
// ────────────────────────────────────────────────────────────

const qaData = [
  {
    id: 1,
    tag: "Cardiology",
    tagColor: "bg-red-50 text-red-500",
    question: "Symptoms of Acute Myocardial Infarction (Heart Attack)?",
    answer:
      "Classic symptoms include: (1) Crushing/squeezing chest pain radiating to left arm, jaw, or back. (2) Diaphoresis (excessive sweating). (3) Dyspnea (shortness of breath). (4) Nausea/vomiting. (5) Sense of impending doom. ECG shows ST-elevation in STEMI. Troponin I & T are the gold-standard biomarkers. Remember: Women & diabetics may present atypically with jaw pain or fatigue only.",
    highYield: true,
  },
  {
    id: 2,
    tag: "Pathology",
    tagColor: "bg-purple-50 text-purple-500",
    question: "Difference between Apoptosis and Necrosis?",
    answer:
      "Apoptosis (Programmed Death): Orderly, energy-dependent. Cell shrinks, chromatin condenses, apoptotic bodies formed. NO inflammation. Triggered by caspases. Examples: embryogenesis, immune cell clearance. Necrosis (Accidental Death): Disorderly, passive process. Cell swells, membrane ruptures, contents spill out. ALWAYS causes inflammation. Coagulative necrosis (most organs), Liquefactive (brain/abscess), Caseous (TB — cheese-like).",
    highYield: true,
  },
  {
    id: 3,
    tag: "Pharmacology",
    tagColor: "bg-green-50 text-green-600",
    question: "Beta-Blockers: Classification, Uses & Side Effects?",
    answer:
      "Classification: Selective (β1) — Metoprolol, Atenolol, Bisoprolol. Non-selective (β1+β2) — Propranolol, Carvedilol (also α1). Uses: Hypertension, Angina, Heart failure (bisoprolol/carvedilol), Post-MI, Arrhythmias, Anxiety/tremor (propranolol), Glaucoma (timolol eye drops). Side effects: Bradycardia, hypotension, bronchoconstriction (avoid in asthma — use selective), masking hypoglycemia symptoms in diabetics, fatigue, cold extremities.",
    highYield: false,
  },
  {
    id: 4,
    tag: "Physiology",
    tagColor: "bg-blue-50 text-blue-500",
    question: "Explain the Cardiac Cycle with Pressure Changes?",
    answer:
      "Diastole (relaxation): AV valves open, ventricles fill passively (70%) then active atrial kick (30%). Isovolumetric Contraction: All valves closed, pressure rises. Systole (ejection): Aortic valve opens when LV pressure > aortic pressure (~80 mmHg). Stroke Volume ejected. Isovolumetric Relaxation: All valves closed again. Key pressures: LV systolic ~120 mmHg, LV diastolic ~0-5 mmHg. Heart sounds: S1 = AV valve closure (lub), S2 = Semilunar valve closure (dub).",
    highYield: true,
  },
  {
    id: 5,
    tag: "Anatomy",
    tagColor: "bg-orange-50 text-orange-500",
    question: "Brachial Plexus Injuries — Erb's vs Klumpke's Palsy?",
    answer:
      "Erb's Palsy (Upper — C5,C6): 'Waiter's tip' position — arm adducted & medially rotated, forearm extended & pronated, wrist flexed. Cause: Forceful separation of head & shoulder (birth trauma, fall on shoulder). Muscles lost: Deltoid, Biceps, Brachialis, Brachioradialis. Klumpke's Palsy (Lower — C8,T1): Claw hand deformity — intrinsic hand muscles paralyzed. Cause: Forceful arm abduction (grabbing branch during fall). May have Horner's syndrome (T1 sympathetics involved).",
    highYield: false,
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => (
  <div className={`rounded-2xl border transition-all duration-200 ${isOpen ? "border-[#0077A8]/30 shadow-md" : "border-[#EAF6FF]"}`}>
    {/* ── Header (always visible) ── */}
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 rounded-2xl ${isOpen ? "bg-[#EAF6FF]" : "bg-white hover:bg-[#F4F9FD]"}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Tag */}
        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
          {item.tag}
        </span>
        {/* High yield badge */}
        {item.highYield && (
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-500">
            ⭐ High Yield
          </span>
        )}
        <span
          className="font-semibold text-[#002D42] text-sm leading-snug truncate"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {item.question}
        </span>
      </div>

      {/* Chevron rotates when open */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="shrink-0 ml-3"
      >
        <ChevronDown size={18} className="text-[#0077A8]" />
      </motion.div>
    </button>

    {/* ── Expandable Content — AnimatePresence controls exit ── */}
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ overflow: "hidden" }}
        >
          <div className="px-5 pb-5 pt-3">
            <div className="h-px bg-[#EAF6FF] mb-4" />
            <p className="text-[#5A7A8A] text-sm leading-relaxed">{item.answer}</p>
            <div className="flex gap-2 mt-4">
              <button className="text-xs font-semibold text-[#0077A8] bg-[#EAF6FF] px-3 py-1.5 rounded-lg hover:bg-[#0077A8] hover:text-white transition-all duration-200">
                🔖 Bookmark
              </button>
              <button className="text-xs font-semibold text-[#5A7A8A] bg-[#F4F9FD] px-3 py-1.5 rounded-lg hover:bg-[#EAF6FF] transition-all duration-200">
                📝 Add Note
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Accordion = () => {
  // Exclusive: sirf ek item ki id store karein (null = sab closed)
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="accordion" className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-[#0077A8] uppercase tracking-widest mb-1">
            Exam Preparation
          </p>
          <h2
            className="font-extrabold text-[#002D42] text-xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            High-Yield Medical Q&A
          </h2>
        </div>
        <span className="bg-[#EAF6FF] text-[#0077A8] text-xs font-bold px-3 py-1.5 rounded-full">
          {qaData.length} Topics
        </span>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {qaData.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Accordion;
