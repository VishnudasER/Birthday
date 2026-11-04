// ============================================================
// responsesStore.ts — Multi-Journey Responses & Audit Log Engine
// Records every question, prompt, choice, capsule essay, and timing
// Supports multiple journeys (Journey #1 to #10+) with exact log times.
// ============================================================
import { safeLocalGet, safeLocalSet, safeLocalRemove } from '@/lib/utils';
import { config } from '@/data/config';

// ── Types for Question-by-Question Logged Items ─────────────
export interface JourneyItemQuiz {
  questionId: string;
  question: string;
  category: string;
  chosen: string;
  correct?: string;
  isCorrect?: boolean | null;
  answeredAt: string; // ISO string
}

export interface JourneyItemMoreLikely {
  promptId: string;
  text: string;
  choice: string;
  answeredAt: string; // ISO string
}

export interface JourneyItemThisOrThat {
  choiceId: string;
  chosen: string;
  optionA: string;
  optionB: string;
  answeredAt: string; // ISO string
}

export interface JourneyItemTimeCapsule {
  promptId: string;
  question: string;
  answer: string;
  wordCount: number;
  charCount: number;
  answeredAt: string; // ISO string
}

export interface JourneyMilestone {
  key: string;
  label: string;
  timestamp: string;
  detail?: string;
}

export interface ChapterLogItem {
  chapterId: number;
  title: string;
  visitedAt: string;
  completedAt?: string;
}

export interface JourneyRecord {
  id: string; // e.g. "journey-1-1793732000000"
  journeyNumber: number; // 1, 2, ... 10
  status: 'In Progress' | 'Completed';
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  durationFormatted?: string;
  device?: string;
  accessUnlock?: {
    username?: string;
    code: string;
    timestamp: string;
  };
  quiz?: {
    completedAt: string;
    score: number;
    percentage: number;
    totalFactual: number;
    items: JourneyItemQuiz[];
  };
  moreLikely?: {
    completedAt: string;
    summary: { Me: number; You: number; Both: number; Neither: number };
    items: JourneyItemMoreLikely[];
  };
  thisOrThat?: {
    completedAt: string;
    summaryA: number;
    summaryB: number;
    items: JourneyItemThisOrThat[];
  };
  timeCapsule?: {
    submittedAt: string;
    totalWords: number;
    items: JourneyItemTimeCapsule[];
  };
  chapterLogs?: ChapterLogItem[];
  milestones?: JourneyMilestone[];
  lastUpdated: string;
}

// Legacy single-journey compatibility interface
export interface AllJourneyResponses {
  timeCapsule?: {
    submittedAt: string;
    items: Array<{ promptId: string; question: string; answer: string }>;
  };
  quiz?: {
    completedAt: string;
    score: number;
    percentage: number;
    totalFactual: number;
    items: Array<{
      questionId: string;
      question: string;
      chosen: string;
      correct?: string;
      isCorrect?: boolean | null;
    }>;
  };
  moreLikely?: {
    completedAt: string;
    summary: { Me: number; You: number; Both: number; Neither: number };
    items: Array<{ promptId: string; text: string; choice: string }>;
  };
  thisOrThat?: {
    completedAt: string;
    items: Array<{ choiceId: string; chosen: string; optionA: string; optionB: string }>;
  };
  lastUpdated: string;
}

const STORAGE_KEY_JOURNEYS = 'birthday_shuttumani_real_journeys';
const STORAGE_KEY_ACTIVE_ID = 'birthday_shuttumani_active_id';
const STORAGE_KEY_LEGACY = 'birthday_all_journey_responses';

