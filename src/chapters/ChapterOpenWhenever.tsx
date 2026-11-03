// ============================================================
// Chapter 10: Open Whenever You Need It
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { config } from '@/data/config';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props { onNext: () => void }

export function ChapterOpenWhenever({ onNext }: Props) {
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [openedSet, setOpenedSet] = useState(new Set<string>());

  const letters = config.openWheneverLetters;
  const activeLetterData = letters.find((l) => l.id === openedId);

  const handleOpen = (id: string) => {
    setOpenedId(id);
    setOpenedSet((prev) => new Set([...prev, id]));
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">
          ✉️ Open Whenever You Need It
        </h1>
        <p className="font-hand text-lg text-rose-400">
          Six little envelopes. All for you. Open any, any time.
        </p>
      </motion.div>

      {/* Envelope grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
        {letters.map((letter, idx) => {
          const isOpened = openedSet.has(letter.id);
          return (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleOpen(letter.id)}
              className="relative rounded-3xl p-6 text-center transition-all focus:outline-none"
              style={{
                background: isOpened ? letter.color : 'rgba(255,255,255,0.8)',
                border: `2px solid ${isOpened ? '#e8667a44' : 'rgba(249,213,229,0.7)'}`,
                boxShadow: isOpened ? '0 4px 20px rgba(232,102,122,0.15)' : '0 4px 16px rgba(0,0,0,0.06)',
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              aria-label={letter.trigger}
            >
              {/* Envelope visual */}
              <div className="relative mx-auto mb-4" style={{ width: 60, height: 45 }}>
                {/* Envelope body */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{ background: isOpened ? '#fff' : '#fde8f0', border: '1px solid rgba(249,213,229,0.8)' }}
                />
                {/* Flap */}
                <div
                  className="absolute top-0 left-0 right-0 origin-top transition-transform duration-500"
                  style={{
                    height: '55%',
                    background: '#f9d5e5',
                    clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
                    borderRadius: '4px 4px 0 0',
                    transform: isOpened ? 'rotateX(180deg)' : 'rotateX(0)',
                  }}
                />
                {/* Wax seal */}
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: isOpened
                      ? 'transparent'
                      : 'linear-gradient(135deg, #e8667a, #7d1f3c)',
                    color: '#fff',
                    boxShadow: isOpened ? 'none' : '0 1px 4px rgba(125,31,60,0.4)',
                  }}
                >
                  {isOpened ? '💌' : '❤️'}
                </div>
              </div>

              <p
                className="font-hand text-base leading-tight"
                style={{ color: isOpened ? '#7d1f3c' : '#c94d63' }}
              >
                {letter.trigger}
              </p>

              {isOpened && (
                <span className="absolute top-2 right-2 text-xs bg-rose-100 text-rose-500 px-2 py-0.5 rounded-full font-hand">
                  Opened ✓
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Letter modal */}
      <AnimatePresence>
        {openedId && activeLetterData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setOpenedId(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-60 overflow-y-auto max-h-full"
            >
              <div
                className="rounded-3xl p-8 shadow-2xl paper relative"
                style={{
                  background: activeLetterData.color,
                  border: '1px solid rgba(249,213,229,0.7)',
                  minHeight: 300,
                }}
              >
                <button
                  onClick={() => setOpenedId(null)}
                  className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors"
                  aria-label="Close letter"
                >
                  <X size={20} />
                </button>

                {/* Trigger label */}
                <p className="font-hand text-sm text-rose-400 mb-4">{activeLetterData.trigger}</p>

                {/* Decorative */}
                <div className="text-3xl mb-4">💌</div>

                {/* Content */}
                <p
                  className="font-sans text-base leading-relaxed"
                  style={{ color: '#3d1a26' }}
                >
                  {activeLetterData.content}
                </p>

                {/* Signature */}
                <p
                  className="font-signature text-2xl mt-6 text-right"
                  style={{ color: '#7d1f3c' }}
                >
                  {config.creator.displayName}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Embedded Memories #15 & #16 */}
      <div className="w-full max-w-2xl mx-auto my-6 text-left">
        <ChapterMemoryGrid chapterId={9} title="Visual Comfort Envelopes #15 & #16 ✉️" subtitle="Two snapshots to open whenever you need warmth & smiles" />
      </div>

      <div className="text-center mt-2">
        <p className="font-hand text-sm text-rose-400 mb-4">
          {openedSet.size}/{letters.length} envelopes opened
        </p>
        <button className="btn-primary" onClick={onNext}>
          Continue ✨
        </button>
      </div>
    </div>
  );
}
