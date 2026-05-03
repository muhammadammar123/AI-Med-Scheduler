/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Home, 
  Settings, 
  User, 
  LayoutDashboard, 
  Calendar, 
  Plus,
  Rocket,
  Scan,
  FileText
} from "lucide-react";
import { useState } from "react";
import HomePage from "./pages/Home";
import SchedulePage from "./pages/Schedule";
import ConfigurePage from "./pages/Configure";

type View = "home" | "configure" | "schedule";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");

  const renderView = () => {
    switch (currentView) {
      case "home": return <HomePage setView={setCurrentView} />;
      case "configure": return <ConfigurePage />;
      case "schedule": return <SchedulePage />;
      default: return <HomePage setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background hex-bg relative overflow-x-hidden">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-8">
          <div 
            className="text-primary font-brand font-bold text-xl uppercase tracking-widest cursor-pointer"
            onClick={() => setCurrentView("home")}
          >
            RxScheduler
          </div>
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => setCurrentView("home")}
              className={`font-brand font-medium transition-all duration-300 pb-1 border-b-2 ${
                currentView === "home" ? "text-primary border-primary font-bold" : "text-on-surface-variant border-transparent hover:text-primary"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView("configure")}
              className={`font-brand font-medium transition-all duration-300 pb-1 border-b-2 ${
                currentView === "configure" ? "text-primary border-primary font-bold" : "text-on-surface-variant border-transparent hover:text-primary"
              }`}
            >
              Configure
            </button>
            <button 
              onClick={() => setCurrentView("schedule")}
              className={`font-brand font-medium transition-all duration-300 pb-1 border-b-2 ${
                currentView === "schedule" ? "text-primary border-primary font-bold" : "text-on-surface-variant border-transparent hover:text-primary"
              }`}
            >
              Schedule
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 md:pb-0">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {renderView()}
        </motion.div>
      </main>

      {/* Mobile Nav */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 bg-surface/80 backdrop-blur-2xl border-t border-white/5 md:hidden">
        <button 
          onClick={() => setCurrentView("home")}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === "home" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold font-brand">Home</span>
        </button>
        <button 
          onClick={() => setCurrentView("configure")}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === "configure" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold font-brand">Workspace</span>
        </button>
        <button 
          onClick={() => setCurrentView("schedule")}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === "schedule" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold font-brand">Timeline</span>
        </button>
      </footer>

      {/* Floating Action Button (Desktop Only on specific views) */}
      <div className="fixed bottom-10 right-10 z-40 hidden md:block">
        <button className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Plus className="w-6 h-6 relative z-10" />
        </button>
      </div>
    </div>
  );
}
