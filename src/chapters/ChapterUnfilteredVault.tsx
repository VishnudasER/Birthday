// ============================================================
// Chapter 12: Caught in 4K — The Unfiltered Vault
// Dedicated memory showcase spotlight
// ============================================================
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import { ChapterMemoryGrid } from '@/components/MemoryCard';

interface Props {
  onNext: () => void;
}

export function ChapterUnfilteredVault({ onNext }: Props) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-start px-4 pt-20 pb-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(175deg, #fff5f8 0%, #fdf0f5 50%, #f7eaf8 100%)',
      }}
    >
      {/* Subtle Background Glow */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254,205,211,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto mb-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera size={14} className="text-rose-500" />
          <span>Chapter 12 • The Unfiltered Vault</span>
        </div>

        <h1 className="font-signature text-4xl sm:text-5xl text-gradient-rose mb-3">
          Caught in 4K 📸
        </h1>

        <p className="font-hand text-lg sm:text-xl text-rose-600 leading-snug">
          "The best moments were never planned or posed — just real life happening with you."
        </p>

        <p className="mt-2 text-xs sm:text-sm text-stone-500 font-sans max-w-md mx-auto">
          Here are two of my absolute favourite candid snapshots from our adventures.
          Tap on each photo to inspect in full zoom!
        </p>
      </motion.div>

      {/* Chapter Memories Embedded (memory-20, memory-21) */}
      <div className="w-full relative z-10">
        <ChapterMemoryGrid
          chapterId={12}
          title="Unfiltered Files • Exhibits #20 & #21"
          subtitle="Real smiles, stolen moments, zero filters ✨"
        />
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center relative z-10"
      >
        <button
          onClick={onNext}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base font-hand font-bold shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Continue to Golden Milestones</span>
          <ArrowRight size={18} />
        </button>
        <p className="font-hand text-xs text-rose-400 mt-2">
          Almost at the grand finale... ✨
        </p>
      </motion.div>
    </div>
  );
}
