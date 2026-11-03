import React, { useState } from 'react';
import { ModuleData } from '../data/tafsirData';
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Quote,
  Sparkles,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { ProgressState, toggleTopicCompletion } from '../utils/progressStorage';

interface ModuleDetailViewProps {
  module: ModuleData;
  progress: ProgressState;
  onUpdateProgress: (newProgress: ProgressState) => void;
  onBack: () => void;
  onStartQuiz: (moduleId: string) => void;
  arabicFontSize: number;
  bodyFontSize: number;
  arabicFontFamily: 'Amiri' | 'Scheherazade New';
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  progress,
  onUpdateProgress,
  onBack,
  onStartQuiz,
  arabicFontSize,
  bodyFontSize,
  arabicFontFamily,
}) => {
  // State for open accordions in verses or theory sections
  const [openReferences, setOpenReferences] = useState<Record<number, boolean>>({});
  const [openTheorySections, setOpenTheorySections] = useState<Record<string, boolean>>({
    'sec-1-definisi': true, // open first section by default
  });
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);

  const toggleReference = (verseNum: number) => {
    setOpenReferences((prev) => ({ ...prev, [verseNum]: !prev[verseNum] }));
  };

  const toggleTheory = (id: string) => {
    setOpenTheorySections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleTopic = (topicId: string) => {
    const updated = toggleTopicCompletion(progress.completedTopics, topicId);
    onUpdateProgress({
      ...progress,
      completedTopics: updated,
    });
  };

  const copyToClipboard = (verseText: string, verseNum: number) => {
    navigator.clipboard?.writeText?.(verseText);
    setCopiedVerse(verseNum);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Modul</span>
        </button>

        <button
          onClick={() => onStartQuiz(module.id)}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white px-4 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-all"
        >
          <span>📝 Kerjakan Kuis Modul Ini</span>
        </button>
      </div>

      {/* Module Header Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 text-xs font-bold">
            Modul {module.number} • {module.badge}
          </span>
          {module.surahIntro && (
            <span
              className="font-arabic text-emerald-900 dark:text-emerald-200 text-3xl font-bold"
              style={{ fontFamily: arabicFontFamily }}
            >
              {module.surahIntro.arabicName}
            </span>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {module.title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {module.shortDescription}
        </p>

        {/* Surah Introduction Meta Box */}
        {module.surahIntro && (
          <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/30 p-4 text-xs sm:text-sm space-y-2.5">
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-amber-900 dark:text-amber-200">
              <span className="flex items-center gap-1.5">
                <strong>Golongan:</strong> {module.surahIntro.classification}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <strong>Jumlah:</strong> {module.surahIntro.totalVerses} Ayat
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <strong>Urutan Mushaf:</strong> Surah ke-{module.surahIntro.surahNumber}
              </span>
            </div>

            <div>
              <strong className="text-amber-950 dark:text-amber-100">Nama Lain Surah:</strong>{' '}
              <span className="text-amber-900/90 dark:text-amber-200/90">
                {module.surahIntro.otherNames.join(', ')}
              </span>
            </div>

            <div>
              <strong className="text-amber-950 dark:text-amber-100">Tema Pokok:</strong>{' '}
              <span className="text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                {module.surahIntro.theme}
              </span>
            </div>

            {module.surahIntro.asbabunNuzulUmum && (
              <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                <strong className="text-amber-950 dark:text-amber-100">Asbabun Nuzul:</strong>{' '}
                <span className="text-amber-900/90 dark:text-amber-200/90 italic leading-relaxed">
                  {module.surahIntro.asbabunNuzulUmum}
                </span>
              </div>
            )}

            {module.surahIntro.virtues && module.surahIntro.virtues.length > 0 && (
              <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                <strong className="text-amber-950 dark:text-amber-100 block mb-1">Keutamaan & Fadhilah:</strong>
                <ul className="list-disc pl-5 space-y-1 text-xs text-amber-900/90 dark:text-amber-200/90">
                  {module.surahIntro.virtues.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RENDER CONTENT 1: THEORY SECTIONS (For Ulumul Quran Module) */}
      {module.theorySections && module.theorySections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              Bagian Kaidah & Pembahasan
            </h2>
            <span className="text-xs text-slate-500">Klik judul untuk membuka/menutup bahasan</span>
          </div>

          {module.theorySections.map((sec) => {
            const isOpen = openTheorySections[sec.id] ?? false;
            const isCompleted = progress.completedTopics.includes(sec.id);

            return (
              <div
                key={sec.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-all overflow-hidden"
              >
                {/* Accordion header */}
                <div
                  onClick={() => toggleTheory(sec.id)}
                  className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTopic(sec.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isCompleted
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{sec.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>

                {/* Accordion body */}
                {isOpen && (
                  <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 space-y-5 bg-slate-50/40 dark:bg-slate-900/60">
                    {/* Main content body */}
                    <div
                      className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line"
                      style={{ fontSize: `${bodyFontSize}px` }}
                    >
                      {sec.content}
                    </div>

                    {/* Comparison table if exists */}
                    {sec.comparisonTable && (
                      <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                              {sec.comparisonTable.headers.map((h, i) => (
                                <th key={i} className="py-3 px-4">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {sec.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-3 px-4 ${cIdx === 0 ? 'font-bold text-emerald-800 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Ulama quotes if available */}
                    {sec.ulamaQuotes && sec.ulamaQuotes.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Kutipan Otoritatif Ulama Salaf:
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {sec.ulamaQuotes.map((q, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/40 p-4 text-xs sm:text-sm relative pl-10"
                            >
                              <Quote className="absolute left-3 top-4 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              <p className="font-arabic text-emerald-950 dark:text-emerald-100 text-lg leading-relaxed text-right mb-1">
                                {q.quote}
                              </p>
                              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold mt-2">
                                <span>{q.scholar}</span>
                                <span className="text-[11px] opacity-75">{q.source}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key points box */}
                    <div className="rounded-xl border border-emerald-100 bg-white dark:bg-slate-800 p-4 shadow-2xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Poin Kunci Ringkas:
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
                        {sec.keyPoints.map((point, pIdx) => (
                          <li key={pIdx}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Section completion button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleToggleTopic(sec.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {isCompleted ? '✓ Telah Ditandai Selesai' : 'Tandai Bagian Ini Selesai'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* RENDER CONTENT 2: VERSES (For Surah Modules) */}
      {module.verses && module.verses.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              Tafsir Ayat demi Ayat
            </h2>
            <span className="text-xs text-slate-500">Total {module.verses.length} ayat</span>
          </div>

          {module.verses.map((verse) => {
            const verseTopicId = `${module.id}-v${verse.verseNumber}`;
            const isCompleted = progress.completedTopics.includes(verseTopicId);
            const isRefsOpen = openReferences[verse.verseNumber] ?? true;

            return (
              <div
                key={verse.verseNumber}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all space-y-4"
              >
                {/* Verse Header: Number Badge and Action tools */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs">
                      {verse.verseNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Ayat ke-{verse.verseNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Copy Arabic text button */}
                    <button
                      onClick={() => copyToClipboard(verse.arabic, verse.verseNumber)}
                      title="Salin Teks Arab"
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs flex items-center gap-1"
                    >
                      {copiedVerse === verse.verseNumber ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-[11px] text-emerald-600">Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline text-[11px]">Salin</span>
                        </>
                      )}
                    </button>

                    {/* Mark as completed button */}
                    <button
                      onClick={() => handleToggleTopic(verseTopicId)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isCompleted ? 'Selesai Dipelajari' : 'Tandai Selesai'}</span>
                    </button>
                  </div>
                </div>

                {/* Arabic Verse Display */}
                <div className="pt-2 pb-1 text-right">
                  <p
                    className="font-arabic text-emerald-950 dark:text-emerald-100 font-semibold select-text"
                    style={{
                      fontSize: `${arabicFontSize}px`,
                      fontFamily: arabicFontFamily,
                      lineHeight: '2.4',
                    }}
                  >
                    {verse.arabic}
                  </p>
                </div>

                {/* Indonesian Official Translation (Kemenag RI) */}
                <div className="rounded-xl border-l-4 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 text-slate-800 dark:text-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
                    Terjemahan Resmi Kemenag RI:
                  </div>
                  <p
                    className="italic leading-relaxed"
                    style={{ fontSize: `${bodyFontSize}px` }}
                  >
                    "{verse.translation}"
                  </p>
                </div>

                {/* Keywords / Kosakata Kunci & Balaghah */}
                {verse.keywords && verse.keywords.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Kosakata Kunci & Makna Kata:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {verse.keywords.map((kw, kwIdx) => (
                        <div
                          key={kwIdx}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 px-2.5 py-1 text-xs"
                        >
                          <span
                            className="font-arabic font-bold text-emerald-800 dark:text-emerald-300 text-sm"
                            style={{ fontFamily: arabicFontFamily }}
                          >
                            {kw.word}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            : {kw.meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ringkasan Penjelasan Tafsir */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Uraian & Ringkasan Tafsir:
                  </div>
                  <p
                    className="text-slate-800 dark:text-slate-200 leading-relaxed"
                    style={{ fontSize: `${bodyFontSize}px` }}
                  >
                    {verse.tafsirSummary}
                  </p>
                </div>

                {/* Asbabun Nuzul specific to this verse if available */}
                {verse.asbabunNuzul && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20 p-3.5 text-xs text-amber-950 dark:text-amber-200">
                    <strong>Sebab Turunnya Ayat (Asbabun Nuzul):</strong> {verse.asbabunNuzul}
                  </div>
                )}

                {/* Accordion Rujukan Kitab Muktabar */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleReference(verse.verseNumber)}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                      <Quote className="h-3.5 w-3.5" />
                      Rujukan Kitab Tafsir Muktabar ({verse.references.length} Rujukan)
                    </span>
                    {isRefsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {isRefsOpen && (
                    <div className="p-4 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
                      {verse.references.map((ref, rIdx) => (
                        <div key={rIdx} className={rIdx > 0 ? 'pt-3' : ''}>
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                            <span>📖 {ref.kitab}</span>
                            <span className="text-[11px] text-slate-500 font-normal">{ref.author}</span>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {ref.quoteOrExplanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mutiara Tadabbur & Poin Pelajaran */}
                {verse.tadabburPoints && verse.tadabburPoints.length > 0 && (
                  <div className="rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-50/70 to-yellow-50/40 dark:border-amber-900/40 dark:from-amber-950/20 dark:to-yellow-950/10 p-4">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Mutiara Tadabbur & Hikmah Amaliah:
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
                      {verse.tadabburPoints.map((pt, ptIdx) => (
                        <li key={ptIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Completion Card & Quiz CTA */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40 p-6 text-center space-y-3">
        <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
          Selesai Menelaah Materi Modul Ini?
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800/90 dark:text-emerald-300/90 max-w-lg mx-auto leading-relaxed">
          Uji pemahaman Anda dengan mengerjakan kuis pilihan ganda interaktif lengkap dengan umpan balik benar/salah dan pembahasan rujukan.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onStartQuiz(module.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 active:scale-98 transition-all"
          >
            <span>Mulai Kuis Modul {module.number} 🎯</span>
          </button>
        </div>
      </div>
    </div>
  );
};
