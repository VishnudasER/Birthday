// ============================================================
// App.tsx — main orchestrator with /answers sub-URL routing
// ============================================================
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AccessGate } from '@/components/AccessGate';
import { ChapterShell } from '@/components/ChapterShell';
import { ButterflyField, SparkleField } from '@/components/Butterfly';
import { MusicPlayer } from '@/components/MusicPlayer';
import { useJourney } from '@/hooks/useJourney';
import { hasSession } from '@/lib/api';
import { CHAPTER_MEMORIES } from '@/data/chapterMemories';
import { AnswersReportPage } from '@/pages/AnswersReportPage';

// Chapters (15 sections, game completely removed)
import { ChapterInvitation }         from '@/chapters/ChapterInvitation';
import { ChapterWelcomeLetter }      from '@/chapters/ChapterWelcomeLetter';
import { ChapterSkyWishes }          from '@/chapters/ChapterSkyWishes';
import { ChapterLittleReasons }      from '@/chapters/ChapterLittleReasons';
import { ChapterBestieQuiz }         from '@/chapters/ChapterBestieQuiz';
import { ChapterMoreLikely }         from '@/chapters/ChapterMoreLikely';
import { ChapterThisOrThat }         from '@/chapters/ChapterThisOrThat';
import { ChapterTimeCapsule }        from '@/chapters/ChapterTimeCapsule';
import { ChapterOpenWhenever }       from '@/chapters/ChapterOpenWhenever';
import { ChapterBirthdayCake }       from '@/chapters/ChapterBirthdayCake';
import { ChapterComplimentMachine }  from '@/chapters/ChapterComplimentMachine';
import { ChapterUnfilteredVault }    from '@/chapters/ChapterUnfilteredVault';
import { ChapterGoldenMilestones }   from '@/chapters/ChapterGoldenMilestones';
import { ChapterFinalLetter }        from '@/chapters/ChapterFinalLetter';
import { ChapterFinalSurprise }      from '@/chapters/ChapterFinalSurprise';

function checkIsAnswersPath(): boolean {
  if (typeof window === 'undefined') return false;
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();
  const s = window.location.search.toLowerCase();
  return (
    p.startsWith('/answers') ||
    h.startsWith('#answers') ||
    h.startsWith('#/answers') ||
    s.includes('answers')
  );
}

export default function App() {
  const [isAnswersRoute, setIsAnswersRoute] = useState(checkIsAnswersPath);
  const [authorized, setAuthorized] = useState(() => hasSession());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAnswersRoute(checkIsAnswersPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (!authorized) return;
    // Silently pre-cache all memory WebP images in background during idle time
    const preload = () => {
      CHAPTER_MEMORIES.forEach((m) => {
        const img = new Image();
        img.src = m.imageSrc.replace(/\.jpg$/, '.webp');
      });
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(preload);
    } else {
      setTimeout(preload, 1000);
    }
  }, [authorized]);

  const {
    currentChapter,
    progressPercent,
    goNext,
    goPrev,
    goToChapter,
    completeChapter,
    resetJourney,
    isCompleted,
    isVisited,
  } = useJourney();

  // If visiting /answers sub-URL, render executive answers audit report immediately
  if (isAnswersRoute) {
    return <AnswersReportPage />;
  }

  if (!authorized) {
    return (
      <>
        <MusicPlayer />
        <AccessGate onAuthorized={() => setAuthorized(true)} />
      </>
    );
  }

  const handleNext = () => {
    completeChapter(currentChapter);
    goNext();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSkip = () => {
    goToChapter(15);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const renderChapter = () => {
    switch (currentChapter) {
      case 1:  return <ChapterInvitation onNext={handleNext} />;
      case 2:  return <ChapterWelcomeLetter onNext={handleNext} />;
      case 3:  return <ChapterSkyWishes onNext={handleNext} />;
      case 4:  return <ChapterLittleReasons onNext={handleNext} />;
      case 5:  return <ChapterBestieQuiz onNext={handleNext} />;
      case 6:  return <ChapterMoreLikely onNext={handleNext} />;
      case 7:  return <ChapterThisOrThat onNext={handleNext} />;
      case 8:  return <ChapterTimeCapsule onNext={handleNext} />;
      case 9:  return <ChapterOpenWhenever onNext={handleNext} />;
      case 10: return <ChapterBirthdayCake onNext={handleNext} />;
      case 11: return <ChapterComplimentMachine onNext={handleNext} />;
      case 12: return <ChapterUnfilteredVault onNext={handleNext} />;
      case 13: return <ChapterGoldenMilestones onNext={handleNext} />;
      case 14: return <ChapterFinalLetter onNext={handleNext} />;
      case 15: return (
        <ChapterFinalSurprise
          onGoToChapter={goToChapter}
          onReset={resetJourney}
        />
      );
      default: return <ChapterInvitation onNext={handleNext} />;
    }
  };

  return (
    <>
      <ButterflyField />
      <SparkleField />
      <MusicPlayer />

      <ChapterShell
        currentChapter={currentChapter}
        progressPercent={progressPercent}
        onPrev={goPrev}
        onNext={handleNext}
        onSkip={handleSkip}
        onGoTo={goToChapter}
        onReset={resetJourney}
        isCompleted={isCompleted}
        isVisited={isVisited}
      >
        <AnimatePresence mode="wait">
          {renderChapter()}
        </AnimatePresence>
      </ChapterShell>
    </>
  );
}
