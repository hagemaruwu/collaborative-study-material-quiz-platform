import React, { useEffect } from 'react';
import { X, BookOpen, ShieldCheck } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="w-full max-w-2xl bg-[#13171F] border border-[#262C36] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262C36] bg-[#0D1015]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#FF5500]" />
            <h3 className="text-sm font-heading font-bold text-[#E6E9EE]">
              ACADEMIC INTEGRITY & SOFTWARE ENGINEERING TERMS
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8B949E] hover:text-[#E6E9EE] p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto font-mono text-xs text-[#E6E9EE] leading-relaxed">
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-[11px] text-[#8B949E]">
            <span className="text-[#FF5500] font-bold block mb-1">PROJECT SCOPE & IDENTIFICATION:</span>
            Course: Software Engineering Mini-Project Part-2 (CS-312)<br />
            Institution: PES University, Bangalore<br />
            Engineering Team: Team 16 (Aditya Raj, Amrit Raj Anmol, A Sheiman Joshi, Ahan Charan)
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              1. Academic Authenticity and Attribution
            </h4>
            <p className="text-[#8B949E]">
              All study notes, algorithmic recurrences, and architectural specifications hosted on the CSQP platform are accredited educational works. Authorship metadata (Contributor Name, Student Registration Number, Timestamp, and Cryptographic SHA Hash) is permanently bound to every committed version.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              2. Peer Collaboration & Rollback Accountability
            </h4>
            <p className="text-[#8B949E]">
              Collaborative edits are permitted only under authenticated Contributor or Administrator roles. Every revision creates an immutable entry in the version history ledger. Rollback operations (CSQP-F-013) do not delete historical data; rather, they append a new head commit that restores the prior verified state.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              3. Assessment Evaluation Governance
            </h4>
            <p className="text-[#8B949E]">
              Timed quiz assessments are evaluated exclusively server-side (CSQP-SR-006) to prevent client-side answer tampering. Scores, elapsed durations, and ranking positions are automatically recorded in the central dynamic leaderboard without manual intervention.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              4. Codebase Integrity
            </h4>
            <p className="text-[#8B949E]">
              In accordance with strict version control hygiene, all changes are tracked via semantic commit messages and branch protection rules.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262C36] bg-[#0D1015] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FF5500] text-[#0D1015] font-mono text-xs font-bold hover:bg-[#E04B00]"
          >
            ACKNOWLEDGE SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}
