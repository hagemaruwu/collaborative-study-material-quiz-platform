import React, { useState, useEffect } from 'react';
import { X, Lock, User, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onRegister
}) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'login') {
        const result = await onLogin(username.trim(), password);
        if (!result.success) {
          setError(result.error || 'Authentication failed');
        } else {
          onClose();
        }
      } else {
        const result = await onRegister(username.trim(), password);
        if (!result.success) {
          setError(result.error || 'Registration failed');
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || 'Network error during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DDE1E5] flex flex-col shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DDE1E5] bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0047FF]" />
            <h3 className="text-base font-heading font-bold text-[#111315]">
              {tab === 'login' ? 'Account Authentication' : 'Create Platform Account'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#5A626A] hover:text-[#111315] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#DDE1E5] bg-[#FFFFFF] font-sans text-xs">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-[#0047FF] text-[#0047FF] font-semibold bg-[#F8F9FA]'
                : 'border-transparent text-[#5A626A] hover:text-[#111315]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
              tab === 'register'
                ? 'border-[#0047FF] text-[#0047FF] font-semibold bg-[#F8F9FA]'
                : 'border-transparent text-[#5A626A] hover:text-[#111315]'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-sm">
          {error && (
            <div className="p-3 bg-[#FFF5F5] border border-[#FFD0D0] text-[#D0021B] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111315] block">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#5A626A] absolute left-3 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter account username"
                className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#0047FF]"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111315] block">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#5A626A] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === 'register' ? 'Minimum 6 characters' : 'Enter password'}
                className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#0047FF]"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fills for Testing */}
          {tab === 'login' && (
            <div className="pt-2 border-t border-[#DDE1E5] space-y-1.5">
              <span className="text-[11px] font-mono text-[#5A626A] uppercase block">
                Quick Demo Credentials:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student_aditya', 'Student@1234')}
                  className="p-1.5 border border-[#DDE1E5] bg-[#F8F9FA] hover:border-[#0047FF] text-[#111315] text-left truncate"
                >
                  <span className="font-bold block text-[10px] text-[#0047FF]">STUDENT</span>
                  student_aditya
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('prof_contributor', 'Contrib@1234')}
                  className="p-1.5 border border-[#DDE1E5] bg-[#F8F9FA] hover:border-[#0047FF] text-[#111315] text-left truncate"
                >
                  <span className="font-bold block text-[10px] text-[#0047FF]">CONTRIB</span>
                  prof_contrib
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin_user', 'Admin@1234')}
                  className="p-1.5 border border-[#DDE1E5] bg-[#F8F9FA] hover:border-[#0047FF] text-[#111315] text-left truncate"
                >
                  <span className="font-bold block text-[10px] text-[#0047FF]">ADMIN</span>
                  admin_user
                </button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#DDE1E5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#DDE1E5] text-xs font-semibold text-[#5A626A] hover:text-[#111315] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : (tab === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
