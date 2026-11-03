// ============================================================
// Chapter 5: 100 Little Reasons
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shuffle, ChevronLeft, ChevronRight } from 'lucide-react';
import { config } from '@/data/config';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

export function ChapterLittleReasons({ onNext }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(new Set([0]));
  const [favourites, setFavourites] = useState(new Set<number>());
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const reasons = config.reasons;
  const reason = reasons[currentIdx];

  const goNext = () => {
    const next = Math.min(currentIdx + 1, reasons.length - 1);
    setCurrentIdx(next);
    setRevealed((prev) => new Set([...prev, next]));
  };

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const goRandom = () => {
    const idx = Math.floor(Math.random() * reasons.length);
    setCurrentIdx(idx);
    setRevealed((prev) => new Set([...prev, idx]));
  };

  const toggleFav = (idx: number) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">
          💝 100 Little Reasons
        </h1>
        <p className="font-hand text-lg text-rose-400">
          Why you are, simply, the best.
        </p>
      </motion.div>

      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        {(['card', 'list'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className="text-sm px-4 py-1.5 rounded-full font-hand transition-all capitalize"
            style={viewMode === mode
              ? { background: '#e8667a', color: '#fff' }
              : { background: 'rgba(255,255,255,0.6)', color: '#c94d63' }
            }
          >
            {mode === 'card' ? '🃏 Card' : '📋 All'}
          </button>
        ))}
      </div>

      {/* CARD VIEW */}
      {viewMode === 'card' && (
        <div className="w-full max-w-md flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <div
                className="paper rounded-3xl shadow-xl p-8 text-center relative"
                style={{ border: '1px solid rgba(249,213,229,0.6)', minHeight: 220 }}
              >
                {/* Number badge */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                  style={{ background: 'linear-gradient(135deg, #e8667a, #7d1f3c)' }}
                >
                  {currentIdx + 1}
                </div>

                <p
                  className="font-serif text-xl md:text-2xl leading-relaxed mt-4"
                  style={{ color: '#3d1a26' }}
                >
                  {reason.text}
                </p>

                {/* Favourite */}
                <button
                  className="mt-6 transition-transform hover:scale-125"
                  onClick={() => toggleFav(currentIdx)}
                  aria-label={favourites.has(currentIdx) ? 'Remove from favourites' : 'Mark as favourite'}
                >
                  <Heart
                    size={24}
                    fill={favourites.has(currentIdx) ? '#e8667a' : 'transparent'}
                    stroke={favourites.has(currentIdx) ? '#e8667a' : '#d4b8e0'}
                  />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={goPrev}
              disabled={currentIdx === 0}
              className="p-2 rounded-full bg-white shadow-card hover:shadow-md transition-all disabled:opacity-30"
              aria-label="Previous reason"
            >
              <ChevronLeft size={20} style={{ color: '#e8667a' }} />
            </button>
            <span className="font-hand text-rose-400">
              {currentIdx + 1} / {reasons.length}
            </span>
            <button
              onClick={goRandom}
              className="p-2 rounded-full bg-white shadow-card hover:shadow-md transition-all"
              aria-label="Random reason"
            >
              <Shuffle size={18} style={{ color: '#e8667a' }} />
            </button>
            <button
              onClick={goNext}
              disabled={currentIdx >= reasons.length - 1}
              className="p-2 rounded-full bg-white shadow-card hover:shadow-md transition-all disabled:opacity-30"
              aria-label="Next reason"
            >
              <ChevronRight size={20} style={{ color: '#e8667a' }} />
            </button>
          </div>

          <p className="font-hand text-sm text-rose-300 mt-3">
            {revealed.size} discovered · {favourites.size} favourited ❤️
          </p>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="w-full max-w-2xl space-y-3">
          {reasons.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 hover:bg-white transition-colors"
              style={{ border: '1px solid rgba(249,213,229,0.5)' }}
            >
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #e8667a, #7d1f3c)' }}
              >
                {idx + 1}
              </span>
              <p className="font-sans text-sm flex-1" style={{ color: '#3d1a26' }}>{r.text}</p>
              <button
                onClick={() => toggleFav(idx)}
                className="shrink-0 transition-transform hover:scale-125"
                aria-label="Toggle favourite"
              >
                <Heart
                  size={16}
                  fill={favourites.has(idx) ? '#e8667a' : 'transparent'}
                  stroke={favourites.has(idx) ? '#e8667a' : '#d4b8e0'}
                />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Embedded Memories #05 & #06 */}
      <div className="w-full max-w-2xl mx-auto my-8 text-left">
        <ChapterMemoryGrid chapterId={4} title="Two Reasons in 4K 💝" subtitle="Exhibits #05 & #06 of why you are completely unmatched" />
      </div>

      <div className="mt-4">
        <button className="btn-primary" onClick={onNext}>
          Continue ✨
        </button>
      </div>
    </div>
  );
}
