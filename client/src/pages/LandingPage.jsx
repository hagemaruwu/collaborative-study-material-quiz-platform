import React from 'react';
import { 
  BookOpen, 
  Award, 
  Trophy, 
  ShieldCheck, 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function LandingPage({
  onNavigate,
  subjects,
  documentsCount,
  quizzesCount
}) {
  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Introduction Section */}
      <section className="border border-[#DDE1E5] bg-[#FFFFFF] p-8 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F8F9FA] border border-[#DDE1E5] text-xs font-mono text-[#5A626A]">
            <span className="w-2 h-2 bg-[#0047FF]"></span>
            <span>PES UNIVERSITY | DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#111315] tracking-tight leading-tight">
            Collaborative Study Material &amp; Quiz Platform
          </h1>

          <p className="text-base sm:text-lg text-[#5A626A] font-sans leading-relaxed">
            An open academic portal designed for decentralized lecture note sharing, multi-contributor version control, and timed curriculum assessments. Built by Team 16 for Software Engineering Part-2.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-sans text-sm">
            <button
              onClick={() => onNavigate('materials')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0047FF] text-[#FFFFFF] font-semibold hover:bg-[#0039CC] transition-colors"
            >
              <span>Explore Study Notes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('quizzes')}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#DDE1E5] bg-[#FFFFFF] text-[#111315] font-semibold hover:border-[#0047FF] hover:text-[#0047FF] transition-colors"
            >
              <Award className="w-4 h-4 text-[#0047FF]" />
              <span>Take a Timed Quiz</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="flex items-center gap-1.5 px-4 py-2.5 text-[#5A626A] hover:text-[#111315] font-medium transition-colors"
            >
              <span>About Team 16 &amp; Policies</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Destination Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE1E5] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111315]">
              Platform Modules
            </h2>
            <p className="text-xs sm:text-sm text-[#5A626A]">
              Select a section to browse resources, evaluate knowledge, or inspect system integrity.
            </p>
          </div>
          <span className="text-xs font-mono text-[#5A626A]">SWISS GRID SPECIFICATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Study Notes */}
          <div 
            onClick={() => onNavigate('materials')}
            className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 hover:border-[#0047FF] cursor-pointer transition-colors space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#F8F9FA] border border-[#DDE1E5] flex items-center justify-center text-[#0047FF] group-hover:bg-[#0047FF] group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#5A626A]">MODULE 01</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#111315] group-hover:text-[#0047FF] transition-colors">
              Curriculum Study Repository
            </h3>
            <p className="text-sm text-[#5A626A] leading-relaxed">
              Access verified lecture modules, formal algorithmic recurrences (Bellman-Ford), and distributed systems blueprints with full-text search and peer accuracy ratings.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#0047FF] pt-2">
              <span>Browse {documentsCount} Verified Modules</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Collaborative Versions */}
          <div 
            onClick={() => onNavigate('materials')}
            className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 hover:border-[#0047FF] cursor-pointer transition-colors space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#F8F9FA] border border-[#DDE1E5] flex items-center justify-center text-[#0047FF] group-hover:bg-[#0047FF] group-hover:text-white transition-colors">
                <GitBranch className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#5A626A]">MODULE 02</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#111315] group-hover:text-[#0047FF] transition-colors">
              Collaborative Versioning &amp; Rollback
            </h3>
            <p className="text-sm text-[#5A626A] leading-relaxed">
              Inspect multi-author revision snapshots (v3, v2, v1) with commit SHA hashes and changelog diffs. Restore previous authoritative revisions with one click.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#0047FF] pt-2">
              <span>Inspect Version History (CSQP-F-013)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Timed Assessments */}
          <div 
            onClick={() => onNavigate('quizzes')}
            className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 hover:border-[#0047FF] cursor-pointer transition-colors space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#F8F9FA] border border-[#DDE1E5] flex items-center justify-center text-[#0047FF] group-hover:bg-[#0047FF] group-hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#5A626A]">MODULE 03</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#111315] group-hover:text-[#0047FF] transition-colors">
              Timed Curriculum Assessments
            </h3>
            <p className="text-sm text-[#5A626A] leading-relaxed">
              Test your exam readiness with randomized multiple-choice, True/False, and fill-in-the-blank questions evaluated strictly server-side with instant feedback.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#0047FF] pt-2">
              <span>Take {quizzesCount} Course Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Leaderboard & Security Audit */}
          <div 
            onClick={() => onNavigate('leaderboard')}
            className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 hover:border-[#0047FF] cursor-pointer transition-colors space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#F8F9FA] border border-[#DDE1E5] flex items-center justify-center text-[#0047FF] group-hover:bg-[#0047FF] group-hover:text-white transition-colors">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#5A626A]">MODULE 04</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#111315] group-hover:text-[#0047FF] transition-colors">
              Institutional Leaderboard &amp; Audit Trail
            </h3>
            <p className="text-sm text-[#5A626A] leading-relaxed">
              Track top student scores and completion times across subjects. Audit all platform activity through cryptographically chained, tamper-proof security records.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#0047FF] pt-2">
              <span>View Leaderboard &amp; Security Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Courses Strip */}
      <section className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE1E5] pb-3">
          <h2 className="text-lg font-bold font-heading text-[#111315]">
            Curriculum Courses Covered
          </h2>
          <span className="text-xs text-[#5A626A] font-mono">SE PART-2 SPECIFICATION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((s) => (
            <div 
              key={s.id} 
              onClick={() => onNavigate('materials')}
              className="p-4 border border-[#DDE1E5] bg-[#F8F9FA] hover:border-[#0047FF] cursor-pointer transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#0047FF] mb-1">{s.id}</div>
              <div className="font-heading font-semibold text-sm text-[#111315] mb-2">{s.name}</div>
              <div className="text-xs text-[#5A626A] space-y-0.5">
                {s.topics?.map((t, idx) => (
                  <div key={idx} className="truncate">• {t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#0047FF] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Strict 3-Layered Architecture</span>
          </div>
          <p className="text-[#5A626A] leading-relaxed">
            Presentation, Service, and DAO layers decoupled through explicit interfaces (I1, I2) preventing architectural erosion.
          </p>
        </div>

        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#0047FF] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Anti-Tamper Quiz Evaluation</span>
          </div>
          <p className="text-[#5A626A] leading-relaxed">
            Answer keys remain strictly on the server (CSQP-SR-006). Client requests receive questions stripped of answers.
          </p>
        </div>

        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#0047FF] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Cryptographic Audit Logging</span>
          </div>
          <p className="text-[#5A626A] leading-relaxed">
            Every critical state mutation is hashed into a SHA-256 sequential audit chain with zero plaintext credentials (CSQP-SR-001).
          </p>
        </div>
      </section>
    </div>
  );
}
