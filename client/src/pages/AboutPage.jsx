import React from 'react';
import { BookOpen, ShieldCheck, Layers, Award, CheckCircle2, GitBranch, Lock, Cpu } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Peer-Reviewed Knowledge Sharing',
      description: 'Open curriculum repository allowing students and faculty to access verified study notes, algorithmic proofs, and system design specifications.'
    },
    {
      icon: GitBranch,
      title: 'Collaborative Version Control',
      description: 'Multi-author revision history with commit-level summaries, visual diffing, and one-click rollback to prior authoritative states.'
    },
    {
      icon: Award,
      title: 'Authoritative Timed Quizzes',
      description: 'Self-testing assessments evaluated strictly on the server to prevent answer leakage, supporting multiple-choice, true/false, and exact-term evaluation.'
    },
    {
      icon: ShieldCheck,
      title: 'Tamper-Evident Security Ledger',
      description: 'Cryptographically chained SHA-256 event log recording all state mutations while strictly stripping sensitive credentials.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Platform Mission Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-3">
        <div className="text-xs font-mono text-[#0047FF] font-semibold">
          PLATFORM OVERVIEW &amp; MISSION
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
          Collaborative Study Material &amp; Quiz Platform
        </h1>
        <p className="text-sm text-[#5A626A] max-w-3xl leading-relaxed">
          CSQP is an open-access academic workspace designed for decentralized study resource sharing, multi-contributor peer review, and tamper-resistant assessment evaluation. The platform bridges the gap between individual study habits and collective academic excellence.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="space-y-4">
        <div className="border-b border-[#DDE1E5] pb-2">
          <h2 className="text-xl font-bold font-heading text-[#111315]">
            Core Platform Pillars
          </h2>
          <p className="text-xs text-[#5A626A]">
            The architectural foundations that ensure reliability, transparency, and academic integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 space-y-3">
                <div className="w-9 h-9 bg-[#F8F9FA] border border-[#DDE1E5] flex items-center justify-center text-[#0047FF]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#111315]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-Layered Architecture Specifications */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#0047FF]">
          <Layers className="w-5 h-5" />
          <h2 className="text-lg font-bold font-heading text-[#111315]">
            System Architecture &amp; Layered Isolation
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed">
          The platform adheres to a strict 3-layered software architecture. Separation of concerns prevents architectural drift and guarantees sub-millisecond query performance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#0047FF] block">LAYER 01 : PRESENTATION</span>
            <h4 className="text-sm font-bold text-[#111315]">Client Workspace</h4>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              Responsive React workstation adhering to Swiss Grid typography, client-side route caching, and zero visual bloat.
            </p>
          </div>

          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#0047FF] block">LAYER 02 : BUSINESS LOGIC</span>
            <h4 className="text-sm font-bold text-[#111315]">Service Core</h4>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              Express engine managing role-based access control (RBAC), Fisher-Yates question randomization, and audit hashes.
            </p>
          </div>

          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#0047FF] block">LAYER 03 : PERSISTENCE</span>
            <h4 className="text-sm font-bold text-[#111315]">Data Store</h4>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              ACID-compliant SQLite database with Write-Ahead Logging (WAL) and path-traversal validated local document storage.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Integrity & Governance Policies */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold font-heading text-[#111315]">
          Academic Integrity &amp; Operational Policies
        </h2>

        <div className="space-y-3 font-sans text-xs text-[#5A626A]">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0047FF] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111315]">Anti-Tamper Evaluation: </strong>
              Quiz questions retrieved by students never include answer keys. Evaluation occurs exclusively on the backend service.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0047FF] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111315]">One Rating Per Contributor: </strong>
              Users can rate documents from 1 to 5 stars. Repeat submissions update existing scores rather than inflating ratings.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0047FF] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111315]">Cryptographic Non-Repudiation: </strong>
              All document revisions, ratings, comments, and quiz submissions are logged into an append-only SHA-256 chain.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
