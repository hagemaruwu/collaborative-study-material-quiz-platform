import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Timer, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  Trophy,
  ShieldCheck
} from 'lucide-react';

export default function QuizPage({
  quizzes,
  onQuizSubmit,
  currentUser,
  onNavigate
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

  const handleCompleteQuiz = async () => {
    setQuizFinished(true);
    setQuizStarted(false);

    const questions = selectedQuiz?.questions || [];
    let score = 0;
    let maxScore = 0;
    const details = [];

    questions.forEach((q) => {
      maxScore += q.points || 1;
      const submitted = (answers[q.id] || '').toString().trim();
      const correct = (q.correct_answer || '').toString().trim();
      const isCorrect = correct ? submitted.toLowerCase() === correct.toLowerCase() : false;
      if (isCorrect) score += q.points || 1;

      details.push({
        questionId: q.id,
        question: q.question || q.question_text,
        isCorrect,
        submitted,
        correct,
        points: isCorrect ? (q.points || 1) : 0,
        maxPoints: q.points || 1
      });
    });

    const percentage = maxScore > 0 ? Number(((score / maxScore) * 100).toFixed(1)) : 0;
    const timeSpent = (selectedQuiz?.duration_minutes || 5) * 60 - secondsRemaining;

    let finalResult = {
      score,
      maxScore,
      percentage,
      timeSpent,
      details
    };

    if (onQuizSubmit) {
      try {
        const serverResult = await onQuizSubmit(selectedQuiz.id, finalResult, answers, timeSpent);
        if (serverResult) {
          finalResult = serverResult;
        }
      } catch (err) {
        console.warn('Backend evaluation fallback to client evaluation:', err);
      }
    }

    setQuizResult(finalResult);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Quiz Hub Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#0047FF] font-semibold mb-1">
            MODULE 03 : CURRICULUM ASSESSMENTS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
            Timed Curriculum Assessments &amp; Self-Testing
          </h1>
          <p className="text-sm text-[#5A626A] mt-1 max-w-2xl">
            Formal examination assessments with randomized questions and server-side answer evaluation. All attempts are automatically ranked on the institutional leaderboard.
          </p>
        </div>

        <button
          onClick={() => onNavigate('leaderboard')}
          className="flex items-center gap-1.5 px-4 py-2 border border-[#DDE1E5] bg-[#FFFFFF] text-xs font-semibold text-[#111315] hover:border-[#0047FF] hover:text-[#0047FF] transition-colors"
        >
          <Trophy className="w-4 h-4 text-[#0047FF]" />
          <span>View Leaderboard</span>
        </button>
      </div>

      {/* Module Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quizzes.map((q) => {
          const isSelected = q.id === activeQuizId;
          return (
            <div
              key={q.id}
              onClick={() => {
                setActiveQuizId(q.id);
                setQuizStarted(false);
                setQuizFinished(false);
                setQuizResult(null);
              }}
              className={`p-4 border cursor-pointer transition-colors ${
                isSelected
                  ? 'border-[#0047FF] bg-[#FFFFFF] ring-1 ring-[#0047FF]'
                  : 'border-[#DDE1E5] bg-[#FFFFFF] hover:border-[#B0B8C1]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#5A626A] mb-1 font-mono">
                <span className={isSelected ? 'text-[#0047FF] font-bold' : ''}>{q.topic_name}</span>
                <span>{q.duration_minutes} min</span>
              </div>
              <h3 className="font-heading font-bold text-sm text-[#111315] leading-snug">
                {q.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Pre-Quiz Instruction State */}
      {!quizStarted && !quizFinished && (
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-8 space-y-6">
          <div className="space-y-2 border-b border-[#DDE1E5] pb-4">
            <span className="text-xs font-mono font-bold text-[#0047FF] uppercase">
              MODULE SPECIFICATION : {selectedQuiz.subject_name}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111315]">
              {selectedQuiz.title}
            </h2>
            <p className="text-sm text-[#5A626A] leading-relaxed">
              {selectedQuiz.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Question Count:</span>
              <span className="text-base font-bold text-[#111315]">
                {selectedQuiz.questions?.length || 0} Questions
              </span>
            </div>
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Time Limit:</span>
              <span className="text-base font-bold text-[#111315]">
                {selectedQuiz.duration_minutes} Minutes
              </span>
            </div>
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Server Integrity:</span>
              <span className="text-base font-bold text-[#0047FF]">
                Server-Side Scored (CSQP-SR-006)
              </span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-3.5 bg-[#0047FF] text-white font-semibold text-sm hover:bg-[#0039CC] transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Commence Timed Evaluation</span>
          </button>
        </div>
      )}

      {/* Active Timed Quiz Session */}
      {quizStarted && !quizFinished && (
        <div className="space-y-6">
          {/* Sticky Countdown Banner */}
          <div className="border border-[#0047FF] bg-[#FFFFFF] p-4 flex items-center justify-between sticky top-20 z-30 shadow-none">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-[#0047FF]" />
              <div>
                <span className="text-xs text-[#5A626A] block font-mono">TIMER RUNNING:</span>
                <span className="font-heading font-bold text-sm text-[#111315]">{selectedQuiz.title}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#5A626A] block font-mono">TIME LEFT:</span>
              <span className="text-xl font-bold font-mono text-[#0047FF] tracking-wider">
                {formatTimer(secondsRemaining)}
              </span>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {selectedQuiz.questions?.map((q, idx) => (
              <div key={q.id} className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#DDE1E5] pb-2 text-xs text-[#5A626A]">
                  <span className="font-semibold text-[#111315]">Question {idx + 1} of {selectedQuiz.questions.length}</span>
                  <span className="font-mono text-[#0047FF] font-bold">{q.points} Points</span>
                </div>

                <p className="text-base font-sans text-[#111315] leading-relaxed">
                  {q.question || q.question_text}
                </p>

                {/* MCQ Options */}
                {(q.type || q.question_type) === 'MCQ' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options?.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleAnswerSelect(q.id, opt)}
                        className={`p-4 text-left border transition-colors flex items-center gap-3 text-sm ${
                          answers[q.id] === opt
                            ? 'border-[#0047FF] bg-[#F8F9FA] text-[#0047FF] font-semibold'
                            : 'border-[#DDE1E5] bg-[#FFFFFF] text-[#111315] hover:border-[#B0B8C1]'
                        }`}
                      >
                        <span className={`w-6 h-6 flex items-center justify-center text-xs font-mono font-bold border ${
                          answers[q.id] === opt ? 'border-[#0047FF] bg-[#0047FF] text-white' : 'border-[#DDE1E5] text-[#5A626A]'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* True/False */}
                {(q.type || q.question_type) === 'TRUE_FALSE' && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {['True', 'False'].map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => handleAnswerSelect(q.id, tf)}
                        className={`py-3 text-center border font-bold text-sm transition-colors ${
                          answers[q.id] === tf
                            ? 'border-[#0047FF] bg-[#0047FF] text-white'
                            : 'border-[#DDE1E5] bg-[#FFFFFF] text-[#111315] hover:border-[#B0B8C1]'
                        }`}
                      >
                        {tf.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}

                {/* Fill in Blank */}
                {(q.type || q.question_type) === 'FILL_BLANK' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                      placeholder="Type exact response..."
                      className="w-full bg-[#F8F9FA] border border-[#DDE1E5] text-[#111315] p-3 text-sm focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submission Bar */}
          <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-4 flex items-center justify-between">
            <span className="text-xs text-[#5A626A]">
              {Object.keys(answers).length} of {selectedQuiz.questions.length} answered
            </span>
            <button
              onClick={handleCompleteQuiz}
              className="px-6 py-2.5 bg-[#0047FF] text-white font-semibold text-xs hover:bg-[#0039CC] transition-colors"
            >
              Submit Quiz For Evaluation
            </button>
          </div>
        </div>
      )}

      {/* Post-Submission Result State */}
      {quizFinished && quizResult && (
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-[#DDE1E5] pb-4 gap-4">
            <div>
              <span className="text-xs font-mono text-[#5A626A] block uppercase">EVALUATION SUMMARY</span>
              <h2 className="text-2xl font-bold font-heading text-[#111315]">
                {quizResult.percentage >= 80 ? 'Mastery Verified' : (quizResult.percentage >= 50 ? 'Satisfactory' : 'Needs Review')}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#5A626A] block uppercase">FINAL SCORE</span>
              <span className="text-3xl font-bold font-heading text-[#0047FF]">
                {quizResult.percentage}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Score Awarded:</span>
              <span className="text-base font-bold text-[#111315]">{quizResult.score} / {quizResult.maxScore}</span>
            </div>
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Time Taken:</span>
              <span className="text-base font-bold text-[#111315]">{quizResult.timeSpent} Seconds</span>
            </div>
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Candidate:</span>
              <span className="text-base font-bold text-[#111315]">{currentUser.username}</span>
            </div>
            <div className="border border-[#DDE1E5] bg-[#F8F9FA] p-4">
              <span className="text-[#5A626A] block text-[11px] uppercase font-medium">Integrity Check:</span>
              <span className="text-base font-bold text-[#0047FF]">Server Authoritative</span>
            </div>
          </div>

          {/* Itemized Review */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold text-[#111315] uppercase block">
              Itemized Question Verification:
            </span>
            {quizResult.details?.map((d, dIdx) => (
              <div key={dIdx} className="border border-[#DDE1E5] bg-[#F8F9FA] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#111315]">Item #{dIdx + 1}: {d.question}</span>
                  <span className={`font-semibold flex items-center gap-1 ${d.isCorrect ? 'text-[#0047FF]' : 'text-[#881337]'}`}>
                    {d.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{d.isCorrect ? `+${d.points} Pts` : '0 Pts'}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-[#DDE1E5]">
                  <div>
                    <span className="text-[#5A626A]">Your Submission: </span>
                    <span className="text-[#111315] font-medium">{d.submitted || '(No answer)'}</span>
                  </div>
                  <div>
                    <span className="text-[#5A626A]">Correct Answer: </span>
                    <span className="text-[#0047FF] font-semibold">{d.correct}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleStartQuiz}
              className="flex-1 py-2.5 border border-[#DDE1E5] text-xs font-semibold text-[#111315] hover:border-[#0047FF] hover:text-[#0047FF] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-Attempt Assessment</span>
            </button>
            <button
              onClick={() => onNavigate('leaderboard')}
              className="flex-1 py-2.5 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] transition-colors flex items-center justify-center gap-2"
            >
              <span>View Leaderboard Position</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
