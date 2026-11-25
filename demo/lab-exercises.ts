// Demo example — a small security-training lesson engine in TypeScript.
// Illustrative example only, not product code.

export interface Question {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface LessonResult {
  total: number;
  correct: number;
  scorePercent: number;
  passed: boolean;
  missedTopics: string[];
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q1",
    topic: "Passwords",
    prompt: "Which password is strongest?",
    options: ["password123", "Summer2024", "Tr0ub4dor&3", "qwerty"],
    answerIndex: 2,
    explanation: "Length plus mixed character types beats common words and dates.",
  },
  {
    id: "q2",
    topic: "Phishing",
    prompt: "An email asks you to reset your password via a link. What do you do?",
    options: [
      "Click the link at once",
      "Reply asking if it is real",
      "Go to the site yourself and check",
      "Forward it to everyone",
    ],
    answerIndex: 2,
    explanation: "Never trust links in unexpected mail — reach the site yourself.",
  },
  {
    id: "q3",
    topic: "Updates",
    prompt: "Why do security updates matter?",
    options: [
      "They change the design",
      "They fix known vulnerabilities",
      "They make the app slower",
      "They are optional extras",
    ],
    answerIndex: 1,
    explanation: "Updates patch holes attackers already know about.",
  },
  {
    id: "q4",
    topic: "Wi-Fi",
    prompt: "Is public Wi-Fi safe for work logins without a VPN?",
    options: ["Yes, always", "Yes, if the network has a password", "No — traffic can be intercepted", "Only in hotels"],
    answerIndex: 2,
    explanation: "Open networks let others watch unencrypted traffic.",
  },
];

/** Grade a set of answers (question id -> chosen option index). */
export function gradeLesson(
  questions: Question[],
  answers: Record<string, number>,
): LessonResult {
  let correct = 0;
  const missedTopics: string[] = [];
  for (const q of questions) {
    if (answers[q.id] === q.answerIndex) {
      correct += 1;
    } else if (!missedTopics.includes(q.topic)) {
      missedTopics.push(q.topic);
    }
  }
  const scorePercent = Math.round((correct / questions.length) * 100);
  return {
    total: questions.length,
    correct,
    scorePercent,
    passed: scorePercent >= 70,
    missedTopics,
  };
}

/** Suggest the next topic to revise from a graded result. */
export function nextTopicToRevise(result: LessonResult): string | null {
  return result.missedTopics[0] ?? null;
}
