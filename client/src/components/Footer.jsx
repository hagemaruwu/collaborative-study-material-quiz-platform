import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#DDE1E5] py-8 select-none font-sans text-xs text-[#5A626A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE1E5] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#0047FF] text-white flex items-center justify-center font-bold text-xs">
              CS
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#111315]">
                Collaborative Study Material &amp; Quiz Platform
              </span>
              <p className="text-[11px] text-[#5A626A]">
                Open academic repository for course notes, versioned revisions, and timed self-assessments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#0047FF]">
              <ShieldCheck className="w-4 h-4" />
              <span>SYSTEM OPERATIONAL</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1.5 text-[#5A626A]">
              <Activity className="w-3.5 h-3.5 text-[#0047FF]" />
              <span>SERVER LATENCY: &lt;1ms</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('home')} className="hover:text-[#0047FF] transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('materials')} className="hover:text-[#0047FF] transition-colors">
              Study Notes
            </button>
            <button onClick={() => onNavigate('quizzes')} className="hover:text-[#0047FF] transition-colors">
              Assessments
            </button>
            <button onClick={() => onNavigate('leaderboard')} className="hover:text-[#0047FF] transition-colors">
              Leaderboard
            </button>
            <button onClick={() => onNavigate('audit')} className="hover:text-[#0047FF] transition-colors">
              Audit Trail
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-[#0047FF] transition-colors">
              About Platform
            </button>
          </div>

          <div>
            <span>&copy; {new Date().getFullYear()} CSQP Platform. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