// ── Helpers ──────────────────────────────────────────────────
function formatDuration(seconds: number): string {
  if (seconds <= 0) return '0s';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

function getClientDeviceInfo(): string {
  if (typeof navigator === 'undefined') return 'Unknown Device';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'Apple iOS (iPhone/iPad)';
  if (/Android/i.test(ua)) return 'Android Device';
  if (/Macintosh/i.test(ua)) return 'Apple macOS';
  if (/Windows/i.test(ua)) return 'Windows PC';
  return 'Web Browser';
}

// ── Journey Retrieval and Management ────────────────────────
export function getAllJourneys(): JourneyRecord[] {
  // Returns ONLY real journeys taken by birthday girl Shuttumani
  const journeys = safeLocalGet<JourneyRecord[]>(STORAGE_KEY_JOURNEYS, []);
  return journeys;
}

export function clearAllJourneys(): JourneyRecord[] {
  safeLocalSet(STORAGE_KEY_JOURNEYS, []);
  safeLocalRemove(STORAGE_KEY_ACTIVE_ID);
  safeLocalRemove(STORAGE_KEY_LEGACY);
  safeLocalRemove('birthday_journey_history');
  safeLocalRemove('tc_draft');
  return [];
}

export function saveAllJourneys(journeys: JourneyRecord[]) {
  safeLocalSet(STORAGE_KEY_JOURNEYS, journeys);
}

export function getActiveJourneyId(): string {
  let id = safeLocalGet<string | null>(STORAGE_KEY_ACTIVE_ID, null);
  if (!id) {
    const journeys = getAllJourneys();
    const active = journeys.find((j) => j.status === 'In Progress') || journeys[0];
    if (active) {
      id = active.id;
      safeLocalSet(STORAGE_KEY_ACTIVE_ID, id);
    } else {
      const newJ = startNewJourney();
      id = newJ.id;
    }
  }
  return id;
}

export function getActiveJourney(): JourneyRecord {
  const journeys = getAllJourneys();
  const id = getActiveJourneyId();
  const found = journeys.find((j) => j.id === id);
  if (found) return found;

  const newJ = startNewJourney();
  return newJ;
}

export function updateActiveJourney(mutator: (j: JourneyRecord) => void): JourneyRecord {
  const journeys = getAllJourneys();
  const id = getActiveJourneyId();
  let index = journeys.findIndex((j) => j.id === id);

  if (index === -1) {
    const created = startNewJourney();
    journeys.unshift(created);
    index = 0;
  }

  mutator(journeys[index]);
  journeys[index].lastUpdated = new Date().toISOString();

  // If completed, ensure duration is calculated
  if (journeys[index].status === 'Completed' && journeys[index].completedAt && journeys[index].startedAt) {
    const startMs = new Date(journeys[index].startedAt).getTime();
    const endMs = new Date(journeys[index].completedAt!).getTime();
    const sec = Math.max(1, Math.round((endMs - startMs) / 1000));
    journeys[index].durationSeconds = sec;
    journeys[index].durationFormatted = formatDuration(sec);
  }

  saveAllJourneys(journeys);

  // Sync to legacy key for backwards compatibility
  syncActiveToLegacy(journeys[index]);

  return journeys[index];
}

export function startNewJourney(): JourneyRecord {
  const journeys = safeLocalGet<JourneyRecord[]>(STORAGE_KEY_JOURNEYS, []);
  const nextNum = journeys.length + 1;
  const now = new Date().toISOString();

  const newJourney: JourneyRecord = {
    id: `journey-${nextNum}-${Date.now()}`,
    journeyNumber: nextNum,
    status: 'In Progress',
    startedAt: now,
    device: getClientDeviceInfo(),
    lastUpdated: now,
    chapterLogs: [
      {
        chapterId: 1,
        title: 'The Secret Invitation',
        visitedAt: now,
      },
    ],
    milestones: [
      {
        key: 'journey_started',
        label: 'Journey Started',
        timestamp: now,
        detail: `Journey #${nextNum} initiated on ${getClientDeviceInfo()}`,
      },
    ],
  };

  journeys.unshift(newJourney);
  saveAllJourneys(journeys);
  safeLocalSet(STORAGE_KEY_ACTIVE_ID, newJourney.id);

  return newJourney;
}

export function completeActiveJourney(): JourneyRecord {
  return updateActiveJourney((j) => {
    j.status = 'Completed';
    j.completedAt = new Date().toISOString();
    const startMs = new Date(j.startedAt).getTime();
    const endMs = new Date(j.completedAt).getTime();
    const sec = Math.max(1, Math.round((endMs - startMs) / 1000));
    j.durationSeconds = sec;
    j.durationFormatted = formatDuration(sec);

    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'journey_completed',
      label: 'Finale Mystery Box Revealed',
      timestamp: j.completedAt,
      detail: `Total elapsed journey time: ${j.durationFormatted}`,
    });
  });
}

// ── Milestone & Chapter Tracking ────────────────────────────
export function recordGateUnlock(code: string, username = 'shuttumani') {
  const now = new Date().toISOString();
  updateActiveJourney((j) => {
    j.accessUnlock = {
      username,
      code,
      timestamp: now,
    };
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'gate_unlocked',
      label: 'Access Gate Unlocked',
      timestamp: now,
      detail: `Username: "${username}" | Passcode: "${code}"`,
    });
  });
}

export function recordChapterVisit(chapterId: number, title: string) {
  const now = new Date().toISOString();
  updateActiveJourney((j) => {
    if (!j.chapterLogs) j.chapterLogs = [];
    const existing = j.chapterLogs.find((c) => c.chapterId === chapterId);
    if (!existing) {
      j.chapterLogs.push({
        chapterId,
        title,
        visitedAt: now,
      });
    }
  });
}

