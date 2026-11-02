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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="w-full max-w-2xl bg-[#13171F] border border-[#262C36] flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262C36] bg-[#0D1015]">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-[#FF5500]" />
            <h3 className="text-sm font-heading font-bold text-[#E6E9EE]">
              COMMIT COLLABORATIVE REVISION (v{(document?.version || 1) + 1})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B949E] hover:text-[#E6E9EE] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              DOCUMENT TITLE:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
              required
            />
          </div>

          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              CHANGE LOG SUMMARY (MANDATORY AUDIT RECORD):
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. Corrected boundary condition for source vertex s in recurrence proof"
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
              required
            />
          </div>

          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              TECHNICAL CONTENT (MARKDOWN & LATEX FORMULAS):
            </label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-3 leading-relaxed focus:outline-none focus:border-[#FF5500]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#262C36]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!summary.trim()}
              className="px-4 py-2 bg-[#FF5500] text-[#0D1015] font-bold hover:bg-[#E04B00] disabled:opacity-50"
            >
              COMMIT REVISION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
