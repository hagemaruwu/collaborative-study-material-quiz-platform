// Accredited Computer Science Assessment Ledger
// Topics: Algorithms (CS-304), Distributed Consensus (CS-308), Software Architecture (CS-312)

export const INITIAL_QUIZZES = [
  {
    id: 1,
    title: 'CS-304: Dynamic Programming & Shortest Path Convergence',
    description: 'Formal verification of Bellman-Ford relaxation invariants and negative cycle detection bounds.',
    subject_id: 1,
    subject_name: 'Algorithms & Complexity',
    topic_id: 1,
    topic_name: 'Dynamic Programming',
    duration_minutes: 5,
    randomize_questions: 1,
    instant_results: 1,
    questions: [
      {
        id: 1001,
        question: 'What is the tight worst-case time complexity of the standard Bellman-Ford algorithm on a graph G = (V, E)?',
        type: 'MCQ',
        options: ['O(|V| * |E|)', 'O(|V|^2)', 'O(|E| log |V|)', 'O(|V| + |E|)'],
        correct_answer: 'O(|V| * |E|)',
        points: 2
      },
      {
        id: 1002,
        question: 'Dijkstra algorithm guarantees optimal paths on directed graphs containing negative-weight edges without cycles.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_answer: 'False',
        points: 1
      },
      {
        id: 1003,
        question: 'How many iterations of edge relaxation are strictly sufficient to guarantee shortest paths if no negative cycles exist? (Enter algebraic term)',
        type: 'FILL_BLANK',
        correct_answer: '|V| - 1',
        points: 2
      }
    ]
  },
  {
    id: 2,
    title: 'CS-308: Raft Consensus & State Machine Replication Invariants',
    description: 'Leader election safety, split-vote mitigation bounds, and log matching invariants.',
    subject_id: 2,
    subject_name: 'Distributed Systems',
    topic_id: 2,
    topic_name: 'Raft Consensus',
    duration_minutes: 8,
    randomize_questions: 1,
    instant_results: 1,
    questions: [
      {
        id: 2001,
        question: 'Which mechanism is used by Raft to resolve split-vote scenarios during concurrent candidate elections?',
        type: 'MCQ',
        options: [
          'Randomized election timeouts per node',
          'Two-phase commit consensus round',
          'Paxos ballot number escalation',
          'Centralized master node arbitration'
        ],
        correct_answer: 'Randomized election timeouts per node',
        points: 2
      },
      {
        id: 2002,
        question: 'In Raft, a leader can overwrite or truncate entries in its own log once written.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_answer: 'False',
        points: 1
      },
      {
        id: 2003,
        question: 'What is the RPC name used by a Raft leader for log replication and periodic heartbeats?',
        type: 'FILL_BLANK',
        correct_answer: 'AppendEntries',
        points: 2
      }
    ]
  },
  {
    id: 3,
    title: 'CS-312: Strict 3-Layered Architecture Isolation',
    description: 'Interface contracts (I1, I2) and architectural erosion prevention.',
    subject_id: 3,
    subject_name: 'Software Architecture',
    topic_id: 3,
    topic_name: 'Layered Architecture',
    duration_minutes: 6,
    randomize_questions: 1,
    instant_results: 1,
    questions: [
      {
        id: 3001,
        question: 'In a strict 3-layered architecture, which layer is strictly forbidden from directly querying the relational database?',
        type: 'MCQ',
        options: [
          'Presentation Layer (UI Views)',
          'Business Logic Service Layer',
          'Data Access Object (DAO)',
          'Persistence Driver Engine'
        ],
        correct_answer: 'Presentation Layer (UI Views)',
        points: 2
      },
      {
        id: 3002,
        question: 'Architectural sinkhole anti-pattern occurs when requests flow through intermediate layers with zero domain processing.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_answer: 'True',
        points: 1
      }
    ]
  }
];

export const INITIAL_LEADERBOARD = [
  { id: 1, username: 'adityaraj', score: 10, max_score: 10, percentage: 100.0, time_taken_seconds: 42, completed_at: '2026-10-28 14:15:00 UTC' },
  { id: 2, username: 'amrit', score: 9, max_score: 10, percentage: 90.0, time_taken_seconds: 58, completed_at: '2026-10-28 14:20:10 UTC' },
  { id: 3, username: 'sheiman', score: 9, max_score: 10, percentage: 90.0, time_taken_seconds: 64, completed_at: '2026-10-28 14:31:05 UTC' },
  { id: 4, username: 'ahan', score: 8, max_score: 10, percentage: 80.0, time_taken_seconds: 75, completed_at: '2026-10-28 15:01:22 UTC' }
];
