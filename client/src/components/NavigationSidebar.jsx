import React, { useRef, useEffect } from 'react';
import { Search, Folder, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function NavigationSidebar({
  isOpen,
  onToggle,
  subjects,
  documents,
  activeDocumentId,
  onSelectDocument,
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSelectSubject,
  selectedTag,
  onSelectTag
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut listener: pressing '/' focuses search bar and opens sidebar if closed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        if (!isOpen) onToggle();
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  const tags = ['ALL', 'EXAM SPEC', 'VERIFIED', 'LAB SPEC'];

  // Collapsed Minimal Rail (48px)
  if (!isOpen) {
    return (
      <aside className="w-12 bg-[#13171F] border-r border-[#262C36] flex flex-col items-center py-2 select-none h-full flex-shrink-0 z-20">
        <button
          onClick={onToggle}
          title="Expand Course Taxonomy (Hotkey: /)"
          className="p-2 border border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:text-[#FF5500] hover:border-[#FF5500] transition-colors mb-4"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            onToggle();
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }}
          title="Search Study Notes (/)"
          className="p-2 text-[#8B949E] hover:text-[#FF5500] hover:bg-[#181D26] transition-colors mb-3"
        >
          <Search className="w-4 h-4" />
        </button>

        <div className="w-6 border-b border-[#262C36] my-2"></div>

        <div className="flex-1 space-y-2 overflow-y-auto w-full px-1 flex flex-col items-center">
          {subjects.map((s) => {
            const isSelected = selectedSubject === s.id;
            const codeNum = s.id.replace('CS-', '');
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSubject(s.id);
                  onToggle();
                }}
                title={`${s.id}: ${s.name}`}
                className={`w-9 h-9 flex items-center justify-center text-[10px] font-mono border transition-colors ${
                  isSelected
                    ? 'border-[#FF5500] bg-[#FF5500] text-[#0D1015] font-bold'
                    : 'border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:border-[#3D4654] hover:text-[#E6E9EE]'
                }`}
              >
                {codeNum}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#262C36] w-full flex justify-center">
          <BookOpen className="w-4 h-4 text-[#485260]" />
        </div>
      </aside>
    );
  }

  // Expanded Sidebar (280px)
  return (
    <aside className="w-72 sm:w-80 flex-shrink-0 bg-[#13171F] border-r border-[#262C36] flex flex-col h-full select-none z-20">
      {/* Header with Search and Collapse Toggle */}
      <div className="p-2.5 border-b border-[#262C36] bg-[#0D1015] flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-[#8B949E]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes, proofs..."
            className="w-full bg-[#13171F] border border-[#262C36] text-[#E6E9EE] pl-8 pr-8 py-1 text-xs font-mono placeholder-[#485260] focus:outline-none focus:border-[#FF5500]"
          />
          <kbd className="absolute right-2 px-1 py-0.2 text-[9px] font-mono bg-[#0D1015] border border-[#262C36] text-[#8B949E]">
            /
          </kbd>
        </div>
        <button
          onClick={onToggle}
          title="Collapse Sidebar"
          className="p-1 border border-[#262C36] text-[#8B949E] hover:text-[#FF5500] hover:border-[#FF5500] bg-[#13171F]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Course Taxonomy */}
      <div className="p-2.5 border-b border-[#262C36]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider flex items-center gap-1">
            <Folder className="w-3 h-3 text-[#FF5500]" />
            COURSES
          </span>
          <span className="text-[10px] font-mono text-[#485260]">{subjects.length} ENROLLED</span>
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onSelectSubject('ALL')}
            className={`w-full text-left px-2 py-0.5 text-xs font-mono transition-colors flex items-center justify-between ${
              selectedSubject === 'ALL'
                ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                : 'text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26]'
            }`}
          >
            <span>[ALL SUBJECTS]</span>
            <span className="text-[10px]">{documents.length}</span>
          </button>
          {subjects.map((subj) => {
            const isSelected = selectedSubject === subj.id;
            const docCount = documents.filter((d) => d.subjectId === subj.id).length;
            return (
              <button
                key={subj.id}
                onClick={() => onSelectSubject(subj.id)}
                className={`w-full text-left px-2 py-0.5 text-xs font-mono transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                    : 'text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26]'
                }`}
              >
                <div className="truncate">
                  <span className="font-semibold">{subj.id}</span>
                  <span className="ml-1.5 opacity-80 text-[11px]">{subj.name}</span>
                </div>
                <span className="text-[10px] opacity-75">{docCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Filter Chips */}
      <div className="px-2.5 py-1.5 border-b border-[#262C36] bg-[#0D1015] flex items-center gap-1.5">
        <Filter className="w-3 h-3 text-[#FF5500]" />
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-1.5 py-0.2 text-[9px] font-mono border transition-colors ${
                selectedTag === tag
                  ? 'border-[#FF5500] bg-[#181D26] text-[#FF5500] font-bold'
                  : 'border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Document Directory Ledger List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {documents.length === 0 ? (
          <div className="p-3 text-center text-xs font-mono text-[#8B949E] border border-dashed border-[#262C36]">
            NO MATCHING MATERIAL FOUND
          </div>
        ) : (
          documents.map((doc) => {
            const isActive = doc.id === activeDocumentId;
            return (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc.id)}
                className={`p-2 cursor-pointer border transition-colors ${
                  isActive
                    ? 'border-[#FF5500] bg-[#181D26]'
                    : 'border-[#262C36] bg-[#13171F] hover:border-[#3D4654]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                  <span className="text-[#FF5500] font-bold">{doc.subjectId}</span>
                  <span className="text-[#8B949E]">v{doc.version}</span>
                </div>
                <h3 className="text-xs font-heading font-medium text-[#E6E9EE] line-clamp-1 mb-1">
                  {doc.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8B949E]">
                  <span className="truncate max-w-[110px]">{doc.author}</span>
                  <span className="text-[#485260]">{doc.rating} / 5.0</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2 border-t border-[#262C36] bg-[#0D1015] text-[10px] font-mono text-[#485260] flex items-center justify-between">
        <span>STORED: {documents.length}</span>
        <span className="text-[#FF5500]">VERIFIED</span>
      </div>
    </aside>
  );
}
