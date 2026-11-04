// ============================================================
// ChapterShell — wraps every chapter with nav, progress, skip
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, SkipForward, Menu, X, RotateCcw, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CHAPTERS } from '@/hooks/useJourney';
import { cn } from '@/lib/utils';
import { JourneyResponsesModal } from './JourneyResponsesModal';

interface ChapterShellProps {
  currentChapter: number;
  progressPercent: number;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  onGoTo: (id: number) => void;
  onReset: () => void;
  isCompleted: (id: number) => boolean;
  isVisited: (id: number) => boolean;
  children: React.ReactNode;
}

export function ChapterShell({
  currentChapter,
  progressPercent,
  onPrev,
  onNext,
  onSkip,
  onGoTo,
  onReset,
  isCompleted,
  isVisited,
  children,
}: ChapterShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [responsesOpen, setResponsesOpen] = useState(false);
  const chapter = CHAPTERS.find((c) => c.id === currentChapter)!;
  const isFirst = currentChapter === 1;
  const isLast = currentChapter === CHAPTERS.length;

  // Autoscroll to the very top on every chapter transition
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const rafId = requestAnimationFrame(scrollToTop);
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentChapter]);

  return (
    <div className="chapter-shell relative">
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 pt-safe"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(249,213,229,0.5)',
        }}
      >
        {/* Progress bar */}
        <div style={{ height: 3, background: '#fde8f0' }}>
          <motion.div
            className="chapter-progress-bar"
            style={{ width: `${progressPercent}%` }}
            layout
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          {/* Prev */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Previous chapter"
            className={cn(
              'flex items-center gap-1 text-sm font-medium transition-all rounded-full px-3 py-1.5',
              isFirst
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-rose-600 hover:bg-blush cursor-pointer'
            )}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Chapter info */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-rose-700 hover:text-rose-900 transition-colors"
            aria-label="Open chapter menu"
          >
            <span>{chapter.emoji}</span>
            <span className="font-hand text-base hidden sm:inline">{chapter.title}</span>
            <span className="text-xs text-rose-400 ml-1">{currentChapter}/{CHAPTERS.length}</span>
            <Menu size={14} className="text-rose-400" />
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={isLast}
            aria-label="Next chapter"
            className={cn(
              'flex items-center gap-1 text-sm font-medium transition-all rounded-full px-3 py-1.5',
              isLast
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-rose-600 hover:bg-blush cursor-pointer'
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="pt-16 min-h-dvh">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom controls ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 pb-safe"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(249,213,229,0.5)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-rose-400 font-hand">
              {progressPercent}% of the journey
            </span>
            <button
              onClick={() => setResponsesOpen(true)}
              className="flex items-center gap-1 text-xs font-hand font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200 transition-colors cursor-pointer"
            >
              <FileText size={12} />
              <span>📬 Responses</span>
            </button>
          </div>
          {!isLast && (
            <button
              onClick={onSkip}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600 transition-colors"
              aria-label="Skip to end"
            >
              <SkipForward size={12} />
              Skip to ending
            </button>
          )}
        </div>
      </div>

      {/* ── Chapter Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-70 w-80 max-w-full bg-gradient-dreamy shadow-2xl overflow-y-auto"
              style={{ borderLeft: '1px solid rgba(249,213,229,0.6)' }}
            >
              <div className="flex items-center justify-between p-4 border-b border-blush">
                <h2 className="font-signature text-2xl text-gradient-rose">Chapters</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-rose-400 hover:text-rose-600 transition-colors p-1 rounded-full"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* View Responses button inside menu */}
              <div className="p-3 border-b border-blush/60 bg-white/40">
                <button
                  onClick={() => { setResponsesOpen(true); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-hand font-bold text-base shadow-sm hover:opacity-95 transition-all cursor-pointer"
                >
                  <FileText size={16} />
                  <span>📬 View Our Journey Responses</span>
                </button>
              </div>

              <div className="p-4 space-y-2">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => { onGoTo(ch.id); setMenuOpen(false); }}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                      currentChapter === ch.id
                        ? 'bg-rose text-white shadow-card'
                        : isVisited(ch.id)
                        ? 'bg-white/70 text-rose-700 hover:bg-blush'
                        : 'bg-white/30 text-gray-400 hover:bg-white/50'
                    )}
                  >
                    <span className="text-lg">{ch.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{ch.title}</div>
                      <div className="text-xs opacity-70 truncate">{ch.description}</div>
                    </div>
                    {isCompleted(ch.id) && (
                      <span className="text-xs bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full shrink-0">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-blush flex items-center justify-between">
                <button
                  onClick={() => { onReset(); setMenuOpen(false); }}
                  className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-600 transition-colors"
                >
                  <RotateCcw size={14} />
                  Start from beginning
                </button>
                <a
                  href="/answers"
                  className="flex items-center gap-1.5 text-xs font-hand font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200 transition-colors"
                >
                  <FileText size={12} />
                  <span>/answers Report</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Journey Responses Modal (Accessible everywhere) ── */}
      <JourneyResponsesModal
        isOpen={responsesOpen}
        onClose={() => setResponsesOpen(false)}
      />
    </div>
  );
}
