// ============================================================
// Chapter 5: The Grand Photo Vault (250+ memories)
// "A Little World Called Us ❤️"
// ============================================================
import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Search, X, ChevronLeft, ChevronRight,
  Shuffle, Sparkles, Filter, Download
} from 'lucide-react';
import { vaultPhotos, VAULT_CATEGORIES, type VaultCategory } from '@/data/allPhotos';
import { cn } from '@/lib/utils';

interface Props {
  onNext: () => void;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
}

const PAGE_SIZE = 48;

export function ChapterPhotoGallery({ onNext, favourites, onToggleFavourite }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<VaultCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return vaultPhotos.filter((p) => {
      // Category filter
      if (selectedCategory === 'Favourites') {
        if (!favourites.includes(p.id) && !p.favourite) return false;
      } else if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return (
          p.caption.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery, favourites]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  // Active photo for lightbox
  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  }, [activePhotoIndex, filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') setActivePhotoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  // Touch swipe support for lightbox
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNextPhoto();
    else if (diff < -50) handlePrevPhoto();
    setTouchStartX(null);
  };

  const handleShuffle = () => {
    if (filteredPhotos.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredPhotos.length);
    setActivePhotoIndex(randomIndex);
  };

  return (
    <div
      className="min-h-dvh flex flex-col px-4 py-20 relative"
      style={{
        background: 'linear-gradient(160deg, #fff5f8 0%, #fde8f0 40%, #f7effe 80%, #fff8fa 100%)',
      }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-sm font-hand mb-3 shadow-xs"
        >
          <Sparkles size={14} className="text-rose-500 animate-pulse" />
          <span>The Memory Vault</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>250+ Unfiltered Memories</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="font-signature text-4xl sm:text-6xl text-gradient-rose mb-3"
        >
          Our Life in 250+ Frames 📸
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-rose-800/80 max-w-2xl mx-auto"
        >
          Every laugh, every road trip, every silly face, and every unforgettable memory we've shared.
          Tap any photo to view in high resolution!
        </motion.p>
      </div>

      {/* Controls Bar: Filters & Search */}
      <div className="max-w-6xl mx-auto w-full mb-8 space-y-4">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories or captions..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 text-rose-900 placeholder-rose-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-400/50 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400 hover:text-rose-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/80 border border-rose-200 text-rose-700 hover:bg-rose-50 text-sm font-hand transition-all shadow-xs"
            >
              <Shuffle size={14} />
              <span>Random Memory</span>
            </button>
            <div className="text-xs font-hand text-rose-500 bg-rose-100/60 px-3 py-2 rounded-xl">
              {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter size={14} className="text-rose-400 shrink-0 ml-1 mr-1" />
          {VAULT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-hand whitespace-nowrap transition-all shrink-0',
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-300/40 scale-105'
                    : 'bg-white/70 hover:bg-white text-rose-700 border border-rose-100'
                )}
              >
                {cat === 'Favourites' ? '❤️ Favourites' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photos Grid */}
      <div className="max-w-6xl mx-auto w-full flex-1">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-xs rounded-3xl border border-rose-100 p-8">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-serif text-2xl text-rose-800 mb-1">No memories found</h3>
            <p className="font-hand text-lg text-rose-500">
              Try searching with another word or click "All" to view every photo!
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn-primary mt-4"
            >
              Show all memories ✨
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayedPhotos.map((photo, index) => {
              const isFav = favourites.includes(photo.id) || photo.favourite;
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden p-2 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-100/80 flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-50">
                    <img
                      src={photo.thumbUrl}
                      alt={photo.alt}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.retried) {
                          target.dataset.retried = 'true';
                          target.src = photo.url;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavourite(photo.id);
                      }}
                      className={cn(
                        'absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all',
                        isFav
                          ? 'bg-rose-500 text-white scale-110 shadow-sm'
                          : 'bg-white/70 text-rose-400 hover:bg-white hover:text-rose-600 opacity-80 group-hover:opacity-100'
                      )}
                      aria-label="Toggle favourite"
                    >
                      <Heart size={14} className={isFav ? 'fill-current' : ''} />
                    </button>

                    {/* Category Tag on Hover */}
                    <span className="absolute bottom-2 left-2 text-[10px] font-sans px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.category}
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="pt-2 px-1 pb-1">
                    <p className="font-hand text-xs sm:text-sm text-rose-800 line-clamp-2 text-center">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More & Show All Buttons */}
        {visibleCount < filteredPhotos.length && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 mb-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-hand text-lg shadow-sm hover:shadow-md transition-all"
            >
              Load Next 48 Memories (showing {visibleCount} of {filteredPhotos.length}) 💫
            </button>
            <button
              onClick={() => setVisibleCount(filteredPhotos.length)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-hand text-lg shadow-md hover:shadow-lg transition-all"
            >
              Show All {filteredPhotos.length} Photos at Once ✨
            </button>
          </div>
        )}
      </div>

      {/* Next Chapter Prompt */}
      <div className="max-w-xl mx-auto w-full text-center mt-12 pt-8 border-t border-rose-200/60">
        <p className="font-hand text-lg text-rose-700/80 mb-3">
          Ready for even more love & teasing? 💕
        </p>
        <button onClick={onNext} className="btn-primary">
          Continue to 100 Little Reasons →
        </button>
      </div>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 text-white">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-hand">
                {activePhotoIndex! + 1} of {filteredPhotos.length}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.url}
                  download={`memory-${activePhoto.id}.jpg`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                  title="Download photo"
                >
                  <Download size={18} />
                </a>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavourite(activePhoto.id);
                  }}
                  className={cn(
                    'p-2 rounded-full transition-all',
                    favourites.includes(activePhoto.id) || activePhoto.favourite
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  )}
                  title="Favourite"
                >
                  <Heart
                    size={18}
                    className={
                      favourites.includes(activePhoto.id) || activePhoto.favourite
                        ? 'fill-current'
                        : ''
                    }
                  />
                </button>

                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 z-10 transition-all hidden sm:flex items-center justify-center"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 z-10 transition-all hidden sm:flex items-center justify-center"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Lightbox Content */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.img
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={activePhoto.url}
                alt={activePhoto.alt}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              {/* Caption and Category */}
              <div className="mt-3 text-center px-4 max-w-xl">
                <span className="inline-block text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-rose-500/80 text-white mb-1.5">
                  {activePhoto.category}
                </span>
                <p className="font-hand text-base sm:text-lg text-white/90">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
