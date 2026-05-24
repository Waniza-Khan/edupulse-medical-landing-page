import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Bell, Search, TrendingUp, Award, Target, Clock } from "lucide-react";
import Modal   from "./Modal";
import Sidebar from "./Sidebar";
import Accordion from "./Accordion";

const subjects = [
  { name: "Anatomy",      icon: "🦴", color: "from-[#0077A8] to-[#6EC1E4]", progress: 65, questions: 120 },
  { name: "Physiology",   icon: "💓", color: "from-[#1D9E75] to-[#5DCAA5]", progress: 42, questions: 95  },
  { name: "Pathology",    icon: "🔬", color: "from-[#7C3AED] to-[#A78BFA]", progress: 28, questions: 80  },
  { name: "Pharmacology", icon: "💊", color: "from-[#D85A30] to-[#F0997B]", progress: 15, questions: 70  },
];

const stats = [
  { label: "Tests Taken",    value: "24",   icon: <Target   size={18}/>, color: "text-[#0077A8]", bg: "bg-[#EAF6FF]" },
  { label: "Avg Score",      value: "76%",  icon: <TrendingUp size={18}/>, color: "text-[#1D9E75]", bg: "bg-[#e0f5ed]" },
  { label: "Study Streak",   value: "12d",  icon: <Award    size={18}/>, color: "text-orange-500",  bg: "bg-orange-50" },
  { label: "Hours This Week",value: "18h",  icon: <Clock    size={18}/>, color: "text-purple-500",  bg: "bg-purple-50" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [activeSubject, setActiveSubject] = useState("");

  const openTest = (name) => { setActiveSubject(name); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-[#F4F9FD]">

      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Modal ── */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} subject={activeSubject} />

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EAF6FF] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl bg-[#EAF6FF] flex items-center justify-center text-[#002D42] hover:bg-[#002D42] hover:text-white transition-all duration-200"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0077A8] to-[#6EC1E4] flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <span className="font-extrabold text-[#002D42] text-base hidden sm:block"
              style={{ fontFamily: "'Sora', sans-serif" }}>EduPulse</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-[#F4F9FD] border border-[#EAF6FF] rounded-xl px-3 py-2">
            <Search size={14} className="text-[#5A7A8A]" />
            <input placeholder="Search topics..." className="bg-transparent text-xs text-[#5A7A8A] outline-none w-36" />
          </div>
          <button className="w-9 h-9 rounded-xl bg-[#EAF6FF] flex items-center justify-center text-[#002D42] relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full"/>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0077A8] to-[#6EC1E4] flex items-center justify-center text-white text-xs font-bold">
            MS
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm text-[#5A7A8A] mb-1">Good morning 👋</p>
          <h1 className="font-extrabold text-[#002D42] text-2xl"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            Welcome back, Med Student!
          </h1>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#EAF6FF] shadow-sm flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="font-extrabold text-[#002D42] text-lg leading-none"
                  style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</p>
                <p className="text-[#5A7A8A] text-[11px] mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subject Cards — each triggers Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="font-bold text-[#002D42] text-base mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}>Your Subjects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((s) => (
              <motion.div
                key={s.name}
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,45,66,0.13)" }}
                className="bg-white rounded-2xl p-5 border border-[#EAF6FF] shadow-sm cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl`}>
                    {s.icon}
                  </div>
                  <span className="text-xs text-[#5A7A8A] bg-[#F4F9FD] px-2 py-1 rounded-lg font-medium">
                    {s.questions} Qs
                  </span>
                </div>
                <h3 className="font-bold text-[#002D42] text-base mb-1"
                  style={{ fontFamily: "'Sora', sans-serif" }}>{s.name}</h3>
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#5A7A8A]">Progress</span>
                    <span className="font-bold text-[#0077A8]">{s.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#EAF6FF] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
                {/* CTA — Modal trigger */}
                <button
                  onClick={() => openTest(s.name)}
                  className="w-full bg-[#EAF6FF] text-[#002D42] py-2.5 rounded-xl text-xs font-bold hover:bg-[#002D42] hover:text-white transition-all duration-200"
                >
                  🚀 Start Mock Test
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Accordion Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Accordion />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
