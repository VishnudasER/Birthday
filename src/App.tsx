// ============================================================
// App.tsx — main orchestrator
// ============================================================
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AccessGate } from '@/components/AccessGate';
import { ChapterShell } from '@/components/ChapterShell';
import { ButterflyField, SparkleField } from '@/components/Butterfly';
import { MusicPlayer } from '@/components/MusicPlayer';
import { useJourney } from '@/hooks/useJourney';
import { hasSession } from '@/lib/api';

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

export default function App() {
  const [authorized, setAuthorized] = useState(() => hasSession());

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
  };

  const handleSkip = () => {
    goToChapter(15);
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
