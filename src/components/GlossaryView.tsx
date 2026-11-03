import React, { useState } from 'react';
import { GLOSSARY, GlossaryItem } from '../data/tafsirData';
import { BookMarked, Search, Filter, BookOpen } from 'lucide-react';

interface GlossaryViewProps {
  arabicFontFamily: 'Amiri' | 'Scheherazade New';
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ arabicFontFamily }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(GLOSSARY.map((g) => g.category)))];

  const filteredGlossary = GLOSSARY.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.term.toLowerCase().includes(q) ||
      (item.arabicTerm && item.arabicTerm.includes(q)) ||
      item.definition.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <BookMarked className="h-3.5 w-3.5 text-emerald-600" />
          Kamus & Ensiklopedia Ringkas
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Glosarium Istilah Ilmu Tafsir
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Daftar istilah penting dalam Ulumul Qur'an dan kaidah tafsir beserta pengertian dan rujukan kitab.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ketik istilah (misal: Asbabun Nuzul, Tahlili, Ash-Shamad, Nasikh)..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Item Cards */}
      <div className="space-y-3">
        {filteredGlossary.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center text-slate-500">
            <p>Tidak ada istilah yang cocok dengan kata kunci "{searchTerm}".</p>
          </div>
        ) : (
          filteredGlossary.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-500/40 transition-all space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.term}
                  </h3>
                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    {item.category}
                  </span>
                </div>

                {item.arabicTerm && (
                  <span
                    className="font-arabic text-emerald-800 dark:text-emerald-300 text-xl font-bold"
                    style={{ fontFamily: arabicFontFamily }}
                  >
                    {item.arabicTerm}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.definition}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" />
                <span>Rujukan: {item.reference}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
