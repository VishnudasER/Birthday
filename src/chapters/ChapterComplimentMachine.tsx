// ============================================================
// Chapter 13: The Compliment Machine
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { config } from '@/data/config';
import { pickRandomExcluding } from '@/lib/utils';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

export function ChapterComplimentMachine({ onNext }: Props) {
  const [currentMsg, setCurrentMsg] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const compliments = config.compliments;

  const getCompliment = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMsg((prev) =>
        prev ? pickRandomExcluding(compliments, prev) : compliments[Math.floor(Math.random() * compliments.length)]
      );
      setCount((c) => c + 1);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating, compliments]);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">✨ The Compliment Machine</h1>
        <p className="font-hand text-lg text-rose-400">
          Press the button. Receive truth. Repeat as needed.
        </p>
      </motion.div>

      {/* The Machine */}
      <div className="w-full max-w-sm">
        {/* Machine body */}
        <div
          className="rounded-3xl p-6 mb-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #2d1020 0%, #1a0820 100%)',
            border: '3px solid rgba(232,102,122,0.4)',
            boxShadow: '0 8px 40px rgba(232,102,122,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Screen */}
          <div
            className="rounded-2xl p-6 mb-4 min-h-40 flex items-center justify-center text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0d0012 0%, #1a0820 100%)',
              border: '2px solid rgba(232,102,122,0.3)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {/* Screen glow effect */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(232,102,122,0.08) 0%, transparent 70%)',
              }}
            />

            <AnimatePresence mode="wait">
              {!currentMsg ? (
                <motion.p
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-hand text-lg"
                  style={{ color: 'rgba(249,213,229,0.5)' }}
                >
                  Ready to receive a compliment?
                  <br />
                  <span className="text-sm">Press the button below ✨</span>
                </motion.p>
              ) : (
                <motion.div
                  key={currentMsg}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <p
                    className="font-serif text-lg leading-relaxed"
                    style={{ color: '#f9d5e5' }}
                  >
                    {currentMsg}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Machine details */}
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: i === 0 ? '#e8667a' : i === 1 ? '#d4a847' : '#22c55e' }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </div>
            <p className="font-hand text-xs" style={{ color: 'rgba(249,213,229,0.4)' }}>
              COMPLIMENT-O-MATIC™
            </p>
          </div>
        </div>

        {/* Big button */}
        <motion.button
          className="w-full py-5 rounded-2xl font-hand text-xl text-white flex items-center justify-center gap-3 relative overflow-hidden"
          style={{
            background: isAnimating
              ? 'linear-gradient(135deg, #c94d63, #5c1630)'
              : 'linear-gradient(135deg, #e8667a, #7d1f3c)',
            boxShadow: '0 6px 24px rgba(232,102,122,0.5)',
          }}
          onClick={getCompliment}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(232,102,122,0.6)' }}
          whileTap={{ scale: 0.97 }}
          aria-label="Generate compliment"
        >
          <motion.div
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, ease: 'linear' }}
          >
            <Sparkles size={22} />
          </motion.div>
          {currentMsg ? '✨ Give me another!' : '✨ Generate Compliment!'}
        </motion.button>

        {count > 0 && (
          <p className="text-center font-hand text-sm text-rose-400 mt-4">
            {count} kind truth{count !== 1 ? 's' : ''} dispensed 💕
          </p>
        )}
      </div>

      {/* Embedded Memory #19 */}
      <div className="w-full max-w-md mx-auto my-6 text-left">
        <ChapterMemoryGrid chapterId={11} title="The Living Compliment #19 ✨" subtitle="Official photographic evidence that you are 10/10" />
      </div>

      <div className="flex gap-4 mt-4">
        {count > 0 && (
          <button
            className="btn-ghost text-sm"
            onClick={() => { setCurrentMsg(null); setCount(0); }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
        <button className="btn-primary" onClick={onNext}>
          Next chapter ✨
        </button>
      </div>
    </div>
  );
}
