// ============================================================
// Chapter 8: This or That
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/data/config';
import type { ThisOrThatAnswer } from '@/types';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { saveThisOrThatResponses } from '@/lib/responsesStore';

interface Props { onNext: () => void }

export function ChapterThisOrThat({ onNext }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<ThisOrThatAnswer[]>([]);
  const [selected, setSelected] = useState<'a' | 'b' | null>(null);
  const [phase, setPhase] = useState<'game' | 'summary'>('game');

  const choices = config.thisOrThatChoices;
  const choice = choices[currentIdx];

  const handleSelect = (side: 'a' | 'b') => {
    if (selected) return;
    setSelected(side);
    setTimeout(() => {
      setAnswers((prev) => [...prev, { choiceId: choice.id, selected: side }]);
      setSelected(null);
      if (currentIdx < choices.length - 1) {
        setCurrentIdx((n) => n + 1);
      } else {
        const allAnswers = [...answers, { choiceId: choice.id, selected: side }];
        saveThisOrThatResponses(allAnswers);
        setPhase('summary');
      }
    }, 800);
  };

  // Summary
  const aCount = answers.filter((a) => a.selected === 'a').length;
  const bCount = answers.filter((a) => a.selected === 'b').length;
  const getSummaryMsg = () => {
    if (aCount > bCount) return "You're the spontaneous, dive-in type! I love that about you. 🌟";
    if (bCount > aCount) return "You're the thoughtful planner with great taste. Also me, sometimes. 💕";
    return "Perfectly balanced! You contain multitudes and I'm here for all of them. 💫";
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">⚡ This or That</h1>
        <p className="font-hand text-lg text-rose-400">Go with your gut. No overthinking!</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'game' && (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg"
          >
            {/* Progress dots */}
            <div className="flex justify-center gap-1 mb-6 flex-wrap">
              {choices.map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-full transition-all"
                  style={{
                    width: idx === currentIdx ? 20 : 8,
                    height: 8,
                    background: idx < currentIdx ? '#e8667a' : idx === currentIdx ? '#7d1f3c' : '#fde8f0',
                  }}
                />
              ))}
            </div>

            <div className="text-center text-sm font-hand text-rose-400 mb-4">
              {currentIdx + 1} of {choices.length}
            </div>

            {/* Choices */}
            <div className="grid grid-cols-2 gap-4">
              {(['a', 'b'] as const).map((side) => {
                const text = choice[side];
                const isSelected = selected === side;
                const isDimmed = selected !== null && selected !== side;

                return (
                  <motion.button
                    key={side}
                    onClick={() => handleSelect(side)}
                    disabled={!!selected}
                    whileHover={!selected ? { scale: 1.03, y: -4 } : {}}
                    whileTap={{ scale: 0.97 }}
                    className="relative rounded-3xl p-6 text-center font-hand text-xl transition-all shadow-lg"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #e8667a 0%, #7d1f3c 100%)'
                        : isDimmed
                        ? 'rgba(255,255,255,0.3)'
                        : 'rgba(255,255,255,0.8)',
                      color: isSelected ? '#fff' : isDimmed ? '#d4b8e0' : '#3d1a26',
                      border: isSelected
                        ? '2px solid #7d1f3c'
                        : '2px solid rgba(249,213,229,0.7)',
                      minHeight: 140,
                      boxShadow: isSelected
                        ? '0 8px 30px rgba(232,102,122,0.4)'
                        : '0 4px 20px rgba(0,0,0,0.06)',
                    }}
                  >
                    {text}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-white text-xs"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* VS badge */}
            <div
              className="text-center mt-4 font-bold text-xl"
              style={{ color: '#7d1f3c', opacity: 0.4 }}
            >
              VS
            </div>
          </motion.div>
        )}

        {phase === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg text-center"
          >
            <div className="text-5xl mb-4">✨</div>
            <h2 className="font-signature text-4xl text-gradient-rose mb-4">
              The Results Are In!
            </h2>

            <div className="flex justify-center gap-8 mb-6">
              {[
                { label: 'Option A vibes', count: aCount, color: '#e8667a' },
                { label: 'Option B vibes', count: bCount, color: '#7d1f3c' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-5xl font-bold mb-1" style={{ color: item.color }}>
                    {item.count}
                  </div>
                  <div className="font-hand text-sm text-rose-400">{item.label}</div>
                </div>
              ))}
            </div>

            <p className="font-hand text-xl text-rose-600 mb-6 max-w-sm mx-auto">
              {getSummaryMsg()}
            </p>

            {/* Embedded Memories #11 & #12 */}
            <div className="w-full text-left my-6">
              <ChapterMemoryGrid chapterId={7} title="This or That Visualized #11 & #12 ⚡" subtitle="Option A vs Option B in real life snapshots" />
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
