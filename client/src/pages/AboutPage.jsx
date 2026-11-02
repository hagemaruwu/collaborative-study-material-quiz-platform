import React from 'react';
import { User, Shield, BookOpen, Layers, Award, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Aditya Raj',
      srn: 'PES2UG24CS033',
      role: 'Core Engineering Lead',
      responsibilities: 'Study Material Management, In-Platform Notes, Document Ingestion, Collaborative Versioning & Rollback Engines (CSQP-F-003, 004, 011, 013).'
    },
    {
      name: 'Amrit Raj Anmol',
      srn: 'PES2UG24CS056',
      role: 'Security & Backend Architect',
      responsibilities: 'Authentication, Session Token Invalidation, Role-Based Access Control (RBAC), Admin Moderation & SHA-256 Cryptographic Audit Logs (CSQP-F-001, 002, 020, 022).'
    },
    {
      name: 'A Sheiman Joshi',
      srn: 'PES2UG24CS003',
      role: 'Quiz Engine & QA Lead',
      responsibilities: 'Quiz Question Modeling, Server-Side Automated Evaluation Engine, Anti-Tamper Scoring Logic, and Automated Test Plan Execution (CSQP-F-014, 016, CSQP-SR-006).'
    },
    {
      name: 'Ahan Charan',
      srn: 'PES2UG24CS037',
      role: 'Frontend & UX Specialist',
      responsibilities: 'Client Architecture, Swiss Grid Typographic Hierarchy, Responsive Design Systems, Quiz Interaction Flows & Accessibility (WCAG 2.1 AA).'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-3">
        <div className="text-xs font-mono text-[#0047FF] font-semibold">
          PROJECT SCOPE &amp; SPECIFICATION
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
          Software Engineering Mini-Project Part-2 (Team 16)
        </h1>
        <p className="text-sm text-[#5A626A] max-w-3xl leading-relaxed">
          Developed in accordance with the Software Requirements Specification (SRS) and Software Architecture Document (SAD) for PES University. The platform enforces strict architectural boundaries and cryptographic integrity across academic collaboration.
        </p>
      </div>

      {/* Team Contributors Grid */}
      <div className="space-y-4">
        <div className="border-b border-[#DDE1E5] pb-2">
          <h2 className="text-xl font-bold font-heading text-[#111315]">
            Engineering Team 16 Members
          </h2>
          <p className="text-xs text-[#5A626A]">
            Module breakdown and individual sprint deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0047FF]">
                  {member.srn}
                </span>
                <span className="text-xs text-[#5A626A] font-medium font-sans px-2 py-0.5 bg-[#F8F9FA] border border-[#DDE1E5]">
                  {member.role}
                </span>
              </div>

              <h3 className="text-lg font-bold font-heading text-[#111315]">
                {member.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed">
                {member.responsibilities}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Rigor & Interfaces */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 space-y-4 font-sans text-sm">
        <h2 className="text-xl font-bold font-heading text-[#111315]">
          Architectural Invariants &amp; Interface Isolation
        </h2>
        
        <p className="text-[#5A626A] leading-relaxed">
          The system strictly adheres to the 3-Layered Architecture to prevent architectural drift:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-1">
            <span className="font-heading font-bold text-sm text-[#111315] block">
              1. Presentation Layer
            </span>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              React + Tailwind CSS. Pure declarative rendering with zero direct SQL calls. Talks exclusively via Interface I1 (JSON REST).
            </p>
          </div>

          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-1">
            <span className="font-heading font-bold text-sm text-[#111315] block">
              2. Business Service Layer
            </span>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              Express.js services containing domain invariants, access control checks, and server-side evaluation logic.
            </p>
          </div>

          <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 space-y-1">
            <span className="font-heading font-bold text-sm text-[#111315] block">
              3. Data Persistence Layer
            </span>
            <p className="text-xs text-[#5A626A] leading-relaxed">
              SQLite in Write-Ahead-Logging (WAL) mode. Prepared statements with parameterized bindings preventing SQL injection.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Integrity & Cryptographic Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#0047FF]">
            <BookOpen className="w-4 h-4" />
            <h3 className="font-heading font-bold text-sm text-[#111315]">
              Academic Integrity Statement
            </h3>
          </div>
          <p className="text-[#5A626A] leading-relaxed">
            All curriculum content on the platform is attributed to verified contributors. Edits and revisions create immutable history snapshots ensuring transparent provenance.
          </p>
        </div>

        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#0047FF]">
            <Shield className="w-4 h-4" />
            <h3 className="font-heading font-bold text-sm text-[#111315]">
              Cryptographic Security Spec
            </h3>
          </div>
          <p className="text-[#5A626A] leading-relaxed">
            Passwords are salted and hashed using bcrypt (cost 10). Session tokens expire in 24 hours and are revoked immediately on logout (CSQP-SR-005). Audit logs are chained with SHA-256 hashes.
          </p>
        </div>
      </div>
    </div>
  );
}
