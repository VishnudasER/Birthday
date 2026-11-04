// ============================================================
// useJourney — manages chapter progress, navigation, and persistence
// ============================================================
import { useState, useCallback, useEffect } from 'react';
import type { JourneyProgress, ChapterSlug } from '@/types';
import { safeLocalGet, safeLocalSet } from '@/lib/utils';
import { recordChapterVisit, recordChapterComplete, startNewJourney } from '@/lib/responsesStore';

export const CHAPTERS: Array<{
  id: number;
  slug: ChapterSlug;
  title: string;
  emoji: string;
  description: string;
}> = [
  { id: 1,  slug: 'invitation',          emoji: '💌', title: 'The Secret Invitation',          description: 'Your adventure begins...' },
  { id: 2,  slug: 'welcome-letter',      emoji: '📜', title: 'The Welcome Letter',              description: 'A letter just for you' },
  { id: 3,  slug: 'sky-wishes',          emoji: '🌟', title: 'A Sky Full of Wishes',            description: 'Touch the stars' },
  { id: 4,  slug: 'little-reasons',      emoji: '💝', title: '100 Little Reasons',              description: 'Why you are amazing' },
  { id: 5,  slug: 'bestie-quiz',         emoji: '🧠', title: 'The Bestie Interrogation',        description: 'How well do you know me?' },
  { id: 6,  slug: 'more-likely',         emoji: '😂', title: 'Who Is More Likely To?',          description: 'The chaos edition' },
  { id: 7,  slug: 'this-or-that',        emoji: '⚡', title: 'This or That',                    description: 'Fast bestie choices' },
  { id: 8,  slug: 'time-capsule',        emoji: '🫙', title: 'Our Friendship Time Capsule',       description: 'Words for the future' },
  { id: 9,  slug: 'open-whenever',       emoji: '✉️', title: 'Open Whenever You Need It',       description: 'Envelopes of love' },
  { id: 10, slug: 'birthday-cake',       emoji: '🎂', title: 'The Birthday Cake',               description: 'Make a wish!' },
  { id: 11, slug: 'compliment-machine',  emoji: '✨', title: 'The Compliment Machine',          description: 'Feel good station' },
  { id: 12, slug: 'unfiltered-vault',    emoji: '📸', title: 'Caught in 4K: Unfiltered Vault',  description: 'Unfiltered candid memories' },
  { id: 13, slug: 'golden-milestones',   emoji: '💫', title: 'Our Golden Milestones',           description: 'Timeless core memories' },
  { id: 14, slug: 'final-letter',        emoji: '💕', title: 'The Final Letter',                description: 'The emotional one' },
  { id: 15, slug: 'final-surprise',      emoji: '🎁', title: 'The Final Surprise',              description: 'The grand finale' },
];

const STORAGE_KEY = 'birthday_journey_progress';

const defaultProgress = (): JourneyProgress => ({
  currentChapter: 1,
  completedChapters: [],
  visitedChapters: [1],
  favouritePhotoIds: [],
  lastSaved: new Date().toISOString(),
});

export function useJourney() {
  const [progress, setProgress] = useState<JourneyProgress>(() =>
    safeLocalGet<JourneyProgress>(STORAGE_KEY, defaultProgress())
  );

  // Persist progress
  useEffect(() => {
    safeLocalSet(STORAGE_KEY, progress);
  }, [progress]);

  const goToChapter = useCallback((id: number) => {
    const ch = CHAPTERS.find((c) => c.id === id);
    if (ch) recordChapterVisit(ch.id, ch.title);
    setProgress((prev) => ({
      ...prev,
      currentChapter: id,
      visitedChapters: prev.visitedChapters.includes(id)
        ? prev.visitedChapters
        : [...prev.visitedChapters, id],
      lastSaved: new Date().toISOString(),
    }));
  }, []);

  const completeChapter = useCallback((id: number) => {
    const ch = CHAPTERS.find((c) => c.id === id);
    if (ch) recordChapterComplete(ch.id, ch.title);
    setProgress((prev) => ({
      ...prev,
      completedChapters: prev.completedChapters.includes(id)
        ? prev.completedChapters
        : [...prev.completedChapters, id],
      lastSaved: new Date().toISOString(),
    }));
  }, []);

  const goNext = useCallback(() => {
    setProgress((prev) => {
      const prevCh = CHAPTERS.find((c) => c.id === prev.currentChapter);
      if (prevCh) recordChapterComplete(prevCh.id, prevCh.title);
      const next = Math.min(prev.currentChapter + 1, CHAPTERS.length);
      const nextCh = CHAPTERS.find((c) => c.id === next);
      if (nextCh) recordChapterVisit(nextCh.id, nextCh.title);
      return {
        ...prev,
        currentChapter: next,
        visitedChapters: prev.visitedChapters.includes(next)
          ? prev.visitedChapters
          : [...prev.visitedChapters, next],
        completedChapters: prev.completedChapters.includes(prev.currentChapter)
          ? prev.completedChapters
          : [...prev.completedChapters, prev.currentChapter],
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const goPrev = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      currentChapter: Math.max(prev.currentChapter - 1, 1),
      lastSaved: new Date().toISOString(),
    }));
  }, []);

  const resetJourney = useCallback(() => {
    startNewJourney();
    setProgress(defaultProgress());
  }, []);

  const toggleFavouritePhoto = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      favouritePhotoIds: prev.favouritePhotoIds.includes(id)
        ? prev.favouritePhotoIds.filter((x) => x !== id)
        : [...prev.favouritePhotoIds, id],
    }));
  }, []);

  const progressPercent = Math.round(
    (progress.completedChapters.length / CHAPTERS.length) * 100
  );

  const currentChapterData = CHAPTERS.find(
    (c) => c.id === progress.currentChapter
  )!;

  return {
    progress,
    currentChapter: progress.currentChapter,
    currentChapterData,
    chapters: CHAPTERS,
    progressPercent,
    goToChapter,
    completeChapter,
    goNext,
    goPrev,
    resetJourney,
    toggleFavouritePhoto,
    isCompleted: (id: number) => progress.completedChapters.includes(id),
    isVisited: (id: number) => progress.visitedChapters.includes(id),
    isFavouritePhoto: (id: string) => progress.favouritePhotoIds.includes(id),
  };
}
