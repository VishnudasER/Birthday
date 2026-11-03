// ============================================================
// Chapter 7: Who Is More Likely To?
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/data/config';
import type { MoreLikelyOption, MoreLikelyAnswer } from '@/types';
import { cn } from '@/lib/utils';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { saveMoreLikelyResponses } from '@/lib/responsesStore';

interface Props { onNext: () => void }

const OPTIONS: { label: string; value: MoreLikelyOption; emoji: string; color: string }[] = [
  { label: 'Me', value: 'Me', emoji: '🙋‍♀️', color: '#e8667a' },
  { label: 'You', value: 'You', emoji: '😄', color: '#d4a847' },
  { label: 'Both', value: 'Both', emoji: '🤝', color: '#7d1f3c' },
  { label: 'Neither', value: 'Neither', emoji: '🤷', color: '#b89ac8' },
];

const TEASING: Record<MoreLikelyOption, string[]> = {
  Me: ["Yeah, that tracks 😂", "Can't argue with that! 😭", "Correct, fully and completely.", "I accept this verdict."],
  You: ["Okay rude but fair 😂", "Exactly my diagnosis 💅", "Factual! Factual!", "Bold of you. Also correct."],
  Both: ["Honestly? The chaos is shared equally.", "Together in everything, even the disasters 💕", "This is us and we know it.", "The dynamic duo of chaos 😂"],
  Neither: ["We're thriving and responsible 😇", "We would never. (We absolutely would.)", "Growth. This is growth. 🌱", "Right. Sure. 😏"],
};

export function ChapterMoreLikely({ onNext }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<MoreLikelyAnswer[]>([]);
  const [selected, setSelected] = useState<MoreLikelyOption | null>(null);
  const [showTeasing, setShowTeasing] = useState(false);
  const [phase, setPhase] = useState<'quiz' | 'summary'>('quiz');

  const prompts = config.morelikelyPrompts;
  const prompt = prompts[currentIdx];

  const handleSelect = (opt: MoreLikelyOption) => {
    if (selected) return;
    setSelected(opt);
    setShowTeasing(true);

    setTimeout(() => {
      const answer: MoreLikelyAnswer = { promptId: prompt.id, choice: opt };
      setAnswers((prev) => [...prev, answer]);
      setShowTeasing(false);
      setSelected(null);
      if (currentIdx < prompts.length - 1) {
        setCurrentIdx((n) => n + 1);
      } else {
        const allAnswers = [...answers, answer];
        const summaryCalc = {
          Me: allAnswers.filter((a) => a.choice === 'Me').length,
          You: allAnswers.filter((a) => a.choice === 'You').length,
          Both: allAnswers.filter((a) => a.choice === 'Both').length,
          Neither: allAnswers.filter((a) => a.choice === 'Neither').length,
        };
        saveMoreLikelyResponses(allAnswers, summaryCalc);
        setPhase('summary');
      }
    }, 1600);
  };

  const getRandomTeasing = (opt: MoreLikelyOption) => {
    const arr = TEASING[opt];
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const summary = {
    Me: answers.filter((a) => a.choice === 'Me').length,
    You: answers.filter((a) => a.choice === 'You').length,
    Both: answers.filter((a) => a.choice === 'Both').length,
    Neither: answers.filter((a) => a.choice === 'Neither').length,
  };

  const summaryMsg = () => {
    if (summary.Both >= summary.Me && summary.Both >= summary.You) {
      return "You're seeing us as a package deal. I love that. We're chaotic together and I wouldn't have it any other way 💕";
    }
    if (summary.You >= summary.Me) {
      return "You think you're the chaotic one? I'm taking notes. And maybe slightly offended. 😂";
    }
    return "You're putting it all on me! Suspicious. I love it. 😂";
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">
          😂 Who Is More Likely To?
        </h1>
        <p className="font-hand text-lg text-rose-400">The chaos edition.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'quiz' && (
          <motion.div
            key={`ml-${currentIdx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-lg"
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-2 bg-blush rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(currentIdx / prompts.length) * 100}%`,
                    background: 'linear-gradient(90deg, #e8667a, #7d1f3c)',
                  }}
                />
              </div>
              <span className="text-sm font-hand text-rose-400 shrink-0">{currentIdx + 1}/{prompts.length}</span>
            </div>

            {/* Question */}
            <div
              className="paper rounded-3xl p-8 text-center shadow-xl mb-6"
              style={{ border: '1px solid rgba(249,213,229,0.6)' }}
            >
              <p className="font-hand text-sm text-rose-300 mb-2">Who is more likely to...</p>
              <p className="font-serif text-2xl md:text-3xl" style={{ color: '#3d1a26' }}>
                {prompt.text}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  disabled={!!selected}
                  className={cn(
                    'py-6 rounded-2xl font-hand text-lg flex flex-col items-center gap-2 transition-all border-2 shadow-sm',
                    selected === opt.value
                      ? 'text-white scale-105 shadow-lg'
                      : selected !== null
                      ? 'opacity-30 border-blush bg-white/40'
                      : 'bg-white/70 border-blush hover:scale-103 hover:shadow-md hover:border-rose-300'
                  )}
                  style={selected === opt.value ? { background: opt.color, borderColor: opt.color } : {}}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Teasing */}
            <AnimatePresence>
              {showTeasing && selected && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-hand text-lg text-rose-600 mt-5"
                >
                  {getRandomTeasing(selected)}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg text-center"
          >
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="font-signature text-4xl text-gradient-rose mb-4">The Verdict Is In!</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: `${opt.color}22`, border: `2px solid ${opt.color}44` }}
                >
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <div className="font-bold text-2xl" style={{ color: opt.color }}>{summary[opt.value]}</div>
                  <div className="font-hand text-sm" style={{ color: '#7d1f3c' }}>{opt.label}</div>
                </div>
              ))}
            </div>

            <p className="font-hand text-xl text-rose-600 mb-6 max-w-sm mx-auto">
              {summaryMsg()}
            </p>

            {/* Embedded Memories #09 & #10 */}
            <div className="w-full text-left my-6">
              <ChapterMemoryGrid chapterId={6} title="Chaos Candidates #09 & #10 ⚡" subtitle="Two snapshots that prove who is more likely to do what" />
            </div>

            <button className="btn-primary" onClick={onNext}>
              Next chapter ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
