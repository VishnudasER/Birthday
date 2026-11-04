// ============================================================
// Chapter 15: The Final Surprise & Grand Finale
// Features celebration box, all 23 memories wall, and
// full frontend-persisted responses vault for Shuttumani & Sundramani
// ============================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Grid, Copy, Check, Download, FileText } from 'lucide-react';
import { config } from '@/data/config';
import { useConfetti } from '@/hooks/useConfetti';
import { CHAPTER_MEMORIES } from '@/data/chapterMemories';
import { MemoryCard } from '@/components/MemoryCard';
import { getAllJourneyResponses, formatResponsesAsText, completeActiveJourney } from '@/lib/responsesStore';

interface Props {
  onGoToChapter: (id: number) => void;
  onReset: () => void;
}

export function ChapterFinalSurprise({ onGoToChapter, onReset }: Props) {
  const [phase, setPhase] = useState<'box' | 'opening' | 'revealed'>('box');
  const [showAllWall, setShowAllWall] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [copied, setCopied] = useState(false);
  const { launch } = useConfetti();

  const responses = getAllJourneyResponses();

  const openBox = () => {
    setPhase('opening');
    completeActiveJourney();
    setTimeout(() => {
      setPhase('revealed');
      launch(200);
    }, 1500);
  };

  useEffect(() => {
    if (phase === 'revealed') {
      const t = setTimeout(() => launch(100), 2000);
      return () => clearTimeout(t);
    }
  }, [phase, launch]);

  const handleCopy = () => {
    const text = formatResponsesAsText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownload = () => {
    const text = formatResponsesAsText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shuttumani-birthday-responses-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 40%, #f9f0ff 100%)' }}
    >
      {/* Stars */}
      {phase === 'revealed' && Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute text-xl pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 3 }}
        >
          {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">

        {/* MYSTERY BOX */}
        {phase === 'box' && (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="text-center"
          >
            <motion.h1
              className="font-signature text-5xl text-gradient-rose mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🎁 {config.finalSurprise.boxLabel}
            </motion.h1>
            <p className="font-hand text-xl text-rose-400 mb-10">
              One last thing before this journey ends...
            </p>

            {/* The box */}
            <motion.button
              onClick={openBox}
              className="relative mx-auto block focus:outline-none"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open the mystery box"
            >
              {/* Box body */}
              <div
                className="w-48 h-44 rounded-2xl mx-auto relative"
                style={{
                  background: 'linear-gradient(160deg, #e8667a 0%, #7d1f3c 100%)',
                  boxShadow: '0 12px 40px rgba(232,102,122,0.5)',
                }}
              >
                {/* Ribbon vertical */}
                <div
                  className="absolute inset-x-0 top-0 bottom-0 mx-auto"
                  style={{ width: 20, background: 'rgba(255,255,255,0.3)', borderRadius: 4 }}
                />
                {/* Ribbon horizontal */}
                <div
                  className="absolute inset-y-0 left-0 right-0 my-auto"
                  style={{ height: 20, background: 'rgba(255,255,255,0.3)', borderRadius: 4 }}
                />
                {/* Bow */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl"
                >
                  🎀
                </div>
                {/* Heart seal */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ❤️
                </div>
              </div>
              <p className="font-hand text-rose-400 mt-4">Tap to open ✨</p>
            </motion.button>
          </motion.div>
        )}

        {/* OPENING */}
        {phase === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="text-7xl mb-4"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎁
            </motion.div>
            <p className="font-hand text-2xl text-rose-600">Opening... ✨</p>
          </motion.div>
        )}

        {/* REVEALED */}
        {phase === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center max-w-2xl w-full"
          >
            {/* Floating hearts */}
            {Array.from({ length: 10 }, (_, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute text-2xl pointer-events-none"
                style={{ left: `${10 + i * 9}%`, bottom: '20%' }}
                animate={{ y: [0, -200], opacity: [1, 0] }}
                transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
              >
                ❤️
              </motion.span>
            ))}

            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              🎉
            </motion.div>

            <motion.h1
              className="font-signature text-5xl md:text-6xl text-gradient-rose mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Happy Birthday, {config.birthdayGirl.displayName}!
            </motion.h1>

            <motion.p
              className="font-hand text-2xl text-rose-500 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {config.finalSurprise.finalWish}
            </motion.p>

            <motion.div
              className="paper rounded-3xl p-6 shadow-xl mb-8 mx-auto max-w-md"
              style={{ border: '1px solid rgba(249,213,229,0.7)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-sans text-base leading-relaxed" style={{ color: '#3d1a26' }}>
                {config.finalSurprise.revealMessage}
              </p>
              <p className="font-signature text-3xl mt-4 text-right" style={{ color: '#7d1f3c' }}>
                {config.creator.displayName}
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-wrap gap-2.5 justify-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {/* Toggle Responses Vault */}
              <button
                className="btn-primary text-sm flex items-center justify-center gap-1.5 shadow-md"
                onClick={() => {
                  setShowResponses((prev) => !prev);
                  if (!showResponses) setShowAllWall(false);
                }}
              >
                <FileText size={15} />
                <span>{showResponses ? 'Hide Our Responses' : '📬 View Our Journey Responses'}</span>
              </button>

              {/* Toggle 23 Memories */}
              <button
                className="btn-ghost text-sm flex items-center justify-center gap-1.5"
                onClick={() => {
                  setShowAllWall((prev) => !prev);
                  if (!showAllWall) setShowResponses(false);
                }}
              >
                <span>📸 {showAllWall ? 'Hide Memory Wall' : 'Revisit All 23 Memories'}</span>
              </button>

              <button className="btn-ghost text-sm flex items-center justify-center gap-1.5" onClick={onReset}>
                <RotateCcw size={14} /> Replay Journey
              </button>

              <button className="btn-ghost text-sm flex items-center justify-center gap-1.5" onClick={() => onGoToChapter(1)}>
                <Grid size={14} /> Chapters
              </button>

              <a
                href="/answers"
                className="px-4 py-2.5 rounded-full text-sm font-hand font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
              >
                <FileText size={14} /> View All Journeys Report (/answers)
              </a>
            </motion.div>

            {/* ── RESPONSES VAULT (Saved in frontend for both) ── */}
            <AnimatePresence>
              {showResponses && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-2xl mx-auto my-6 text-left overflow-hidden"
                >
                  <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-rose-200 shadow-2xl space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-100">
                      <div>
                        <h3 className="font-hand font-bold text-2xl text-rose-900 flex items-center gap-2">
                          <span>📬 Our Journey Responses Vault</span>
                        </h3>
                        <p className="text-xs text-stone-500 font-sans mt-0.5">
                          Saved locally on this device for you and {config.creator.displayName} 💕
                        </p>
                      </div>

                      {/* Quick export tools */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopy}
                          className="px-3 py-1.5 rounded-full text-xs font-hand font-semibold flex items-center gap-1.5 transition-all bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                        >
                          {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copied ? 'Copied to Clipboard!' : 'Copy All'}</span>
                        </button>

                        <button
                          onClick={handleDownload}
                          className="px-3 py-1.5 rounded-full text-xs font-hand font-semibold flex items-center gap-1.5 transition-all bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                        >
                          <Download size={13} />
                          <span>Save .txt</span>
                        </button>
                      </div>
                    </div>

                    {/* Section 1: Time Capsule */}
                    <div className="space-y-2">
                      <h4 className="font-hand text-lg font-bold text-rose-800 flex items-center gap-1.5">
                        <span>🫙 Friendship Time Capsule</span>
                      </h4>
                      {responses.timeCapsule?.items?.length ? (
                        <div className="space-y-2.5">
                          {responses.timeCapsule.items.map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100">
                              <p className="text-xs font-semibold text-rose-700">Q: {item.question}</p>
                              <p className="text-xs sm:text-sm font-hand text-stone-800 mt-1 italic">
                                "{item.answer}"
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 italic font-sans p-3 bg-stone-50 rounded-xl">
                          No Time Capsule answers saved yet. (Go back to Chapter 8 to fill them in!)
                        </p>
                      )}
                    </div>

                    {/* Section 2: Bestie Quiz */}
                    <div className="space-y-2 pt-2 border-t border-rose-100">
                      <h4 className="font-hand text-lg font-bold text-rose-800 flex items-center gap-1.5">
                        <span>🧠 Bestie Interrogation Quiz</span>
                      </h4>
                      {responses.quiz ? (
                        <div className="space-y-2">
                          <div className="p-3 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-between">
                            <span className="text-xs font-medium text-rose-700">Final Score:</span>
                            <span className="font-bold text-rose-900 text-sm">
                              {responses.quiz.score}/{responses.quiz.totalFactual} ({responses.quiz.percentage}%)
                            </span>
                          </div>
                          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                            {responses.quiz.items.map((item, idx) => (
                              <div key={idx} className="p-2 rounded-lg bg-stone-50 text-xs flex items-center justify-between">
                                <span className="truncate pr-2 text-stone-700">{idx + 1}. {item.question}</span>
                                <span className="shrink-0 font-medium text-rose-600">{item.chosen}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 italic font-sans p-3 bg-stone-50 rounded-xl">
                          Quiz not completed yet. (Visit Chapter 5 to take the interrogation!)
                        </p>
                      )}
                    </div>

                    {/* Section 3: Who Is More Likely To */}
                    <div className="space-y-2 pt-2 border-t border-rose-100">
                      <h4 className="font-hand text-lg font-bold text-rose-800 flex items-center gap-1.5">
                        <span>😂 Who Is More Likely To?</span>
                      </h4>
                      {responses.moreLikely?.items?.length ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-4 gap-2 text-center text-xs font-hand">
                            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700">Me: {responses.moreLikely.summary.Me}</div>
                            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">You: {responses.moreLikely.summary.You}</div>
                            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">Both: {responses.moreLikely.summary.Both}</div>
                            <div className="p-1.5 rounded-lg bg-stone-100 text-stone-600">Neither: {responses.moreLikely.summary.Neither}</div>
                          </div>
                          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                            {responses.moreLikely.items.map((item, idx) => (
                              <div key={idx} className="p-2 rounded-lg bg-stone-50 text-xs flex items-center justify-between">
                                <span className="truncate pr-2 text-stone-700">{item.text}</span>
                                <span className="font-bold text-rose-600 shrink-0">[{item.choice}]</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 italic font-sans p-3 bg-stone-50 rounded-xl">
                          Not played yet. (Visit Chapter 6!)
                        </p>
                      )}
                    </div>

                    {/* Section 4: This or That */}
                    <div className="space-y-2 pt-2 border-t border-rose-100">
                      <h4 className="font-hand text-lg font-bold text-rose-800 flex items-center gap-1.5">
                        <span>⚡ This or That Choices</span>
                      </h4>
                      {responses.thisOrThat?.items?.length ? (
                        <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                          {responses.thisOrThat.items.map((item, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-stone-50 text-xs flex items-center justify-between">
                              <span className="text-stone-500 font-sans text-[11px] truncate">{item.optionA} vs {item.optionB}</span>
                              <span className="font-bold text-rose-700 shrink-0 pl-2">{item.chosen}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 italic font-sans p-3 bg-stone-50 rounded-xl">
                          Not played yet. (Visit Chapter 7!)
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* All 23 Memories Celebration Wall */}
            <AnimatePresence>
              {showAllWall && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-4xl mx-auto my-8 overflow-hidden text-left"
                >
                  <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-rose-200 shadow-xl mb-6 text-center">
                    <h3 className="font-signature text-3xl text-gradient-rose mb-1">
                      Our 23 Memories Wall 🎞️
                    </h3>
                    <p className="font-hand text-sm text-rose-600">
                      Every single photo from this 15-chapter adventure, captured with all my love.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CHAPTER_MEMORIES.map((m) => (
                      <MemoryCard key={m.id} memory={m} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="font-hand text-sm text-rose-300 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              With all the love in the world 💕 — {config.creator.displayName}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
