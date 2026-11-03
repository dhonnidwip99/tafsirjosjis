import React, { useState } from 'react';
import { FLASHCARDS, FlashcardItem } from '../data/tafsirData';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ProgressState, toggleFlashcardMastery } from '../utils/progressStorage';

interface FlashcardViewProps {
  progress: ProgressState;
  onUpdateProgress: (newProgress: ProgressState) => void;
  arabicFontFamily: 'Amiri' | 'Scheherazade New';
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  progress,
  onUpdateProgress,
  arabicFontFamily,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Extract unique categories
  const categories = ['Semua', ...Array.from(new Set(FLASHCARDS.map((f) => f.category)))];

  const filteredCards =
    selectedCategory === 'Semua'
      ? FLASHCARDS
      : FLASHCARDS.filter((f) => f.category === selectedCategory);

  const currentCard: FlashcardItem = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = progress.masteredFlashcards.includes(currentCard.id);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleToggleMastery = () => {
    const updated = toggleFlashcardMastery(progress.masteredFlashcards, currentCard.id);
    onUpdateProgress({
      ...progress,
      masteredFlashcards: updated,
    });
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(rand);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Mode Belajar Flashcard
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Kartu Ringkasan Istilah Kunci
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Klik kartu untuk membalik dan melihat uraian serta rujukan kitab. Uji daya ingat istilah ilmu tafsir dan surah.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mastery Progress Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
          <span>Kartu Dikuasai / Dipahami:</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
            {progress.masteredFlashcards.length} dari {FLASHCARDS.length} Kartu
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
            style={{
              width: `${Math.round((progress.masteredFlashcards.length / FLASHCARDS.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div className="perspective-1000 w-full min-h-[340px] sm:min-h-[380px] cursor-pointer select-none" onClick={handleFlip}>
        <div
          className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ minHeight: '340px' }}
        >
          {/* SISI DEPAN (FRONT) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border-2 border-emerald-600/30 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 p-6 sm:p-8 flex flex-col justify-between items-center text-center">
            {/* Top Badge & Mastery Indicator */}
            <div className="w-full flex items-center justify-between">
              <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {currentCard.category}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMastery();
                }}
                className={`p-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                  isMastered
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-300 dark:border-slate-700 text-slate-500 hover:text-emerald-700'
                }`}
                title={isMastered ? 'Sudah dipahami' : 'Tandai paham'}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[11px] font-semibold">
                  {isMastered ? 'Dipahami' : 'Belum Paham'}
                </span>
              </button>
            </div>

            {/* Main Content Front */}
            <div className="my-auto space-y-3">
              {currentCard.arabicTerm && (
                <div
                  className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-900 dark:text-emerald-200"
                  style={{ fontFamily: arabicFontFamily }}
                >
                  {currentCard.arabicTerm}
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                {currentCard.term}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {currentCard.shortDefinition}
              </p>
            </div>

            {/* Bottom cue */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
              <span>Ketuk untuk membalik dan melihat uraian & rujukan</span>
            </div>
          </div>

          {/* SISI BELAKANG (BACK) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl border-2 border-amber-600/40 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/40 p-6 sm:p-8 flex flex-col justify-between items-center text-center">
            {/* Top Badge */}
            <div className="w-full flex items-center justify-between">
              <span className="rounded-lg bg-amber-100 dark:bg-amber-950 px-2.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                Uraian & Rujukan Muktabar
              </span>
              <span className="text-xs text-slate-400 font-medium">Sisi Belakang</span>
            </div>

            {/* Content Back */}
            <div className="my-auto space-y-3 max-w-lg">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200">
                {currentCard.term}
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed text-justify sm:text-center">
                {currentCard.detailedExplanation}
              </p>
              <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300 italic font-medium">
                📖 Rujukan: {currentCard.exampleOrReference}
              </div>
            </div>

            {/* Bottom cue */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Ketuk untuk kembali ke sisi depan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-xs"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            title="Acak Kartu"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 px-3">
            {currentIndex + 1} / {filteredCards.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs shadow-emerald-700/20 active:scale-98"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
