// ============================================================
// MemoryCard.tsx — Aesthetic polaroid memory card with blur-up loading,
// rich variety descriptions, and tap-to-zoom lightbox
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, Sparkles, X, MessageSquareHeart } from 'lucide-react';
import { getMemoriesForChapter, type MemoryItem } from '@/data/chapterMemories';

interface MemoryCardProps {
  memory: MemoryItem;
  className?: string;
  variant?: 'polaroid' | 'compact' | 'spotlight';
}

export function MemoryCard({ memory, className = '' }: MemoryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    } else {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative my-6 mx-auto w-full max-w-md ${className}`}
      >
        {/* Aesthetic Tape / Sticker at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center">
          <div
            className="px-4 py-0.5 rounded-sm text-xs font-hand text-rose-800 shadow-sm border border-rose-200/60"
            style={{
              background: 'linear-gradient(135deg, rgba(255,240,245,0.95), rgba(253,232,240,0.9))',
              backdropFilter: 'blur(4px)',
              transform: 'rotate(-2deg)',
            }}
          >
            {memory.stickerEmoji} {memory.dateTag}
          </div>
        </div>

        {/* Card Body */}
        <div
          className="relative bg-white/95 rounded-2xl p-3.5 sm:p-4 shadow-xl border border-rose-100/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          style={{
            boxShadow: '0 10px 30px -10px rgba(232,102,122,0.2), 0 4px 12px -2px rgba(0,0,0,0.05)',
          }}
        >
          {/* Image Container with Blur-up Loading */}
          <div
            className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden bg-rose-50 cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${memory.title}`}
            onKeyDown={(e) => e.key === 'Enter' && setIsZoomed(true)}
          >
            {/* Shimmer skeleton while loading */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-rose-100/60 via-pink-50/80 to-rose-100/60 animate-pulse flex flex-col items-center justify-center text-rose-400 gap-2">
                <Sparkles size={24} className="animate-spin text-rose-300" style={{ animationDuration: '3s' }} />
                <span className="font-hand text-sm text-rose-400 tracking-wide">Developing memory... ✨</span>
              </div>
            )}

            {/* The Actual Memory Photo */}
            <img
              src={memory.imageSrc}
              alt={memory.title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                isLoaded
                  ? 'opacity-100 blur-0 scale-100'
                  : 'opacity-0 blur-xl scale-105'
              }`}
            />

            {/* Floating Top Tag Pill */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r ${memory.tagColor}`}
                style={{ backdropFilter: 'blur(8px)' }}
              >
                {memory.tag}
              </span>
            </div>

            {/* Quick Zoom Hover Hint Button */}
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(true);
                }}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                aria-label="Expand image"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Quick Heart Reaction Button */}
            <div className="absolute bottom-3 right-3 z-10">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 shadow-md ${
                  liked
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/85 text-rose-600 hover:bg-white backdrop-blur-sm'
                }`}
              >
                <Heart size={13} className={liked ? 'fill-current' : ''} />
                <span>{likeCount}</span>
              </button>
            </div>
          </div>

          {/* Variety Description Section */}
          <div className="mt-3.5 pt-1 px-1">
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-hand text-xl font-bold text-rose-900 leading-tight">
                {memory.title}
              </h3>
            </div>

            {/* Main Story Description with animated reveal */}
            <p className="mt-1.5 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              {memory.description}
            </p>

            {/* Sundramani's Candid Note Callout */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-gradient-to-r from-rose-50/90 to-pink-50/70 border border-rose-100 flex items-start gap-2">
              <MessageSquareHeart size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="font-hand text-xs sm:text-sm text-rose-800 italic leading-snug">
                {memory.sundramaniNote}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close zoomed view"
            >
              <X size={22} />
            </button>

            {/* Zoomed Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[92vh] overflow-y-auto bg-stone-900 text-stone-100 rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/40 max-h-[65vh] flex items-center justify-center">
                <img
                  src={memory.imageSrc}
                  alt={memory.title}
                  className="w-full max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${memory.tagColor}`}>
                    {memory.tag}
                  </span>
                  <span className="text-xs text-rose-300 font-hand">{memory.dateTag}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-hand text-rose-200">
                  {memory.title}
                </h2>
                <p className="mt-2 text-sm text-stone-300 font-sans leading-relaxed">
                  {memory.description}
                </p>
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-rose-300 font-hand text-sm flex items-start gap-2">
                  <Sparkles size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>{memory.sundramaniNote}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Chapter Memories Showcase Grid ──────────────────────────
export function ChapterMemoryGrid({
  chapterId,
  title = 'Chapter Memories',
  subtitle = 'A moment captured in time ✨',
}: {
  chapterId: number;
  title?: string;
  subtitle?: string;
}) {
  const memories: MemoryItem[] = getMemoriesForChapter(chapterId);

  if (!memories || memories.length === 0) return null;

  return (
    <div className="my-8 w-full max-w-4xl mx-auto px-2">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 border border-rose-200 text-rose-700 text-xs font-medium font-hand mb-1.5">
          <Sparkles size={13} className="text-rose-500" />
          <span>{title}</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 font-hand">{subtitle}</p>
      </div>

      <div
        className={`grid gap-6 ${
          memories.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'
        }`}
      >
        {memories.map((mem) => (
          <MemoryCard key={mem.id} memory={mem} />
        ))}
      </div>
    </div>
  );
}
