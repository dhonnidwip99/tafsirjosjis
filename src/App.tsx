/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MODULES, ModuleData, GLOSSARY } from './data/tafsirData';
import {
  ProgressState,
  loadProgress,
  saveProgress,
  calculateProgressPercentage,
} from './utils/progressStorage';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ModuleListView } from './components/ModuleListView';
import { ModuleDetailView } from './components/ModuleDetailView';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { GlossaryView } from './components/GlossaryView';
import { FontSettingsModal } from './components/FontSettingsModal';
import { GuideModal } from './components/GuideModal';
import { generateStandaloneHtml, triggerDownload } from './utils/exportHtml';
import { Search, BookOpen, Download, Heart } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'modul' | 'flashcards' | 'glosarium' | 'kuis'>('modul');
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [quizModuleId, setQuizModuleId] = useState<string>(MODULES[0].id);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isFontModalOpen, setIsFontModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // Typography state
  const [arabicFontSize, setArabicFontSize] = useState<number>(28);
  const [bodyFontSize, setBodyFontSize] = useState<number>(16);
  const [arabicFontFamily, setArabicFontFamily] = useState<'Amiri' | 'Scheherazade New'>('Amiri');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
        document.documentElement.classList.contains('dark')
      );
    }
    return false;
  });

  // User learning progress state
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  // Apply dark mode class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  // Persist progress to local storage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Calculate total topic checkpoints
  const totalTopicsCount = useMemo(() => {
    let count = 0;
    MODULES.forEach((mod) => {
      if (mod.theorySections) count += mod.theorySections.length;
      if (mod.verses) count += mod.verses.length;
    });
    return count;
  }, []);

  const progressPercentage = useMemo(() => {
    return calculateProgressPercentage(progress.completedTopics.length, totalTopicsCount);
  }, [progress.completedTopics.length, totalTopicsCount]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleStartQuiz = (moduleId: string) => {
    setQuizModuleId(moduleId);
    setActiveTab('kuis');
    setSelectedModule(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (mod: ModuleData) => {
    setSelectedModule(mod);
    setActiveTab('modul');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveQuizResult = (moduleId: string, score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const newScores = {
      ...progress.quizScores,
      [moduleId]: {
        score,
        total,
        percentage,
        completedAt: new Date().toISOString(),
      },
    };
    setProgress({
      ...progress,
      quizScores: newScores,
    });
  };

  const handleDownloadSingleHtml = () => {
    const html = generateStandaloneHtml();
    triggerDownload('tafsir-alquran-mandiri.html', html);
  };

  // Search Results filtering across all content
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedVerses: { module: ModuleData; verseNumber: number; arabic: string; translation: string; summary: string }[] = [];
    const matchedSections: { module: ModuleData; title: string; subtitle: string; content: string }[] = [];
    const matchedGlossary = GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        (g.arabicTerm && g.arabicTerm.includes(q)) ||
        g.definition.toLowerCase().includes(q)
    );

    MODULES.forEach((mod) => {
      if (mod.verses) {
        mod.verses.forEach((v) => {
          if (
            v.translation.toLowerCase().includes(q) ||
            v.arabic.includes(q) ||
            v.tafsirSummary.toLowerCase().includes(q) ||
            mod.title.toLowerCase().includes(q)
          ) {
            matchedVerses.push({
              module: mod,
              verseNumber: v.verseNumber,
              arabic: v.arabic,
              translation: v.translation,
              summary: v.tafsirSummary,
            });
          }
        });
      }

      if (mod.theorySections) {
        mod.theorySections.forEach((s) => {
          if (
            s.title.toLowerCase().includes(q) ||
            s.subtitle.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q)
          ) {
            matchedSections.push({
              module: mod,
              title: s.title,
              subtitle: s.subtitle,
              content: s.content,
            });
          }
        });
      }
    });

    return {
      verses: matchedVerses,
      sections: matchedSections,
      glossary: matchedGlossary,
      total: matchedVerses.length + matchedSections.length + matchedGlossary.length,
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans-app transition-colors duration-200">
      {/* Top sticky Navbar */}
      <Navbar
        progressPercentage={progressPercentage}
        completedTopicsCount={progress.completedTopics.length}
        totalTopicsCount={totalTopicsCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenFontModal={() => setIsFontModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedModule(null);
          setSearchQuery('');
        }}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Islamic Etiquette & Disclaimer Banner */}
        <DisclaimerBanner />

        {/* IF SEARCH RESULTS ACTIVE */}
        {searchResults !== null ? (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Search className="h-5 w-5 text-emerald-600" />
                  Hasil Pencarian: "{searchQuery}"
                </h2>
                <p className="text-xs text-slate-500">
                  Ditemukan {searchResults.total} materi yang relevan
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Tutup Pencarian
              </button>
            </div>

            {searchResults.total === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center text-slate-500">
                <p>Tidak ditemukan hasil pencarian untuk "{searchQuery}". Coba kata kunci lain.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Matched Verses */}
                {searchResults.verses.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Ayat & Terjemahan ({searchResults.verses.length}):
                    </h3>
                    {searchResults.verses.map((v, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 hover:border-emerald-500 transition-colors"
                      >
                        <div className="flex justify-between items-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          <span>
                            {v.module.title} — Ayat ke-{v.verseNumber}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedModule(v.module);
                              setActiveTab('modul');
                              setSearchQuery('');
                            }}
                            className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs hover:bg-emerald-800"
                          >
                            Buka di Tafsir
                          </button>
                        </div>
                        <p
                          className="font-arabic text-emerald-950 dark:text-emerald-100 text-xl font-bold text-right"
                          style={{ fontFamily: arabicFontFamily }}
                        >
                          {v.arabic}
                        </p>
                        <p className="italic text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          "{v.translation}"
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {v.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matched Sections */}
                {searchResults.sections.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Bagian Kaidah & Teori ({searchResults.sections.length}):
                    </h3>
                    {searchResults.sections.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 hover:border-emerald-500 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                            {s.title}
                          </h4>
                          <button
                            onClick={() => {
                              setSelectedModule(s.module);
                              setActiveTab('modul');
                              setSearchQuery('');
                            }}
                            className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs hover:bg-emerald-800"
                          >
                            Buka Bahasan
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{s.subtitle}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                          {s.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matched Glossary */}
                {searchResults.glossary.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Istilah Glosarium ({searchResults.glossary.length}):
                    </h3>
                    {searchResults.glossary.map((g) => (
                      <div
                        key={g.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                            {g.term}
                          </span>
                          {g.arabicTerm && (
                            <span
                              className="font-arabic text-emerald-700 dark:text-emerald-300 font-bold"
                              style={{ fontFamily: arabicFontFamily }}
                            >
                              {g.arabicTerm}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{g.definition}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* REGULAR VIEW ROUTING */
          <>
            {/* TAB: MODUL */}
            {activeTab === 'modul' && (
              <>
                {selectedModule ? (
                  <ModuleDetailView
                    module={selectedModule}
                    progress={progress}
                    onUpdateProgress={setProgress}
                    onBack={handleBackToModules}
                    onStartQuiz={handleStartQuiz}
                    arabicFontSize={arabicFontSize}
                    bodyFontSize={bodyFontSize}
                    arabicFontFamily={arabicFontFamily}
                  />
                ) : (
                  <ModuleListView
                    modules={MODULES}
                    progress={progress}
                    onSelectModule={handleSelectModule}
                    onStartQuiz={handleStartQuiz}
                  />
                )}
              </>
            )}

            {/* TAB: FLASHCARD */}
            {activeTab === 'flashcards' && (
              <FlashcardView
                progress={progress}
                onUpdateProgress={setProgress}
                arabicFontFamily={arabicFontFamily}
              />
            )}

            {/* TAB: GLOSARIUM */}
            {activeTab === 'glosarium' && (
              <GlossaryView arabicFontFamily={arabicFontFamily} />
            )}

            {/* TAB: KUIS */}
            {activeTab === 'kuis' && (
              <QuizView
                modules={MODULES}
                initialModuleId={quizModuleId}
                progress={progress}
                onSaveQuizResult={handleSaveQuizResult}
                onBackToModules={handleBackToModules}
              />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 space-y-3">
          <p className="flex items-center justify-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <span>TafsirPedia Al-Qur'an</span>
            <span>•</span>
            <span>Aplikasi Interaktif Belajar Ilmu & Tafsir Kalamullah</span>
          </p>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Rujukan Muktabar: Tafsir Al-Qur'an Al-'Azhim (Ibnu Katsir), Tafsir Al-Jalalain (Al-Mahalli & As-Suyuthi), Tafsir Al-Muyassar (Nukhbah minal Ulama), dan Al-Qur'an dan Terjemahnya Kemenag RI.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadSingleHtml}
              className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh Versi 1 File HTML Mandiri (.html)</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="text-slate-600 dark:text-slate-300 hover:underline"
            >
              Panduan Menambah Materi Baru
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <FontSettingsModal
        isOpen={isFontModalOpen}
        onClose={() => setIsFontModalOpen(false)}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
        bodyFontSize={bodyFontSize}
        setBodyFontSize={setBodyFontSize}
        arabicFontFamily={arabicFontFamily}
        setArabicFontFamily={setArabicFontFamily}
      />

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
