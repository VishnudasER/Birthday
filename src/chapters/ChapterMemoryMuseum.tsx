// ============================================================
// Chapter 4: The Memory Museum
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Heart, Shuffle, Grid3X3,
  X, ZoomIn, Star, Filter
} from 'lucide-react';
import { photos, type PhotoCategory, getAllCategories } from '@/data/photos';
import { cn } from '@/lib/utils';

interface Props {
  onNext: () => void;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
}

type ViewMode = 'single' | 'thumbnails';
type FilterMode = 'all' | 'favourites' | PhotoCategory;

function PhotoCard({
  photoId,
  caption,
  alt,
  date,
  note,
  isFav,
  onToggleFav,
  onOpenLightbox,
}: {
  photoId: string;
  caption: string;
  alt: string;
  date?: string;
  note?: string;
  isFav: boolean;
  onToggleFav: () => void;
  onOpenLightbox: () => void;
}) {
  const [imgState, setImgState] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <motion.div
      className="polaroid mx-auto"
      style={{ maxWidth: 380 }}
      layout
    >
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio: '4/3', background: '#fde8f0', cursor: 'zoom-in' }}
        onClick={onOpenLightbox}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox()}
        aria-label={`Open ${alt} in full view`}
      >
        <div className="absolute inset-0 skeleton" />
        <img
          src={`/photos/${photoId}.jpg`}
          alt={alt}
          className="relative w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: imgState === 'loaded' ? 1 : 0 }}
          onLoad={() => setImgState('loaded')}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.retried) {
              target.dataset.retried = 'true';
              target.src = `/photos/web/${photoId.replace('photo-', 'vault-')}.jpg`;
            } else {
              setImgState('error');
            }
          }}
          loading="eager"
        />
        {imgState === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-300 bg-rose-50">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-xs font-hand text-center px-4">{caption}</p>
          </div>
        )}

        {/* Zoom hint */}
        <div
          className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.8)' }}
        >
          <ZoomIn size={14} style={{ color: '#7d1f3c' }} />
        </div>
      </div>

      {/* Caption area */}
      <div className="mt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-hand text-lg leading-tight flex-1" style={{ color: '#3d1a26' }}>
            {caption}
          </p>
          <button
            onClick={onToggleFav}
            aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
            className="transition-transform hover:scale-125"
          >
            {isFav ? (
              <Heart size={18} fill="#e8667a" stroke="#e8667a" />
            ) : (
              <Heart size={18} stroke="#d4b8e0" />
            )}
          </button>
        </div>
        {date && (
          <p className="font-hand text-sm mt-1" style={{ color: '#b89ac8' }}>
            📅 {date}
          </p>
        )}
        {note && (
          <p className="font-sans text-xs mt-2 italic" style={{ color: '#7d1f3c', opacity: 0.8 }}>
            {note}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function LightboxModal({
  photoId, alt, caption, onClose,
}: { photoId: string; alt: string; caption: string; onClose: () => void }) {

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Full view: ${alt}`}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        className="relative max-w-4xl w-full max-h-[90dvh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={28} />
        </button>

        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ maxHeight: '80dvh', background: '#111' }}
        >
          <div className="skeleton absolute inset-0 min-h-64" />
          <img
            src={`/photos/${photoId}.jpg`}
            alt={alt}
            className="relative w-full h-full object-contain"
            style={{ maxHeight: '80dvh' }}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.retried) {
                target.dataset.retried = 'true';
                target.src = `/photos/web/${photoId.replace('photo-', 'vault-')}.jpg`;
              }
            }}
          />
        </div>

        <p className="font-hand text-white/80 text-center mt-4 text-lg">{caption}</p>
      </motion.div>
    </motion.div>
  );
}

export function ChapterMemoryMuseum({ onNext, favourites, onToggleFavourite }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredPhotos = filterMode === 'all'
    ? photos
    : filterMode === 'favourites'
    ? photos.filter((p) => favourites.includes(p.id))
    : photos.filter((p) => p.category === filterMode);

  const safeCurrent = Math.min(currentIdx, Math.max(0, filteredPhotos.length - 1));
  const photo = filteredPhotos[safeCurrent];
  const categories = getAllCategories();

  const goPrev = useCallback(() => setCurrentIdx((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setCurrentIdx((i) => Math.min(filteredPhotos.length - 1, i + 1)), [filteredPhotos.length]);
  const goRandom = () => setCurrentIdx(Math.floor(Math.random() * filteredPhotos.length));

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxId) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxId, goPrev, goNext]);

  // Touch swipe handlers
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      goNext();
    } else if (diff < -50) {
      goPrev();
    }
    setTouchStartX(null);
  };

  if (!photo || filteredPhotos.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-20"
        style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 100%)' }}>
        <div className="text-6xl mb-4">📸</div>
        <h2 className="font-serif text-2xl text-rose-700 mb-2">No photos here yet</h2>
        <p className="font-hand text-lg text-rose-400 text-center mb-8">
          {filterMode !== 'all'
            ? 'No photos match this filter. Try "All Memories"!'
            : 'Upload your photos to Supabase Storage to see them here.'}
        </p>
        {filterMode !== 'all' && (
          <button className="btn-ghost" onClick={() => setFilterMode('all')}>Show all memories</button>
        )}
        <button className="btn-primary mt-4" onClick={onNext}>Next chapter →</button>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh flex flex-col px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h1
          className="font-signature text-5xl text-gradient-rose mb-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The Memory Museum 🎞️
        </motion.h1>
        <p className="font-hand text-rose-400">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'memory' : 'memories'} to explore
        </p>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
          <button
            className={cn('text-xs px-3 py-1.5 rounded-full font-hand transition-all', viewMode === 'single' ? 'bg-rose text-white' : 'bg-white/60 text-rose-600')}
            style={viewMode === 'single' ? { background: '#e8667a' } : {}}
            onClick={() => setViewMode('single')}
          >
            Single View
          </button>
          <button
            className={cn('text-xs px-3 py-1.5 rounded-full font-hand transition-all flex items-center gap-1', viewMode === 'thumbnails' ? 'text-white' : 'bg-white/60 text-rose-600')}
            style={viewMode === 'thumbnails' ? { background: '#e8667a' } : {}}
            onClick={() => setViewMode('thumbnails')}
          >
            <Grid3X3 size={12} /> Grid
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="text-xs px-3 py-1.5 rounded-full font-hand bg-white/60 text-rose-600 flex items-center gap-1 hover:bg-white transition-colors"
            onClick={goRandom}
          >
            <Shuffle size={12} /> Random
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded-full font-hand bg-white/60 text-rose-600 flex items-center gap-1 hover:bg-white transition-colors relative"
            onClick={() => setFilterOpen((o) => !o)}
          >
            <Filter size={12} /> Filter
            {filterMode !== 'all' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500" />
            )}
          </button>
        </div>
      </div>

      {/* Filter dropdown */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass rounded-2xl p-4 mb-4 flex flex-wrap gap-2"
            style={{ border: '1px solid rgba(249,213,229,0.5)' }}
          >
            {(['all', 'favourites', ...categories] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilterMode(f); setCurrentIdx(0); setFilterOpen(false); }}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full font-hand transition-all capitalize',
                  filterMode === f ? 'text-white shadow-sm' : 'bg-white/60 text-rose-600 hover:bg-white'
                )}
                style={filterMode === f ? { background: '#e8667a' } : {}}
              >
                {f === 'all' ? '✨ All Memories' : f === 'favourites' ? '❤️ Favourites' : f}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SINGLE VIEW */}
      {viewMode === 'single' && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 flex flex-col items-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PhotoCard
                photoId={photo.id}
                caption={photo.caption}
                alt={photo.alt}
                date={photo.date}
                note={photo.note}
                isFav={favourites.includes(photo.id)}
                onToggleFav={() => onToggleFavourite(photo.id)}
                onOpenLightbox={() => setLightboxId(photo.id)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={goPrev}
              disabled={safeCurrent === 0}
              className={cn('flex items-center gap-1 px-4 py-2 rounded-full font-hand text-sm transition-all',
                safeCurrent === 0 ? 'text-gray-300 bg-gray-100' : 'text-rose-600 bg-white shadow-card hover:shadow-md'
              )}
              aria-label="Previous memory"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="font-hand text-rose-400 text-sm">
              {safeCurrent + 1} / {filteredPhotos.length}
            </span>
            <button
              onClick={goNext}
              disabled={safeCurrent >= filteredPhotos.length - 1}
              className={cn('flex items-center gap-1 px-4 py-2 rounded-full font-hand text-sm transition-all',
                safeCurrent >= filteredPhotos.length - 1 ? 'text-gray-300 bg-gray-100' : 'text-rose-600 bg-white shadow-card hover:shadow-md'
              )}
              aria-label="Next memory"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 max-w-full px-2" style={{ scrollbarWidth: 'none' }}>
            {filteredPhotos.map((p, idx) => (
              <ThumbnailStrip
                key={p.id}
                photoId={p.id}
                alt={p.alt}
                isActive={idx === safeCurrent}
                onClick={() => setCurrentIdx(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* THUMBNAIL GRID VIEW */}
      {viewMode === 'thumbnails' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredPhotos.map((p, idx) => (
            <ThumbnailGrid
              key={p.id}
              photoId={p.id}
              alt={p.alt}
              caption={p.caption}
              isFav={favourites.includes(p.id)}
              onClick={() => { setCurrentIdx(idx); setViewMode('single'); setLightboxId(p.id); }}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxId && (
          <LightboxModal
            photoId={lightboxId}
            alt={photos.find((p) => p.id === lightboxId)?.alt ?? ''}
            caption={photos.find((p) => p.id === lightboxId)?.caption ?? ''}
            onClose={() => setLightboxId(null)}
          />
        )}
      </AnimatePresence>

      <div className="text-center mt-8 pb-4">
        <button className="btn-primary" onClick={onNext}>
          Continue to next chapter ✨
        </button>
      </div>
    </div>
  );
}

function ThumbnailStrip({ photoId, alt, isActive, onClick }: { photoId: string; alt: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn('shrink-0 rounded-lg overflow-hidden transition-all', isActive ? 'ring-2 ring-rose-500 scale-110' : 'opacity-60 hover:opacity-100')}
      style={{ width: 48, height: 48 }}
      aria-label={alt}
    >
      <img
        src={`/photos/${photoId}.jpg`}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.retried) {
            target.dataset.retried = 'true';
            target.src = `/photos/thumbs/${photoId.replace('photo-', 'vault-')}.jpg`;
          }
        }}
      />
    </button>
  );
}

function ThumbnailGrid({ photoId, alt, caption, isFav, onClick }: { photoId: string; alt: string; caption: string; isFav: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative rounded-xl overflow-hidden group"
      style={{ aspectRatio: '1' }}
      whileHover={{ scale: 1.03 }}
      aria-label={caption}
    >
      <img
        src={`/photos/${photoId}.jpg`}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.retried) {
            target.dataset.retried = 'true';
            target.src = `/photos/thumbs/${photoId.replace('photo-', 'vault-')}.jpg`;
          }
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-2 opacity-0 group-hover:opacity-100">
        <p className="text-white text-xs font-hand line-clamp-2">{caption}</p>
      </div>
      {isFav && (
        <div className="absolute top-1 right-1">
          <Star size={14} fill="#e8667a" stroke="#e8667a" />
        </div>
      )}
    </motion.button>
  );
}
