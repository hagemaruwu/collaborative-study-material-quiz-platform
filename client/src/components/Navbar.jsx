import React, { useState } from 'react';
import { BookOpen, Award, Trophy, Shield, Info, FileUp, Menu, X, Check, User, Lock, LogOut } from 'lucide-react';

export default function Navbar({
  activePage,
  onNavigate,
  onOpenUpload,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'materials', label: 'Study Notes' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'audit', label: 'Audit Trail' },
    { id: 'about', label: 'About' },
  ];

  const roleLabel = currentUser?.role === 'Administrator' 
    ? 'Admin' 
    : (currentUser?.role === 'Content Contributor / Quiz Creator' ? 'Contributor' : 'Student');

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
                OPEN ACADEMY
              </span>
            </div>
            <p className="text-[11px] font-sans text-[#5A626A] mt-0.5">
              Collaborative Knowledge Hub
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

        {/* Right Action & Authenticated Controls */}
        <div className="hidden lg:flex items-center gap-3 font-sans text-xs">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#DDE1E5] bg-[#FFFFFF] hover:border-[#0047FF] transition-colors group"
                title="View Assessment History and Profile"
              >
                <div className="w-5 h-5 bg-[#0047FF] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                  {currentUser.username.substring(0, 1).toUpperCase()}
                </div>
                <span className="font-semibold text-[#111315] group-hover:text-[#0047FF]">
                  {currentUser.username}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5] text-[#5A626A] uppercase font-bold">
                  {roleLabel}
                </span>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 border border-[#DDE1E5] text-[#5A626A] hover:text-[#D0021B] hover:border-[#D0021B] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DDE1E5] bg-[#FFFFFF] text-[#111315] font-semibold text-xs hover:border-[#0047FF] hover:text-[#0047FF] transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#0047FF]" />
              <span>Sign In / Register</span>
            </button>
          )}

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

          {/* Mobile Auth Button */}
          <div className="pt-2 border-t border-[#DDE1E5]">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 font-semibold text-xs text-[#111315]"
                >
                  <User className="w-4 h-4 text-[#0047FF]" />
                  <span>{currentUser.username} ({roleLabel})</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-[#D0021B] font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 border border-[#0047FF] text-[#0047FF] text-xs font-semibold text-center"
              >
                Sign In / Register
              </button>
            )}
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
