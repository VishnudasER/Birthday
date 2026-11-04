// ============================================================
// JourneyResponsesModal.tsx — Accessible from any chapter & menu
// Displays all saved interactive responses: Time Capsule, Quiz, More Likely, This or That
// With 1-click Copy All & Download .txt backup
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { getAllJourneyResponses, formatResponsesAsText } from '@/lib/responsesStore';
import { config } from '@/data/config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function JourneyResponsesModal({ isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const responses = getAllJourneyResponses();

  const handleCopy = async () => {
    try {
      const text = formatResponsesAsText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const text = formatResponsesAsText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Our_Journey_Responses_${config.birthdayGirl.name}_and_${config.creator.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasAnyResponses =
    responses.timeCapsule?.items?.length ||
    responses.quiz ||
    responses.moreLikely?.items?.length ||
    responses.thisOrThat?.items?.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-rose-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-rose-100 bg-gradient-to-r from-rose-50/80 to-pink-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-hand font-bold text-2xl text-rose-900 leading-tight">
                    📬 Our Journey Responses Vault
                  </h3>
                  <p className="text-xs text-rose-400 font-sans">
                    Saved locally on this device for {config.birthdayGirl.displayName} & {config.creator.displayName} 💕
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close responses vault"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-stone-50/80 border-b border-rose-100 text-xs">
              <span className="text-stone-500 font-sans">
                {hasAnyResponses ? 'All saved answers & quiz scores' : 'No responses recorded yet'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!hasAnyResponses}
                  className="px-3 py-1.5 rounded-full font-hand font-semibold flex items-center gap-1.5 transition-all bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy All'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!hasAnyResponses}
                  className="px-3 py-1.5 rounded-full font-hand font-semibold flex items-center gap-1.5 transition-all bg-rose-500 hover:bg-rose-600 text-white shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Save .txt</span>
                </button>

                <a
                  href="/answers"
                  className="px-3 py-1.5 rounded-full font-hand font-semibold flex items-center gap-1.5 transition-all bg-stone-900 hover:bg-black text-white shadow-xs cursor-pointer"
                >
                  <FileText size={13} />
                  <span>Open /answers</span>
                </a>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto space-y-6 text-left">
              {/* Section 1: Time Capsule */}
              <div className="space-y-2.5">
                <h4 className="font-hand text-lg font-bold text-rose-900 flex items-center gap-2">
                  <span>🫙 Chapter 8: Friendship Time Capsule</span>
                </h4>
                {responses.timeCapsule?.items?.length ? (
                  <div className="space-y-2.5">
                    {responses.timeCapsule.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100/80">
                        <p className="text-xs font-semibold text-rose-700">Q: {item.question}</p>
                        <p className="text-sm font-hand text-stone-800 mt-1 italic">
                          "{item.answer}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic font-sans p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    No Time Capsule answers saved yet. (Go to Chapter 8 to seal your thoughts!)
                  </p>
                )}
              </div>

              {/* Section 2: Bestie Quiz */}
              <div className="space-y-2.5 pt-3 border-t border-rose-100">
                <h4 className="font-hand text-lg font-bold text-rose-900 flex items-center gap-2">
                  <span>🧠 Chapter 5: Bestie Interrogation Quiz</span>
                </h4>
                {responses.quiz ? (
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-rose-700">Final Score:</span>
                      <span className="font-bold text-rose-900 text-sm">
                        {responses.quiz.score}/{responses.quiz.totalFactual} ({responses.quiz.percentage}%)
                      </span>
                    </div>
                    <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                      {responses.quiz.items.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-stone-50 text-xs flex items-center justify-between border border-stone-100">
                          <span className="truncate pr-2 text-stone-700">{idx + 1}. {item.question}</span>
                          <span className="shrink-0 font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                            {item.chosen}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic font-sans p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    Quiz not completed yet. (Visit Chapter 5 to take the bestie test!)
                  </p>
                )}
              </div>

              {/* Section 3: Who Is More Likely To */}
              <div className="space-y-2.5 pt-3 border-t border-rose-100">
                <h4 className="font-hand text-lg font-bold text-rose-900 flex items-center gap-2">
                  <span>😂 Chapter 6: Who Is More Likely To?</span>
                </h4>
                {responses.moreLikely?.items?.length ? (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-hand">
                      <div className="p-2 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-100">
                        Me: {responses.moreLikely.summary.Me}
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-700 font-semibold border border-amber-100">
                        You: {responses.moreLikely.summary.You}
                      </div>
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-700 font-semibold border border-purple-100">
                        Both: {responses.moreLikely.summary.Both}
                      </div>
                      <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-semibold border border-stone-200">
                        Neither: {responses.moreLikely.summary.Neither}
                      </div>
                    </div>
                    <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                      {responses.moreLikely.items.map((item, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-stone-50 text-xs flex items-center justify-between border border-stone-100">
                          <span className="truncate pr-2 text-stone-700">{item.text}</span>
                          <span className="shrink-0 font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                            {item.choice}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic font-sans p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    No choices made yet. (Visit Chapter 6 to assign the chaos!)
                  </p>
                )}
              </div>

              {/* Section 4: This or That */}
              <div className="space-y-2.5 pt-3 border-t border-rose-100">
                <h4 className="font-hand text-lg font-bold text-rose-900 flex items-center gap-2">
                  <span>⚡ Chapter 7: This or That</span>
                </h4>
                {responses.thisOrThat?.items?.length ? (
                  <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                    {responses.thisOrThat.items.map((item, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-stone-50 text-xs flex items-center justify-between border border-stone-100">
                        <span className="text-stone-500">{item.optionA} vs {item.optionB}</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Selected: {item.chosen}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic font-sans p-3.5 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    No choices made yet. (Visit Chapter 7 for quick picks!)
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-rose-100 bg-stone-50/50 flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
