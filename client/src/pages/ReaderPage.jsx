import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  User, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  History, 
  RotateCcw,
  GitBranch,
  Copy,
  Check
} from 'lucide-react';

export default function ReaderPage({
  document,
  onBack,
  onRate,
  userRating,
  hasRated,
  comments,
  onAddComment,
  currentUser,
  onRollback,
  canRollback,
  onOpenRevision
}) {
  const [commentText, setCommentText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-base text-[#5A626A]">No document selected.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#0047FF] text-white text-xs font-semibold"
        >
          Return to Materials Directory
        </button>
      </div>
    );
  }

  const handleRatingClick = (stars) => {
    onRate(document.id, stars);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(document.id, commentText.trim());
    setCommentText('');
  };

  const handleDownload = () => {
    const element = window.document.createElement('a');
    const file = new Blob([document.content], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${document.subjectId}_${document.topic.replace(/\s+/g, '_')}_v${document.version}.md`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs and Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE1E5] pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-[#5A626A] hover:text-[#0047FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Materials</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenRevision(document)}
            className="flex items-center gap-1 px-3 py-1.5 border border-[#DDE1E5] bg-[#FFFFFF] text-xs font-medium text-[#111315] hover:border-[#0047FF] hover:text-[#0047FF] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#0047FF]" />
            <span>Submit Revision</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Main Document Article Card */}
      <article className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-10 space-y-6">
        {/* Document Header */}
        <div className="space-y-3 border-b border-[#DDE1E5] pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-0.5 bg-[#0047FF] text-white font-bold">
              {document.subjectId}
            </span>
            <span className="px-2 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5] text-[#5A626A]">
              Topic: {document.topic}
            </span>
            <span className="px-2 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5] text-[#5A626A]">
              Revision v{document.version}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315] leading-snug">
            {document.title}
          </h1>

          {/* Attribution Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#5A626A] pt-1">
            <div className="flex items-center gap-1.5 text-[#111315] font-medium">
              <User className="w-4 h-4 text-[#0047FF]" />
              <span>Author: {document.author}</span>
              {document.authorSrn && (
                <span className="text-[#5A626A] font-mono">({document.authorSrn})</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8E959E]" />
              <span>Last Committed: {document.updatedAt}</span>
            </div>

            <div className="flex items-center gap-1 text-[#0047FF] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified PESU Curriculum Module</span>
            </div>
          </div>

          {/* Interactive Peer Rating Widget (TC-MAT-07) */}
          <div className="pt-3 border-t border-[#DDE1E5] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="text-[#5A626A] font-medium">Peer Accuracy Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 focus:outline-none"
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        (hoverRating || userRating || Math.round(document.rating)) >= star
                          ? 'fill-[#0047FF] text-[#0047FF]'
                          : 'text-[#DDE1E5]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="font-bold text-[#111315] text-sm">
                {document.rating} / 5.0
              </span>
              <span className="text-[#5A626A]">({document.ratingCount} submissions)</span>
            </div>

            {hasRated && (
              <span className="text-[#0047FF] text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your vote recorded (Duplicate vote protected)</span>
              </span>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-5 space-y-1">
          <span className="text-xs font-mono font-bold text-[#0047FF] uppercase block">
            Executive Summary:
          </span>
          <p className="text-sm text-[#111315] leading-relaxed">
            {document.summary}
          </p>
        </div>

        {/* Formatted Content Render */}
        <div className="space-y-6 font-sans text-sm sm:text-base text-[#111315] leading-relaxed">
          {document.content.split('\n\n').map((block, idx) => {
            // Heading 2
            if (block.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-bold font-heading text-[#111315] pt-4 border-b border-[#DDE1E5] pb-2 text-[#0047FF]"
                >
                  {block.replace('## ', '')}
                </h2>
              );
            }
            // Heading 3
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-base sm:text-lg font-bold font-heading text-[#111315] pt-2">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            // Code Block
            if (block.startsWith('```')) {
              const lines = block.split('\n');
              const codeLines = lines.slice(1, -1).join('\n');
              return (
                <div key={idx} className="border border-[#DDE1E5] bg-[#F8F9FA] my-4 overflow-hidden">
                  <div className="px-4 py-2 bg-[#FFFFFF] border-b border-[#DDE1E5] text-xs text-[#5A626A] font-mono flex items-center justify-between">
                    <span>VERIFIED ALGORITHMIC KERNEL</span>
                    <button
                      onClick={() => handleCopy(codeLines)}
                      className="flex items-center gap-1 text-[11px] text-[#0047FF] hover:underline"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono text-[#111315] leading-relaxed overflow-x-auto whitespace-pre">
                    <code>{codeLines}</code>
                  </pre>
                </div>
              );
            }
            // Bullets
            if (block.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-1.5 pl-5 border-l-2 border-[#DDE1E5] list-disc list-inside text-sm text-[#111315]">
                  {block.split('\n').map((line, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">
                      {line.replace(/^- /, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            // Standard Paragraph
            return (
              <p key={idx} className="text-sm sm:text-base text-[#111315] leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>
      </article>

      {/* Version Control & Rollback Section (CSQP-F-011, CSQP-F-013) */}
      <section className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE1E5] pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#0047FF]" />
            <h2 className="text-lg font-bold font-heading text-[#111315]">
              Version History &amp; Authoritative Rollbacks (CSQP-F-013)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A626A]">
            {document.history?.length || 1} REVISIONS RECORDED
          </span>
        </div>

        <div className="space-y-3">
          {document.history?.map((h) => {
            const isCurrent = h.version === document.version;
            return (
              <div
                key={h.version}
                className={`p-4 border transition-colors ${
                  isCurrent
                    ? 'border-[#0047FF] bg-[#F8F9FA]'
                    : 'border-[#DDE1E5] bg-[#FFFFFF]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-[#111315]">
                      Revision v{h.version}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-[#0047FF] text-white text-[10px] font-bold font-mono">
                        CURRENT ACTIVE HEAD
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#5A626A]">
                    COMMIT SHA: {h.hash}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5A626A] mb-3">
                  {h.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between text-xs text-[#5A626A] border-t border-[#DDE1E5] pt-2">
                  <span>Contributor: <strong className="text-[#111315]">{h.author}</strong></span>
                  <span>Timestamp: {h.timestamp}</span>
                </div>

                {!isCurrent && canRollback && (
                  <div className="mt-3 pt-2 border-t border-[#DDE1E5] flex justify-end">
                    <button
                      onClick={() => onRollback(document.id, h.version)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DDE1E5] text-xs font-semibold text-[#111315] hover:border-[#0047FF] hover:text-[#0047FF] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rollback to Revision v{h.version}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Peer Discussion Thread (TC-MAT-08) */}
      <section className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE1E5] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0047FF]" />
            <h2 className="text-lg font-bold font-heading text-[#111315]">
              Collaborative Peer Annotations &amp; Discussion
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A626A]">
            {comments.length} ANNOTATIONS
          </span>
        </div>

        {/* Existing Comments */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 text-xs font-sans space-y-1.5">
              <div className="flex items-center justify-between text-[#5A626A] text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111315] text-xs">{c.author}</span>
                  <span className="px-1.5 py-0.2 border border-[#DDE1E5] bg-[#FFFFFF] text-[10px] uppercase font-mono">
                    {c.role}
                  </span>
                </div>
                <span>{c.timestamp}</span>
              </div>
              <p className="text-sm text-[#111315] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a constructive technical annotation, invariant verification, or proof check..."
            rows={3}
            className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-3 text-sm font-sans placeholder-[#8E959E] focus:outline-none focus:border-[#0047FF]"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5A626A]">
              Authenticated as: <strong className="text-[#111315]">{currentUser.username}</strong> ({currentUser.role})
            </span>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0047FF] text-white font-semibold text-xs hover:bg-[#0039CC] disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Annotation</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
