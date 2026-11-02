import React, { useState } from 'react';
import { BookOpen, Award, Trophy, Shield, Info, FileUp, Menu, X, Check } from 'lucide-react';

export default function Navbar({
  activePage,
  onNavigate,
  activeRole,
  onRoleChange,
  onOpenUpload
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'materials', label: 'Study Notes' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'audit', label: 'Audit Trail' },
    { id: 'about', label: 'About Team 16' },
  ];

  const roles = [
    { id: 'Student/User', label: 'Student' },
    { id: 'Content Contributor / Quiz Creator', label: 'Contributor' },
    { id: 'Administrator', label: 'Admin' }
  ];

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#DDE1E5] sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Institution */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
        >
          <div className="w-8 h-8 bg-[#0047FF] flex items-center justify-center text-white font-bold text-sm tracking-wider">
            CS
          </div>
          <div>
            <div className="font-heading font-bold text-base text-[#111315] tracking-tight leading-none flex items-center gap-2">
              <span>CSQP</span>
              <span className="text-[11px] font-sans font-medium px-1.5 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5] text-[#5A626A]">
                PES UNIVERSITY
              </span>
            </div>
            <p className="text-[11px] font-sans text-[#5A626A] mt-0.5">
              Team 16 Academic Platform
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-sans text-sm">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'text-[#0047FF] border-b-2 border-[#0047FF] font-semibold'
                    : 'text-[#5A626A] hover:text-[#111315]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Role Switcher */}
        <div className="hidden lg:flex items-center gap-3 font-sans text-xs">
          {/* Role Selector */}
          <div className="flex items-center border border-[#DDE1E5] bg-[#F8F9FA] p-0.5">
            <span className="px-2 text-[11px] text-[#5A626A] uppercase font-medium">ROLE:</span>
            {roles.map((r) => {
              const isActive = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id)}
                  className={`px-2.5 py-1 text-xs transition-colors font-medium ${
                    isActive
                      ? 'bg-[#0047FF] text-[#FFFFFF] font-semibold'
                      : 'text-[#5A626A] hover:text-[#111315]'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0047FF] text-[#FFFFFF] font-medium text-xs hover:bg-[#0039CC] transition-colors"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#5A626A] hover:text-[#111315] border border-[#DDE1E5]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DDE1E5] bg-[#FFFFFF] px-4 py-4 space-y-3 font-sans text-sm">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 ${
                  activePage === item.id
                    ? 'bg-[#F8F9FA] text-[#0047FF] font-semibold border-l-2 border-[#0047FF]'
                    : 'text-[#5A626A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#DDE1E5]">
            <span className="text-xs text-[#5A626A] uppercase block mb-1.5 font-medium">Switch Role:</span>
            <div className="grid grid-cols-3 gap-1">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id)}
                  className={`py-1 text-xs border text-center ${
                    activeRole === r.id
                      ? 'border-[#0047FF] bg-[#0047FF] text-white font-bold'
                      : 'border-[#DDE1E5] text-[#5A626A]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onOpenUpload();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 bg-[#0047FF] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <FileUp className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      )}
    </header>
  );
}
