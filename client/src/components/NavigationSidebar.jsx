import React, { useRef, useEffect } from 'react';
import { Search, Folder, FileText, Filter, Tag, CheckCircle2 } from 'lucide-react';

export default function NavigationSidebar({
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

  // Keyboard shortcut listener: pressing '/' focuses search bar
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
    <aside className="w-full md:w-80 flex-shrink-0 bg-[#13171F] border-r border-[#262C36] flex flex-col h-full select-none">
      {/* Search Bar with Keyboard Quick Key */}
      <div className="p-3 border-b border-[#262C36] bg-[#0D1015]">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[#8B949E]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes, proofs, algorithms..."
            className="w-full bg-[#13171F] border border-[#262C36] text-[#E6E9EE] pl-9 pr-12 py-1.5 text-xs font-mono placeholder-[#485260] focus:outline-none focus:border-[#FF5500]"
          />
          <kbd className="absolute right-2 px-1.5 py-0.5 text-[10px] font-mono bg-[#0D1015] border border-[#262C36] text-[#8B949E]">
            /
          </kbd>
        </div>
      </div>

      {/* Academic Subject Taxonomy Filter */}
      <div className="p-3 border-b border-[#262C36]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-[#8B949E] uppercase tracking-wider flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-[#FF5500]" />
            ACADEMIC TAXONOMY
          </span>
          <span className="text-[10px] font-mono text-[#485260]">{subjects.length} COURSES</span>
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onSelectSubject('ALL')}
            className={`w-full text-left px-2.5 py-1 text-xs font-mono transition-colors flex items-center justify-between ${
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
                className={`w-full text-left px-2.5 py-1 text-xs font-mono transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#FF5500] text-[#0D1015] font-bold'
                    : 'text-[#8B949E] hover:text-[#E6E9EE] hover:bg-[#181D26]'
                }`}
              >
                <div className="truncate">
                  <span className="font-semibold">{subj.id}</span>
                  <span className="ml-1.5 opacity-80">{subj.name}</span>
                </div>
                <span className="text-[10px] opacity-75">{docCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status / Type Filters */}
      <div className="p-3 border-b border-[#262C36] bg-[#0D1015]">
        <div className="flex items-center gap-1 mb-2">
          <Filter className="w-3 h-3 text-[#FF5500]" />
          <span className="text-[10px] font-mono text-[#8B949E] uppercase">FILTER BY VERIFICATION:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-2 py-0.5 text-[10px] font-mono border transition-colors ${
                selectedTag === tag
                  ? 'border-[#FF5500] bg-[#181D26] text-[#FF5500] font-bold'
                  : 'border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] hover:border-[#3D4654]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Document Directory Ledger List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {documents.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-[#8B949E] border border-dashed border-[#262C36]">
              NO MATCHING STUDY MATERIAL FOUND
            </div>
          ) : (
            documents.map((doc) => {
              const isActive = doc.id === activeDocumentId;
              return (
                <div
                  key={doc.id}
                  onClick={() => onSelectDocument(doc.id)}
                  className={`p-2.5 cursor-pointer border transition-colors ${
                    isActive
                      ? 'border-[#FF5500] bg-[#181D26]'
                      : 'border-[#262C36] bg-[#13171F] hover:border-[#3D4654]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#FF5500] font-bold">{doc.subjectId}</span>
                    <span className="text-[#8B949E]">v{doc.version}</span>
                  </div>
                  <h3 className="text-xs font-heading font-medium text-[#E6E9EE] line-clamp-2 mb-1.5">
                    {doc.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8B949E]">
                    <span className="truncate max-w-[120px]">{doc.author}</span>
                    <span className="text-[#485260]">{doc.rating} / 5.0</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Node Stats */}
      <div className="p-2.5 border-t border-[#262C36] bg-[#0D1015] text-[10px] font-mono text-[#485260] flex items-center justify-between">
        <span>STORED REVISIONS: {documents.reduce((acc, d) => acc + (d.history ? d.history.length : 1), 0)}</span>
        <span className="text-[#FF5500]">VERIFIED</span>
      </div>
    </aside>
  );
}
