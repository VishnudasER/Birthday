// ============================================================
// Chapter 14: The Final Letter (emotional centerpiece)
// ============================================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/data/config';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

export function ChapterFinalLetter({ onNext }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const letter = config.finalLetter;
  const total = letter.paragraphs.length;

  // Auto-reveal first paragraph after a brief delay
  useEffect(() => {
    const t = setTimeout(() => setVisibleCount(1), 600);
    return () => clearTimeout(t);
  }, []);

  const revealNext = () => {
    setVisibleCount((n) => Math.min(n + 1, total));
  };

  const isComplete = visibleCount >= total;

  return (
    <div
      className="min-h-dvh flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a0a12 0%, #2d1020 40%, #1a1030 100%)' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(232,102,122,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Letter container */}
        <div
          className="rounded-3xl p-8 md:p-12 relative"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(249,213,229,0.2)',
            boxShadow: '0 8px 60px rgba(232,102,122,0.15)',
          }}
        >
          {/* Decorative */}
          <div aria-hidden="true" className="text-2xl mb-6 opacity-50">💌</div>

          {/* Salutation */}
          <motion.h1
            className="font-signature text-4xl md:text-5xl mb-8"
            style={{ color: '#f9d5e5' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {letter.salutation}
          </motion.h1>

          {/* Paragraphs */}
          <div className="space-y-6">
            {letter.paragraphs.slice(0, visibleCount).map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-base md:text-lg leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Read more / complete */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!isComplete ? (
              <button
                onClick={revealNext}
                className="font-hand text-lg transition-all"
                style={{ color: '#f9d5e5', opacity: 0.7 }}
              >
                Continue reading... ↓
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Closing */}
                <p className="font-sans text-sm italic" style={{ color: 'rgba(249,213,229,0.7)' }}>
                  {letter.closing}
                </p>

                {/* Signature */}
                <motion.p
                  className="font-signature text-4xl md:text-5xl"
                  style={{ color: '#f9d5e5' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {letter.signature}
                </motion.p>

                {/* Signature underline */}
                <motion.div
                  className="h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(249,213,229,0.6), transparent)',
                    maxWidth: 240,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />

                {/* Embedded Memory #23 */}
                <div className="pt-4 text-left">
                  <ChapterMemoryGrid chapterId={14} title="The Heart of It All #23 💕" subtitle="My person, through every chapter and beyond" />
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.button
                    className="btn-primary text-base px-8 py-3 shadow-xl"
                    onClick={onNext}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    One final surprise... 🎁
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <p className="text-center mt-4 font-hand text-sm" style={{ color: 'rgba(249,213,229,0.4)' }}>
          Chapter 14 · The Final Letter
        </p>
      </motion.div>
    </div>
  );
}
