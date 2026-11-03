// ============================================================
// Chapter 2: The Welcome Letter
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/data/config';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

export function ChapterWelcomeLetter({ onNext }: Props) {
  const [visibleCount, setVisibleCount] = useState(1);
  const total = config.welcomeLetter.paragraphs.length;
  const isComplete = visibleCount >= total;

  const reveal = () => {
    if (!isComplete) setVisibleCount((n) => n + 1);
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 40%, #f9f0ff 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl"
      >
        {/* Letter paper */}
        <div
          className="paper rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          style={{ border: '1px solid rgba(249,213,229,0.6)' }}
        >
          {/* Decorative corner roses */}
          <div aria-hidden="true" className="absolute top-4 right-4 text-2xl opacity-30">🌸</div>
          <div aria-hidden="true" className="absolute bottom-4 left-4 text-2xl opacity-30">🌹</div>

          {/* Salutation */}
          <motion.h2
            className="font-signature text-4xl md:text-5xl mb-8 text-gradient-rose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {config.welcomeLetter.salutation}
          </motion.h2>

          {/* Paragraphs */}
          <div className="space-y-5">
            {config.welcomeLetter.paragraphs.slice(0, visibleCount).map((para, i) => (
              <AnimatePresence key={i}>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i === visibleCount - 1 ? 0 : 0 }}
                  className="font-sans text-base md:text-lg leading-relaxed"
                  style={{ color: '#3d1a26' }}
                >
                  {para}
                </motion.p>
              </AnimatePresence>
            ))}
          </div>

          {/* Reveal more / continue */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!isComplete ? (
              <button
                className="btn-ghost"
                onClick={reveal}
              >
                Continue reading... ✨
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-6"
                >
                  {/* Closing */}
                  <div className="text-right space-y-2">
                    <p className="font-sans text-rose-600 italic text-sm">
                      {config.welcomeLetter.closing}
                    </p>
                    <motion.p
                      className="font-signature text-3xl md:text-4xl"
                      style={{ color: '#7d1f3c' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      {config.welcomeLetter.signature}
                    </motion.p>
                    {/* Animated underline for signature */}
                    <motion.div
                      className="h-0.5 ml-auto"
                      style={{ background: 'linear-gradient(90deg, transparent, #e8667a, transparent)', maxWidth: 200 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </div>

                  {/* Embedded Memory #02 */}
                  <div className="pt-2">
                    <ChapterMemoryGrid chapterId={2} title="A Letter Accompaniment 📜" subtitle="A little memory to start our journey" />
                  </div>

                  <div className="flex justify-center pt-2">
                    <button className="btn-primary" onClick={onNext}>
                      To the next chapter ✨
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        {/* Chapter indicator */}
        <p className="text-center mt-4 font-hand text-rose-400 text-sm">
          Chapter 2 · The Welcome Letter
        </p>
      </motion.div>
    </div>
  );
}
