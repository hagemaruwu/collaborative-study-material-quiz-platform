import React from 'react';
import { Trophy, Award, Clock, ArrowRight } from 'lucide-react';

export default function LeaderboardPage({
  leaderboard,
  currentUser,
  onNavigate
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#0047FF] font-semibold mb-1">
            MODULE 04 : PERFORMANCE RANKINGS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
            Institutional Student Leaderboard (TC-QUIZ-07)
          </h1>
          <p className="text-sm text-[#5A626A] mt-1 max-w-2xl">
            Real-time assessment rankings across PES University curriculum modules. Attempts are ordered primarily by highest percentage and tie-broken by lowest elapsed duration.
          </p>
        </div>

        <button
          onClick={() => onNavigate('quizzes')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0039CC] transition-colors"
        >
          <Award className="w-4 h-4" />
          <span>Take a Quiz to Compete</span>
        </button>
      </div>

      {/* Leaderboard Table Card */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] overflow-hidden">
        <div className="p-4 border-b border-[#DDE1E5] bg-[#F8F9FA] flex items-center justify-between text-xs text-[#5A626A] font-mono">
          <span>RANKING CRITERIA: SCORE DESCENDING, TIME ASCENDING</span>
          <span>{leaderboard.length} RECORDED SUBMISSIONS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-[#DDE1E5] text-xs font-mono text-[#5A626A] bg-[#FFFFFF] uppercase">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Elapsed Duration</th>
                <th className="py-3 px-4">Completed Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE1E5]">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.username === currentUser.username;
                return (
                  <tr 
                    key={entry.id} 
                    className={`transition-colors ${
                      isCurrentUser ? 'bg-[#F8F9FA] font-medium' : 'hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      {index === 0 && <span className="text-[#0047FF]">#1 [Top]</span>}
                      {index === 1 && <span className="text-[#111315]">#2</span>}
                      {index === 2 && <span className="text-[#111315]">#3</span>}
                      {index > 2 && <span className="text-[#5A626A]">#{index + 1}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-[#111315]">
                      <span className="font-semibold">{entry.username}</span>
                      {isCurrentUser && (
                        <span className="ml-2 px-1.5 py-0.5 bg-[#0047FF] text-white text-[10px] font-mono">
                          YOU
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#5A626A] font-mono">
                      {entry.score} / {entry.max_score}
                    </td>
                    <td className="py-3.5 px-4 font-heading font-bold text-base text-[#111315]">
                      {entry.percentage}%
                    </td>
                    <td className="py-3.5 px-4 text-[#5A626A] font-mono">
                      {entry.time_taken_seconds} seconds
                    </td>
                    <td className="py-3.5 px-4 text-[#5A626A] text-xs font-mono">
                      {entry.completed_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
