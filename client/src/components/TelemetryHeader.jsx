import React from 'react';
import { 
  FileUp, 
  GitBranch, 
  BookOpen, 
  Shield, 
  Maximize2, 
  Minimize2, 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen,
  GraduationCap,
  Layers
} from 'lucide-react';

export default function TelemetryHeader({
  activeRole,
  onRoleChange,
  activeDocument,
  activeView,
  onViewChange,
  isLeftOpen,
  onToggleLeft,
  isRightOpen,
  onToggleRight,
  isFocusMode,
  onToggleFocus,
  onOpenUpload,
  onOpenRevision,
  onOpenPolicy,
  onOpenPrivacy
}) {
  return (
    <header className="w-full bg-[#13171F] border-b border-[#262C36] select-none sticky top-0 z-40 h-12 flex-shrink-0">
      <div className="flex items-center justify-between px-3 h-full gap-2">
        {/* Left Section: Panel Toggles and Identification */}
        <div className="flex items-center gap-2.5">
          {/* Left Sidebar Toggle Button */}
          <button
            onClick={onToggleLeft}
            title={isLeftOpen ? 'Collapse Course Sidebar' : 'Expand Course Sidebar'}
            className="p-1.5 border border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:text-[#E6E9EE] hover:border-[#FF5500] transition-colors"
          >
            {isLeftOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4 text-[#FF5500]" />}
          </button>

          {/* Core System Branding */}
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 bg-[#FF5500] flex-shrink-0"></span>
            <span className="font-heading font-bold text-sm text-[#E6E9EE] tracking-wider hidden sm:inline">
              CSQP
            </span>
            <span className="text-[10px] text-[#485260] hidden md:inline">|</span>
            <span className="text-[11px] text-[#8B949E] hidden md:inline font-mono">
              TEAM 16 WORKSTATION
            </span>
          </div>

          {/* Active Document ID badge */}
          {activeDocument && activeView === 'reader' && (
            <div className="hidden xl:flex items-center gap-1.5 border border-[#262C36] bg-[#0D1015] px-2 py-0.5 text-[11px] font-mono">
              <span className="text-[#FF5500] font-bold">{activeDocument.subjectId}</span>
              <span className="text-[#485260]">|</span>
              <span className="text-[#8B949E] truncate max-w-[160px]">{activeDocument.title}</span>
              <span className="text-[#FF5500]">v{activeDocument.version}</span>
            </div>
          )}
        </div>

        {/* Center Section: Workspace Mode Switcher */}
        <div className="flex items-center border border-[#262C36] bg-[#0D1015] p-0.5 font-mono text-xs">
          <button
            onClick={() => onViewChange('reader')}
            className={`flex items-center gap-1.5 px-3 py-1 font-medium transition-colors ${
              activeView === 'reader'
                ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                : 'text-[#8B949E] hover:text-[#E6E9EE]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>DOCUMENT CANVAS</span>
          </button>
          <button
            onClick={() => onViewChange('assessment')}
            className={`flex items-center gap-1.5 px-3 py-1 font-medium transition-colors ${
              activeView === 'assessment'
                ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                : 'text-[#8B949E] hover:text-[#E6E9EE]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ASSESSMENT LAB</span>
          </button>
        </div>

        {/* Right Section: Focus, Role, Actions, and Right Panel Toggle */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Focus Mode Reader Button */}
          <button
            onClick={onToggleFocus}
            title={isFocusMode ? 'Exit Distraction-Free Focus Mode (Z)' : 'Enter Distraction-Free Focus Mode (Z)'}
            className={`flex items-center gap-1 px-2.5 py-1 border transition-colors ${
              isFocusMode
                ? 'border-[#FF5500] bg-[#FF5500] text-[#0D1015] font-bold'
                : 'border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:text-[#E6E9EE] hover:border-[#3D4654]'
            }`}
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isFocusMode ? 'EXIT FOCUS' : 'FOCUS'}</span>
          </button>

          {/* Role Selector */}
          <div className="hidden sm:flex items-center border border-[#262C36] bg-[#0D1015] p-0.5">
            {['Student/User', 'Content Contributor / Quiz Creator', 'Administrator'].map((role) => {
              const label = role === 'Student/User' ? 'STUDENT' : (role === 'Content Contributor / Quiz Creator' ? 'CONTRIBUTOR' : 'ADMIN');
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#181D26] text-[#FF5500] font-bold border border-[#FF5500]'
                      : 'text-[#8B949E] hover:text-[#E6E9EE]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <button
            onClick={onOpenRevision}
            title="Create a collaborative document revision"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 border border-[#262C36] text-[#E6E9EE] bg-[#0D1015] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors text-xs"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>+ REVISION</span>
          </button>

          <button
            onClick={onOpenUpload}
            title="Upload academic document (PDF / MD / TXT)"
            className="flex items-center gap-1 px-2.5 py-1 border border-[#262C36] text-[#E6E9EE] bg-[#0D1015] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors text-xs"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ UPLOAD</span>
          </button>

          {/* Policies */}
          <button
            onClick={onOpenPolicy}
            title="Academic Terms & Attribution Policy"
            className="hidden xl:flex items-center p-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] bg-[#0D1015]"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenPrivacy}
            title="Security & Cryptographic Hashing Policy"
            className="hidden xl:flex items-center p-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] bg-[#0D1015]"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {/* Right Panel Toggle Button */}
          {activeView === 'reader' && (
            <button
              onClick={onToggleRight}
              title={isRightOpen ? 'Collapse Inspection Ledger' : 'Expand Inspection Ledger'}
              className="p-1.5 border border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:text-[#E6E9EE] hover:border-[#FF5500] transition-colors ml-1"
            >
              {isRightOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4 text-[#FF5500]" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