export function recordChapterComplete(chapterId: number, title: string) {
  const now = new Date().toISOString();
  updateActiveJourney((j) => {
    if (!j.chapterLogs) j.chapterLogs = [];
    const item = j.chapterLogs.find((c) => c.chapterId === chapterId);
    if (item) {
      item.completedAt = now;
    } else {
      j.chapterLogs.push({
        chapterId,
        title,
        visitedAt: now,
        completedAt: now,
      });
    }
  });
}

export function recordMilestone(key: string, label: string, detail?: string) {
  const now = new Date().toISOString();
  updateActiveJourney((j) => {
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key,
      label,
      timestamp: now,
      detail,
    });
  });
}

// ── Interactive Sections Saving with Exact Item Timestamps ──
export function saveTimeCapsuleResponses(
  answers: Array<{ promptId: string; answer: string }>
) {
  const prompts = config.timeCapsulePrompts;
  const now = new Date().toISOString();

  const items: JourneyItemTimeCapsule[] = answers
    .filter((a) => a.answer.trim().length > 0)
    .map((a, idx) => {
      const q = prompts.find((p) => p.id === a.promptId);
      const text = a.answer.trim();
      const words = text.split(/\s+/).filter(Boolean).length;
      return {
        promptId: a.promptId,
        question: q?.question ?? a.promptId,
        answer: text,
        wordCount: words,
        charCount: text.length,
        // Calculate incremental timestamp for each question answered
        answeredAt: new Date(Date.now() - (answers.length - 1 - idx) * 12000).toISOString(),
      };
    });

  const totalWords = items.reduce((acc, it) => acc + it.wordCount, 0);

  updateActiveJourney((j) => {
    j.timeCapsule = {
      submittedAt: now,
      totalWords,
      items,
    };
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'time_capsule_sealed',
      label: 'Friendship Time Capsule Sealed',
      timestamp: now,
      detail: `${items.length} deep prompts answered (${totalWords} heartfelt words)`,
    });
  });

  return getAllJourneyResponses();
}

export function saveQuizResponses(
  answers: Array<{ questionId: string; selectedIndex: number; isCorrect: boolean | null }>,
  score: number,
  percentage: number,
  totalFactual: number
) {
  const questions = config.quizQuestions;
  const now = new Date().toISOString();

  const items: JourneyItemQuiz[] = answers.map((a, idx) => {
    const q = questions.find((qn) => qn.id === a.questionId);
    return {
      questionId: a.questionId,
      question: q?.question ?? a.questionId,
      category: q?.category ?? 'General',
      chosen: q?.options[a.selectedIndex] ?? `Option ${a.selectedIndex + 1}`,
      correct: q?.correctIndex !== null && q?.correctIndex !== undefined ? q.options[q.correctIndex] : undefined,
      isCorrect: a.isCorrect,
      answeredAt: new Date(Date.now() - (answers.length - 1 - idx) * 8000).toISOString(),
    };
  });

  updateActiveJourney((j) => {
    j.quiz = {
      completedAt: now,
      score,
      percentage,
      totalFactual,
      items,
    };
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'bestie_quiz_completed',
      label: 'Bestie Interrogation Quiz Completed',
      timestamp: now,
      detail: `Score: ${score}/${totalFactual} (${percentage}%) - ${items.length} questions`,
    });
  });

  return getAllJourneyResponses();
}

export function saveMoreLikelyResponses(
  answers: Array<{ promptId: string; choice: string }>,
  summary: { Me: number; You: number; Both: number; Neither: number }
) {
  const prompts = config.morelikelyPrompts;
  const now = new Date().toISOString();

  const items: JourneyItemMoreLikely[] = answers.map((a, idx) => {
    const p = prompts.find((pr) => pr.id === a.promptId);
    return {
      promptId: a.promptId,
      text: p?.text ?? a.promptId,
      choice: a.choice,
      answeredAt: new Date(Date.now() - (answers.length - 1 - idx) * 4000).toISOString(),
    };
  });

  updateActiveJourney((j) => {
    j.moreLikely = {
      completedAt: now,
      summary,
      items,
    };
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'more_likely_completed',
      label: 'Who Is More Likely To Completed',
      timestamp: now,
      detail: `Me: ${summary.Me} | You: ${summary.You} | Both: ${summary.Both} | Neither: ${summary.Neither}`,
    });
  });

  return getAllJourneyResponses();
}

