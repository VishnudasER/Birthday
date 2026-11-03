// ============================================================
// Chapter 3: A Sky Full of Wishes
// ============================================================
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/data/config';
import { shuffle } from '@/lib/utils';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

const POSITIONS = [
  { x: '8%', y: '20%' }, { x: '25%', y: '10%' }, { x: '45%', y: '18%' },
  { x: '65%', y: '8%' },  { x: '82%', y: '22%' }, { x: '15%', y: '40%' },
  { x: '38%', y: '38%' }, { x: '58%', y: '32%' }, { x: '78%', y: '42%' },
  { x: '5%',  y: '60%' }, { x: '28%', y: '58%' }, { x: '50%', y: '55%' },
  { x: '70%', y: '60%' }, { x: '90%', y: '55%' }, { x: '18%', y: '75%' },
  { x: '42%', y: '72%' }, { x: '62%', y: '78%' }, { x: '85%', y: '70%' },
  { x: '35%', y: '88%' }, { x: '55%', y: '90%' },
];

export function ChapterSkyWishes({ onNext }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [activeMsg, setActiveMsg] = useState<{ id: number; text: string; emoji: string } | null>(null);
  const [shootingStar, setShootingStar] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [shuffledWishes] = useState(() => shuffle(config.wishMessages));
  const msgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHeart = useCallback((idx: number) => {
    const wish = shuffledWishes[idx];
    if (!wish) return;
    setRevealed((prev) => new Set([...prev, idx]));
    if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    setActiveMsg({ id: idx, text: wish.text, emoji: wish.emoji });
    msgTimerRef.current = setTimeout(() => setActiveMsg(null), 4000);
  }, [shuffledWishes]);

  const handleShootingStar = () => {
    if (shootingStar) return;
    setShootingStar(true);
    setTimeout(() => {
      setWishMade(true);
      setShootingStar(false);
    }, 1500);
  };

  const allRevealed = revealed.size >= Math.min(shuffledWishes.length, POSITIONS.length);

  return (
    <div
      className="min-h-dvh relative overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0d0518 0%, #1a0a2e 40%, #2d1040 70%, #1a0820 100%)' }}
    >
      {/* Static stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2.5 + 0.5,
            height: Math.random() * 2.5 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: Math.random() * 4 + 1, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* Shooting star animation */}
      <AnimatePresence>
        {shootingStar && (
          <motion.div
            key="shooting"
            aria-hidden="true"
            className="absolute text-2xl pointer-events-none"
            initial={{ x: '-10%', y: '10%', opacity: 1 }}
            animate={{ x: '110%', y: '90%', opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeIn' }}
            style={{ top: 0, left: 0, zIndex: 10 }}
          >
            ⭐
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="text-center pt-24 pb-6 px-4 relative z-10">
        <motion.h1
          className="font-signature text-5xl md:text-6xl mb-2"
          style={{ color: '#f9d5e5' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          A Sky Full of Wishes 🌟
        </motion.h1>
        <motion.p
          className="font-hand text-lg"
          style={{ color: '#d4b8e0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Tap the hearts to discover what's inside ✨
        </motion.p>
      </div>

      {/* Interactive heart field */}
      <div className="relative flex-1" style={{ minHeight: 400 }}>
        {POSITIONS.slice(0, shuffledWishes.length).map((pos, idx) => (
          <motion.button
            key={idx}
            className="absolute text-2xl md:text-3xl cursor-pointer focus:outline-none"
            style={{ left: pos.x, top: pos.y }}
            aria-label={`Wish heart ${idx + 1}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: revealed.has(idx) ? [1.4, 1] : 1,
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: idx * 0.06 },
              scale: { delay: idx * 0.06 },
              y: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 },
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleHeart(idx)}
          >
            {revealed.has(idx) ? '💖' : '🤍'}
          </motion.button>
        ))}
      </div>

      {/* Message popup */}
      <AnimatePresence>
        {activeMsg && (
          <motion.div
            key={activeMsg.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed bottom-28 left-4 right-4 z-50 mx-auto max-w-md glass rounded-2xl p-5 text-center"
            style={{ border: '1px solid rgba(249,213,229,0.4)', background: 'rgba(255,255,255,0.12)' }}
          >
            <div className="text-3xl mb-2">{activeMsg.emoji}</div>
            <p className="font-hand text-lg text-white">{activeMsg.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shooting star / wish interaction */}
      <div className="text-center pb-32 px-4 relative z-10">
        {!wishMade ? (
          <motion.button
            className="font-hand text-lg px-8 py-3 rounded-full transition-all"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#f9d5e5',
              border: '1px solid rgba(249,213,229,0.3)',
            }}
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
            onClick={handleShootingStar}
          >
            🌠 Make a wish on a shooting star
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-hand text-lg"
            style={{ color: '#f9d5e5' }}
          >
            {config.wishMessages.length > 0 ? config.shootingStarWish : ''}
          </motion.p>
        )}

        {/* Embedded Memories #03 & #04 */}
        <div className="w-full max-w-2xl mx-auto my-8 text-left">
          <ChapterMemoryGrid chapterId={3} title="Starry Memories 🌟" subtitle="Two wishes that already came true in our lives" />
        </div>

        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <button className="btn-primary" onClick={onNext}>
              Continue the journey ✨
            </button>
          </motion.div>
        )}

        {!allRevealed && (
          <div className="mt-4">
            <button
              onClick={onNext}
              className="text-sm font-hand"
              style={{ color: '#d4b8e0', opacity: 0.7 }}
            >
              Skip to next chapter →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
