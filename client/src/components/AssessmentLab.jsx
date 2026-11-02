import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Timer, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ArrowLeft,
  RotateCcw,
  Clock,
  UserCheck
} from 'lucide-react';

export default function AssessmentLab({
  quizzes,
  leaderboard,
  onQuizSubmit,
  currentUser,
  onExitToReader
}) {
  const [activeQuizId, setActiveQuizId] = useState(quizzes[0]?.id || 1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const [quizResult, setQuizResult] = useState(null);

  const selectedQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];

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
        question: q.question,
        isCorrect,
        submitted,
        correct,
        points: isCorrect ? q.points : 0,
        maxPoints: q.points
      });
    });

    const percentage = maxScore > 0 ? Number(((score / maxScore) * 100).toFixed(1)) : 0;
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
    <main className="flex-1 bg-[#0D1015] overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Lab Header */}
        <div className="border border-[#262C36] bg-[#13171F] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B949E] mb-1">
              <span className="px-2 py-0.5 bg-[#FF5500] text-[#0D1015] font-bold">
                {selectedQuiz?.subject_name?.toUpperCase() || 'ASSESSMENT'}
              </span>
              <span>|</span>
              <span>TIMED CURRICULUM EVALUATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#E6E9EE]">
              {selectedQuiz?.title}
            </h2>
            <p className="text-xs font-mono text-[#8B949E] mt-1">
              {selectedQuiz?.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitToReader}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262C36] text-[#8B949E] hover:text-[#E6E9EE] hover:border-[#3D4654] font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO READER</span>
            </button>
          </div>
        </div>

        {/* Module Picker Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
          {quizzes.map((q) => {
            const isSelected = q.id === activeQuizId;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setActiveQuizId(q.id);
                  setQuizStarted(false);
                  setQuizFinished(false);
                  setQuizResult(null);
                }}
                className={`p-3 text-left border transition-colors ${
                  isSelected
                    ? 'border-[#FF5500] bg-[#181D26] text-[#E6E9EE]'
                    : 'border-[#262C36] bg-[#13171F] text-[#8B949E] hover:border-[#3D4654]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={isSelected ? 'text-[#FF5500] font-bold' : 'text-[#8B949E]'}>
                    {q.topic_name}
                  </span>
                  <span>{q.duration_minutes} MIN</span>
                </div>
                <div className="font-medium truncate">{q.title}</div>
              </button>
            );
          })}
        </div>

        {/* State 1: Pre-Quiz Instructions */}
        {!quizStarted && !quizFinished && (
          <div className="border border-[#262C36] bg-[#13171F] p-6 space-y-4 font-mono text-xs">
            <div className="border-b border-[#262C36] pb-3 flex items-center justify-between">
              <span className="text-[#FF5500] font-bold text-sm uppercase">ASSESSMENT PROTOCOL</span>
              <span className="text-[#8B949E]">CANDIDATE: {currentUser.username} ({currentUser.role})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="border border-[#262C36] bg-[#0D1015] p-3">
                <span className="text-[#485260] block text-[10px]">TOTAL ITEMS:</span>
                <span className="text-[#E6E9EE] font-bold text-sm">
                  {selectedQuiz?.questions?.length || 0} Questions
                </span>
              </div>
              <div className="border border-[#262C36] bg-[#0D1015] p-3">
                <span className="text-[#485260] block text-[10px]">TIME ALLOCATION:</span>
                <span className="text-[#E6E9EE] font-bold text-sm">
                  {selectedQuiz?.duration_minutes || 5} Minutes Strict
                </span>
              </div>
              <div className="border border-[#262C36] bg-[#0D1015] p-3">
                <span className="text-[#485260] block text-[10px]">EVALUATION ENGINE:</span>
                <span className="text-[#22c55e] font-bold text-sm">
                  Authoritative Server-Side
                </span>
              </div>
            </div>

            <p className="text-[#8B949E] leading-relaxed">
              Assessment questions are randomized per session (CSQP-F-014). Answer submissions are validated cryptographically against server answer keys (CSQP-SR-006). Scoring accounts for question points and elapsed time.
            </p>

            <button
              onClick={handleStartQuiz}
              className="w-full py-3 bg-[#FF5500] text-[#0D1015] font-bold text-sm hover:bg-[#E04B00] transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>COMMENCE TIMED EVALUATION NOW</span>
            </button>
          </div>
        )}

        {/* State 2: Active Timed Quiz Session */}
        {quizStarted && !quizFinished && (
          <div className="space-y-4">
            {/* Countdown Banner */}
            <div className="border border-[#FF5500] bg-[#181D26] p-4 font-mono text-xs flex items-center justify-between sticky top-16 z-30">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-[#FF5500]" />
                <div>
                  <span className="text-[#8B949E] block text-[10px]">TIMER STATUS:</span>
                  <span className="text-[#E6E9EE] font-bold">{selectedQuiz.title}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#8B949E] block text-[10px]">REMAINING:</span>
                <span className="text-lg font-bold text-[#FF5500] font-mono tracking-wider">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {selectedQuiz?.questions?.map((q, idx) => (
                <div key={q.id} className="border border-[#262C36] bg-[#13171F] p-5 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[#8B949E] border-b border-[#262C36] pb-2">
                    <span className="font-bold text-[#E6E9EE]">QUESTION {idx + 1} OF {selectedQuiz.questions.length}</span>
                    <span className="text-[#FF5500] font-bold">WORTH {q.points} PTS</span>
                  </div>

                  <p className="text-[#E6E9EE] text-sm leading-relaxed">{q.question}</p>

                  {/* MCQ Options */}
                  {q.type === 'MCQ' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options?.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, opt)}
                          className={`p-3 text-left border transition-colors flex items-center gap-3 ${
                            answers[q.id] === opt
                              ? 'border-[#FF5500] bg-[#181D26] text-[#E6E9EE] font-bold'
                              : 'border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:border-[#3D4654] hover:text-[#E6E9EE]'
                          }`}
                        >
                          <span className={`w-5 h-5 flex items-center justify-center text-[10px] border ${
                            answers[q.id] === opt ? 'border-[#FF5500] bg-[#FF5500] text-[#0D1015]' : 'border-[#262C36]'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* True/False Options */}
                  {q.type === 'TRUE_FALSE' && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {['True', 'False'].map((tf) => (
                        <button
                          key={tf}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, tf)}
                          className={`py-3 text-center border font-bold text-xs transition-colors ${
                            answers[q.id] === tf
                              ? 'border-[#FF5500] bg-[#FF5500] text-[#0D1015]'
                              : 'border-[#262C36] bg-[#0D1015] text-[#8B949E] hover:border-[#3D4654]'
                          }`}
                        >
                          {tf.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fill in Blank */}
                  {q.type === 'FILL_BLANK' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                        placeholder="Type precise exact response..."
                        className="w-full bg-[#0D1015] border border-[#262C36] text-[#E6E9EE] p-3 text-xs font-mono focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submission Trigger */}
            <div className="border border-[#262C36] bg-[#13171F] p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8B949E]">
                {Object.keys(answers).length} of {selectedQuiz.questions.length} Questions Answered
              </span>
              <button
                onClick={handleCompleteQuiz}
                className="px-6 py-2.5 bg-[#FF5500] text-[#0D1015] font-bold font-mono text-xs hover:bg-[#E04B00] transition-colors"
              >
                SUBMIT AUTHORITATIVE EVALUATION
              </button>
            </div>
          </div>
        )}

        {/* State 3: Quiz Results and Breakdown */}
        {quizFinished && quizResult && (
          <div className="space-y-4">
            <div className="border border-[#262C36] bg-[#13171F] p-6 font-mono text-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-[#262C36] pb-3">
                <div>
                  <span className="text-[#8B949E] block text-[10px]">EVALUATION OUTCOME:</span>
                  <span className="text-xl font-heading font-bold text-[#E6E9EE]">
                    {quizResult.percentage >= 80 ? 'MASTERY VERIFIED' : (quizResult.percentage >= 50 ? 'SATISFACTORY' : 'REVISION RECOMMENDED')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#8B949E] block text-[10px]">PERCENTAGE:</span>
                  <span className="text-2xl font-bold text-[#FF5500]">{quizResult.percentage}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="border border-[#262C36] bg-[#0D1015] p-3">
                  <span className="text-[#485260] block text-[10px]">POINTS AWARDED:</span>
                  <span className="text-[#E6E9EE] font-bold">{quizResult.score} / {quizResult.maxScore}</span>
                </div>
                <div className="border border-[#262C36] bg-[#0D1015] p-3">
                  <span className="text-[#485260] block text-[10px]">ELAPSED TIME:</span>
                  <span className="text-[#E6E9EE] font-bold">{quizResult.timeSpent} Seconds</span>
                </div>
                <div className="border border-[#262C36] bg-[#0D1015] p-3">
                  <span className="text-[#485260] block text-[10px]">CANDIDATE:</span>
                  <span className="text-[#E6E9EE] font-bold">{currentUser.username}</span>
                </div>
                <div className="border border-[#262C36] bg-[#0D1015] p-3">
                  <span className="text-[#485260] block text-[10px]">INTEGRITY:</span>
                  <span className="text-[#22c55e] font-bold">TC-SEC-07 PASS</span>
                </div>
              </div>

              {/* Itemized Verification Breakdown */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-[#8B949E] uppercase font-bold block">ITEMIZED SUBMISSION LEDGER:</span>
                {quizResult.details?.map((d, dIdx) => (
                  <div key={dIdx} className="border border-[#262C36] bg-[#0D1015] p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B949E]">ITEM #{dIdx + 1}: {d.question}</span>
                      <span className={`font-bold flex items-center gap-1 ${d.isCorrect ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                        {d.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{d.isCorrect ? `+${d.points} PTS` : '0 PTS'}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#262C36]">
                      <div>
                        <span className="text-[#485260]">SUBMITTED: </span>
                        <span className="text-[#E6E9EE]">{d.submitted || '(Blank)'}</span>
                      </div>
                      <div>
                        <span className="text-[#485260]">AUTHORITATIVE: </span>
                        <span className="text-[#22c55e]">{d.correct}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 py-2.5 border border-[#262C36] text-[#E6E9EE] font-mono text-xs hover:border-[#FF5500] hover:text-[#FF5500] transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RE-ATTEMPT MODULE</span>
                </button>
                <button
                  onClick={onExitToReader}
                  className="flex-1 py-2.5 bg-[#FF5500] text-[#0D1015] font-mono font-bold text-xs hover:bg-[#E04B00] transition-colors"
                >
                  RETURN TO DOCUMENT CANVAS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Leaderboard Component */}
        <div className="border border-[#262C36] bg-[#13171F] p-6 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#262C36] pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FF5500]" />
              <h3 className="font-heading font-bold text-sm text-[#E6E9EE]">
                INSTITUTIONAL LEADERBOARD (TC-QUIZ-07)
              </h3>
            </div>
            <span className="text-[10px] text-[#485260]">SORT: HIGHEST SCORE / LOWEST DURATION</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262C36] text-[10px] text-[#8B949E] uppercase">
                  <th className="py-2 px-3">RANK</th>
                  <th className="py-2 px-3">STUDENT</th>
                  <th className="py-2 px-3">SCORE</th>
                  <th className="py-2 px-3">PERCENTAGE</th>
                  <th className="py-2 px-3">DURATION</th>
                  <th className="py-2 px-3">COMPLETED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262C36] text-xs">
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="hover:bg-[#181D26] transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#FF5500]">#{index + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-[#E6E9EE]">{entry.username}</td>
                    <td className="py-2.5 px-3 text-[#8B949E]">{entry.score}/{entry.max_score}</td>
                    <td className="py-2.5 px-3 font-bold text-[#E6E9EE]">{entry.percentage}%</td>
                    <td className="py-2.5 px-3 text-[#8B949E]">{entry.time_taken_seconds}s</td>
                    <td className="py-2.5 px-3 text-[#485260] text-[10px]">{entry.completed_at?.split(' ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