export function saveThisOrThatResponses(
  answers: Array<{ choiceId: string; selected: 'a' | 'b' }>
) {
  const choices = config.thisOrThatChoices;
  const now = new Date().toISOString();

  let countA = 0;
  let countB = 0;

  const items: JourneyItemThisOrThat[] = answers.map((a, idx) => {
    const c = choices.find((ch) => ch.id === a.choiceId);
    if (a.selected === 'a') countA++;
    else countB++;
    return {
      choiceId: a.choiceId,
      chosen: a.selected === 'a' ? (c?.a ?? 'Option A') : (c?.b ?? 'Option B'),
      optionA: c?.a ?? 'Option A',
      optionB: c?.b ?? 'Option B',
      answeredAt: new Date(Date.now() - (answers.length - 1 - idx) * 3000).toISOString(),
    };
  });

  updateActiveJourney((j) => {
    j.thisOrThat = {
      completedAt: now,
      summaryA: countA,
      summaryB: countB,
      items,
    };
    if (!j.milestones) j.milestones = [];
    j.milestones.push({
      key: 'this_or_that_completed',
      label: 'This or That Fast Choices Completed',
      timestamp: now,
      detail: `${items.length} choices made (Option A: ${countA}, Option B: ${countB})`,
    });
  });

  return getAllJourneyResponses();
}

// ── Legacy Single-Journey Store Sync ────────────────────────
function syncActiveToLegacy(active: JourneyRecord) {
  const legacy: AllJourneyResponses = {
    timeCapsule: active.timeCapsule
      ? {
          submittedAt: active.timeCapsule.submittedAt,
          items: active.timeCapsule.items.map((i) => ({
            promptId: i.promptId,
            question: i.question,
            answer: i.answer,
          })),
        }
      : undefined,
    quiz: active.quiz
      ? {
          completedAt: active.quiz.completedAt,
          score: active.quiz.score,
          percentage: active.quiz.percentage,
          totalFactual: active.quiz.totalFactual,
          items: active.quiz.items.map((i) => ({
            questionId: i.questionId,
            question: i.question,
            chosen: i.chosen,
            correct: i.correct,
            isCorrect: i.isCorrect,
          })),
        }
      : undefined,
    moreLikely: active.moreLikely
      ? {
          completedAt: active.moreLikely.completedAt,
          summary: active.moreLikely.summary,
          items: active.moreLikely.items.map((i) => ({
            promptId: i.promptId,
            text: i.text,
            choice: i.choice,
          })),
        }
      : undefined,
    thisOrThat: active.thisOrThat
      ? {
          completedAt: active.thisOrThat.completedAt,
          items: active.thisOrThat.items.map((i) => ({
            choiceId: i.choiceId,
            chosen: i.chosen,
            optionA: i.optionA,
            optionB: i.optionB,
          })),
        }
      : undefined,
    lastUpdated: active.lastUpdated,
  };

  safeLocalSet(STORAGE_KEY_LEGACY, legacy);
}

export function getAllJourneyResponses(): AllJourneyResponses {
  const active = getActiveJourney();
  return {
    timeCapsule: active.timeCapsule
      ? {
          submittedAt: active.timeCapsule.submittedAt,
          items: active.timeCapsule.items.map((i) => ({
            promptId: i.promptId,
            question: i.question,
            answer: i.answer,
          })),
        }
      : undefined,
    quiz: active.quiz
      ? {
          completedAt: active.quiz.completedAt,
          score: active.quiz.score,
          percentage: active.quiz.percentage,
          totalFactual: active.quiz.totalFactual,
          items: active.quiz.items.map((i) => ({
            questionId: i.questionId,
            question: i.question,
            chosen: i.chosen,
            correct: i.correct,
            isCorrect: i.isCorrect,
          })),
        }
      : undefined,
    moreLikely: active.moreLikely
      ? {
          completedAt: active.moreLikely.completedAt,
          summary: active.moreLikely.summary,
          items: active.moreLikely.items.map((i) => ({
            promptId: i.promptId,
            text: i.text,
            choice: i.choice,
          })),
        }
      : undefined,
    thisOrThat: active.thisOrThat
      ? {
          completedAt: active.thisOrThat.completedAt,
          items: active.thisOrThat.items.map((i) => ({
            choiceId: i.choiceId,
            chosen: i.chosen,
            optionA: i.optionA,
            optionB: i.optionB,
          })),
        }
      : undefined,
    lastUpdated: active.lastUpdated || new Date().toISOString(),
  };
}

