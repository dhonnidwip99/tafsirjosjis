import React from 'react';
import { ModuleData } from '../data/tafsirData';
import { BookOpen, CheckCircle2, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';
import { ProgressState } from '../utils/progressStorage';

interface ModuleListViewProps {
  modules: ModuleData[];
  progress: ProgressState;
  onSelectModule: (module: ModuleData) => void;
  onStartQuiz: (moduleId: string) => void;
}

export const ModuleListView: React.FC<ModuleListViewProps> = ({
  modules,
  progress,
  onSelectModule,
  onStartQuiz,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 h-56 w-56 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Kurikulum Pembelajaran Tafsir Berjenjang
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Pelajari Makna Kalam Ilahi dengan Sanad & Kaidah Muktabar
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Mulai dari kaidah ushul tafsir (ta'wil, metode, corak, asbabun nuzul) hingga penelaahan mendalam ayat demi ayat surah-surah pilihan dalam Juz 30.
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Teks Arab Lengkap Berharakat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Rujukan Ibnu Katsir & Al-Jalalain</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Kuis & Umpan Balik Instan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            Daftar Modul Pembelajaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pilih modul untuk mempelajari materi, menelaah tafsir, atau menguji pemahaman dengan kuis
          </p>
        </div>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((mod) => {
          // Count total items in module to measure progress
          const totalItems = mod.theorySections ? mod.theorySections.length : mod.verses ? mod.verses.length : 1;
          const completedInThisMod = mod.theorySections
            ? mod.theorySections.filter((s) => progress.completedTopics.includes(s.id)).length
            : mod.verses
            ? mod.verses.filter((v) => progress.completedTopics.includes(`${mod.id}-v${v.verseNumber}`)).length
            : 0;

          const pct = Math.round((completedInThisMod / totalItems) * 100);
          const quizResult = progress.quizScores[mod.id];

          return (
            <div
              key={mod.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-600/50"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Modul {mod.number} • {mod.badge}
                  </span>
                  {mod.surahIntro && (
                    <span className="font-arabic text-emerald-800 dark:text-emerald-400 text-lg font-bold">
                      {mod.surahIntro.arabicName}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 transition-colors">
                  {mod.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {mod.shortDescription}
                </p>

                {/* Details pill */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {mod.theorySections && (
                    <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                      {mod.theorySections.length} Bagian Kaidah Pokok
                    </span>
                  )}
                  {mod.verses && (
                    <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                      {mod.verses.length} Ayat Lengkap Berharakat
                    </span>
                  )}
                  {quizResult ? (
                    <span className="rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 flex items-center gap-1">
                      <Award className="h-3 w-3" /> Skor Kuis: {quizResult.percentage}%
                    </span>
                  ) : (
                    <span className="rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5">
                      Kuis Belum Dikerjakan
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span>Progres Baca: {completedInThisMod}/{totalItems} Bagian</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectModule(mod)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white shadow-xs shadow-emerald-700/20 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Pelajari Materi</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onStartQuiz(mod.id)}
                  title="Kerjakan Kuis Modul Ini"
                  className="rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-300 p-2.5 text-xs font-semibold transition-all"
                >
                  📝 Kuis
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
