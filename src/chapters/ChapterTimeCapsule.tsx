// ============================================================
// Chapter 9: Our Friendship Time Capsule
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Send, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { config } from '@/data/config';
import { safeLocalGet, safeLocalSet, safeLocalRemove } from '@/lib/utils';
import type { TimeCapsuleAnswer } from '@/types';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { saveTimeCapsuleResponses } from '@/lib/responsesStore';

interface Props { onNext: () => void }

type Phase = 'writing' | 'review' | 'submitting' | 'success' | 'error';

const DRAFT_KEY = 'tc_draft';

export function ChapterTimeCapsule({ onNext }: Props) {
  const [phase, setPhase] = useState<Phase>('writing');
  const [answers, setAnswers] = useState<TimeCapsuleAnswer[]>(() =>
    safeLocalGet<TimeCapsuleAnswer[]>(DRAFT_KEY, config.timeCapsulePrompts.map((p) => ({ promptId: p.id, answer: '' })))
  );
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [submissionId, setSubmissionId] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const prompts = config.timeCapsulePrompts;

  // Autosave to localStorage (draft only)
  useEffect(() => {
    safeLocalSet(DRAFT_KEY, answers);
  }, [answers]);

  const updateAnswer = useCallback((promptId: string, value: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.promptId === promptId ? { ...a, answer: value } : a))
    );
  }, []);

  const getAnswer = (promptId: string) =>
    answers.find((a) => a.promptId === promptId)?.answer ?? '';

  const filledCount = answers.filter((a) => a.answer.trim().length > 0).length;

  const handleSubmit = async () => {
    if (!consentGiven) return;
    setPhase('submitting');
    setSubmitError('');

    setTimeout(() => {
      saveTimeCapsuleResponses(answers);
      setSubmissionId(`TC-${Date.now().toString(36).toUpperCase()}`);
      safeLocalRemove(DRAFT_KEY);
      setPhase('success');
    }, 800);
  };

  const handleDownload = () => {
    const text = prompts.map((p) => {
      const ans = getAnswer(p.id);
      return `Q: ${p.question}\nA: ${ans || '(no answer)'}\n`;
    }).join('\n---\n\n');

    const blob = new Blob([`Our Friendship Time Capsule\n\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'our-friendship-time-capsule.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 50%, #f9f0ff 100%)' }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-signature text-5xl text-gradient-rose mb-1">🫙 Friendship Time Capsule</h1>
        <p className="font-hand text-lg text-rose-400">Words for now, memories for forever.</p>
        <p className="text-xs text-rose-300 mt-1 font-sans">
          ✏️ Your answers are saved as drafts locally until you explicitly submit them.
        </p>
      </motion.div>

      {/* Embedded Memories #13 & #14 */}
      <div className="w-full max-w-2xl mx-auto my-4 text-left">
        <ChapterMemoryGrid chapterId={8} title="Time Capsule Artifacts #13 & #14 🫙" subtitle="Moments preserved to inspire your answers" />
      </div>

      <AnimatePresence mode="wait">

        {/* WRITING PHASE */}
        {phase === 'writing' && (
          <motion.div
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl"
          >
            {/* Prompt tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {prompts.map((p, idx) => {
                const hasAnswer = getAnswer(p.id).trim().length > 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrentPromptIdx(idx)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full font-hand transition-all flex items-center gap-1"
                    style={{
                      background: currentPromptIdx === idx ? '#e8667a' : hasAnswer ? '#fde8f0' : 'rgba(255,255,255,0.6)',
                      color: currentPromptIdx === idx ? '#fff' : hasAnswer ? '#7d1f3c' : '#c94d63',
                      border: hasAnswer ? '1px solid #f9d5e5' : '1px solid transparent',
                    }}
                  >
                    {hasAnswer && '✓ '}
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Current prompt */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromptIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="paper rounded-3xl p-6 shadow-xl mb-4"
                style={{ border: '1px solid rgba(249,213,229,0.6)' }}
              >
                <p className="font-hand text-sm text-rose-300 mb-2">
                  Question {currentPromptIdx + 1} of {prompts.length}
                </p>
                <p className="font-serif text-xl mb-4" style={{ color: '#3d1a26' }}>
                  {prompts[currentPromptIdx].question}
                </p>
                <textarea
                  value={getAnswer(prompts[currentPromptIdx].id)}
                  onChange={(e) => updateAnswer(prompts[currentPromptIdx].id, e.target.value)}
                  placeholder={prompts[currentPromptIdx].placeholder}
                  maxLength={2000}
                  rows={5}
                  className="w-full rounded-xl p-4 font-hand text-base resize-none outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(249,213,229,0.6)',
                    color: '#3d1a26',
                  }}
                  aria-label={prompts[currentPromptIdx].question}
                />
                <div className="flex items-center justify-between mt-2 text-xs font-sans text-rose-300">
                  <span>{getAnswer(prompts[currentPromptIdx].id).length}/2000</span>
                  <span className="flex items-center gap-1">
                    <Save size={10} /> Autosaved locally
                  </span>
                </div>

                {/* Prompt navigation */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setCurrentPromptIdx((n) => Math.max(0, n - 1))}
                    disabled={currentPromptIdx === 0}
                    className="text-sm font-hand text-rose-400 hover:text-rose-600 disabled:opacity-30 transition-colors"
                  >
                    ← Previous
                  </button>
                  {currentPromptIdx < prompts.length - 1 ? (
                    <button
                      onClick={() => setCurrentPromptIdx((n) => n + 1)}
                      className="text-sm font-hand text-rose-600 hover:text-rose-800 transition-colors"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhase('review')}
                      className="btn-primary text-sm py-1.5 px-4"
                    >
                      Review Answers ✨
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="text-center font-hand text-sm text-rose-400">
              {filledCount} of {prompts.length} answered
            </p>

            <div className="flex gap-3 justify-center mt-4">
              <button className="btn-ghost text-sm" onClick={() => setPhase('review')}>
                Review & Submit
              </button>
              <button className="text-sm font-hand text-rose-300 hover:text-rose-500" onClick={onNext}>
                Skip for now →
              </button>
            </div>
          </motion.div>
        )}

        {/* REVIEW PHASE */}
        {phase === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <button className="btn-ghost py-1.5 px-4 text-sm" onClick={() => setPhase('writing')}>
                ← Edit Answers
              </button>
              <h2 className="font-signature text-3xl text-gradient-rose">Review</h2>
            </div>

            <div className="space-y-4 mb-6">
              {prompts.map((p, idx) => {
                const ans = getAnswer(p.id);
                return (
                  <div key={p.id} className="paper rounded-2xl p-4" style={{ border: '1px solid rgba(249,213,229,0.5)' }}>
                    <p className="font-hand text-sm text-rose-400 mb-1">Q{idx + 1}: {p.question}</p>
                    {ans.trim() ? (
                      <p className="font-sans text-sm text-gray-700 whitespace-pre-wrap">{ans}</p>
                    ) : (
                      <p className="font-hand text-sm text-rose-200 italic">Not answered yet</p>
                    )}
                    <button
                      onClick={() => { setCurrentPromptIdx(idx); setPhase('writing'); }}
                      className="text-xs font-hand text-rose-400 hover:text-rose-600 mt-2 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Consent */}
            <div
              className="glass rounded-2xl p-4 mb-6"
              style={{ border: '1px solid rgba(249,213,229,0.5)' }}
            >
              <p className="font-sans text-sm text-rose-700 mb-3">
                <strong>Before you submit:</strong> Your answers will be sent securely to Sundramani so she can read your beautiful thoughts. Only she can access your responses.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5"
                  id="consent-checkbox"
                />
                <span className="font-hand text-sm text-rose-600">
                  I understand and want to share my answers with Sundramani 💕
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="btn-primary flex-1 justify-center"
                onClick={handleSubmit}
                disabled={!consentGiven}
                style={{ opacity: consentGiven ? 1 : 0.5 }}
              >
                <Send size={16} /> Send to Sundramani 💌
              </button>
              <button className="btn-ghost" onClick={handleDownload}>
                <Download size={16} /> Save as file
              </button>
            </div>

            <button className="block mx-auto mt-3 text-sm font-hand text-rose-300 hover:text-rose-500" onClick={onNext}>
              Skip submission →
            </button>
          </motion.div>
        )}

        {/* SUBMITTING */}
        {phase === 'submitting' && (
          <motion.div
            key="submitting"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-4"
            >
              <Loader2 size={48} style={{ color: '#e8667a' }} />
            </motion.div>
            <p className="font-hand text-xl text-rose-600">Sending your memories with love... 💌</p>
          </motion.div>
        )}

        {/* SUCCESS */}
        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
            <h2 className="font-signature text-4xl text-gradient-rose mb-3">Sealed & Sent! 💌</h2>
            <p className="font-hand text-xl text-rose-600 mb-2">
              Your time capsule is safely on its way to Sundramani.
            </p>
            <p className="font-sans text-sm text-rose-400 mb-8">
              She'll be able to read your beautiful words in her secure dashboard. Thank you for filling this in. 🥺
            </p>
            {submissionId && (
              <p className="text-xs text-rose-300 mb-6 font-mono">ID: {submissionId}</p>
            )}
            <div className="flex gap-3 justify-center">
              <button className="btn-ghost text-sm" onClick={handleDownload}>
                <Download size={14} /> Save a copy
              </button>
              <button className="btn-primary" onClick={onNext}>
                Next chapter ✨
              </button>
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {phase === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-md"
          >
            <AlertCircle size={48} className="mx-auto mb-4" style={{ color: '#e8667a' }} />
            <h2 className="font-serif text-2xl text-rose-700 mb-3">Oops, something went wrong</h2>
            <p className="font-sans text-sm text-rose-400 mb-4">{submitError}</p>
            <p className="font-hand text-base text-rose-600 mb-6">
              Don't worry — your answers are still saved on this device. You can download them as a file.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-ghost" onClick={handleDownload}>
                <Download size={14} /> Download my answers
              </button>
              <button className="btn-ghost" onClick={() => setPhase('review')}>
                Try again
              </button>
              <button className="btn-primary" onClick={onNext}>
                Continue anyway →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
