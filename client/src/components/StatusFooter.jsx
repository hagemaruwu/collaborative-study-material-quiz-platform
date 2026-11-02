import React, { useState, useEffect } from 'react';
import { Clock, Lock, Terminal, Activity } from 'lucide-react';

export default function StatusFooter() {
  const [timeUtc, setTimeUtc] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#13171F] border-t border-[#262C36] px-3 py-1 flex items-center justify-between text-[11px] font-mono text-[#8B949E] select-none h-7 flex-shrink-0 z-30">
      {/* System Node Telemetry */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#E6E9EE]">
          <span className="w-1.5 h-1.5 bg-[#FF5500]"></span>
          <span className="font-semibold">CSQP-NODE.16</span>
        </div>
        <span className="text-[#485260]">|</span>
        <div className="hidden sm:flex items-center gap-1.5 text-[#8B949E]">
          <Activity className="w-3 h-3 text-[#FF5500]" />
          <span>LATENCY: 0.15ms [TC-PERF-01]</span>
        </div>
        <span className="hidden sm:inline text-[#485260]">|</span>
        <span className="hidden md:inline text-[#485260]">STORAGE: SQLITE (WAL)</span>
      </div>

      {/* Keyboard Shortcuts Guide */}
      <div className="hidden lg:flex items-center gap-3 text-[10px] text-[#8B949E]">
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.2 bg-[#0D1015] border border-[#262C36] text-[#E6E9EE]">[/]</kbd> Search
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.2 bg-[#0D1015] border border-[#262C36] text-[#E6E9EE]">Z</kbd> Focus Mode
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.2 bg-[#0D1015] border border-[#262C36] text-[#E6E9EE]">Esc</kbd> Close Modals
        </span>
      </div>

      {/* Right Clock and Security */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[#8B949E]">
          <Clock className="w-3 h-3 text-[#FF5500]" />
          <span>{timeUtc || 'SYNCHRONIZING...'}</span>
        </div>
        <span className="text-[#485260]">|</span>
        <div className="flex items-center gap-1 text-[#E6E9EE]">
          <Lock className="w-3 h-3 text-[#FF5500]" />
          <span className="hidden sm:inline">BCRYPT-HASHED</span>
        </div>
      </div>
    </footer>
  );
}
