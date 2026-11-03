// ============================================================
// responsesStore.ts — Unified Frontend-only Data Persistence
// Securely stores all interactive journey responses in localStorage
// Allows both Shuttumani & Sundramani to view, copy, & download at the finale
// ============================================================
import { safeLocalGet, safeLocalSet } from '@/lib/utils';
import { config } from '@/data/config';

export interface SavedTimeCapsule {
  submittedAt: string;
  items: Array<{ promptId: string; question: string; answer: string }>;
}

export interface SavedQuiz {
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
}

export interface SavedMoreLikely {
  completedAt: string;
  summary: { Me: number; You: number; Both: number; Neither: number };
  items: Array<{ promptId: string; text: string; choice: string }>;
}

export interface SavedThisOrThat {
  completedAt: string;
  items: Array<{ choiceId: string; chosen: string; optionA: string; optionB: string }>;
}

export interface AllJourneyResponses {
  timeCapsule?: SavedTimeCapsule;
  quiz?: SavedQuiz;
  moreLikely?: SavedMoreLikely;
  thisOrThat?: SavedThisOrThat;
  lastUpdated: string;
}

const STORAGE_KEY = 'birthday_all_journey_responses';

export function getAllJourneyResponses(): AllJourneyResponses {
  return safeLocalGet<AllJourneyResponses>(STORAGE_KEY, {
    lastUpdated: new Date().toISOString(),
  });
}

export function saveTimeCapsuleResponses(
  answers: Array<{ promptId: string; answer: string }>
) {
  const existing = getAllJourneyResponses();
  const prompts = config.timeCapsulePrompts;

  const items = answers
    .filter((a) => a.answer.trim().length > 0)
    .map((a) => {
      const q = prompts.find((p) => p.id === a.promptId);
      return {
        promptId: a.promptId,
        question: q?.question ?? a.promptId,
        answer: a.answer.trim(),
      };
    });

  const updated: AllJourneyResponses = {
    ...existing,
    timeCapsule: {
      submittedAt: new Date().toISOString(),
      items,
    },
    lastUpdated: new Date().toISOString(),
  };

  safeLocalSet(STORAGE_KEY, updated);
  return updated;
}

export function saveQuizResponses(
  answers: Array<{ questionId: string; selectedIndex: number; isCorrect: boolean | null }>,
  score: number,
  percentage: number,
  totalFactual: number
) {
  const existing = getAllJourneyResponses();
  const questions = config.quizQuestions;

  const items = answers.map((a) => {
    const q = questions.find((qn) => qn.id === a.questionId);
    return {
      questionId: a.questionId,
      question: q?.question ?? a.questionId,
      chosen: q?.options[a.selectedIndex] ?? `Option ${a.selectedIndex + 1}`,
      correct: q?.correctIndex !== null && q?.correctIndex !== undefined ? q.options[q.correctIndex] : undefined,
      isCorrect: a.isCorrect,
    };
  });

  const updated: AllJourneyResponses = {
    ...existing,
    quiz: {
      completedAt: new Date().toISOString(),
      score,
      percentage,
      totalFactual,
      items,
    },
    lastUpdated: new Date().toISOString(),
  };

  safeLocalSet(STORAGE_KEY, updated);
  return updated;
}

export function saveMoreLikelyResponses(
  answers: Array<{ promptId: string; choice: string }>,
  summary: { Me: number; You: number; Both: number; Neither: number }
) {
  const existing = getAllJourneyResponses();
  const prompts = config.morelikelyPrompts;

  const items = answers.map((a) => {
    const p = prompts.find((pr) => pr.id === a.promptId);
    return {
      promptId: a.promptId,
      text: p?.text ?? a.promptId,
      choice: a.choice,
    };
  });

  const updated: AllJourneyResponses = {
    ...existing,
    moreLikely: {
      completedAt: new Date().toISOString(),
      summary,
      items,
    },
    lastUpdated: new Date().toISOString(),
  };

  safeLocalSet(STORAGE_KEY, updated);
  return updated;
}

export function saveThisOrThatResponses(
  answers: Array<{ choiceId: string; selected: 'a' | 'b' }>
) {
  const existing = getAllJourneyResponses();
  const choices = config.thisOrThatChoices;

  const items = answers.map((a) => {
    const c = choices.find((ch) => ch.id === a.choiceId);
    return {
      choiceId: a.choiceId,
      chosen: a.selected === 'a' ? (c?.a ?? 'Option A') : (c?.b ?? 'Option B'),
      optionA: c?.a ?? 'Option A',
      optionB: c?.b ?? 'Option B',
    };
  });

  const updated: AllJourneyResponses = {
    ...existing,
    thisOrThat: {
      completedAt: new Date().toISOString(),
      items,
    },
    lastUpdated: new Date().toISOString(),
  };

  safeLocalSet(STORAGE_KEY, updated);
  return updated;
}

// Generate nicely formatted text for easy copy/share
export function formatResponsesAsText(): string {
  const data = getAllJourneyResponses();
  const lines: string[] = [];

  lines.push(`✨ ${config.projectName} — All Journey Responses ✨`);
  lines.push(`Birthday Girl: ${config.birthdayGirl.displayName}`);
  lines.push(`Creator: ${config.creator.displayName}`);
  lines.push(`Saved on: ${new Date().toLocaleString()}`);
  lines.push('='.repeat(48));
  lines.push('');

  // 1. Time Capsule
  lines.push('🫙 1. FRIENDSHIP TIME CAPSULE:');
  if (data.timeCapsule?.items?.length) {
    data.timeCapsule.items.forEach((item, idx) => {
      lines.push(`Q${idx + 1}: ${item.question}`);
      lines.push(`A: "${item.answer}"\n`);
    });
  } else {
    lines.push('(No answers filled in yet)\n');
  }

  // 2. Bestie Quiz
  lines.push('🧠 2. BESTIE INTERROGATION QUIZ:');
  if (data.quiz) {
    lines.push(`Score: ${data.quiz.score}/${data.quiz.totalFactual} (${data.quiz.percentage}%)`);
    data.quiz.items.forEach((item, idx) => {
      lines.push(`Q${idx + 1}: ${item.question}`);
      lines.push(`Choice: ${item.chosen} ${item.isCorrect ? '✅' : item.isCorrect === false ? '❌' : '💭'}`);
    });
    lines.push('');
  } else {
    lines.push('(Quiz not completed yet)\n');
  }

  // 3. Who Is More Likely To
  lines.push('😂 3. WHO IS MORE LIKELY TO:');
  if (data.moreLikely) {
    lines.push(`Summary: Me: ${data.moreLikely.summary.Me} | You: ${data.moreLikely.summary.You} | Both: ${data.moreLikely.summary.Both} | Neither: ${data.moreLikely.summary.Neither}`);
    data.moreLikely.items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.text} → [${item.choice}]`);
    });
    lines.push('');
  } else {
    lines.push('(Not completed yet)\n');
  }

  // 4. This or That
  lines.push('⚡ 4. THIS OR THAT:');
  if (data.thisOrThat?.items?.length) {
    data.thisOrThat.items.forEach((item, idx) => {
      lines.push(`${idx + 1}. Selected: ${item.chosen}`);
    });
    lines.push('');
  } else {
    lines.push('(Not completed yet)\n');
  }

  lines.push('='.repeat(48));
  lines.push(`Forever & Always, ${config.creator.displayName} 💕`);

  return lines.join('\n');
}
