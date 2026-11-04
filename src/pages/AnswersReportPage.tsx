// ============================================================
// AnswersReportPage.tsx — Sub URL: https://srubirthday.vercel.app/answers
// Complete audit report of all journeys, responses, and log times
// ============================================================
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Copy,
  Check,
  Download,
  Upload,
  Search,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Layers,
  FileText,
  Trash2,
} from 'lucide-react';
import { config } from '@/data/config';
import {
  getAllJourneys,
  type JourneyRecord,
  formatJourneyAsReportText,
  formatAllJourneysConsolidatedReport,
  exportJourneysAsJson,
  importJourneysFromJson,
  clearAllJourneys,
  startNewJourney,
} from '@/lib/responsesStore';

export function AnswersReportPage() {
  const [journeys, setJourneys] = useState<JourneyRecord[]>(() => getAllJourneys());
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(() => {
    const list = getAllJourneys();
    return list[0]?.id || 'all';
  });
  const [filterSection, setFilterSection] = useState<'all' | 'quiz' | 'moreLikely' | 'thisOrThat' | 'timeCapsule' | 'timeline'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(() => new Date().toLocaleTimeString());

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reload journeys when component updates or upon import
  const refreshJourneys = () => {
    const updated = getAllJourneys();
    setJourneys(updated);
    if (!updated.some((j) => j.id === selectedJourneyId) && updated.length > 0) {
      setSelectedJourneyId(updated[0].id);
    }
  };

  const selectedJourney = useMemo(() => {
    return journeys.find((j) => j.id === selectedJourneyId);
  }, [journeys, selectedJourneyId]);

  // Formatter for timestamps
  const fmtTimestamp = (iso?: string) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const fmtTimeOnly = (iso?: string) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const calcOffset = (baseIso?: string, targetIso?: string) => {
    if (!baseIso || !targetIso) return '';
    try {
      const b = new Date(baseIso).getTime();
      const t = new Date(targetIso).getTime();
      const diffSec = Math.max(0, Math.round((t - b) / 1000));
      const m = Math.floor(diffSec / 60);
      const s = diffSec % 60;
      if (m === 0) return `+${s}s`;
      return `+${m}m ${s.toString().padStart(2, '0')}s`;
    } catch {
      return '';
    }
  };

  // Actions
  const handleCopyReport = () => {
    const text = selectedJourney
      ? formatJourneyAsReportText(selectedJourney)
      : formatAllJourneysConsolidatedReport();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadTxt = () => {
    const text = selectedJourney
      ? formatJourneyAsReportText(selectedJourney)
      : formatAllJourneysConsolidatedReport();
    const filename = selectedJourney
      ? `shuttumani-journey-${selectedJourney.journeyNumber}-report.txt`
      : `shuttumani-all-10-journeys-master-report.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const jsonStr = exportJourneysAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shuttumani-birthday-all-journeys-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const res = importJourneysFromJson(importJsonText);
    if (res.success) {
      setImportFeedback(`✅ Successfully imported and merged ${res.count} journeys!`);
      refreshJourneys();
      setTimeout(() => {
        setShowImportModal(false);
        setImportFeedback(null);
        setImportJsonText('');
      }, 1500);
    } else {
      setImportFeedback(`❌ Import failed: ${res.error || 'Invalid JSON'}`);
    }
  };

  const handleClearAllJourneys = () => {
    if (confirm('Clear all entries from this dashboard? Only Shuttumani\'s real responses will appear.')) {
      clearAllJourneys();
      setJourneys([]);
      setSelectedJourneyId('all');
    }
  };

  const handleCreateNewJourney = () => {
    const newJ = startNewJourney();
    refreshJourneys();
    setSelectedJourneyId(newJ.id);
  };

  // Search filtering
  const qLower = searchQuery.toLowerCase().trim();

  return (
    <div className="min-h-dvh bg-stone-50 text-stone-900 font-sans selection:bg-rose-200 selection:text-rose-900 pb-24">
      {/* ── Top Bar & Navigation ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-hand font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all hover:scale-105"
            >
              <ArrowLeft size={14} /> Back to Birthday Universe
            </a>
            <div className="h-4 w-px bg-rose-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-100 text-rose-800">
                /answers
              </span>
              <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                https://srubirthday.vercel.app/answers
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-500 px-2.5 py-1 rounded-full bg-stone-100">
              <Clock size={12} className="text-rose-500" />
              <span>{currentTime}</span>
            </div>

            <button
              onClick={handleCopyReport}
              disabled={journeys.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-hand font-bold bg-white text-rose-700 hover:bg-rose-50 border border-rose-200 shadow-sm transition-all disabled:opacity-40"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copied Full Report!' : 'Copy Report'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              disabled={journeys.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-hand font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all disabled:opacity-40"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span> .txt
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-hand font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer"
              title="Sync or Import Data"
            >
              <Upload size={13} />
              <span className="hidden sm:inline">Sync / Import</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Hero ── */}
      <section className="bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-stone-50 pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-rose-100/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-hand font-semibold text-rose-700 bg-rose-100/80 mb-2">
                <Sparkles size={12} className="text-rose-500" />
                <span>Executive Responses & Audit Log Vault</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight font-bold">
                Birthday Girl Responses & Timings 📜
              </h1>
              <p className="text-sm sm:text-base text-stone-600 font-sans mt-1 max-w-2xl">
                Every single quiz answer, &ldquo;Who Is More Likely To&rdquo; choice, &ldquo;This or That&rdquo; pick, and heartfelt Time Capsule letter from Shuttumani—logged with exact timestamps down to the second.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCreateNewJourney}
                className="px-3.5 py-2 rounded-xl text-xs font-hand font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 shadow-sm transition-all"
              >
                + Start New Journey
              </button>
              {journeys.length > 0 && (
                <button
                  onClick={handleClearAllJourneys}
                  className="px-3.5 py-2 rounded-xl text-xs font-hand font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Clear all entries"
                >
                  <Trash2 size={13} />
                  <span>Clear All Entries</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Horizontal Journey Selector Tabs (Only if journeys exist) ── */}
          {journeys.length > 0 && (
            <div className="mt-8 pt-4 border-t border-rose-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-rose-500" />
                  <span>Recorded Journeys ({journeys.length})</span>
                </span>
                <span className="text-xs text-rose-600 font-hand font-medium">
                  Click any tab below to inspect that journey&apos;s full audit log
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {/* Consolidated view tab */}
                <button
                  onClick={() => setSelectedJourneyId('all')}
                  className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-hand font-bold flex items-center gap-2 border transition-all ${
                    selectedJourneyId === 'all'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-105'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300 hover:bg-rose-50/50'
                  }`}
                >
                  <Layers size={14} />
                  <span>📊 Master Consolidated Overview</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedJourneyId === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {journeys.length}
                  </span>
                </button>

                {/* Individual journey tabs */}
                {journeys.map((j) => {
                  const isSelected = selectedJourneyId === j.id;
                  return (
                    <button
                      key={j.id}
                      onClick={() => setSelectedJourneyId(j.id)}
                      className={`shrink-0 px-3.5 py-2 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-200'
                          : 'bg-white/80 border-stone-200 hover:border-rose-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-hand font-bold text-sm ${isSelected ? 'text-rose-700' : 'text-stone-800'}`}>
                          Journey #{j.journeyNumber}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                            j.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {j.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-stone-500">
                        <span>{fmtTimeOnly(j.startedAt)}</span>
                        <span>•</span>
                        <span>{j.durationFormatted || 'Active'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {journeys.length === 0 ? (
          /* ── Pristine Clean Empty State ── */
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-rose-200 shadow-sm text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 text-3xl shadow-inner">
              💌
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-hand font-semibold text-rose-700 bg-rose-100/80 mb-2">
                <Sparkles size={13} className="text-rose-500" />
                <span>Pristine Audit Vault Ready</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Waiting for Birthday Girl Shuttumani 💕
              </h2>
              <p className="text-sm text-stone-600 font-sans mt-2 max-w-lg mx-auto leading-relaxed">
                All mock entries have been cleared. As soon as Shuttumani logs in at the entrance with her username and password and begins her 15-chapter adventure, all her responses, quiz answers, and log times will appear right here in real-time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-left space-y-2.5 text-xs font-mono max-w-md mx-auto">
              <div className="text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                Access Gate Credentials:
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Username:</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                  shuttumani
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Secret Password:</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                  shuttumani051199
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="/"
                className="px-5 py-2.5 rounded-full text-xs font-hand font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all"
              >
                Go to Birthday Entrance (https://srubirthday.vercel.app/)
              </a>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2.5 rounded-full text-xs font-hand font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all flex items-center gap-1.5"
              >
                <Upload size={13} />
                <span>Sync / Import Data</span>
              </button>
            </div>
          </div>
        ) : selectedJourneyId === 'all' ? (
          <div className="space-y-6">
            {/* Consolidated Header Card */}
            <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 font-serif">
                    Master Consolidated Audit Table
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-sans mt-0.5">
                    Showing all {journeys.length} journeys logged for {config.birthdayGirl.displayName} on https://srubirthday.vercel.app/
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadTxt}
                    className="px-3 py-1.5 rounded-xl text-xs font-hand font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <Download size={13} /> Download Master Report (.txt)
                  </button>
                  <button
                    onClick={handleExportJson}
                    className="px-3 py-1.5 rounded-xl text-xs font-hand font-bold bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center gap-1.5"
                  >
                    <FileText size={13} /> Export JSON
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-400 font-mono uppercase text-[10px]">
                      <th className="py-3 px-3">Journey #</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Device</th>
                      <th className="py-3 px-3">Start Log Time</th>
                      <th className="py-3 px-3">Completion Log Time</th>
                      <th className="py-3 px-3">Duration</th>
                      <th className="py-3 px-3">Quiz Score</th>
                      <th className="py-3 px-3">Time Capsule</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {journeys.map((j) => (
                      <tr key={j.id} className="hover:bg-rose-50/40 transition-colors">
                        <td className="py-3 px-3 font-hand font-bold text-sm text-rose-700">
                          Journey #{j.journeyNumber}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                              j.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {j.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-600 truncate max-w-[140px]">
                          {j.device || 'Web Browser'}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-600">
                          {fmtTimestamp(j.startedAt)}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-600">
                          {fmtTimestamp(j.completedAt)}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-rose-600">
                          {j.durationFormatted || '—'}
                        </td>
                        <td className="py-3 px-3">
                          {j.quiz ? (
                            <span className="font-mono font-medium text-stone-800">
                              {j.quiz.score}/{j.quiz.totalFactual} ({j.quiz.percentage}%)
                            </span>
                          ) : (
                            <span className="text-stone-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          {j.timeCapsule ? (
                            <span className="font-mono text-stone-800">
                              {j.timeCapsule.totalWords} words ({j.timeCapsule.items.length} prompts)
                            </span>
                          ) : (
                            <span className="text-stone-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedJourneyId(j.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-hand font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                          >
                            Inspect Log →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick aggregated insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm">
                <span className="text-xs font-mono text-stone-400 uppercase">Total Journeys</span>
                <p className="font-serif text-3xl font-bold text-rose-600 mt-1">{journeys.length}</p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Recorded across sessions</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm">
                <span className="text-xs font-mono text-stone-400 uppercase">Bestie Quiz Avg</span>
                <p className="font-serif text-3xl font-bold text-amber-600 mt-1">
                  {Math.round(
                    journeys.reduce((acc, j) => acc + (j.quiz?.percentage || 90), 0) / (journeys.length || 1)
                  )}
                  %
                </p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Highest level bestie score</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm">
                <span className="text-xs font-mono text-stone-400 uppercase">Time Capsule Total</span>
                <p className="font-serif text-3xl font-bold text-purple-600 mt-1">
                  {journeys.reduce((acc, j) => acc + (j.timeCapsule?.totalWords || 0), 0)}
                </p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Heartfelt words written</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm">
                <span className="text-xs font-mono text-stone-400 uppercase">Gate Secret Passcode</span>
                <p className="font-mono text-lg font-bold text-emerald-600 mt-2 truncate">
                  shuttumani051199
                </p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">100% verified access code</p>
              </div>
            </div>
          </div>
        ) : selectedJourney ? (
          /* ── Single Journey Detailed Audit View ── */
          <div className="space-y-6">
            {/* Journey Meta Header Card */}
            <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-hand font-bold bg-rose-100 text-rose-800">
                      Audit Log for Journey #{selectedJourney.journeyNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                        selectedJourney.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {selectedJourney.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-stone-900">
                    Journey #{selectedJourney.journeyNumber} Detailed Report
                  </h2>
                  <p className="text-xs font-mono text-stone-500 mt-1 flex items-center gap-2">
                    <Smartphone size={13} className="text-rose-400" />
                    <span>{selectedJourney.device || 'Web Browser'}</span>
                    <span>•</span>
                    <span>Session ID: {selectedJourney.id}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="px-3.5 py-2 rounded-xl text-xs font-hand font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1.5"
                  >
                    {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied Journey!' : 'Copy This Journey'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="px-3.5 py-2 rounded-xl text-xs font-hand font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm flex items-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>

              {/* Timing metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[11px] font-mono text-stone-400 uppercase flex items-center gap-1">
                    <Calendar size={12} className="text-rose-400" /> Started At
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                    {fmtTimestamp(selectedJourney.startedAt)}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[11px] font-mono text-stone-400 uppercase flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-500" /> Completed At
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                    {fmtTimestamp(selectedJourney.completedAt)}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[11px] font-mono text-stone-400 uppercase flex items-center gap-1">
                    <Clock size={12} className="text-purple-500" /> Total Duration
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-bold text-rose-600 mt-1">
                    {selectedJourney.durationFormatted || 'In progress'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[11px] font-mono text-stone-400 uppercase flex items-center gap-1">
                    <ShieldCheck size={12} className="text-rose-400" /> Gate Credentials
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-stone-800 mt-1 truncate">
                    User: {selectedJourney.accessUnlock?.username || 'shuttumani'}
                  </p>
                  <p className="font-mono text-[10px] text-rose-600 truncate">
                    Code: {selectedJourney.accessUnlock?.code || 'shuttumani051199'}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Filters & Live Search ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setFilterSection('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 ${
                    filterSection === 'all'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All Sections
                </button>
                <button
                  onClick={() => setFilterSection('quiz')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 flex items-center gap-1 ${
                    filterSection === 'quiz'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>🧠 Bestie Quiz</span>
                  <span className="text-[10px] opacity-75">({selectedJourney.quiz?.items.length || 15})</span>
                </button>
                <button
                  onClick={() => setFilterSection('moreLikely')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 flex items-center gap-1 ${
                    filterSection === 'moreLikely'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>😂 More Likely</span>
                  <span className="text-[10px] opacity-75">({selectedJourney.moreLikely?.items.length || 17})</span>
                </button>
                <button
                  onClick={() => setFilterSection('thisOrThat')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 flex items-center gap-1 ${
                    filterSection === 'thisOrThat'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>⚡ This or That</span>
                  <span className="text-[10px] opacity-75">({selectedJourney.thisOrThat?.items.length || 20})</span>
                </button>
                <button
                  onClick={() => setFilterSection('timeCapsule')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 flex items-center gap-1 ${
                    filterSection === 'timeCapsule'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>🫙 Time Capsule</span>
                  <span className="text-[10px] opacity-75">({selectedJourney.timeCapsule?.items.length || 6})</span>
                </button>
                <button
                  onClick={() => setFilterSection('timeline')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-hand font-bold transition-all shrink-0 flex items-center gap-1 ${
                    filterSection === 'timeline'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>⏱️ Timeline</span>
                </button>
              </div>

              {/* Search input */}
              <div className="relative shrink-0 w-full md:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search questions or answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            {/* ── SECTION 1: 🧠 Bestie Quiz Interrogation ── */}
            {(filterSection === 'all' || filterSection === 'quiz') && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Chapter 5: The Bestie Interrogation Quiz
                      </h3>
                      <p className="text-xs text-stone-500 font-sans">
                        Completed at: {fmtTimestamp(selectedJourney.quiz?.completedAt)}
                      </p>
                    </div>
                  </div>

                  {selectedJourney.quiz && (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Score: {selectedJourney.quiz.score}/{selectedJourney.quiz.totalFactual} ({selectedJourney.quiz.percentage}%)
                      </span>
                    </div>
                  )}
                </div>

                {selectedJourney.quiz?.items?.length ? (
                  <div className="space-y-3">
                    {selectedJourney.quiz.items
                      .filter((it) => {
                        if (!qLower) return true;
                        return (
                          it.question.toLowerCase().includes(qLower) ||
                          it.chosen.toLowerCase().includes(qLower) ||
                          (it.correct && it.correct.toLowerCase().includes(qLower))
                        );
                      })
                      .map((item, idx) => {
                        const offset = calcOffset(selectedJourney.startedAt, item.answeredAt);
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-rose-200 transition-all space-y-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-rose-600">Q{idx + 1}.</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-200/70 text-stone-700">
                                  {item.category}
                                </span>
                                <span className="font-medium text-stone-900">{item.question}</span>
                              </div>
                              <div className="flex items-center gap-2 text-stone-500 font-mono text-[11px] shrink-0">
                                <span>{fmtTimeOnly(item.answeredAt)}</span>
                                {offset && <span className="text-rose-500">({offset})</span>}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-stone-500">Shuttumani&apos;s Chosen Answer:</span>
                                <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                                  {item.chosen}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {item.isCorrect === true && (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-medium">
                                    <CheckCircle2 size={13} /> Correct Answer
                                  </span>
                                )}
                                {item.isCorrect === false && (
                                  <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                                    <XCircle size={13} /> Correct was: {item.correct}
                                  </span>
                                )}
                                {item.isCorrect === null && (
                                  <span className="inline-flex items-center gap-1 text-purple-600 text-xs font-medium">
                                    <HelpCircle size={13} /> Valid Bestie Opinion
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic p-4 bg-stone-50 rounded-2xl">
                    Quiz not taken in this journey.
                  </p>
                )}
              </div>
            )}

            {/* ── SECTION 2: 😂 Who Is More Likely To ── */}
            {(filterSection === 'all' || filterSection === 'moreLikely') && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😂</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Chapter 6: Who Is More Likely To?
                      </h3>
                      <p className="text-xs text-stone-500 font-sans">
                        Completed at: {fmtTimestamp(selectedJourney.moreLikely?.completedAt)}
                      </p>
                    </div>
                  </div>

                  {selectedJourney.moreLikely && (
                    <div className="flex items-center gap-1.5 font-hand text-xs">
                      <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 font-semibold">
                        Me: {selectedJourney.moreLikely.summary.Me}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold">
                        You: {selectedJourney.moreLikely.summary.You}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold">
                        Both: {selectedJourney.moreLikely.summary.Both}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-stone-100 text-stone-600 font-semibold">
                        Neither: {selectedJourney.moreLikely.summary.Neither}
                      </span>
                    </div>
                  )}
                </div>

                {selectedJourney.moreLikely?.items?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedJourney.moreLikely.items
                      .filter((it) => {
                        if (!qLower) return true;
                        return (
                          it.text.toLowerCase().includes(qLower) ||
                          it.choice.toLowerCase().includes(qLower)
                        );
                      })
                      .map((item, idx) => {
                        const offset = calcOffset(selectedJourney.startedAt, item.answeredAt);
                        const choiceBg =
                          item.choice === 'Me'
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : item.choice === 'You'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : item.choice === 'Both'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : 'bg-stone-200 text-stone-800 border-stone-300';

                        return (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono text-[10px] text-stone-400">#{idx + 1}</span>
                              <p className="font-medium text-stone-800">{item.text}</p>
                              <span className="font-mono text-[10px] text-stone-400">
                                {fmtTimeOnly(item.answeredAt)} {offset && `(${offset})`}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-xl font-hand font-bold text-xs border shrink-0 ${choiceBg}`}>
                              {item.choice}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic p-4 bg-stone-50 rounded-2xl">
                    More Likely not played in this journey.
                  </p>
                )}
              </div>
            )}

            {/* ── SECTION 3: ⚡ This or That ── */}
            {(filterSection === 'all' || filterSection === 'thisOrThat') && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Chapter 7: This or That Choices
                      </h3>
                      <p className="text-xs text-stone-500 font-sans">
                        Completed at: {fmtTimestamp(selectedJourney.thisOrThat?.completedAt)}
                      </p>
                    </div>
                  </div>

                  {selectedJourney.thisOrThat && (
                    <span className="text-xs font-mono text-stone-500">
                      Total choices: {selectedJourney.thisOrThat.items.length}
                    </span>
                  )}
                </div>

                {selectedJourney.thisOrThat?.items?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedJourney.thisOrThat.items
                      .filter((it) => {
                        if (!qLower) return true;
                        return (
                          it.optionA.toLowerCase().includes(qLower) ||
                          it.optionB.toLowerCase().includes(qLower) ||
                          it.chosen.toLowerCase().includes(qLower)
                        );
                      })
                      .map((item, idx) => {
                        const offset = calcOffset(selectedJourney.startedAt, item.answeredAt);
                        return (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono text-[10px] text-stone-400">#{idx + 1}</span>
                              <p className="text-stone-500 text-[11px]">
                                {item.optionA} <span className="text-stone-300">vs</span> {item.optionB}
                              </p>
                              <span className="font-mono text-[10px] text-stone-400">
                                {fmtTimeOnly(item.answeredAt)} {offset && `(${offset})`}
                              </span>
                            </div>
                            <span className="px-3 py-1 rounded-xl font-hand font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                              {item.chosen}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic p-4 bg-stone-50 rounded-2xl">
                    This or That not completed in this journey.
                  </p>
                )}
              </div>
            )}

            {/* ── SECTION 4: 🫙 Friendship Time Capsule ── */}
            {(filterSection === 'all' || filterSection === 'timeCapsule') && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🫙</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Chapter 8: Our Friendship Time Capsule
                      </h3>
                      <p className="text-xs text-stone-500 font-sans">
                        Sealed at: {fmtTimestamp(selectedJourney.timeCapsule?.submittedAt)}
                      </p>
                    </div>
                  </div>

                  {selectedJourney.timeCapsule && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      Total: {selectedJourney.timeCapsule.totalWords} heartfelt words
                    </span>
                  )}
                </div>

                {selectedJourney.timeCapsule?.items?.length ? (
                  <div className="space-y-4">
                    {selectedJourney.timeCapsule.items
                      .filter((it) => {
                        if (!qLower) return true;
                        return (
                          it.question.toLowerCase().includes(qLower) ||
                          it.answer.toLowerCase().includes(qLower)
                        );
                      })
                      .map((item, idx) => {
                        const offset = calcOffset(selectedJourney.startedAt, item.answeredAt);
                        return (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/40 to-pink-50/20 border border-rose-100 space-y-2.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                              <span className="font-hand font-bold text-base text-rose-900">
                                #{idx + 1}. {item.question}
                              </span>
                              <div className="flex items-center gap-2 text-stone-500 font-mono text-[11px] shrink-0">
                                <span>{item.wordCount} words</span>
                                <span>•</span>
                                <span>{fmtTimeOnly(item.answeredAt)}</span>
                                {offset && <span className="text-rose-500">({offset})</span>}
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white border border-rose-100 shadow-sm text-sm text-stone-800 font-sans leading-relaxed">
                              &ldquo;{item.answer}&rdquo;
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic p-4 bg-stone-50 rounded-2xl">
                    Time capsule not filled in this journey.
                  </p>
                )}
              </div>
            )}

            {/* ── SECTION 5: ⏱️ Timeline & Chapters Log ── */}
            {(filterSection === 'all' || filterSection === 'timeline') && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Chapter Navigation & Audit Timeline
                    </h3>
                    <p className="text-xs text-stone-500 font-sans">
                      Chronological log of every section entered, completed, and milestone reached
                    </p>
                  </div>
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-100">
                  {/* Gate Unlock */}
                  {selectedJourney.accessUnlock && (
                    <div className="relative text-xs">
                      <div className="absolute -left-[1.65rem] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900">Access Gate Unlocked</span>
                        <span className="font-mono text-stone-400 text-[11px]">
                          {fmtTimeOnly(selectedJourney.accessUnlock.timestamp)}
                        </span>
                      </div>
                      <p className="text-stone-500 mt-0.5 font-mono text-[11px]">
                        User: &ldquo;{selectedJourney.accessUnlock.username || 'shuttumani'}&rdquo; • Passcode: &ldquo;{selectedJourney.accessUnlock.code}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Chapters */}
                  {selectedJourney.chapterLogs?.map((ch, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div className="absolute -left-[1.65rem] top-0.5 w-3 h-3 rounded-full bg-rose-400 ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-stone-900">
                          Chapter {ch.chapterId}: {ch.title}
                        </span>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
                          <span>Entered: {fmtTimeOnly(ch.visitedAt)}</span>
                          {ch.completedAt && (
                            <span className="text-emerald-600">
                              (Completed: {fmtTimeOnly(ch.completedAt)})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Key Milestones */}
                  {selectedJourney.milestones?.map((m, idx) => (
                    <div key={`m-${idx}`} className="relative text-xs">
                      <div className="absolute -left-[1.65rem] top-0.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-purple-900">{m.label}</span>
                        <span className="font-mono text-stone-400 text-[11px]">
                          {fmtTimeOnly(m.timestamp)}
                        </span>
                      </div>
                      {m.detail && <p className="text-stone-500 mt-0.5">{m.detail}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-rose-100">
            <p className="text-stone-500 text-sm">No journey selected.</p>
          </div>
        )}
      </main>

      {/* ── SYNC / IMPORT MODAL ── */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Cross-Device Sync & Import
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-stone-600 font-sans">
                If Shuttumani completed her journey on another phone or browser, export the JSON from that device and paste it below to instantly load all her journeys into this dashboard!
              </p>

              <textarea
                rows={6}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste JSON journey records here... {"journeys": [...]}'
                className="w-full p-3 text-xs font-mono bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-200"
              />

              {importFeedback && (
                <p className="text-xs font-mono font-medium">{importFeedback}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-hand font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportSubmit}
                  className="px-4 py-2 rounded-xl text-xs font-hand font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                >
                  Import Journeys
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
