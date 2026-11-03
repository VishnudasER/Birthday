// ============================================================
// Chapter 6: The Bestie Interrogation (Quiz)
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { config } from '@/data/config';
import { formatPercent, cn } from '@/lib/utils';
import type { QuizAnswer } from '@/types';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { saveQuizResponses } from '@/lib/responsesStore';

interface Props { onNext: () => void }

type QuizPhase = 'intro' | 'question' | 'result';

export function ChapterBestieQuiz({ onNext }: Props) {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const questions = config.quizQuestions;
  const q = questions[currentQ];

  const handleAnswer = useCallback((idx: number) => {
    if (selectedOption !== null) return; // prevent double-answering
    setSelectedOption(idx);
    setShowFeedback(true);

    const isFactual = !q.isOpinion && q.correctIndex !== null;
    const isCorrect = isFactual ? idx === q.correctIndex : null;

    const answer: QuizAnswer = {
      questionId: q.id,
      selectedIndex: idx,
      isCorrect,
    };

    setTimeout(() => {
      setAnswers((prev) => [...prev, answer]);
      setShowFeedback(false);
      setSelectedOption(null);

      if (currentQ < questions.length - 1) {
        setCurrentQ((n) => n + 1);
      } else {
        const allAnswers = [...answers, answer];
        const factual = allAnswers.filter((a) => a.isCorrect !== null);
        const correct = factual.filter((a) => a.isCorrect).length;
        const pct = factual.length > 0 ? Math.round((correct / factual.length) * 100) : 100;
        saveQuizResponses(allAnswers, correct, pct, factual.length);
        setPhase('result');
      }
    }, 1800);
  }, [selectedOption, q, currentQ, questions.length, answers]);

  const restart = () => {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setReviewMode(false);
  };

  // Score calculation
  const factualAnswers = answers.filter((a) => a.isCorrect !== null);
  const correctCount = factualAnswers.filter((a) => a.isCorrect).length;
  const percentage = factualAnswers.length > 0
    ? Math.round((correctCount / factualAnswers.length) * 100)
    : 100; // all opinion = 100%

  const resultTitle = [...config.quizResultTitles]
    .reverse()
    .find((r) => percentage >= r.minPercent) ?? config.quizResultTitles[0];

  // Category breakdown
  const categories = [...new Set(questions.map((q) => q.category))];
  const categoryStats = categories.map((cat) => {
    const catQs = questions.filter((q) => q.category === cat);
    const catAnswers = answers.filter((a) =>
      catQs.some((q) => q.id === a.questionId) && a.isCorrect !== null
    );
    const correct = catAnswers.filter((a) => a.isCorrect).length;
    return { cat, correct, total: catAnswers.length };
  });

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <AnimatePresence mode="wait">

        {/* INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-lg"
          >
            <div className="text-6xl mb-4">🧠</div>
            <h1 className="font-signature text-5xl text-gradient-rose mb-3">
              The Bestie Interrogation
            </h1>
            <p className="font-hand text-xl text-rose-600 mb-2">
              {questions.length} questions. Zero judgment. Lots of teasing.
            </p>
            <p className="font-sans text-sm text-rose-400 mb-8 max-w-sm mx-auto">
              Some questions have right answers. Some are just for fun.
              Either way, your score is just a number — you're already my favourite. 💕
            </p>
            <button className="btn-primary text-lg px-10 py-4" onClick={() => setPhase('question')}>
              Let's do this! 🎉
            </button>
          </motion.div>
        )}

        {/* QUESTION */}
        {phase === 'question' && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl"
          >
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 rounded-full bg-blush overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((currentQ) / questions.length) * 100}%`,
                    background: 'linear-gradient(90deg, #e8667a, #7d1f3c)',
                  }}
                />
              </div>
              <span className="text-sm font-hand text-rose-400 shrink-0">
                {currentQ + 1}/{questions.length}
              </span>
            </div>

            {/* Category badge */}
            <span
              className="inline-block text-xs px-3 py-1 rounded-full font-hand mb-3"
              style={{ background: '#fde8f0', color: '#7d1f3c' }}
            >
              {q.category} {q.isOpinion ? '· Opinion' : ''}
            </span>

            {/* Question */}
            <div
              className="paper rounded-3xl p-6 shadow-lg mb-5"
              style={{ border: '1px solid rgba(249,213,229,0.6)' }}
            >
              <p className="font-serif text-xl md:text-2xl text-center leading-relaxed" style={{ color: '#3d1a26' }}>
                {q.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let variant: 'default' | 'correct' | 'wrong' | 'inactive' = 'default';
                if (showFeedback && selectedOption !== null) {
                  if (idx === selectedOption) {
                    if (q.isOpinion || q.correctIndex === null) variant = 'correct';
                    else variant = idx === q.correctIndex ? 'correct' : 'wrong';
                  } else if (!q.isOpinion && idx === q.correctIndex) {
                    variant = 'correct';
                  } else {
                    variant = 'inactive';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedOption !== null}
                    className={cn(
                      'w-full text-left px-5 py-4 rounded-2xl font-hand text-base transition-all border-2',
                      variant === 'default' && 'bg-white/70 border-blush hover:border-rose-300 hover:bg-white hover:shadow-md',
                      variant === 'correct' && 'bg-green-50 border-green-400 text-green-800',
                      variant === 'wrong' && 'bg-red-50 border-red-400 text-red-800',
                      variant === 'inactive' && 'opacity-40 bg-white/40 border-blush',
                    )}
                    style={{ color: variant === 'default' ? '#3d1a26' : undefined }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm shrink-0"
                        style={{
                          borderColor: variant === 'default' ? '#d4b8e0' : 'currentColor',
                          background: variant === 'correct' ? '#22c55e' : variant === 'wrong' ? '#ef4444' : 'transparent',
                          color: ['correct', 'wrong'].includes(variant) ? 'white' : '#d4b8e0',
                        }}
                      >
                        {variant === 'correct' ? '✓' : variant === 'wrong' ? '✗' : String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            <AnimatePresence>
              {showFeedback && selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-2xl text-center font-hand text-lg"
                  style={{
                    background: q.isOpinion || selectedOption === q.correctIndex
                      ? 'rgba(34,197,94,0.1)'
                      : 'rgba(249,213,229,0.5)',
                    color: '#3d1a26',
                  }}
                >
                  {q.isOpinion || q.correctIndex === null
                    ? q.feedback.correct
                    : selectedOption === q.correctIndex
                    ? q.feedback.correct
                    : q.feedback.wrong}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* RESULT */}
        {phase === 'result' && !reviewMode && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl text-center"
          >
            <motion.div
              className="text-7xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Trophy size={64} className="mx-auto" style={{ color: '#d4a847' }} />
            </motion.div>
            <h2 className="font-signature text-5xl text-gradient-rose mb-2">
              {resultTitle.title}
            </h2>
            <p className="font-hand text-xl text-rose-500 mb-1">
              {factualAnswers.length > 0
                ? `${correctCount}/${factualAnswers.length} factual questions correct`
                : 'All opinion questions — no wrong answers! 💕'}
            </p>
            {factualAnswers.length > 0 && (
              <p className="text-4xl font-bold my-4" style={{ color: '#7d1f3c' }}>
                {formatPercent(percentage)}
              </p>
            )}
            <p className="font-hand text-lg text-rose-600 mb-6 max-w-sm mx-auto">
              {resultTitle.message}
            </p>

            {/* Category breakdown */}
            {categoryStats.filter((c) => c.total > 0).length > 0 && (
              <div className="glass rounded-2xl p-4 mb-6 text-left space-y-2">
                <p className="font-hand text-sm text-rose-400 mb-2 text-center">Category Breakdown</p>
                {categoryStats.filter((c) => c.total > 0).map((c) => (
                  <div key={c.cat} className="flex items-center gap-2">
                    <span className="text-xs font-sans text-rose-600 w-28 shrink-0">{c.cat}</span>
                    <div className="flex-1 h-2 bg-blush rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.total > 0 ? (c.correct / c.total) * 100 : 100}%`,
                          background: 'linear-gradient(90deg, #e8667a, #7d1f3c)',
                        }}
                      />
                    </div>
                    <span className="text-xs font-hand text-rose-400 shrink-0">{c.correct}/{c.total}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Embedded Memories #07 & #08 */}
            <div className="w-full text-left my-6">
              <ChapterMemoryGrid chapterId={5} title="Interrogation Exhibits #07 & #08 🔍" subtitle="Undeniable forensic evidence of bestie chaos" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-ghost" onClick={() => setReviewMode(true)}>
                Review Answers
              </button>
              <button className="btn-ghost" onClick={restart}>
                <RotateCcw size={14} /> Retake
              </button>
              <button className="btn-primary" onClick={onNext}>
                Next chapter ✨
              </button>
            </div>
          </motion.div>
        )}

        {/* REVIEW MODE */}
        {phase === 'result' && reviewMode && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-xl space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <button className="btn-ghost py-1.5 px-4 text-sm" onClick={() => setReviewMode(false)}>
                ← Back to results
              </button>
              <h2 className="font-signature text-3xl text-gradient-rose">Answer Review</h2>
            </div>
            {questions.map((qn, idx) => {
              const ans = answers[idx];
              if (!ans) return null;
              const isCorrectOrOpinion = qn.isOpinion || qn.correctIndex === null || ans.isCorrect;
              return (
                <div
                  key={qn.id}
                  className="paper rounded-2xl p-4 border-l-4"
                  style={{ borderLeftColor: isCorrectOrOpinion ? '#22c55e' : '#e8667a' }}
                >
                  <p className="font-sans text-sm font-medium mb-2" style={{ color: '#3d1a26' }}>
                    {idx + 1}. {qn.question}
                  </p>
                  <div className="flex items-center gap-2">
                    {isCorrectOrOpinion
                      ? <CheckCircle size={14} style={{ color: '#22c55e' }} />
                      : <XCircle size={14} style={{ color: '#e8667a' }} />}
                    <p className="font-hand text-sm text-rose-600">
                      Your answer: {qn.options[ans.selectedIndex]}
                    </p>
                  </div>
                  {!qn.isOpinion && qn.correctIndex !== null && ans.selectedIndex !== qn.correctIndex && (
                    <p className="font-hand text-xs text-green-600 mt-1">
                      ✓ {qn.options[qn.correctIndex]}
                    </p>
                  )}
                  <p className="font-hand text-xs text-rose-400 mt-1 italic">
                    {isCorrectOrOpinion ? qn.feedback.correct : qn.feedback.wrong}
                  </p>
                </div>
              );
            })}
            <div className="text-center pt-4">
              <button className="btn-primary" onClick={onNext}>Continue ✨</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
