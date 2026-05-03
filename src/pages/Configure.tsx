import { motion } from "motion/react";
import { CloudUpload, Scan, ImagePlus, CheckCircle2, XCircle, Wand2, Info } from "lucide-react";
import { useState } from "react";

export default function ConfigurePage() {
  const [step] = useState(1);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Stepper */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-full border border-white/5">
          <StepItem num={1} label="Input Mode" active />
          <div className="w-8 h-px bg-white/10" />
          <StepItem num={2} label="Medications" />
          <div className="w-8 h-px bg-white/10" />
          <StepItem num={3} label="Generate" disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column: Input Area */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            {/* Mode Switcher */}
            <div className="flex bg-surface-container-lowest rounded-full p-1 border border-white/5 mb-8">
              <button className="flex-1 py-2 px-4 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all">Demo</button>
              <button className="flex-1 py-2 px-4 rounded-full bg-primary-container text-on-primary-container text-xs font-bold shadow-lg">Upload</button>
              <button className="flex-1 py-2 px-4 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all">Manual</button>
            </div>

            {/* Upload Area */}
            <div className="space-y-6">
              <motion.div 
                className="border-2 border-dashed border-secondary/30 rounded-2xl p-12 flex flex-col items-center justify-center bg-secondary/5 cursor-pointer hover:border-secondary/60 hover:bg-secondary/10 transition-all group"
                whileHover={{ scale: 0.995 }}
              >
                <CloudUpload className="w-12 h-12 text-secondary mb-4 transition-transform group-hover:-translate-y-1" />
                <h3 className="font-display text-xl font-bold mb-2">Drop prescription scans here</h3>
                <p className="text-xs text-on-surface-variant font-medium">Supports JPG, PNG, and PDF medical reports</p>
                <div className="mt-6 flex gap-2">
                  <div className="px-3 py-1 rounded bg-surface text-[10px] font-bold text-on-surface-variant">JPG</div>
                  <div className="px-3 py-1 rounded bg-surface text-[10px] font-bold text-on-surface-variant">PNG</div>
                  <div className="px-3 py-1 rounded bg-surface text-[10px] font-bold text-on-surface-variant">PDF</div>
                </div>
              </motion.div>

              {/* Status Grid */}
              <div className="grid grid-cols-3 gap-4">
                <ScanPreview active label="Scanning..." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvq4v7YTmj3sGb4LZSlqQN9KsZAaG2EHQiUb2DPRe6mrZu4BtiMbD01VrMqFYNQahIs-EoxcQrRV9hJSheCiH6XofLWXJ0wOtOm6e2dVO1Ex0PBVAU8ovLSYxDrK0qzdRqWl1nyru0jpdZybykVdt6Du6vNh4kbzxli67ZHZS0CbU4XuZMt2piKvqNFpy593GWya7wfSUJ6uZ7UUIVsNkkNGLCKML3-SSjLzMFy__VKEshH_uB4rFj21qaDQte6eKNbRVqjkA4dzU-" />
                <ScanPreview progress={85} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfGXvEhuk19r-qVa--SuUE2Is-ZqC_9Y_kfqmfltOYLL2NsE7n9FPJYK8Fa9KHZ3PO8iBobiNM-dKTYLduhgj_yUKB7xUcQxMuvu1XVP9FTFR_Fm7CJwStWEI6Vmdsbrwl8z7SV6whpU_zQ5OZAvofieu75KgU4YZVXulypgFzREoMraYvUaVGzNTekXTQ9i_J6qzm6p2r8WyZY5gybV_ejbSS4PnsUO3EsKLcSz0ZDuosOCC0w6Xl5900OidJHLhtWAUKEG0mlRpt" />
                <div className="aspect-square rounded-xl bg-surface-container-high border border-dashed border-white/10 flex items-center justify-center flex-col gap-2 cursor-pointer hover:border-white/20 transition-all">
                  <ImagePlus className="w-8 h-8 text-on-surface-variant" />
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Add Scan</span>
                </div>
              </div>

              {/* Extraction Results */}
              <div className="bg-surface-container-lowest/50 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-high">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">Extracted Item</th>
                      <th className="px-4 py-3 text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">Confidence</th>
                      <th className="px-4 py-3 text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <ExtractionRow name="Atorvastatin 40mg" confidence="98% Match" />
                    <ExtractionRow name="Metformin 500mg" confidence="94% Match" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Constraints Card */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-secondary">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Info className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-lg">Inter-Medication Separation</h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
              <select className="bg-surface border border-white/10 rounded-full px-4 py-2 text-sm font-medium focus:ring-secondary focus:border-secondary transition-all outline-none">
                <option>Atorvastatin</option>
              </select>
              <span className="text-on-surface-variant text-xs font-bold uppercase">keep apart from</span>
              <select className="bg-surface border border-white/10 rounded-full px-4 py-2 text-sm font-medium focus:ring-secondary focus:border-secondary transition-all outline-none">
                <option>Metformin</option>
              </select>
              <div className="flex items-center gap-3 ml-auto">
                <input type="number" defaultValue={4} className="w-16 bg-surface border border-white/10 rounded-lg px-2 py-1 text-center font-mono font-bold text-primary focus:border-primary outline-none" />
                <span className="text-xs text-on-surface-variant font-bold uppercase">Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sticky top-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-2xl font-bold">Workspace</h2>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-primary/20 tracking-wider">4 Items Added</span>
            </div>

            {/* Med List */}
            <div className="space-y-4 mb-8">
              <WorkspaceItem name="Atorvastatin" meta="1x Daily • 40mg" color="primary" tag="EMPTY STOMACH" />
              <WorkspaceItem name="Metformin" meta="2x Daily • 500mg" color="tertiary" tag="WITH FOOD" />
              <WorkspaceItem name="Vitamin D3" meta="1x Daily • 2000IU" color="secondary" />
            </div>

            {/* Checklist */}
            <div className="bg-surface-container-lowest/50 rounded-2xl p-4 mb-8 space-y-4 border border-white/5">
              <CheckItem label="Dosage timings validated" checked />
              <CheckItem label="Interaction checks passed" checked />
              <CheckItem label="Wake-up time defined" />
            </div>

            {/* CTA Button */}
            <motion.button 
              className="w-full py-4 rounded-2xl font-bold text-black flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20 hover:shadow-primary/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Wand2 className="w-5 h-5" />
              <span className="font-display uppercase tracking-widest text-xs">Generate Optimal Schedule</span>
            </motion.button>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest font-bold mb-1">Complexity</div>
                  <div className="font-mono text-xl font-bold text-primary">O(log n)</div>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest font-bold mb-1">Conflicts</div>
                  <div className="font-mono text-xl font-bold text-secondary">0 Found</div>
                </div>
              </div>
              <p className="mt-4 text-[10px] text-on-surface-variant italic font-medium">Heuristic Temporal Optimization v4.2.1</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepItem({ num, label, active, disabled }: { num: number; label: string; active?: boolean; disabled?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300
      ${active ? "bg-secondary-container text-on-secondary-container shadow-lg shadow-secondary/20" : "bg-surface-container-highest text-on-surface"}
      ${disabled ? "opacity-40" : ""}
    `}>
      <span className="font-mono font-bold text-sm">{num}</span>
      <span className="text-xs font-bold font-brand tracking-wider">{label}</span>
    </div>
  );
}

function ScanPreview({ active, progress, src, label }: { active?: boolean; progress?: number; src: string; label?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 aspect-square group">
      <img src={src} className={`w-full h-full object-cover transition-all duration-500 ${active ? "grayscale" : ""}`} />
      {active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <motion.div 
            className="h-0.5 w-full bg-primary absolute top-0 neon-glow-primary z-10"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-mono font-bold text-primary bg-surface-container-lowest/80 px-2 py-1 rounded tracking-widest">{label}</span>
        </div>
      )}
      {progress !== undefined && (
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
          <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="bg-primary h-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ExtractionRow({ name, confidence }: { name: string; confidence: string }) {
  return (
    <tr className="group hover:bg-white/5 transition-colors">
      <td className="px-4 py-4 text-xs font-bold text-on-surface">{name}</td>
      <td className="px-4 py-4 text-[10px] font-mono font-bold text-primary">{confidence}</td>
      <td className="px-4 py-4">
        <button className="text-[10px] font-brand font-bold text-primary uppercase tracking-widest hover:underline">Confirm</button>
      </td>
    </tr>
  );
}

function WorkspaceItem({ name, meta, color, tag }: { name: string; meta: string; color: string; tag?: string }) {
  const borderColors = {
    primary: "border-l-primary",
    secondary: "border-l-secondary",
    tertiary: "border-l-tertiary"
  };
  const dotColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary"
  };

  return (
    <div className={`flex items-center gap-4 p-4 bg-surface-container-high/50 rounded-xl border-l-4 ${borderColors[color as keyof typeof borderColors]} hover:translate-x-1 transition-transform`}>
      <div className={`w-2 h-2 rounded-full ${dotColors[color as keyof typeof dotColors]} neon-glow-primary`} />
      <div className="flex-1">
        <div className="text-sm font-bold text-on-surface">{name}</div>
        <div className="text-[10px] text-on-surface-variant font-mono uppercase font-bold mt-0.5">{meta}</div>
      </div>
      {tag && (
        <span className="bg-white/5 text-on-surface-variant text-[8px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-white/5">{tag}</span>
      )}
    </div>
  );
}

function CheckItem({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <CheckCircle2 className="w-4 h-4 text-primary" />
      ) : (
        <XCircle className="w-4 h-4 text-on-surface-variant" />
      )}
      <span className={`text-xs font-bold ${checked ? "text-on-surface" : "text-on-surface-variant"}`}>{label}</span>
    </div>
  );
}
