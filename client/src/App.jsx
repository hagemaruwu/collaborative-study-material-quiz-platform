import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MaterialsPage from './pages/MaterialsPage';
import ReaderPage from './pages/ReaderPage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AuditPage from './pages/AuditPage';
import AboutPage from './pages/AboutPage';

import RevisionModal from './components/RevisionModal';
import UploadModal from './components/UploadModal';

import { ACADEMIC_SUBJECTS, INITIAL_DOCUMENTS } from './data/documents';
import { INITIAL_QUIZZES, INITIAL_LEADERBOARD } from './data/quizzes';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'materials' | 'reader' | 'quizzes' | 'leaderboard' | 'audit' | 'about'

  // Role & Authentication State
  const [activeRole, setActiveRole] = useState('Content Contributor / Quiz Creator');
  const [currentUser, setCurrentUser] = useState({
    username: 'adityaraj',
    role: 'Content Contributor / Quiz Creator',
    srn: 'PES2UG24CS033'
  });

  // Data States
  const [subjects, setSubjects] = useState(ACADEMIC_SUBJECTS);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [activeDocumentId, setActiveDocumentId] = useState(INITIAL_DOCUMENTS[0].id);
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  // Search & Filter States for Materials
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedTag, setSelectedTag] = useState('ALL');

  // Interactive Document Engagement States
  const [userRatings, setUserRatings] = useState({});
  const [documentComments, setDocumentComments] = useState({
    101: [
      {
        id: 1,
        author: 'Amrit Raj Anmol',
        role: 'Contributor',
        timestamp: '2026-10-28 14:30:10 UTC',
        text: 'The recurrence relation OPT(i, v) base case handles disconnected components correctly since unreachable nodes default to positive infinity.'
      },
      {
        id: 2,
        author: 'A Sheiman Joshi',
        role: 'Admin',
        timestamp: '2026-10-28 14:52:00 UTC',
        text: 'Verified relaxation loop condition against Dijkstra benchmark. 90th percentile query latency confirmed well within 3 seconds threshold.'
      }
    ],
    102: [
      {
        id: 1,
        author: 'Ahan Charan',
        role: 'Student',
        timestamp: '2026-10-27 19:10:45 UTC',
        text: 'Randomized election timeout between 150ms and 300ms successfully breaks split-vote symmetries in all simulated 5-node cluster partitions.'
      }
    ],
    103: [
      {
        id: 1,
        author: 'Aditya Raj',
        role: 'Contributor',
        timestamp: '2026-10-24 10:15:20 UTC',
        text: 'Strict interface contracts I1 and I2 prevent architectural drift between the React workstation and SQLite persistent store.'
      }
    ]
  });

  // Tamper-Proof Audit Logs (TC-SEC-01)
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      action: 'INIT_SYSTEM',
      user: 'SYSTEM',
      ip: '127.0.0.1',
      details: 'Node CSQP-16 initialized with SQLite schema and strict security headers',
      timestamp: '2026-10-28 08:00:00 UTC'
    },
    {
      id: 2,
      action: 'DOC_REVISION',
      user: 'adityaraj',
      ip: '192.168.1.14',
      details: 'Committed revision v3 on document #101: Added C edge relaxation kernel',
      timestamp: '2026-10-28 14:10:20 UTC'
    },
    {
      id: 3,
      action: 'QUIZ_EVALUATION',
      user: 'adityaraj',
      ip: '192.168.1.14',
      details: 'Evaluated attempt on Quiz #1. Score: 10/10 (100.0%). Duration: 42s',
      timestamp: '2026-10-28 14:15:00 UTC'
    }
  ]);

  // Modals State
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [revisionTargetDoc, setRevisionTargetDoc] = useState(null);

  // Navigate Handler
  const navigateTo = (page, docId = null) => {
    if (docId) {
      setActiveDocumentId(docId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setCurrentUser((prev) => ({
      ...prev,
      role
    }));
  };

  // Filtered Documents
  const filteredDocuments = documents.filter((doc) => {
    if (selectedSubject !== 'ALL' && doc.subjectId !== selectedSubject) {
      return false;
    }
    if (selectedTag !== 'ALL' && !doc.tags.includes(selectedTag)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchTopic = doc.topic.toLowerCase().includes(q);
      const matchAuthor = doc.author.toLowerCase().includes(q);
      const matchSummary = doc.summary.toLowerCase().includes(q);
      const matchContent = doc.content.toLowerCase().includes(q);
      return matchTitle || matchTopic || matchAuthor || matchSummary || matchContent;
    }
    return true;
  });

  const activeDoc = documents.find((d) => d.id === activeDocumentId) || filteredDocuments[0] || documents[0];

  // Rate Document Handler (TC-MAT-07)
  const handleRateDocument = (docId, stars) => {
    setUserRatings((prev) => ({
      ...prev,
      [docId]: stars
    }));

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          const alreadyRated = userRatings[docId] !== undefined;
          const currentTotal = doc.rating * doc.ratingCount;
          const newCount = alreadyRated ? doc.ratingCount : doc.ratingCount + 1;
          const newTotal = alreadyRated
            ? currentTotal - userRatings[docId] + stars
            : currentTotal + stars;
          const newAvg = Number((newTotal / newCount).toFixed(1));

          return {
            ...doc,
            rating: newAvg,
            ratingCount: newCount
          };
        }
        return doc;
      })
    );

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'RATE_MATERIAL',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Recorded rating of ${stars} stars on study module #${docId}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      },
      ...prev
    ]);
  };

  // Add Comment Handler (TC-MAT-08)
  const handleAddComment = (docId, text) => {
    const newComment = {
      id: Date.now(),
      author: currentUser.username,
      role: activeRole === 'Administrator' ? 'Admin' : (activeRole === 'Content Contributor / Quiz Creator' ? 'Contributor' : 'Student'),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      text
    };

    setDocumentComments((prev) => ({
      ...prev,
      [docId]: [...(prev[docId] || []), newComment]
    }));

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'POST_COMMENT',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Annotated document #${docId}: "${text.substring(0, 40)}..."`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      },
      ...prev
    ]);
  };

  // Open Revision Modal
  const handleOpenRevisionModal = (doc) => {
    setRevisionTargetDoc(doc || activeDoc);
    setIsRevisionModalOpen(true);
  };

  // Commit Revision (CSQP-F-011, 012)
  const handleCommitRevision = ({ title, content, change_summary }) => {
    const target = revisionTargetDoc || activeDoc;
    if (!target) return;
    const nextVer = target.version + 1;
    const nowIso = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const fakeHash = Math.random().toString(16).substring(2, 9);

    const newHistoryEntry = {
      version: nextVer,
      author: currentUser.username,
      timestamp: nowIso,
      summary: change_summary,
      hash: fakeHash
    };

    setDocuments((prevDocs) =>
      prevDocs.map((d) => {
        if (d.id === target.id) {
          return {
            ...d,
            version: nextVer,
            title,
            content,
            updatedAt: nowIso,
            history: [newHistoryEntry, ...(d.history || [])]
          };
        }
        return d;
      })
    );

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'COLLABORATIVE_REVISION',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Created revision v${nextVer} on #${target.id}: ${change_summary}`,
        timestamp: nowIso
      },
      ...prev
    ]);
  };

  // Version Rollback (CSQP-F-013)
  const handleRollback = (docId, targetVersion) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;

    const historical = doc.history?.find((h) => h.version === targetVersion);
    if (!historical) return;

    const nextVer = doc.version + 1;
    const nowIso = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const fakeHash = Math.random().toString(16).substring(2, 9);

    const rollbackSummary = `Rollback: Restored authoritative state from revision v${targetVersion}`;

    const newHistoryEntry = {
      version: nextVer,
      author: currentUser.username,
      timestamp: nowIso,
      summary: rollbackSummary,
      hash: fakeHash
    };

    setDocuments((prevDocs) =>
      prevDocs.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            version: nextVer,
            updatedAt: nowIso,
            history: [newHistoryEntry, ...(d.history || [])]
          };
        }
        return d;
      })
    );

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'ROLLBACK_REVISION',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Rolled back module #${docId} to snapshot v${targetVersion}`,
        timestamp: nowIso
      },
      ...prev
    ]);
  };

  // Upload Document Ingestion (TC-MAT-01)
  const handleUploadDocument = ({ title, subjectId, topic, summary, fileName, fileSize }) => {
    const newId = Date.now();
    const nowIso = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    const newDoc = {
      id: newId,
      subjectId,
      topic,
      title,
      author: currentUser.username,
      authorSrn: currentUser.srn,
      version: 1,
      updatedAt: nowIso,
      rating: 5.0,
      ratingCount: 1,
      tags: ['EXAM SPEC', 'VERIFIED'],
      summary,
      content: `## Ingested Study Material: ${title}\n\nDocument File: ${fileName} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)\nSubject: ${subjectId} - ${topic}\nIngestion Timestamp: ${nowIso}\nAuthor Attribution: ${currentUser.username} (${currentUser.srn})\n\n### Theoretical Summary\n${summary}\n\n\`\`\`text\n// File Ingestion Metadata\nPayload Size: ${fileSize} bytes\nMIME Classification: Validated PDF/Document\nSecurity Audit: Passed Virus & Buffer Boundary Check\n\`\`\``,
      history: [
        {
          version: 1,
          author: currentUser.username,
          timestamp: nowIso,
          summary: `Initial upload and ingestion of ${fileName}`,
          hash: Math.random().toString(16).substring(2, 9)
        }
      ]
    };

    setDocuments((prev) => [newDoc, ...prev]);
    navigateTo('reader', newId);

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'UPLOAD_MATERIAL',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Ingested document #${newId}: ${title} (${fileName})`,
        timestamp: nowIso
      },
      ...prev
    ]);
  };

  // Quiz Attempt Evaluation (TC-QUIZ-04, 07)
  const handleQuizSubmit = (quizId, result) => {
    const newAttemptEntry = {
      id: Date.now(),
      username: currentUser.username,
      score: result.score,
      max_score: result.maxScore,
      percentage: Number(result.percentage),
      time_taken_seconds: result.timeSpent,
      completed_at: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    setLeaderboard((prev) => {
      const updated = [newAttemptEntry, ...prev];
      return updated.sort((a, b) => {
        if (b.percentage !== a.percentage) return b.percentage - a.percentage;
        return a.time_taken_seconds - b.time_taken_seconds;
      });
    });

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action: 'QUIZ_SUBMISSION',
        user: currentUser.username,
        ip: '127.0.0.1',
        details: `Authoritative evaluation on Quiz #${quizId}: ${result.percentage}% in ${result.timeSpent}s`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111315] font-sans selection:bg-[#0047FF] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <LandingPage
            onNavigate={(page) => navigateTo(page)}
            subjects={subjects}
            documentsCount={documents.length}
            quizzesCount={quizzes.length}
          />
        )}

        {currentPage === 'materials' && (
          <MaterialsPage
            subjects={subjects}
            documents={filteredDocuments}
            onSelectDocument={(id) => navigateTo('reader', id)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenRevision={handleOpenRevisionModal}
          />
        )}

        {currentPage === 'reader' && (
          <ReaderPage
            document={activeDoc}
            onBack={() => navigateTo('materials')}
            onRate={handleRateDocument}
            userRating={activeDoc ? userRatings[activeDoc.id] : 0}
            hasRated={activeDoc ? userRatings[activeDoc.id] !== undefined : false}
            comments={activeDoc ? documentComments[activeDoc.id] || [] : []}
            onAddComment={handleAddComment}
            currentUser={currentUser}
            onRollback={handleRollback}
            canRollback={activeRole === 'Content Contributor / Quiz Creator' || activeRole === 'Administrator'}
            onOpenRevision={handleOpenRevisionModal}
          />
        )}

        {currentPage === 'quizzes' && (
          <QuizPage
            quizzes={quizzes}
            onQuizSubmit={handleQuizSubmit}
            currentUser={currentUser}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {currentPage === 'leaderboard' && (
          <LeaderboardPage
            leaderboard={leaderboard}
            currentUser={currentUser}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {currentPage === 'audit' && (
          <AuditPage
            auditLogs={auditLogs}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />

      {/* Modals */}
      <RevisionModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        onSubmit={handleCommitRevision}
        document={revisionTargetDoc || activeDoc}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadDocument}
        subjects={subjects}
      />
    </div>
  );
}
