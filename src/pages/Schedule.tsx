import { motion } from "motion/react";
import { CheckCircle2, AlertTriangle, FileDown, Printer, Copy } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-8 max-w-7xl">
      {/* Top Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MiniStat value="12/Day" label="Total Doses" color="primary" />
        <MiniStat value="08:00-22:00" label="Daytime" color="tertiary" />
        <MiniStat value="23:00-07:00" label="Night Zone" color="secondary" />
        <MiniStat value="1.2s" label="Solve Time" color="primary" />
        <MiniStat value="A* Opt" label="Algorithm" color="primary" border />
      </div>

      {/* Biometric Chronology Timeline */}
      <section className="glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container/30">
          <h3 className="font-display text-2xl font-bold text-primary">Biometric Chronology</h3>
          <div className="flex gap-6">
            <LegendItem color="primary" label="Meal Zone" />
            <LegendItem color="tertiary" label="Night Zone" />
          </div>
        </div>
        
        <div className="relative timeline-scroll overflow-x-auto p-12 min-h-[400px]">
          {/* Background Highlight Zones */}
          <div className="absolute inset-y-0 left-[12%] right-[12%] flex pointer-events-none">
            <div className="h-full bg-tertiary/10 border-x border-white/5" style={{ width: "25%" }} />
            <div className="h-full bg-primary/5 border-x border-white/5" style={{ width: "50%" }} />
            <div className="h-full bg-secondary/10 border-x border-white/5" style={{ width: "25%" }} />
          </div>

          {/* NOW Indicator */}
          <div className="absolute inset-y-0 w-px bg-error z-20" style={{ left: "45%" }}>
            <div className="absolute top-0 -left-1 w-2 h-2 bg-error rounded-full shadow-[0_0_8px_#ffb4ab]" />
            <div className="absolute top-8 left-4 bg-error text-black px-2 py-0.5 rounded text-[10px] font-bold tracking-widest">NOW</div>
          </div>

          {/* Row Content */}
          <div className="relative z-10 space-y-12 min-w-[1000px]">
             {/* Labels */}
             <div className="flex justify-between border-b border-white/5 pb-4">
               {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"].map(t => (
                 <span key={t} className="font-mono text-[10px] font-bold text-on-surface-variant">{t}</span>
               ))}
             </div>

             {/* Medications */}
             <TimelineRow name="Lisinopril" dose="10mg" timePos="34%" color="primary" icon={<CheckCircle2 className="w-3 h-3" />} />
             
             {/* Interaction Arc (SVG Overlay) */}
             <div className="relative h-20 -my-10 z-30 pointer-events-none">
                <svg className="absolute left-[34%] w-[24%] h-full">
                  <motion.path 
                    d="M 0 50 Q 80 0 160 50" 
                    fill="none" 
                    stroke="rgba(201, 191, 255, 0.4)" 
                    strokeWidth="2" 
                    strokeDasharray="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <text x="30" y="20" className="fill-secondary text-[10px] font-bold uppercase tracking-widest">Interaction Constraint</text>
                </svg>
             </div>

             <TimelineRow name="Amlodipine" dose="5mg" timePos="58%" color="secondary" />
             <TimelineRow name="Atorvastatin" dose="20mg" timePos="82%" color="tertiary" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table View */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden self-start">
          <div className="p-6 bg-surface-container/50 border-b border-white/5">
            <h3 className="font-display text-xl font-bold">Precision Administration Plan</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/30">
                <th className="p-4 font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Time</th>
                <th className="p-4 font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Medication</th>
                <th className="p-4 font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Protocol</th>
                <th className="p-4 text-center font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <ScheduleRow time="08:15 AM" name="Lisinopril" type="ACE Inhibitor" protocol="WITH FOOD" color="primary" />
              <ScheduleRow time="01:30 PM" name="Vitamin D3" type="Supplement" protocol="NO INTERACTIONS" color="secondary" />
              <ScheduleRow time="09:00 PM" name="Atorvastatin" type="HMG-CoA Reductase" protocol="AVOID CITRUS" color="tertiary" />
            </tbody>
          </table>
        </div>

        {/* Chart View */}
        <div className="glass-panel rounded-2xl p-8 flex flex-col h-full">
          <h3 className="font-display text-xl font-bold mb-2">Efficiency Analysis</h3>
          <p className="text-xs text-on-surface-variant font-medium mb-12">Comparative search node expansion relative to naive baseline.</p>
          
          <div className="flex-1 flex items-end gap-6 min-h-[200px] mb-8">
            <div className="flex-1 flex flex-col items-center gap-3 group">
              <div className="w-full bg-white/5 rounded-t-lg transition-all" style={{ height: "90%" }} />
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Naive</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-3 group h-full">
              <motion.div 
                className="w-full bg-primary rounded-t-lg neon-glow-primary" 
                initial={{ height: 0 }}
                animate={{ height: "15%" }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">Rx Opt</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Computation Gain</span>
             <span className="font-mono text-2xl font-bold text-primary">+84.2%</span>
          </div>
        </div>
      </div>

      {/* Alert */}
      <motion.div 
        className="glass-panel border-error/20 bg-error/5 p-6 rounded-2xl flex items-start gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="p-3 bg-error/10 rounded-xl">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-error text-lg">Interaction Alert: Metabolic Conflict</h4>
          <p className="text-sm text-on-surface overleading-relaxed">The scheduler has flagged a potential metabolic path overlap between Lisinopril and High-Potassium Dietary inputs. Administration has been shifted by 45 minutes to ensure safe bioavailability thresholds.</p>
        </div>
      </motion.div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-surface/80 backdrop-blur-3xl border-t border-white/10 hidden md:flex items-center justify-between px-12 py-4">
        <div className="flex gap-8">
           <FooterAction icon={<FileDown className="w-4 h-4" />} label="Export PDF" />
           <FooterAction icon={<Printer className="w-4 h-4" />} label="Print" />
        </div>
        <motion.button 
          className="bg-primary text-black px-8 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copy to Clipboard
          </div>
        </motion.button>
      </div>
    </div>
  );
}

