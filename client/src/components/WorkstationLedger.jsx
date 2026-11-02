import React, { useState, useEffect } from 'react';
import { History, Award, ShieldAlert, RotateCcw, Play, CheckCircle, XCircle, Timer, Trophy } from 'lucide-react';

export default function WorkstationLedger({
  document,
  onRollback,
  canRollback,
  quizzes,
  leaderboard,
  onQuizSubmit,
  auditLogs,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('versions'); // 'versions' | 'assessment' | 'audit'

  // Quiz Attempt State
  const [activeQuizId, setActiveQuizId] = useState(quizzes[0]?.id || 1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const [quizResult, setQuizResult] = useState(null);

  const selectedQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];

  // Timer countdown
  useEffect(() => {
    let timer = null;
    if (quizStarted && !quizFinished && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizFinished, secondsRemaining]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setAnswers({});
    setQuizResult(null);
    setSecondsRemaining((selectedQuiz?.duration_minutes || 5) * 60);
  };

  const handleAnswerSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCompleteQuiz = () => {
    setQuizFinished(true);
    setQuizStarted(false);

    const questions = selectedQuiz?.questions || [];
    let score = 0;
    let maxScore = 0;
    const details = [];

    questions.forEach((q) => {
      maxScore += q.points;
      const submitted = (answers[q.id] || '').toString().trim();
      const correct = (q.correct_answer || '').toString().trim();
      const isCorrect = submitted.toLowerCase() === correct.toLowerCase();
      if (isCorrect) score += q.points;

      details.push({
        questionId: q.id,
        isCorrect,
        submitted,
        correct,
        points: isCorrect ? q.points : 0,
        maxPoints: q.points
      });
    });

    const percentage = maxScore > 0 ? ((score / maxScore) * 100).toFixed(1) : 0;
    const timeSpent = (selectedQuiz?.duration_minutes || 5) * 60 - secondsRemaining;

    const result = {
      score,
      maxScore,
      percentage,
      timeSpent,
      details
    };

    setQuizResult(result);
    onQuizSubmit(selectedQuiz.id, result);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <aside className="w-full lg:w-96 flex-shrink-0 bg-[#13171F] border-l border-[#262C36] flex flex-col h-full select-none">
      {/* Tab Switcher */}
      <div className="flex border-b border-[#262C36] bg-[#0D1015]">
        <button
          onClick={() => setActiveTab('versions')}
          className={`flex-1 py-2.5 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'versions'
              ? 'bg-[#13171F] text-[#FF5500] border-b-2 border-[#FF5500]'
              : 'text-[#8B949E] hover:text-[#E6E9EE]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>VERSIONS</span>
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex-1 py-2.5 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'assessment'
              ? 'bg-[#13171F] text-[#FF5500] border-b-2 border-[#FF5500]'
              : 'text-[#8B949E] hover:text-[#E6E9EE]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>ASSESSMENT</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-2.5 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'audit'
              ? 'bg-[#13171F] text-[#FF5500] border-b-2 border-[#FF5500]'
              : 'text-[#8B949E] hover:text-[#E6E9EE]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>AUDIT LOG</span>
        </button>
      </div>

      {/* TAB 1: VERSION CONTROL & ROLLBACK LEDGER */}
      {activeTab === 'versions' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono">
            <span className="text-[#8B949E] block mb-1">REVISION REPOSITORY:</span>
            <p className="text-[#E6E9EE]">
              Immutable commit graph tracking edits by Team 16 contributors with instant rollback capabilities.
            </p>
          </div>

          <div className="space-y-3">
            {document?.history?.map((h) => {
              const isCurrent = h.version === document.version;
              return (
                <div
                  key={h.version}
                  className={`border p-3 text-xs font-mono transition-colors ${
                    isCurrent
                      ? 'border-[#FF5500] bg-[#181D26]'
                      : 'border-[#262C36] bg-[#0D1015]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[#E6E9EE]">
                      REVISION v{h.version}
                      {isCurrent && <span className="text-[#FF5500] ml-2">[ACTIVE HEAD]</span>}
                    </span>
                    <span className="text-[10px] text-[#485260] font-mono">SHA:{h.hash}</span>
                  </div>

                  <p className="text-[#8B949E] text-xs mb-2 leading-relaxed">{h.summary}</p>

                  <div className="flex items-center justify-between text-[11px] text-[#8B949E] border-t border-[#262C36] pt-2">
                    <span>BY: {h.author}</span>
                    <span>{h.timestamp.split(' ')[0]}</span>
                  </div>

                  {!isCurrent && canRollback && (
                    <div className="mt-2.5 pt-2 border-t border-[#262C36]">
                      <button
                        onClick={() => onRollback(document.id, h.version)}
                        className="w-full flex items-center justify-center gap-1.5 py-1 px-2 text-[11px] font-mono border border-[#262C36] bg-[#13171F] text-[#E6E9EE] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>ROLLBACK TO REVISION v{h.version}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TIMED ASSESSMENT & DYNAMIC LEADERBOARD */}
      {activeTab === 'assessment' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quiz Selector */}
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono">
            <label className="text-[#8B949E] block mb-1.5 uppercase text-[10px]">
              SELECT CURRICULUM ASSESSMENT:
            </label>
            <select
              value={activeQuizId}
              onChange={(e) => {
                setActiveQuizId(Number(e.target.value));
                setQuizStarted(false);
                setQuizFinished(false);
                setQuizResult(null);
              }}
              className="w-full bg-[#13171F] border border-[#262C36] text-[#E6E9EE] p-2 text-xs font-mono focus:outline-none focus:border-[#FF5500]"
            >
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          </div>

          {/* Quiz Pre-Start Overview */}
          {!quizStarted && !quizFinished && (
            <div className="border border-[#262C36] bg-[#0D1015] p-4 text-xs font-mono space-y-3">
              <div className="text-[#FF5500] font-bold text-sm">{selectedQuiz?.title}</div>
              <p className="text-[#8B949E] text-xs leading-relaxed">{selectedQuiz?.description}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-[#262C36] pt-2">
                <div>
                  <span className="text-[#485260] block">QUESTIONS:</span>
                  <span className="text-[#E6E9EE]">{selectedQuiz?.questions?.length || 0} ITEMS</span>
                </div>
                <div>
                  <span className="text-[#485260] block">TIME LIMIT:</span>
                  <span className="text-[#E6E9EE]">{selectedQuiz?.duration_minutes || 5} MINUTES</span>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[#FF5500] text-[#0D1015] font-bold text-xs hover:bg-[#E04B00] transition-colors mt-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>COMMENCE TIMED EVALUATION</span>
              </button>
            </div>
          )}

          {/* Active Quiz Question Engine */}
          {quizStarted && !quizFinished && (
            <div className="space-y-4">
              <div className="border border-[#FF5500] bg-[#181D26] p-3 text-xs font-mono flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E6E9EE]">
                  <Timer className="w-4 h-4 text-[#FF5500]" />
                  <span>COUNTDOWN:</span>
                </div>
                <span className="text-sm font-bold text-[#FF5500]">{formatTimer(secondsRemaining)}</span>
              </div>

              <div className="space-y-4">
                {selectedQuiz?.questions?.map((q, idx) => (
                  <div key={q.id} className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#8B949E]">
                      <span>QUESTION {idx + 1} OF {selectedQuiz.questions.length}</span>
                      <span className="text-[#FF5500]">{q.points} PTS</span>
                    </div>
                    <p className="text-[#E6E9EE] font-medium leading-relaxed">{q.question}</p>

                    {/* Question Types: MCQ */}
                    {q.type === 'MCQ' && (
                      <div className="space-y-1.5 pt-1">
                        {q.options?.map((opt, oIdx) => (
                          <label
                            key={oIdx}
                            className={`flex items-center gap-2 p-2 border cursor-pointer transition-colors ${
                              answers[q.id] === opt
                                ? 'border-[#FF5500] bg-[#181D26] text-[#E6E9EE]'
                                : 'border-[#262C36] text-[#8B949E] hover:border-[#3D4654]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question_${q.id}`}
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={() => handleAnswerSelect(q.id, opt)}
                              className="accent-[#FF5500]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Question Types: TRUE_FALSE */}
                    {q.type === 'TRUE_FALSE' && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {['True', 'False'].map((tf) => (
                          <button
                            key={tf}
                            type="button"
                            onClick={() => handleAnswerSelect(q.id, tf)}
                            className={`py-2 text-xs font-mono border transition-colors ${
                              answers[q.id] === tf
                                ? 'border-[#FF5500] bg-[#FF5500] text-[#0D1015] font-bold'
                                : 'border-[#262C36] text-[#8B949E] hover:border-[#3D4654]'
                            }`}
                          >
                            {tf.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Question Types: FILL_BLANK */}
                    {q.type === 'FILL_BLANK' && (
                      <div className="pt-1">
                        <input
                          type="text"
                          value={answers[q.id] || ''}
                          onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                          placeholder="Type precise exact response..."
                          className="w-full bg-[#13171F] border border-[#262C36] text-[#E6E9EE] p-2 text-xs font-mono focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleCompleteQuiz}
                className="w-full py-2 bg-[#FF5500] text-[#0D1015] font-bold font-mono text-xs hover:bg-[#E04B00] transition-colors"
              >
                SUBMIT AUTHORITATIVE ATTEMPT
              </button>
            </div>
          )}

          {/* Quiz Result Display */}
          {quizFinished && quizResult && (
            <div className="border border-[#262C36] bg-[#0D1015] p-4 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between border-b border-[#262C36] pb-2">
                <span className="text-[#8B949E]">ASSESSMENT RESULT:</span>
                <span className="text-sm font-bold text-[#FF5500]">{quizResult.percentage}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#485260] block">SCORE:</span>
                  <span className="text-[#E6E9EE]">{quizResult.score} / {quizResult.maxScore} PTS</span>
                </div>
                <div>
                  <span className="text-[#485260] block">TIME ELAPSED:</span>
                  <span className="text-[#E6E9EE]">{quizResult.timeSpent} SECONDS</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#262C36]">
                <span className="text-[10px] text-[#8B949E] uppercase block">ITEM VERIFICATION:</span>
                {quizResult.details?.map((d, dIdx) => (
                  <div key={dIdx} className="border border-[#262C36] p-2 text-[11px] space-y-1 bg-[#13171F]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B949E]">ITEM #{dIdx + 1}</span>
                      <span className={d.isCorrect ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                        {d.isCorrect ? 'VALIDATED (+pts)' : 'INCORRECT'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#485260]">CORRECT: </span>
                      <span className="text-[#E6E9EE]">{d.correct}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full py-2 border border-[#262C36] text-[#E6E9EE] font-mono text-xs hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
              >
                RE-ATTEMPT ASSESSMENT
              </button>
            </div>
          )}

          {/* Dynamic Leaderboard (TC-QUIZ-07) */}
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#E6E9EE] flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#FF5500]" />
                DYNAMIC LEADERBOARD
              </span>
              <span className="text-[10px] text-[#485260]">RANKED BY SCORE/TIME</span>
            </div>

            <div className="space-y-1.5">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-2 border border-[#262C36] bg-[#13171F] text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-[#FF5500] font-bold">#{index + 1}</span>
                    <span className="text-[#E6E9EE] font-medium">{entry.username}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-[#E6E9EE]">{entry.percentage}%</span>
                    <span className="text-[#485260]">{entry.time_taken_seconds}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TAMPER-PROOF SECURITY AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-xs font-mono">
            <span className="text-[#FF5500] font-bold block mb-1">AUDIT RECORD (TC-SEC-01):</span>
            <p className="text-[#8B949E] text-[11px] leading-relaxed">
              Cryptographically verified event journal. Plaintext credentials strictly filtered at ingestion.
            </p>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="border border-[#262C36] bg-[#0D1015] p-2.5 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#FF5500] font-bold">{log.action}</span>
                  <span className="text-[#485260]">{log.timestamp}</span>
                </div>
                <p className="text-[#E6E9EE] text-[11px]">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#262C36] pt-1 mt-1">
                  <span>ACTOR: {log.user}</span>
                  <span>IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
