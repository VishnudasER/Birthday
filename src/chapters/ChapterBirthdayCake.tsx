// ============================================================
// Chapter 11: The Birthday Cake
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/data/config';
import { useConfetti } from '@/hooks/useConfetti';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

const CANDLE_COUNT = 6;
const CANDLE_COLORS = ['#e8667a', '#d4a847', '#7d1f3c', '#b89ac8', '#e8667a', '#d4b8e0'];

export function ChapterBirthdayCake({ onNext }: Props) {
  const [blownOut, setBlownOut] = useState(new Set<number>());
  const [celebrated, setCelebrated] = useState(false);
  const { launch } = useConfetti();

  const allOut = blownOut.size >= CANDLE_COUNT;

  const blowCandle = useCallback((idx: number) => {
    if (blownOut.has(idx)) return;
    setBlownOut((prev) => {
      const next = new Set([...prev, idx]);
      if (next.size >= CANDLE_COUNT && !celebrated) {
        setTimeout(() => {
          setCelebrated(true);
          launch(150);
        }, 300);
      }
      return next;
    });
  }, [blownOut, celebrated, launch]);

  const blowAll = () => {
    setBlownOut(new Set(Array.from({ length: CANDLE_COUNT }, (_, i) => i)));
    if (!celebrated) {
      setTimeout(() => {
        setCelebrated(true);
        launch(200);
      }, 500);
    }
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-20"
      style={{
        background: celebrated
          ? 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 40%, #f9f0ff 100%)'
          : 'linear-gradient(160deg, #1a0a12 0%, #2d1020 60%, #1a1030 100%)',
        transition: 'background 1s ease',
      }}
    >
      {/* Title */}
      <motion.h1
        className="font-signature text-5xl mb-8"
        style={{ color: celebrated ? undefined : '#f9d5e5' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={celebrated ? 'text-gradient-rose' : ''}>
          🎂 Make a Wish!
        </span>
      </motion.h1>

      {/* Cake */}
      <div className="relative flex flex-col items-center">
        {/* Candles */}
        <div className="flex gap-6 mb-2 items-end">
          {Array.from({ length: CANDLE_COUNT }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <AnimatePresence>
                {!blownOut.has(i) && (
                  <motion.button
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => blowCandle(i)}
                    className="relative focus:outline-none"
                    aria-label={`Blow out candle ${i + 1}`}
                    style={{ width: 20, height: 30 }}
                    title="Click to blow out"
                  >
                    {/* Outer flame */}
                    <motion.div
                      className="flame"
                      style={{
                        width: 14,
                        height: 22,
                        borderRadius: '50% 50% 30% 30%',
                        background: `radial-gradient(ellipse at 50% 80%, #fff 0%, ${CANDLE_COLORS[i]} 40%, #ff8c00 80%, transparent 100%)`,
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: 0,
                        boxShadow: `0 0 12px ${CANDLE_COLORS[i]}88`,
                      }}
                    />
                    {/* Inner flame */}
                    <motion.div
                      style={{
                        width: 6,
                        height: 10,
                        borderRadius: '50% 50% 30% 30%',
                        background: '#fff',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: 4,
                        opacity: 0.8,
                      }}
                      animate={{ scaleY: [1, 1.2, 0.9, 1] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                    />
                  </motion.button>
                )}
                {blownOut.has(i) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm"
                    style={{ height: 30, display: 'flex', alignItems: 'flex-end' }}
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle body */}
              <div
                style={{
                  width: 16,
                  height: 60,
                  background: `linear-gradient(180deg, ${CANDLE_COLORS[i]} 0%, ${CANDLE_COLORS[i]}aa 100%)`,
                  borderRadius: 8,
                  boxShadow: `0 2px 8px ${CANDLE_COLORS[i]}44`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Cake tiers */}
        {/* Top tier */}
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            width: 200,
            height: 60,
            background: 'linear-gradient(180deg, #fde8f0 0%, #f9d5e5 100%)',
            border: '3px solid #f0b8ce',
            boxShadow: '0 4px 20px rgba(249,213,229,0.6)',
            position: 'relative',
          }}
        >
          {/* Frosting drips */}
          {[20, 50, 80, 110, 140, 170].map((x, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: -8,
                left: x,
                width: 12,
                height: 16,
                background: '#fff',
                borderRadius: '0 0 50% 50%',
              }}
            />
          ))}
          <span className="font-hand text-rose-600 text-sm">Happy Birthday!</span>
        </div>

        {/* Middle tier */}
        <div
          style={{
            width: 260,
            height: 70,
            background: 'linear-gradient(180deg, #f0b8ce 0%, #fde8f0 100%)',
            border: '3px solid #e8667a55',
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(232,102,122,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <span className="font-signature text-2xl" style={{ color: '#7d1f3c' }}>
            {config.birthdayGirl.displayName}
          </span>
          {/* Decorative dots */}
          {[20, 80, 140, 200].map((x, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: 8,
                left: x,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: CANDLE_COLORS[i % CANDLE_COLORS.length],
              }}
            />
          ))}
        </div>

        {/* Bottom tier */}
        <div
          style={{
            width: 320,
            height: 80,
            background: 'linear-gradient(180deg, #fde8f0 0%, #f9d5e5 100%)',
            border: '3px solid #f0b8ce',
            borderRadius: 16,
            boxShadow: '0 8px 30px rgba(249,213,229,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="font-hand text-rose-500 text-lg">🎉 {config.birthdayYear} 🎉</span>
        </div>

        {/* Plate */}
        <div
          style={{
            width: 360,
            height: 20,
            background: 'linear-gradient(180deg, #fff 0%, #fde8f0 100%)',
            borderRadius: '0 0 50% 50%',
            border: '2px solid rgba(249,213,229,0.5)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-10">
        {!allOut ? (
          <>
            <p className="font-hand text-lg" style={{ color: celebrated ? '#7d1f3c' : '#f9d5e5' }}>
              {CANDLE_COUNT - blownOut.size} candle{CANDLE_COUNT - blownOut.size !== 1 ? 's' : ''} left — tap to blow out! 🕯️
            </p>
            <button
              className="btn-primary"
              onClick={blowAll}
              aria-label="Blow out all candles"
            >
              💨 Blow Out All Candles!
            </button>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.h2
                className="font-signature text-5xl text-gradient-rose mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Happy Birthday! 🎂✨
              </motion.h2>
              <p className="font-hand text-xl text-rose-600 mb-2">
                {config.finalSurprise.finalWish}
              </p>
              <p className="font-hand text-lg text-rose-400 mb-6">
                May every wish you made come true this year. 💕
              </p>

              {/* Embedded Memories #17 & #18 */}
              <div className="w-full max-w-2xl mx-auto my-6 text-left">
                <ChapterMemoryGrid chapterId={10} title="Birthday Glitz #17 & #18 🎂" subtitle="Celebrating the birthday girl with sweet memories" />
              </div>

              <button className="btn-primary text-lg px-10 py-4 shadow-xl" onClick={onNext}>
                Continue ✨
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