function MiniStat({ value, label, color, border }: { value: string; label: string; color: string; border?: boolean }) {
  const textColors = { primary: "text-primary", secondary: "text-secondary", tertiary: "text-tertiary" };
  return (
    <div className={`glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center ${border ? "border-primary/30" : ""}`}>
      <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold mb-1">{label}</span>
      <span className={`font-mono text-xl font-bold ${textColors[color as keyof typeof textColors]}`}>{value}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const bgColors = { primary: "bg-primary", secondary: "bg-secondary", tertiary: "bg-tertiary" };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-sm ${bgColors[color as keyof typeof bgColors]} opacity-30`} />
      <span className="text-[10px] font-brand font-bold text-on-surface-variant uppercase tracking-widest">{label}</span>
    </div>
  );
}

function TimelineRow({ name, dose, timePos, color, icon }: { name: string; dose: string; timePos: string; color: string; icon?: React.ReactNode }) {
  const textColors = { primary: "text-primary", secondary: "text-secondary", tertiary: "text-tertiary" };
  const bgColors = { primary: "bg-primary", secondary: "bg-secondary", tertiary: "bg-tertiary" };
  
  return (
    <div className="relative h-12 flex items-center">
      <span className={`absolute -left-32 w-28 text-right text-sm font-bold truncate ${textColors[color as keyof typeof textColors]}`}>{name}</span>
      <motion.div 
        className={`absolute h-8 px-6 rounded-full flex items-center justify-center font-mono font-bold text-xs text-black shadow-xl ${bgColors[color as keyof typeof bgColors]}`}
        style={{ left: timePos }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          {icon}
          {dose}
        </div>
      </motion.div>
    </div>
  );
}

function ScheduleRow({ time, name, type, protocol, color }: { time: string; name: string; type: string; protocol: string; color: string }) {
  const textColors = { primary: "text-primary", secondary: "text-secondary", tertiary: "text-tertiary" };
  const bgColors = { primary: "bg-primary/10", secondary: "bg-secondary/10", tertiary: "bg-tertiary/10" };
  const borderColors = { primary: "border-primary/20", secondary: "border-secondary/20", tertiary: "border-tertiary/20" };

  return (
    <tr className="hover:bg-primary/5 transition-colors">
      <td className={`p-4 font-mono text-sm font-bold ${textColors[color as keyof typeof textColors]}`}>{time}</td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-bold text-on-surface">{name}</span>
          <span className="text-[10px] font-mono text-on-surface-variant font-bold uppercase">{type}</span>
        </div>
      </td>
      <td className="p-4">
        <span className={`${bgColors[color as keyof typeof bgColors]} ${textColors[color as keyof typeof textColors]} ${borderColors[color as keyof typeof borderColors]} text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest`}>
          {protocol}
        </span>
      </td>
      <td className="p-4 text-center">
         <CheckCircle2 className={`w-5 h-5 mx-auto ${textColors[color as keyof typeof textColors]}`} />
      </td>
    </tr>
  );
}

function FooterAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group">
      <div className="text-on-surface-variant group-hover:text-primary transition-colors">{icon}</div>
      <span className="text-[10px] font-brand font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
