import React from 'react';
import {
  BookOpen,
  Search,
  Type,
  Sun,
  Moon,
  Download,
  HelpCircle,
  Award,
} from 'lucide-react';
import { generateStandaloneHtml, triggerDownload } from '../utils/exportHtml';

interface NavbarProps {
  progressPercentage: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenFontModal: () => void;
  onOpenGuideModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: 'modul' | 'flashcards' | 'glosarium' | 'kuis';
  setActiveTab: (tab: 'modul' | 'flashcards' | 'glosarium' | 'kuis') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progressPercentage,
  completedTopicsCount,
  totalTopicsCount,
  isDarkMode,
  toggleDarkMode,
  onOpenFontModal,
  onOpenGuideModal,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}) => {
  const handleDownloadSingleHtml = () => {
    const html = generateStandaloneHtml();
    triggerDownload('tafsir-alquran-mandiri.html', html);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-950/10 bg-white/95 dark:border-emerald-800/20 dark:bg-slate-900/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('modul')}
              className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md shadow-emerald-700/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  TafsirPedia
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase tracking-wider">
                    Al-Qur'an
                  </span>
                </span>
                <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Belajar Ilmu & Tafsir Bertahap
                </span>
              </div>
            </button>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ayat, istilah, asbabun nuzul, tafsir..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Progress Pill */}
            <div
              title={`${completedTopicsCount} dari ${totalTopicsCount} bagian telah diselesaikan`}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold"
            >
              <Award className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{progressPercentage}% Selesai</span>
              <div className="w-12 h-1.5 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Font Control Button */}
            <button
              onClick={onOpenFontModal}
              title="Pengaturan Ukuran Font Teks & Arab"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Atur ukuran font"
            >
              <Type className="h-4 w-4" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Ganti mode gelap atau terang"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Contributor Guide */}
            <button
              onClick={onOpenGuideModal}
              title="Panduan Tambah Materi & Kode"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
              <span>Panduan</span>
            </button>

            {/* Download Single HTML Button */}
            <button
              onClick={handleDownloadSingleHtml}
              title="Unduh aplikasi lengkap dalam 1 file HTML mandiri"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-emerald-700/20 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Unduh HTML Mandiri</span>
              <span className="sm:hidden">HTML</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ayat, istilah, tafsir..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-hidden dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Main Tab Bar */}
        <div className="flex space-x-1 sm:space-x-3 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 dark:border-slate-800/80 pt-1">
          <button
            onClick={() => setActiveTab('modul')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === 'modul'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📖 Daftar Modul & Materi
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🗂️ Flashcard Istilah
          </button>
          <button
            onClick={() => setActiveTab('glosarium')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === 'glosarium'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📚 Glosarium A-Z
          </button>
          <button
            onClick={() => setActiveTab('kuis')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === 'kuis'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📝 Kuis Interaktif
          </button>
        </div>
      </div>
    </header>
  );
};
