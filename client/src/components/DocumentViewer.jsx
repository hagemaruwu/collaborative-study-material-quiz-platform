import React, { useState } from 'react';
import { Download, Star, MessageSquare, Send, CheckCircle2, User, Clock, ShieldCheck, Share2 } from 'lucide-react';

export default function DocumentViewer({
  document,
  onRate,
  userRating,
  hasRated,
  comments,
  onAddComment,
  currentUser
}) {
  const [commentText, setCommentText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!document) {
    return (
      <main className="flex-1 bg-[#0D1015] p-8 flex items-center justify-center font-mono text-sm text-[#8B949E]">
        <div className="border border-[#262C36] p-6 text-center max-w-md">
          <p className="text-[#FF5500] font-bold mb-2">NO DOCUMENT SELECTED</p>
          <p className="text-xs text-[#8B949E]">
            Select an accredited study module from the taxonomy hierarchy on the left panel to begin analysis.
          </p>
        </div>
      </main>
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

  return (
    <main className="flex-1 bg-[#0D1015] overflow-y-auto flex flex-col h-full select-text">
      {/* Top Document Metadata Bar */}
      <div className="border-b border-[#262C36] bg-[#13171F] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#FF5500] text-[#0D1015]">
              {document.subjectId}
            </span>
            <span className="text-xs font-mono text-[#8B949E] border border-[#262C36] px-2 py-0.5">
              {document.topic}
            </span>
            <span className="text-xs font-mono text-[#8B949E] border border-[#262C36] px-2 py-0.5">
              REVISION v{document.version}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono border border-[#262C36] bg-[#0D1015] text-[#E6E9EE] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT .MD</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#E6E9EE] tracking-tight leading-snug mb-3">
          {document.title}
        </h2>

        {/* Attribution and Verification Details */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8B949E] border-t border-[#262C36] pt-3">
          <div className="flex items-center gap-1.5 text-[#E6E9EE]">
            <User className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>AUTHOR: {document.author}</span>
            {document.authorSrn && <span className="text-[#8B949E]">({document.authorSrn})</span>}
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#485260]" />
            <span>COMMITTED: {document.updatedAt}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#FF5500]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FACULTY VERIFIED (PESU)</span>
          </div>
        </div>

        {/* Interactive Peer Rating Widget (TC-MAT-07) */}
        <div className="mt-4 pt-3 border-t border-[#262C36] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#8B949E]">PEER ACCURACY RATING:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 focus:outline-none"
                  aria-label={`Rate ${star} stars out of 5`}
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${
                      (hoverRating || userRating || Math.round(document.rating)) >= star
                        ? 'fill-[#FF5500] text-[#FF5500]'
                        : 'text-[#485260]'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[#E6E9EE] font-bold">
              {document.rating} / 5.0
            </span>
            <span className="text-[#8B949E]">({document.ratingCount} submissions)</span>
          </div>

          {hasRated && (
            <span className="text-[#FF5500] text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>YOUR VOTE RECORDED (DUPLICATE PROTECTED)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Document Content Canvas */}
      <div className="flex-1 flex justify-center">
        <article className="w-full max-w-4xl p-4 sm:p-8 space-y-6 text-[#E6E9EE] leading-relaxed">
          {/* Abstract / Summary Callout Block */}
          <div className="border border-[#262C36] bg-[#13171F] p-4 font-mono text-xs text-[#8B949E]">
            <span className="text-[#FF5500] font-bold block mb-1">EXECUTIVE SUMMARY:</span>
            {document.summary}
          </div>

        {/* Render Content Blocks */}
        <div className="space-y-4 font-mono text-xs sm:text-sm">
          {document.content.split('\n\n').map((block, idx) => {
            // Heading 2
            if (block.startsWith('## ')) {
              return (
                <h3
                  key={idx}
                  className="text-base sm:text-lg font-heading font-bold text-[#E6E9EE] border-b border-[#262C36] pb-1 pt-4 text-[#FF5500]"
                >
                  {block.replace('## ', '')}
                </h3>
              );
            }
            // Heading 3
            if (block.startsWith('### ')) {
              return (
                <h4 key={idx} className="text-sm font-heading font-bold text-[#E6E9EE] pt-2">
                  {block.replace('### ', '')}
                </h4>
              );
            }
            // Code Block
            if (block.startsWith('```')) {
              const lines = block.split('\n');
              const codeLines = lines.slice(1, -1).join('\n');
              return (
                <div key={idx} className="border border-[#262C36] bg-[#13171F] overflow-x-auto my-3">
                  <div className="px-3 py-1 bg-[#181D26] border-b border-[#262C36] text-[10px] text-[#8B949E] font-mono flex items-center justify-between">
                    <span>SOURCE KERNEL: VERIFIED ALGORITHMIC SPEC</span>
                    <span>READ-ONLY</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-[#E6E9EE] leading-snug whitespace-pre">
                    <code>{codeLines}</code>
                  </pre>
                </div>
              );
            }
            // Bullet points
            if (block.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-1 pl-4 border-l border-[#262C36] list-disc list-inside text-xs text-[#E6E9EE]">
                  {block.split('\n').map((line, lIdx) => (
                    <li key={lIdx} className="leading-normal">
                      {line.replace(/^- /, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            // Standard Paragraph
            return (
              <p key={idx} className="text-xs sm:text-sm text-[#E6E9EE] leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>
      </article>
      </div>

      {/* Peer Review & Collaborative Discussion Section (TC-MAT-08) */}
      <section className="border-t border-[#262C36] bg-[#13171F] p-4 sm:p-6 mt-auto">
        <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF5500]" />
            <h3 className="text-sm font-heading font-bold text-[#E6E9EE]">
              COLLABORATIVE TECHNICAL DISCUSSION
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8B949E]">
            {comments.length} PEER ANNOTATIONS
          </span>
        </div>

        {/* Existing Comments Ledger */}
        <div className="space-y-3 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono">
              <div className="flex items-center justify-between text-[#8B949E] mb-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5500] font-bold">{c.author}</span>
                  <span className="text-[#485260] border border-[#262C36] px-1">{c.role}</span>
                </div>
                <span>{c.timestamp}</span>
              </div>
              <p className="text-[#E6E9EE] leading-normal">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-2">
          <div className="relative">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Contribute peer observation, boundary condition check, or architectural proof..."
              rows={3}
              className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-3 text-xs font-mono placeholder-[#485260] focus:outline-none focus:border-[#FF5500]"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#485260]">
              AUTHENTICATED AS: {currentUser.username} ({currentUser.role})
            </span>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF5500] text-[#0D1015] font-mono text-xs font-bold hover:bg-[#E04B00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>POST ANNOTATION</span>
            </button>
          </div>
        </form>
        </div>
      </section>
    </main>
  );
}
