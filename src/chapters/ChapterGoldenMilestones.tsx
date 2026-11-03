// ============================================================
// Chapter 13: Our Golden Milestones
// Celebrating core milestones and unforgettable memories
// ============================================================
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { config } from '@/data/config';

interface Props {
  onNext: () => void;
}

export function ChapterGoldenMilestones({ onNext }: Props) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-start px-4 pt-20 pb-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #fff7ed 0%, #fef2f2 50%, #fdf2f8 100%)',
      }}
    >
      {/* Floating sparkles */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254,215,170,0.4) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto mb-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award size={14} className="text-amber-600" />
          <span>Chapter 13 • Golden Milestones</span>
        </div>

        <h1 className="font-signature text-4xl sm:text-5xl text-gradient-rose mb-3">
          Our Golden Milestones 💫
        </h1>

        <p className="font-hand text-lg sm:text-xl text-amber-800 leading-snug">
          "From where we started to where we stand today... look at us."
        </p>

        <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
          Every journey has that one special milestone that marks the turning point.
          Here is a golden moment etched in time forever.
        </p>
      </motion.div>

      {/* Chapter Memories Embedded (memory-22) */}
      <div className="w-full relative z-10">
        <ChapterMemoryGrid
          chapterId={13}
          title="Milestone Archive • Exhibit #22"
          subtitle="A memory that will never fade 🏆"
        />
      </div>

      {/* Milestone Certificate / Note Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-amber-200/80 shadow-lg text-center my-4 relative z-10"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 text-xl">
          🎖️
        </div>
        <h4 className="font-hand text-lg font-bold text-amber-900">
          Official Bestie Milestone Certificate
        </h4>
        <p className="text-xs text-stone-600 font-sans mt-1">
          Awarded to <span className="font-semibold text-rose-600">{config.birthdayGirl.displayName}</span> for surviving{' '}
          <span className="font-semibold text-rose-600">{config.creator.displayName}</span> and remaining the absolute best human being on earth.
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center relative z-10"
      >
        <button
          onClick={onNext}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base font-hand font-bold shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Open The Final Letter</span>
          <ArrowRight size={18} />
        </button>
        <p className="font-hand text-xs text-rose-400 mt-2">
          Grab your tissues... 💕
        </p>
      </motion.div>
    </div>
  );
}
