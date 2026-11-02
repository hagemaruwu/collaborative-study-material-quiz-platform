import React, { useState, useEffect } from 'react';
import { X, User, Trophy, Award, Clock, LogOut, CheckCircle2, RotateCw } from 'lucide-react';

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenAuth,
  onNavigate
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fetchUserHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quizzes/my-history', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (_) {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchUserHistory();
    }
  }, [isOpen, currentUser]);

  if (!isOpen || !currentUser) return null;

  const totalAttempts = history.length;
  const avgPercentage = totalAttempts > 0 
    ? (history.reduce((acc, h) => acc + h.percentage, 0) / totalAttempts).toFixed(1)
    : 0;
  const bestPercentage = totalAttempts > 0
    ? Math.max(...history.map(h => h.percentage))
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#DDE1E5] flex flex-col shadow-none max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DDE1E5] bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0047FF] text-white flex items-center justify-center font-bold text-sm font-mono">
              {currentUser.username.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-heading font-bold text-[#111315]">
                  {currentUser.username}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFFFFF] border border-[#DDE1E5] text-[#0047FF] font-semibold">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-[#5A626A] mt-0.5">
                Authenticated User Profile &amp; Evaluation Record
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#5A626A] hover:text-[#111315] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 border-b border-[#DDE1E5] bg-[#FFFFFF] font-sans text-xs">
          <div className="p-4 border-r border-[#DDE1E5]">
            <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Completed Quizzes:</span>
            <span className="text-lg font-bold text-[#111315] font-heading">{totalAttempts}</span>
          </div>
          <div className="p-4 border-r border-[#DDE1E5]">
            <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Average Score:</span>
            <span className="text-lg font-bold text-[#0047FF] font-heading">{avgPercentage}%</span>
          </div>
          <div className="p-4">
            <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Top Score:</span>
            <span className="text-lg font-bold text-[#111315] font-heading">{bestPercentage}%</span>
          </div>
        </div>

        {/* Assessment History Table */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#111315] uppercase">
              Assessment Attempt History
            </span>
            <button
              onClick={fetchUserHistory}
              className="text-xs text-[#5A626A] hover:text-[#0047FF] flex items-center gap-1 font-mono"
            >
              <RotateCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {totalAttempts === 0 ? (
            <div className="text-center py-8 border border-dashed border-[#DDE1E5] p-6 space-y-3">
              <Award className="w-8 h-8 text-[#5A626A] mx-auto opacity-50" />
              <p className="text-xs text-[#5A626A]">No quiz attempts recorded for this account yet.</p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('quizzes');
                }}
                className="px-3 py-1.5 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] transition-colors"
              >
                Take an Assessment
              </button>
            </div>
          ) : (
            <div className="border border-[#DDE1E5] overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-[#DDE1E5] bg-[#F8F9FA] text-[11px] font-mono text-[#5A626A] uppercase">
                    <th className="py-2.5 px-3">Assessment</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE1E5]">
                  {history.map((h) => (
                    <tr key={h.id} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#111315]">
                        {h.quiz_title}
                      </td>
                      <td className="py-2.5 px-3 text-[#5A626A]">
                        {h.subject_name}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#5A626A]">
                        {h.score} / {h.max_score}
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono text-[#0047FF]">
                        {h.percentage}%
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#5A626A]">
                        {h.time_taken_seconds}s
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#8E959E] text-[11px]">
                        {h.submitted_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DDE1E5] bg-[#F8F9FA] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="text-xs font-semibold text-[#0047FF] hover:underline"
          >
            Switch to Another Account
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#DDE1E5] bg-[#FFFFFF] text-xs font-semibold text-[#5A626A] hover:text-[#111315] transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D0021B] text-white text-xs font-semibold hover:bg-[#A80014] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
