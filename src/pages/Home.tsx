import { motion } from "motion/react";
import { Rocket, Scan, FileText } from "lucide-react";

interface HomePageProps {
  setView: (view: "home" | "configure" | "schedule") => void;
}

export default function HomePage({ setView }: HomePageProps) {
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 max-w-2xl z-10">
        <motion.h1 
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Schedule Smarter.<br />
          <span className="text-primary-container">Zero Conflicts.</span>
        </motion.h1>

        <motion.p 
          className="font-sans text-lg text-on-surface-variant mb-8 leading-relaxed max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Advanced medical coordination powered by a clinical-grade <span className="text-secondary font-bold">AI CSP solver</span>. Eliminate drug-drug interactions and optimize bioavailability with aerospace-level precision.
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["MRV", "FORWARD CHECKING", "LCV", "A* SEARCH"].map((tag, i) => (
            <span 
              key={tag} 
              className={`px-4 py-1 rounded-full border text-[10px] font-bold tracking-wider transition-all duration-300
                ${tag === "MRV" ? "border-primary/30 bg-primary/5 text-primary neon-glow-primary" : "border-white/10 bg-white/5 text-on-surface-variant"}
              `}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <StatCard value="99.8%" label="Backtrack Reduction" color="primary" />
          <StatCard value="0.04s" label="Solve Time" color="secondary" />
          <StatCard value="0" label="Violations" color="error" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionButton 
            icon={<Rocket className="w-8 h-8" />} 
            label="Demo" 
            onClick={() => setView("schedule")}
          />
          <ActionButton 
            icon={<Scan className="w-8 h-8" />} 
            label="Scan Prescription" 
            primary 
            onClick={() => setView("configure")}
          />
          <ActionButton 
            icon={<FileText className="w-8 h-8" />} 
            label="Manual Entry" 
          />
        </div>
      </div>

      {/* Right Content - Radial Clock */}
      <div className="flex-1 flex items-center justify-center relative w-full aspect-square max-w-[500px]">
        <motion.div 
          className="relative w-full h-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[100%] h-[100%] rounded-full border border-white/5" />
            <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5" />
          </div>

          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            {/* Background Clock Circle */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
            
            {/* Arcs indicating zones */}
            <path d="M 200,20 A 180,180 0 0 1 355.8,110" fill="none" stroke="#00C9A7" strokeOpacity="0.6" strokeWidth="8" strokeLinecap="round" />
            <path d="M 355.8,290 A 180,180 0 0 1 200,380" fill="none" stroke="#00C9A7" strokeOpacity="0.6" strokeWidth="8" strokeLinecap="round" />
            <path d="M 20,200 A 180,180 0 0 1 44.2,110" fill="none" stroke="#ff9862" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
            
            {/* Doses indicators */}
            <motion.circle 
              cx="200" cy="20" r="6" fill="#44e5c2" 
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} 
            />
            <motion.circle 
              cx="380" cy="200" r="6" fill="#c9bfff" 
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} 
            />
            <motion.circle 
              cx="200" cy="380" r="6" fill="#44e5c2" 
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} 
            />

            {/* Current Time Hand */}
            <motion.g 
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
              transform="origin-center"
              style={{ transformOrigin: '200px 200px' }}
            >
              <line x1="200" y1="200" x2="200" y2="40" stroke="#44e5c2" strokeWidth="3" strokeLinecap="round" />
              <circle cx="200" cy="40" r="4" fill="#44e5c2" />
            </motion.g>

            {/* Center Labels */}
            <text x="200" y="215" textAnchor="middle" className="font-mono fill-on-surface text-[24px]">14:32</text>
            <text x="200" y="235" textAnchor="middle" className="font-brand fill-on-surface-variant text-[10px] uppercase tracking-widest">System Nominal</text>
          </svg>

          {/* Legend */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-8 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-container" />
              <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Optimal Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-tertiary-container/60" />
              <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Night Zone</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }: { value: string; label: string; color: "primary" | "secondary" | "error" }) {
  const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    error: "text-error"
  };
  
  return (
    <div className="glass-panel p-4 rounded-xl">
      <div className={`font-mono text-xl md:text-2xl font-bold ${colors[color]}`}>{value}</div>
      <div className="text-[10px] text-on-surface-variant uppercase tracking-tighter font-bold">{label}</div>
    </div>
  );
}

function ActionButton({ icon, label, primary, onClick }: { icon: React.ReactNode; label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`glass-panel p-6 rounded-2xl flex flex-col items-center gap-4 group transition-all duration-300
        ${primary ? "ring-1 ring-primary/20 bg-primary/5" : ""}
      `}
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 ${primary ? "text-primary" : "text-on-surface-variant"}`}>
        {icon}
      </div>
      <span className={`font-display text-sm font-bold ${primary ? "text-primary" : "text-on-surface"}`}>{label}</span>
    </button>
  );
}