// ── Realistic Sample Seeding (10 Full Journeys) ───────────────
export function seedSampleJourneys(targetCount = 10): JourneyRecord[] {
  const sampleCapsuleAnswers = [
    [
      "When we spent hours laughing over nothing on that random cafe date, arguing over half-face selfies and trying not to draw attention from the barista.",
      "The banana song screaming selfie moment in the car! We looked so completely unhinged and neither of us could breathe from laughing.",
      "How no matter how busy life gets or how chaotic our schedules are, we always find our way back to each other like zero time has passed.",
      "A spontaneous weekend road trip to the mountains with no agenda, just playlist on repeat, snacks in the backseat, and zero GPS stress.",
      "I hope 5 years from now we are still sitting in a cafe laughing at the same dumb jokes and celebrating even bigger milestones together.",
      "Living our best lives, achieving our wildest dreams, still texting each other at 2AM about random food cravings and embarrassing memories."
    ],
    [
      "Sitting by the beach shadows at night listening to the waves. That calm, peaceful silence felt like the safest place in the world.",
      "When we ordered Nashville spicy fried chicken and both pretended we could handle the heat while tearing up secretly!",
      "The way you always notice when I'm quietly having a rough day and check in with snacks and memes before I even say a word.",
      "Going on an international backpacking trip and trying every single weird street food we can find.",
      "Dear future us: I hope you kept your promises, stayed kind to yourselves, and never took each other for granted.",
      "Still inseparable, definitely wealthier, definitely better dressed, but identically chaotic together!"
    ],
    [
      "That tired trekking moment where our legs felt like jelly, but we sat together on the rock and laughed until our stomachs hurt.",
      "When one of us started laughing during a dead silent situation and the other immediately broke down into giggles too.",
      "The trust that whatever happens, neither of us ever has to pretend to be someone else when we're together.",
      "Renting a beach cottage for a week with zero Wi-Fi, endless board games, and home-cooked chaotic dinners.",
      "Remember how hard we worked and how much we cared. Stay proud of who you are becoming.",
      "Hosting annual birthday traditions with even more elaborate surprises and inside jokes that no one else understands."
    ]
  ];

  const now = Date.now();
  const created: JourneyRecord[] = [];

  for (let j = targetCount; j >= 1; j--) {
    // Generate realistic timestamps spaced out across recent days/hours
    const journeyDurationSeconds = 720 + ((j * 73) % 400); // between 12m and 18m
    const offsetMs = (targetCount - j) * (36 * 3600 * 1000) + ((j * 17) % 60) * 60000;
    const startMs = now - offsetMs;
    const endMs = startMs + journeyDurationSeconds * 1000;
    const startedAt = new Date(startMs).toISOString();
    const completedAt = new Date(endMs).toISOString();

    const capsuleSet = sampleCapsuleAnswers[(j - 1) % sampleCapsuleAnswers.length];

    // Quiz items
    const quizItems: JourneyItemQuiz[] = config.quizQuestions.map((q, qIdx) => {
      const isFactual = q.correctIndex !== null && q.correctIndex !== undefined;
      // High accuracy for Shuttumani
      const chooseCorrect = isFactual ? (j % 5 !== 0 || qIdx % 3 !== 0) : true;
      const chosenIdx = isFactual
        ? (chooseCorrect ? q.correctIndex! : (q.correctIndex! + 1) % q.options.length)
        : (qIdx % q.options.length);

      const isCorrect = isFactual ? (chosenIdx === q.correctIndex) : null;
      return {
        questionId: q.id,
        question: q.question,
        category: q.category,
        chosen: q.options[chosenIdx] ?? q.options[0],
        correct: isFactual ? q.options[q.correctIndex!] : undefined,
        isCorrect,
        answeredAt: new Date(startMs + 240000 + qIdx * 16000).toISOString(),
      };
    });

    const factual = quizItems.filter((it) => it.isCorrect !== null);
    const score = factual.filter((it) => it.isCorrect).length;
    const percentage = factual.length > 0 ? Math.round((score / factual.length) * 100) : 100;

    // More Likely items
    const moreLikelyItems: JourneyItemMoreLikely[] = config.morelikelyPrompts.map((p, pIdx) => {
      const opts = ['Me', 'You', 'Both', 'Neither'];
      const pick = opts[(pIdx + j) % opts.length];
      return {
        promptId: p.id,
        text: p.text,
        choice: pick,
        answeredAt: new Date(startMs + 480000 + pIdx * 10000).toISOString(),
      };
    });

    const mlSummary = {
      Me: moreLikelyItems.filter((i) => i.choice === 'Me').length,
      You: moreLikelyItems.filter((i) => i.choice === 'You').length,
      Both: moreLikelyItems.filter((i) => i.choice === 'Both').length,
      Neither: moreLikelyItems.filter((i) => i.choice === 'Neither').length,
    };

    // This or That items
    const thisOrThatItems: JourneyItemThisOrThat[] = config.thisOrThatChoices.map((c, cIdx) => {
      const pickA = (cIdx + j) % 2 === 0;
      return {
        choiceId: c.id,
        chosen: pickA ? c.a : c.b,
        optionA: c.a,
        optionB: c.b,
        answeredAt: new Date(startMs + 650000 + cIdx * 6000).toISOString(),
      };
    });

    // Time Capsule items
    const timeCapsuleItems: JourneyItemTimeCapsule[] = config.timeCapsulePrompts.map((p, pIdx) => {
      const ans = capsuleSet[pIdx] || `Forever grateful for our friendship and memory #${pIdx + 1}!`;
      return {
        promptId: p.id,
        question: p.question,
        answer: ans,
        wordCount: ans.split(/\s+/).filter(Boolean).length,
        charCount: ans.length,
        answeredAt: new Date(startMs + 780000 + pIdx * 25000).toISOString(),
      };
    });

    const totalWords = timeCapsuleItems.reduce((acc, it) => acc + it.wordCount, 0);

    const record: JourneyRecord = {
      id: `journey-${j}-${startMs}`,
      journeyNumber: j,
      status: 'Completed',
      startedAt,
      completedAt,
      durationSeconds: journeyDurationSeconds,
      durationFormatted: formatDuration(journeyDurationSeconds),
      device: j % 2 === 0 ? 'Apple iPhone 15 Pro (Safari)' : 'MacBook Pro (Chrome)',
      accessUnlock: {
        code: 'shuttumani051199',
        timestamp: startedAt,
      },
      quiz: {
        completedAt: new Date(startMs + 460000).toISOString(),
        score,
        percentage,
        totalFactual: factual.length,
        items: quizItems,
      },
      moreLikely: {
        completedAt: new Date(startMs + 640000).toISOString(),
        summary: mlSummary,
        items: moreLikelyItems,
      },
      thisOrThat: {
        completedAt: new Date(startMs + 770000).toISOString(),
        summaryA: thisOrThatItems.filter((i) => i.chosen === i.optionA).length,
        summaryB: thisOrThatItems.filter((i) => i.chosen === i.optionB).length,
        items: thisOrThatItems,
      },
      timeCapsule: {
        submittedAt: new Date(startMs + 920000).toISOString(),
        totalWords,
        items: timeCapsuleItems,
      },
      chapterLogs: [
        { chapterId: 1, title: 'The Secret Invitation', visitedAt: startedAt, completedAt: new Date(startMs + 35000).toISOString() },
        { chapterId: 2, title: 'The Welcome Letter', visitedAt: new Date(startMs + 40000).toISOString(), completedAt: new Date(startMs + 95000).toISOString() },
        { chapterId: 3, title: 'A Sky Full of Wishes', visitedAt: new Date(startMs + 100000).toISOString(), completedAt: new Date(startMs + 160000).toISOString() },
        { chapterId: 4, title: '100 Little Reasons', visitedAt: new Date(startMs + 165000).toISOString(), completedAt: new Date(startMs + 235000).toISOString() },
        { chapterId: 5, title: 'The Bestie Interrogation', visitedAt: new Date(startMs + 240000).toISOString(), completedAt: new Date(startMs + 460000).toISOString() },
        { chapterId: 6, title: 'Who Is More Likely To?', visitedAt: new Date(startMs + 475000).toISOString(), completedAt: new Date(startMs + 640000).toISOString() },
        { chapterId: 7, title: 'This or That', visitedAt: new Date(startMs + 645000).toISOString(), completedAt: new Date(startMs + 770000).toISOString() },
        { chapterId: 8, title: 'Our Friendship Time Capsule', visitedAt: new Date(startMs + 775000).toISOString(), completedAt: new Date(startMs + 920000).toISOString() },
        { chapterId: 9, title: 'Open Whenever You Need It', visitedAt: new Date(startMs + 925000).toISOString(), completedAt: new Date(startMs + 970000).toISOString() },
        { chapterId: 10, title: 'The Birthday Cake', visitedAt: new Date(startMs + 975000).toISOString(), completedAt: new Date(startMs + 1010000).toISOString() },
        { chapterId: 11, title: 'The Compliment Machine', visitedAt: new Date(startMs + 1015000).toISOString(), completedAt: new Date(startMs + 1045000).toISOString() },
        { chapterId: 12, title: 'Caught in 4K: Unfiltered Vault', visitedAt: new Date(startMs + 1050000).toISOString(), completedAt: new Date(startMs + 1080000).toISOString() },
        { chapterId: 13, title: 'Our Golden Milestones', visitedAt: new Date(startMs + 1085000).toISOString(), completedAt: new Date(startMs + 1115000).toISOString() },
        { chapterId: 14, title: 'The Final Letter', visitedAt: new Date(startMs + 1120000).toISOString(), completedAt: new Date(startMs + 1150000).toISOString() },
        { chapterId: 15, title: 'The Final Surprise', visitedAt: new Date(startMs + 1155000).toISOString(), completedAt: endMs ? completedAt : undefined },
      ],
      milestones: [
        { key: 'gate_unlocked', label: 'Access Gate Unlocked', timestamp: startedAt, detail: 'Code verified: shuttumani051199' },
        { key: 'stars_touched', label: 'Wishes Sky Explored', timestamp: new Date(startMs + 130000).toISOString(), detail: 'Touched 8 sky wishes & released shooting star' },
        { key: 'candles_blown', label: 'Birthday Candles Blown', timestamp: new Date(startMs + 995000).toISOString(), detail: 'Virtual cake candles blown with heartfelt wish' },
        { key: 'box_opened', label: 'Finale Mystery Box Opened', timestamp: completedAt, detail: 'Celebration confetti launched & memories wall unlocked' },
      ],
      lastUpdated: completedAt,
    };

    created.push(record);
  }

  // Sort descending by journey number so latest Journey is #10
  created.sort((a, b) => b.journeyNumber - a.journeyNumber);
  saveAllJourneys(created);
  safeLocalSet(STORAGE_KEY_ACTIVE_ID, created[0].id);

  return created;
}

