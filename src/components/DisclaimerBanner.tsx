import React, { useState } from 'react';
import { BookOpen, ShieldAlert, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div
      role="region"
      aria-label="Catatan Adab Penuntut Ilmu"
      className="relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-amber-900 shadow-xs dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-amber-200/80 p-1.5 text-amber-800 dark:bg-amber-900/80 dark:text-amber-300">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="flex-1 pr-6 text-sm leading-relaxed">
          <p className="font-semibold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 inline text-amber-700 dark:text-amber-400" />
            Adab Penuntut Ilmu & Batasan Aplikasi:
          </p>
          <p className="mt-1 text-amber-900/90 dark:text-amber-200/90">
            Aplikasi ini disusun sebagai wasilah pengantar belajar mandiri secara bertahap bagi pelajar, mahasiswa, dan masyarakat umum, dengan menyandarkan seluruh kutipan pada kitab-kitab tafsir muktabar (Tafsir Ibnu Katsir, Al-Jalalain, Al-Muyassar, dan Tafsir Kemenag RI).
          </p>
          <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80 font-medium">
            💡 Untuk pendalaman sanad keilmuan, penarikan hukum (istinbath), dan fatwa syar'i, penuntut ilmu dianjurkan senantiasa bertalaqqi (belajar langsung) kepada asatidz dan ulama yang tsiqah (terpercaya).
          </p>
        </div>
        <button
          onClick={() => setClosed(true)}
          className="absolute top-3 right-3 text-amber-700 hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-100 p-1 rounded-md transition-colors"
          aria-label="Tutup catatan adab"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
