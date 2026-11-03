// ============================================================
// Application-wide TypeScript Types
// ============================================================

// ── Chapter Navigation ─────────────────────────────────────
export interface Chapter {
  id: number;
  slug: string;
  title: string;
  emoji: string;
  description: string;
  completed: boolean;
  visited: boolean;
}

export type ChapterSlug =
  | 'invitation'
  | 'welcome-letter'
  | 'sky-wishes'
  | 'little-reasons'
  | 'bestie-quiz'
  | 'more-likely'
  | 'this-or-that'
  | 'time-capsule'
  | 'open-whenever'
  | 'birthday-cake'
  | 'compliment-machine'
  | 'unfiltered-vault'
  | 'golden-milestones'
  | 'final-letter'
  | 'final-surprise';

// ── Progress ───────────────────────────────────────────────
export interface JourneyProgress {
  currentChapter: number;
  completedChapters: number[];
  visitedChapters: number[];
  favouritePhotoIds: string[];
  lastSaved: string;
}

// ── Quiz ───────────────────────────────────────────────────
export type QuestionType = 'multiple-choice' | 'true-false';

export interface QuizQuestion {
  id: string;
  category: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctIndex: number | null;
  isOpinion?: boolean;
  feedback: { correct: string; wrong: string };
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean | null; // null for opinion questions
}

export interface QuizSession {
  answers: QuizAnswer[];
  score: number;
  totalFactual: number;
  percentage: number;
  completedAt: string;
}

// ── Time Capsule ───────────────────────────────────────────
export interface TimeCapsuleAnswer {
  promptId: string;
  answer: string;
}

export interface TimeCapsuleSession {
  answers: TimeCapsuleAnswer[];
  submittedAt?: string;
  localDraft: boolean;
}

// ── Submission Types (sent to backend) ────────────────────
export interface QuizSubmissionPayload {
  submissionType: 'quiz';
  sessionId: string;
  answers: QuizAnswer[];
  score: number;
  totalFactual: number;
  percentage: number;
}

export interface TimeCapsuleSubmissionPayload {
  submissionType: 'timecapsule';
  sessionId: string;
  answers: TimeCapsuleAnswer[];
}

export type SubmissionPayload =
  | QuizSubmissionPayload
  | TimeCapsuleSubmissionPayload;

// ── Submission Response ────────────────────────────────────
export interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  error?: string;
}

// ── Image URL Response (from signed-URL endpoint) ─────────
export interface SignedUrlResponse {
  url: string;
  expiresAt: string;
}

// ── Access Gate ─────────────────────────────────────────────
export interface AccessCheckResponse {
  authorized: boolean;
  sessionToken?: string;
  error?: string;
}

// ── Photo State ─────────────────────────────────────────────
export type ImageLoadState = 'loading' | 'loaded' | 'error';

export interface PhotoState {
  loadState: ImageLoadState;
  signedUrl: string | null;
  thumbUrl: string | null;
}

// ── More Likely ─────────────────────────────────────────────
export type MoreLikelyOption = 'Me' | 'You' | 'Both' | 'Neither';

export interface MoreLikelyAnswer {
  promptId: string;
  choice: MoreLikelyOption;
}

// ── This or That ─────────────────────────────────────────────
export interface ThisOrThatAnswer {
  choiceId: string;
  selected: 'a' | 'b';
}

// ── Game ──────────────────────────────────────────────────
export interface GameScore {
  game: 'heart-catch' | 'memory-match' | 'mystery-reveal';
  score: number;
  achievedAt: string;
}