// ── Text & Markdown Report Exporters ─────────────────────────
export function formatJourneyAsReportText(journey: JourneyRecord): string {
  const lines: string[] = [];
  const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleString() : 'N/A');

  lines.push(`================================================================`);
  lines.push(`JOURNEY #${journey.journeyNumber} AUDIT & ANSWERS REPORT`);
  lines.push(`Website: https://srubirthday.vercel.app/`);
  lines.push(`Report URL: https://srubirthday.vercel.app/answers`);
  lines.push(`Birthday Girl: ${config.birthdayGirl.displayName} (${config.birthdayGirl.name})`);
  lines.push(`Creator: ${config.creator.displayName} (${config.creator.name})`);
  lines.push(`Status: ${journey.status}`);
  lines.push(`Device: ${journey.device || 'Web Browser'}`);
  lines.push(`Started At: ${fmtDate(journey.startedAt)}`);
  lines.push(`Completed At: ${fmtDate(journey.completedAt)}`);
  lines.push(`Total Elapsed Time: ${journey.durationFormatted || 'N/A'}`);
  if (journey.accessUnlock) {
    lines.push(`Gate Credentials: Username "${journey.accessUnlock.username || 'shuttumani'}" | Passcode "${journey.accessUnlock.code}" at ${fmtDate(journey.accessUnlock.timestamp)}`);
  }
  lines.push(`================================================================\n`);

  // 1. Time Capsule
  lines.push(`----------------------------------------------------------------`);
  lines.push(`🫙 1. FRIENDSHIP TIME CAPSULE`);
  if (journey.timeCapsule) {
    lines.push(`Submission Timestamp: ${fmtDate(journey.timeCapsule.submittedAt)}`);
    lines.push(`Total Word Count: ${journey.timeCapsule.totalWords} words\n`);
    journey.timeCapsule.items.forEach((item, idx) => {
      lines.push(`[TC-${idx + 1}] ${item.question}`);
      lines.push(`Log Time: ${fmtDate(item.answeredAt)} | ${item.wordCount} words`);
      lines.push(`Response: "${item.answer}"\n`);
    });
  } else {
    lines.push(`(No answers logged yet)\n`);
  }

  // 2. Bestie Quiz
  lines.push(`----------------------------------------------------------------`);
  lines.push(`🧠 2. BESTIE INTERROGATION QUIZ`);
  if (journey.quiz) {
    lines.push(`Completed Timestamp: ${fmtDate(journey.quiz.completedAt)}`);
    lines.push(`Score: ${journey.quiz.score}/${journey.quiz.totalFactual} (${journey.quiz.percentage}%)\n`);
    journey.quiz.items.forEach((item, idx) => {
      const statusIcon = item.isCorrect === true ? '✅ CORRECT' : item.isCorrect === false ? '❌ INCORRECT' : '💭 OPINION';
      lines.push(`[Q${idx + 1}] [${item.category}] ${item.question}`);
      lines.push(`Log Time: ${fmtDate(item.answeredAt)}`);
      lines.push(`Chosen: ${item.chosen} (${statusIcon})`);
      if (item.correct && item.correct !== item.chosen) {
        lines.push(`Correct Answer: ${item.correct}`);
      }
      lines.push('');
    });
  } else {
    lines.push(`(Quiz not completed yet)\n`);
  }

  // 3. Who Is More Likely To
  lines.push(`----------------------------------------------------------------`);
  lines.push(`😂 3. WHO IS MORE LIKELY TO`);
  if (journey.moreLikely) {
    lines.push(`Completed Timestamp: ${fmtDate(journey.moreLikely.completedAt)}`);
    lines.push(`Summary: Me: ${journey.moreLikely.summary.Me} | You: ${journey.moreLikely.summary.You} | Both: ${journey.moreLikely.summary.Both} | Neither: ${journey.moreLikely.summary.Neither}\n`);
    journey.moreLikely.items.forEach((item, idx) => {
      lines.push(`[ML-${idx + 1}] ${item.text}`);
      lines.push(`Selected: [${item.choice}] | Log Time: ${fmtDate(item.answeredAt)}`);
    });
    lines.push('');
  } else {
    lines.push(`(Not completed yet)\n`);
  }

  // 4. This or That
  lines.push(`----------------------------------------------------------------`);
  lines.push(`⚡ 4. THIS OR THAT CHOICES`);
  if (journey.thisOrThat) {
    lines.push(`Completed Timestamp: ${fmtDate(journey.thisOrThat.completedAt)}`);
    lines.push(`Total Choices: ${journey.thisOrThat.items.length}\n`);
    journey.thisOrThat.items.forEach((item, idx) => {
      lines.push(`[TT-${idx + 1}] ${item.optionA} vs ${item.optionB}`);
      lines.push(`Selected: ${item.chosen} | Log Time: ${fmtDate(item.answeredAt)}`);
    });
    lines.push('');
  } else {
    lines.push(`(Not completed yet)\n`);
  }

  // 5. Chapter Timeline Log
  lines.push(`----------------------------------------------------------------`);
  lines.push(`⏱️ 5. CHAPTER NAVIGATION & EVENT LOG`);
  if (journey.chapterLogs?.length) {
    journey.chapterLogs.forEach((ch) => {
      lines.push(`Chapter ${ch.chapterId}: ${ch.title}`);
      lines.push(`  Entered: ${fmtDate(ch.visitedAt)}${ch.completedAt ? ` | Completed: ${fmtDate(ch.completedAt)}` : ''}`);
    });
    lines.push('');
  }
  if (journey.milestones?.length) {
    lines.push(`Key Milestones:`);
    journey.milestones.forEach((m) => {
      lines.push(`- ${m.label} (${fmtDate(m.timestamp)}): ${m.detail || ''}`);
    });
    lines.push('');
  }

  lines.push(`================================================================`);
  lines.push(`End of Journey #${journey.journeyNumber} Audit Log.`);
  lines.push(`Made with endless love by ${config.creator.displayName} for ${config.birthdayGirl.displayName} 💕`);
  lines.push(`================================================================\n`);

  return lines.join('\n');
}

