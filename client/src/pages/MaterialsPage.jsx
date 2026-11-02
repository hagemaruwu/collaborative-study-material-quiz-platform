import React, { useRef, useEffect } from 'react';
import { Search, Folder, Filter, Star, User, Clock, GitBranch, ArrowRight, FileText } from 'lucide-react';

export default function MaterialsPage({
  subjects,
  documents,
  onSelectDocument,
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSelectSubject,
  selectedTag,
  onSelectTag,
  onOpenUpload,
  onOpenRevision
}) {
  const searchInputRef = useRef(null);

  // Focus search with '/' shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const tags = ['ALL', 'EXAM SPEC', 'VERIFIED', 'LAB SPEC'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#0047FF] font-semibold mb-1">
            MODULE 01 : STUDY REPOSITORY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
            Curriculum Study Notes &amp; Specifications
          </h1>
          <p className="text-sm text-[#5A626A] mt-1 max-w-2xl">
            Browse peer-reviewed lecture notes, algorithmic proofs, and architecture blueprints. Every document supports multi-contributor version control and rollbacks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 bg-[#0047FF] text-[#FFFFFF] text-xs font-semibold hover:bg-[#0039CC] transition-colors"
          >
            + Upload Document
          </button>
        </div>
      </div>

      {/* Search & Subject Tabs Toolbar */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#5A626A]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by keywords, algorithms (Bellman-Ford, Raft), or author name... (Press '/' to focus)"
            className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] pl-10 pr-12 py-2 text-sm font-sans placeholder-[#8E959E] focus:outline-none focus:border-[#0047FF]"
          />
          <kbd className="absolute right-3 px-1.5 py-0.5 text-[10px] font-mono bg-[#FFFFFF] border border-[#DDE1E5] text-[#5A626A]">
            /
          </kbd>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Course Subject Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-sans">
            <button
              onClick={() => onSelectSubject('ALL')}
              className={`px-3 py-1.5 border transition-colors ${
                selectedSubject === 'ALL'
                  ? 'border-[#0047FF] bg-[#0047FF] text-[#FFFFFF] font-semibold'
                  : 'border-[#DDE1E5] bg-[#FFFFFF] text-[#5A626A] hover:border-[#111315] hover:text-[#111315]'
              }`}
            >
              All Courses ({documents.length})
            </button>
            {subjects.map((subj) => {
              const isSelected = selectedSubject === subj.id;
              const count = documents.filter((d) => d.subjectId === subj.id).length;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSelectSubject(subj.id)}
                  className={`px-3 py-1.5 border transition-colors ${
                    isSelected
                      ? 'border-[#0047FF] bg-[#0047FF] text-[#FFFFFF] font-semibold'
                      : 'border-[#DDE1E5] bg-[#FFFFFF] text-[#5A626A] hover:border-[#111315] hover:text-[#111315]'
                  }`}
                >
                  <span className="font-semibold">{subj.id}</span>
                  <span className="ml-1 opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Verification Status Filter */}
          <div className="flex items-center gap-1.5 text-xs font-sans">
            <span className="text-[#5A626A] text-[11px] uppercase font-medium">Filter:</span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={`px-2 py-1 text-xs border transition-colors ${
                  selectedTag === tag
                    ? 'border-[#0047FF] bg-[#F8F9FA] text-[#0047FF] font-semibold'
                    : 'border-[#DDE1E5] text-[#5A626A] hover:border-[#111315]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#5A626A] font-mono px-1">
          <span>SHOWING {documents.length} STUDY MODULES</span>
          <span>100% VERIFIED BY COURSE INSTRUCTORS</span>
        </div>

        {documents.length === 0 ? (
          <div className="border border-dashed border-[#DDE1E5] bg-[#FFFFFF] p-12 text-center space-y-2">
            <p className="text-base font-heading font-semibold text-[#111315]">
              No study materials match your search or filter.
            </p>
            <p className="text-xs text-[#5A626A]">
              Try clearing your search query or selecting "All Courses".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 hover:border-[#0047FF] transition-colors flex flex-col justify-between space-y-4 group"
              >
                {/* Card Top Strip */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5] text-[#0047FF] font-mono font-bold">
                      {doc.subjectId}
                    </span>
                    <span className="text-[#5A626A] font-mono text-[11px]">
                      v{doc.version} ({doc.history?.length || 1} edits)
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectDocument(doc.id)}
                    className="text-base sm:text-lg font-bold font-heading text-[#111315] group-hover:text-[#0047FF] cursor-pointer transition-colors leading-snug"
                  >
                    {doc.title}
                  </h3>

                  <div className="text-xs text-[#0047FF] font-medium font-mono">
                    Topic: {doc.topic}
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                {/* Card Footer Metadata & Action */}
                <div className="pt-4 border-t border-[#DDE1E5] space-y-3 font-sans text-xs">
                  <div className="flex items-center justify-between text-[#5A626A]">
                    <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                      <User className="w-3.5 h-3.5 text-[#0047FF]" />
                      <span className="truncate">{doc.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#111315] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#0047FF] text-[#0047FF]" />
                      <span>{doc.rating}</span>
                      <span className="text-[#5A626A] font-normal text-[11px]">({doc.ratingCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onSelectDocument(doc.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0047FF] hover:underline"
                    >
                      <span>Read Study Note</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => onOpenRevision(doc)}
                      className="px-2.5 py-1 border border-[#DDE1E5] text-[11px] text-[#5A626A] hover:text-[#111315] hover:border-[#0047FF] transition-colors"
                    >
                      + Revise
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
