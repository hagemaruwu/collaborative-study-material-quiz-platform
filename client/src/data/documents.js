export const ACADEMIC_SUBJECTS = [
  { id: 'CS-304', name: 'Algorithms & Complexity', topics: ['Dynamic Programming', 'Graph Theory', 'Network Flow'] },
  { id: 'CS-308', name: 'Distributed Systems', topics: ['Raft Consensus', 'Vector Clocks', 'CAP Theorem'] },
  { id: 'CS-312', name: 'Software Architecture', topics: ['Layered Architecture', 'Microservices', 'Event-Driven'] },
  { id: 'CS-301', name: 'Computer Systems', topics: ['Virtual Memory', 'Cache Coherence', 'Branch Prediction'] },
];

export const INITIAL_DOCUMENTS = [
  {
    id: 101,
    subjectId: 'CS-304',
    topic: 'Dynamic Programming',
    title: 'Optimal Substructure & Bellman-Ford Shortest Path Recurrence',
    author: 'Aditya Raj',
    authorSrn: 'PES2UG24CS033',
    version: 3,
    updatedAt: '2026-10-28 14:10:20 UTC',
    rating: 4.9,
    ratingCount: 14,
    tags: ['EXAM SPEC', 'VERIFIED'],
    summary: 'Formal recurrence relations, relaxation invariants, and negative cycle detection proof.',
    content: `## 1. Problem Formulation and Recurrence Relation

Given a directed weighted graph G = (V, E) with arbitrary edge weights and a source vertex s in V, the Bellman-Ford recurrence computes the shortest distance from s to all vertices v in V using at most k edges.

### Recurrence Definition:
Let OPT(i, v) be the minimum weight of a path from s to v using at most i edges:

OPT(i, v) = min( OPT(i - 1, v), min_{(u, v) in E} { OPT(i - 1, u) + w(u, v) } )

Base Cases:
- OPT(0, s) = 0
- OPT(0, v) = infinity for all v != s

## 2. Invariant and Complexity

- Space Complexity: O(|V|) auxiliary memory using in-place relaxation.
- Time Complexity: O(|V| * |E|) worst case.
- Negative Cycle Property: If a path can be relaxed on the |V|-th iteration, a negative-weight cycle reachable from source exists.

\`\`\`c
// Reference Implementation: Edge Relaxation Kernel
void bellman_ford_relax(Edge edges[], int num_edges, int dist[], int V, int src) {
    for (int i = 0; i < V; ++i) dist[i] = INF;
    dist[src] = 0;
    
    for (int i = 1; i <= V - 1; ++i) {
        for (int j = 0; j < num_edges; ++j) {
            int u = edges[j].u;
            int v = edges[j].v;
            int w = edges[j].weight;
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
}
\`\`\`

## 3. Exam Problem Notes: Distributed Routing Convergence
In distance-vector routing protocols (such as RIP based on Bellman-Ford), convergence time is bounded by the network diameter. Count-to-infinity anomalies occur when an edge failure produces closed relaxation loops without split-horizon poison reverse.`,
    history: [
      {
        version: 3,
        author: 'Aditya Raj',
        timestamp: '2026-10-28 14:10:20 UTC',
        summary: 'Added C edge relaxation kernel and distance-vector protocol notes',
        hash: '9a71f92'
      },
      {
        version: 2,
        author: 'Ahan Charan',
        timestamp: '2026-10-25 10:42:00 UTC',
        summary: 'Corrected base case boundary condition for source vertex s',
        hash: 'b3aada2'
      },
      {
        version: 1,
        author: 'Amrit Raj Anmol',
        timestamp: '2026-10-20 09:15:30 UTC',
        summary: 'Initial structural draft and formal recurrence definition',
        hash: '0736953'
      }
    ]
  },
  {
    id: 102,
    subjectId: 'CS-308',
    topic: 'Raft Consensus',
    title: 'Raft Consensus Protocol: Leader Election & Log Replication Invariants',
    author: 'Amrit Raj Anmol',
    authorSrn: 'PES2UG24CS056',
    version: 2,
    updatedAt: '2026-10-27 18:24:10 UTC',
    rating: 5.0,
    ratingCount: 22,
    tags: ['CORE CURRICULUM', 'VERIFIED'],
    summary: 'State machine replication, split-vote mitigation via randomized timers, and log matching property.',
    content: `## 1. Raft Architectural Invariants

Raft decomposes distributed consensus into three independent subproblems:
1. Leader Election: A new leader must be selected when an existing leader fails.
2. Log Replication: The leader must accept log entries from clients and propagate them across cluster nodes.
3. Safety: If any server has applied a particular log entry to its state machine, no other server may apply a different entry for the same log index.

## 2. Term Transitions and Election Safety

Each server exists in one of three states:
- LEADER: Handles all client requests and replicates logs via AppendEntries RPC.
- FOLLOWER: Passive; responds to incoming RPCs from leaders and candidates.
- CANDIDATE: Used to elect a new leader.

\`\`\`python
# Randomized Heartbeat Timeout Logic
import random

ELECTION_TIMEOUT_MIN = 150  # milliseconds
ELECTION_TIMEOUT_MAX = 300  # milliseconds

def get_randomized_election_timeout():
    return random.uniform(ELECTION_TIMEOUT_MIN, ELECTION_TIMEOUT_MAX)
\`\`\`

## 3. Log Matching Invariant
If two logs contain an entry with the same index and term:
- Then the logs are identical in all entries up through the given index.
- If a given entry is committed, it will be present in the logs of all leaders for terms following.`,
    history: [
      {
        version: 2,
        author: 'A Sheiman Joshi',
        timestamp: '2026-10-27 18:24:10 UTC',
        summary: 'Added randomized timeout boundaries and Log Matching proof steps',
        hash: 'd3727c7'
      },
      {
        version: 1,
        author: 'Amrit Raj Anmol',
        timestamp: '2026-10-22 11:00:15 UTC',
        summary: 'Initial document creation: 3-state state machine and RPC spec',
        hash: '963f699'
      }
    ]
  },
  {
    id: 103,
    subjectId: 'CS-312',
    topic: 'Layered Architecture',
    title: 'Strict 3-Layered Architecture vs Architectural Erosion in Enterprise Systems',
    author: 'A Sheiman Joshi',
    authorSrn: 'PES2UG24CS003',
    version: 1,
    updatedAt: '2026-10-23 16:05:00 UTC',
    rating: 4.8,
    ratingCount: 19,
    tags: ['ARCHITECTURE', 'LAB SPEC'],
    summary: 'Decoupling presentation from data persistence via strict service contracts and interface isolation.',
    content: `## 1. Architectural Definition and Layer Invariants

The 3-Layered Architecture partitions an application into three discrete tiers:
1. Presentation Layer (UI / Views): Purely declarative rendering; zero direct SQL access.
2. Business Logic Layer (Services): Contains domain rules, transactional authorization, and input validation.
3. Data Access Layer (DAO / Persistence): Manages connection pooling, relational schemas, and physical storage.

## 2. Preventing Architectural Erosion

Architectural erosion occurs when dependencies bypass intermediate layers:
- Violation: The UI directly executing SQL queries against the database.
- Consequence: High coupling, impossible unit testing, and catastrophic security leakages.
- Remediation: Interface contracts I1 (HTTP/JSON REST) and I2 (synchronous DAO methods).

\`\`\`
[ Presentation Layer: UI / Static Assets ]
             |
             | Interface I1 (JSON REST APIs)
             v
[ Business Logic Layer: Express / Services ]
             |
             | Interface I2 (Prepared Statements DAO)
             v
[ Data Access Layer: SQLite Engine ]
\`\`\``,
    history: [
      {
        version: 1,
        author: 'A Sheiman Joshi',
        timestamp: '2026-10-23 16:05:00 UTC',
        summary: 'Approved SAD baseline release for CSQP evaluation',
        hash: 'b821d75'
      }
    ]
  }
];
