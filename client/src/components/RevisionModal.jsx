import React, { useState, useEffect } from 'react';
import { X, GitCommit } from 'lucide-react';

export default function RevisionModal({ isOpen, onClose, onSubmit, document }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (document && isOpen) {
      setTitle(document.title || '');
      setContent(document.content || '');
      setSummary('');
    }
  }, [document, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!summary.trim()) return;
    onSubmit({
      title,
      content,
      change_summary: summary
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#DDE1E5] flex flex-col max-h-[90vh] shadow-none">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DDE1E5] bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-[#0047FF]" />
            <h3 className="text-base font-heading font-bold text-[#111315]">
              Submit Collaborative Revision (v{(document?.version || 1) + 1})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#5A626A] hover:text-[#111315] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Document Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-sm focus:outline-none focus:border-[#0047FF]"
              required
            />
          </div>

          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Changelog Summary (Audit Record):
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. Corrected boundary condition for source vertex s in recurrence proof"
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-sm focus:outline-none focus:border-[#0047FF]"
              required
            />
          </div>

          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Technical Content (Markdown &amp; Formulas):
            </label>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-3 text-sm font-mono leading-relaxed focus:outline-none focus:border-[#0047FF]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DDE1E5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#DDE1E5] text-[#5A626A] hover:text-[#111315] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!summary.trim()}
              className="px-5 py-2 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] disabled:opacity-50 transition-colors"
            >
              Commit Revision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