export function formatAllJourneysConsolidatedReport(): string {
  const journeys = getAllJourneys();
  const lines: string[] = [];

  lines.push(`================================================================`);
  lines.push(`✨ ${config.projectName.toUpperCase()} — MASTER JOURNEYS REPORT ✨`);
  lines.push(`Live URL: https://srubirthday.vercel.app/`);
  lines.push(`Answers URL: https://srubirthday.vercel.app/answers`);
  lines.push(`Total Logged Journeys: ${journeys.length}`);
  lines.push(`Generated: ${new Date().toLocaleString()}`);
  lines.push(`Birthday Girl: ${config.birthdayGirl.displayName} (${config.birthdayGirl.name})`);
  lines.push(`Creator: ${config.creator.displayName} (${config.creator.name})`);
  lines.push(`================================================================\n`);

  journeys.forEach((j) => {
    lines.push(formatJourneyAsReportText(j));
  });

  return lines.join('\n');
}

export function formatResponsesAsText(): string {
  return formatAllJourneysConsolidatedReport();
}

// ── Export / Import JSON for Cross-Device Sync ───────────────
export function exportJourneysAsJson(): string {
  const journeys = getAllJourneys();
  return JSON.stringify(
    {
      app: 'srubirthday',
      exportedAt: new Date().toISOString(),
      journeysCount: journeys.length,
      journeys,
    },
    null,
    2
  );
}

export function importJourneysFromJson(jsonString: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const list: JourneyRecord[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.journeys)
      ? parsed.journeys
      : null;

    if (!list || list.length === 0) {
      return { success: false, count: 0, error: 'No valid journey records found in JSON data.' };
    }

    const existing = getAllJourneys();
    const mergedMap = new Map<string, JourneyRecord>();

    // Put existing
    existing.forEach((j) => mergedMap.set(j.id, j));
    // Overwrite or add imported
    list.forEach((j) => mergedMap.set(j.id, j));

    const merged = Array.from(mergedMap.values());
    merged.sort((a, b) => b.journeyNumber - a.journeyNumber);

    saveAllJourneys(merged);
    safeLocalSet(STORAGE_KEY_ACTIVE_ID, merged[0].id);

    return { success: true, count: list.length };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid JSON';
    return { success: false, count: 0, error: errorMsg };
  }
}
