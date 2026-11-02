import React, { useState, useEffect } from 'react';
import { Terminal, Shield, UserCheck, FileUp, GitBranch, BookOpen, Clock, Lock } from 'lucide-react';

export default function TelemetryHeader({
  activeRole,
  onRoleChange,
  activeDocument,
  onOpenUpload,
  onOpenRevision,
  onOpenPolicy,
  onOpenPrivacy
}) {
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
    <header className="w-full bg-[#13171F] border-b border-[#262C36] select-none sticky top-0 z-40">
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-xs border-b border-[#262C36] text-[#8B949E]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[#E6E9EE]">
            <span className="w-2 h-2 bg-[#FF5500]"></span>
            <span className="font-semibold tracking-wider">SYS://CSQP-NODE.16</span>
            <span className="text-[#485260]">|</span>
            <span className="text-[#8B949E]">SE MINI-PROJECT PART-2</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#485260]">
            <span>NODE_ENV: PRODUCTION</span>
            <span>|</span>
            <span>LATENCY: 0.15ms [TC-PERF-01]</span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="hidden sm:flex items-center gap-2 text-[#8B949E]">
            <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{timeUtc || 'SYNCHRONIZING...'}</span>
          </div>
          <div className="flex items-center gap-1 border border-[#262C36] px-2 py-0.5 text-[11px] text-[#E6E9EE] bg-[#0D1015]">
            <Lock className="w-3 h-3 text-[#FF5500]" />
            <span>ENCRYPTED (BCRYPT / HMAC)</span>
          </div>
        </div>
      </div>

      {/* Main Workstation Control Strip */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 gap-3">
        {/* Branding & Document Hash */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-[#E6E9EE] tracking-tight">
              COLLABORATIVE STUDY MATERIAL & QUIZ PLATFORM
            </h1>
            <p className="text-xs text-[#8B949E] font-mono mt-0.5">
              PES UNIVERSITY [TEAM 16] : DECENTRALIZED ACADEMIC WORKSTATION
            </p>
          </div>
          {activeDocument && (
            <div className="hidden lg:flex items-center gap-2 border border-[#262C36] bg-[#0D1015] px-2 py-1 text-xs font-mono">
              <span className="text-[#485260]">DOC_ID:</span>
              <span className="text-[#E6E9EE]">#{activeDocument.id}</span>
              <span className="text-[#485260]">|</span>
              <span className="text-[#FF5500]">VER: v{activeDocument.version}</span>
            </div>
          )}
        </div>

        {/* Global Workstation Action Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
          {/* Active Role Selector */}
          <div className="flex items-center border border-[#262C36] bg-[#0D1015] p-0.5">
            <span className="px-2 text-[10px] text-[#485260] uppercase">ROLE:</span>
            {['Student/User', 'Content Contributor / Quiz Creator', 'Administrator'].map((role) => {
              const label = role === 'Student/User' ? 'STUDENT' : (role === 'Content Contributor / Quiz Creator' ? 'CONTRIBUTOR' : 'ADMIN');
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`px-2 py-1 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                      : 'text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Action Triggers */}
          <button
            onClick={onOpenRevision}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262C36] text-[#E6E9EE] bg-[#181D26] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>NEW REVISION</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262C36] text-[#E6E9EE] bg-[#181D26] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>UPLOAD DOC</span>
          </button>

          {/* Legal / Policy Triggers (Phase 3 Requirement) */}
          <button
            onClick={onOpenPolicy}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26] transition-colors text-[11px]"
          >
            <BookOpen className="w-3 h-3 text-[#8B949E]" />
            <span>TERMS</span>
          </button>

          <button
            onClick={onOpenPrivacy}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26] transition-colors text-[11px]"
          >
            <Shield className="w-3 h-3 text-[#8B949E]" />
            <span>PRIVACY</span>
          </button>
        </div>
      </div>
    </header>
  );
}
