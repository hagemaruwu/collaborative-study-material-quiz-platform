import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, FileCheck } from 'lucide-react';

export default function UploadModal({ isOpen, onClose, onUpload, subjects }) {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'CS-304');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // CSQP-F-003: 10MB constraint & extension validation
    const maxSizeBytes = 10 * 1024 * 1024;
    const allowedExtensions = ['.pdf', '.md', '.txt'];
    const ext = selected.name.substring(selected.name.lastIndexOf('.')).toLowerCase();

    if (selected.size > maxSizeBytes) {
      setError('File exceeds 10MB limit (CSQP server constraint)');
      setFile(null);
      return;
    }

    if (!allowedExtensions.includes(ext)) {
      setError(`Invalid format (${ext}). Allowed: ${allowedExtensions.join(', ')}`);
      setFile(null);
      return;
    }

    setError('');
    setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !subjectId || !file) {
      setError('All metadata fields and a valid file are required');
      return;
    }

    onUpload({
      title: title.trim(),
      subjectId,
      topic: topic.trim() || 'General Curriculum',
      summary: summary.trim() || 'Uploaded study document',
      fileName: file.name,
      fileSize: file.size,
      file: file
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#DDE1E5] flex flex-col shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DDE1E5] bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#0047FF]" />
            <h3 className="text-base font-heading font-bold text-[#111315]">
              Upload Study Document
            </h3>
          </div>
          <button onClick={onClose} className="text-[#5A626A] hover:text-[#111315] p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-[#FFF1F2] border-b border-[#F43F5E] text-[#BE123C] text-xs font-sans flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E11D48]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Material Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Byzantine Generals Problem and Practical Paxos Proofs"
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-sm focus:outline-none focus:border-[#0047FF]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
                Course Subject:
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-xs focus:outline-none focus:border-[#0047FF]"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}: {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
                Topic Specification:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Distributed Consensus"
                className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-xs focus:outline-none focus:border-[#0047FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Metadata Summary:
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of mathematical formulation or lecture notes"
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2.5 text-xs focus:outline-none focus:border-[#0047FF]"
            />
          </div>

          <div>
            <label className="block text-[#5A626A] uppercase text-[11px] font-semibold mb-1 font-mono">
              Attachment File (Max 10MB : .PDF, .MD, .TXT):
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.md,.txt"
              className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-2 text-xs file:mr-3 file:py-1 file:px-2.5 file:border-0 file:text-xs file:font-sans file:bg-[#0047FF] file:text-white file:font-semibold hover:file:bg-[#0039CC]"
              required
            />
            {file && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#0047FF] font-medium font-mono">
                <FileCheck className="w-4 h-4" />
                <span>
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
            )}
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
              disabled={!file}
              className="px-5 py-2 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] disabled:opacity-50 transition-colors"
            >
              Ingest Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
