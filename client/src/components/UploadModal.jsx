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

    // CSQP-F-003: 10MB constraint & extension validation (aligned with server multer limits)
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
      fileSize: file.size
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="w-full max-w-lg bg-[#13171F] border border-[#262C36] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262C36] bg-[#0D1015]">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#FF5500]" />
            <h3 className="text-sm font-heading font-bold text-[#E6E9EE]">
              UPLOAD STUDY DOCUMENT (TC-MAT-01)
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8B949E] hover:text-[#E6E9EE] p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-[#181D26] border-b border-[#ef4444] text-[#ef4444] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 font-mono text-xs">
          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              MATERIAL TITLE:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Byzantine Generals Problem and Practical Paxos Proofs"
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
                SUBJECT:
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}: {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
                TOPIC SPECIFICATION:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Distributed Consensus"
                className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              METADATA SUMMARY:
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of mathematical formulation or lecture notes"
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 focus:outline-none focus:border-[#FF5500]"
            />
          </div>

          <div>
            <label className="block text-[#8B949E] uppercase text-[10px] mb-1">
              ATTACHMENT FILE (MAX 10MB : .PDF, .MD, .TXT):
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.md,.txt"
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-2 file:mr-3 file:py-1 file:px-2 file:border-0 file:text-xs file:font-mono file:bg-[#181D26] file:text-[#FF5500] hover:file:bg-[#262C36]"
              required
            />
            {file && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#22c55e]">
                <FileCheck className="w-3.5 h-3.5" />
                <span>
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262C36]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!file}
              className="px-4 py-1.5 bg-[#FF5500] text-[#0D1015] font-bold hover:bg-[#E04B00] disabled:opacity-50"
            >
              INGEST DOCUMENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
