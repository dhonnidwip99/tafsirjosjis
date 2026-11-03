import React from 'react';
import { X, Type, RotateCcw } from 'lucide-react';

interface FontSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  arabicFontSize: number;
  setArabicFontSize: (val: number) => void;
  bodyFontSize: number;
  setBodyFontSize: (val: number) => void;
  arabicFontFamily: 'Amiri' | 'Scheherazade New';
  setArabicFontFamily: (val: 'Amiri' | 'Scheherazade New') => void;
}

export const FontSettingsModal: React.FC<FontSettingsModalProps> = ({
  isOpen,
  onClose,
  arabicFontSize,
  setArabicFontSize,
  bodyFontSize,
  setBodyFontSize,
  arabicFontFamily,
  setArabicFontFamily,
}) => {
  if (!isOpen) return null;

  const resetFonts = () => {
    setArabicFontSize(28);
    setBodyFontSize(16);
    setArabicFontFamily('Amiri');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pengaturan Ukuran Font"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Type className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Kustomisasi Tampilan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sesuaikan kenyamanan membaca Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Tutup jendela pengaturan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Font Arab Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="arabic-font-slider" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ukuran Teks Arab: <span className="text-emerald-700 dark:text-emerald-400 font-bold">{arabicFontSize}px</span>
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setArabicFontSize(Math.max(20, arabicFontSize - 2))}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setArabicFontSize(Math.min(46, arabicFontSize + 2))}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="arabic-font-slider"
              type="range"
              min="20"
              max="46"
              step="2"
              value={arabicFontSize}
              onChange={(e) => setArabicFontSize(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Live Preview Box */}
            <div className="mt-2 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-right">
              <p
                className="font-arabic text-emerald-950 dark:text-emerald-100"
                style={{ fontSize: `${arabicFontSize}px`, fontFamily: arabicFontFamily }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          </div>

          {/* Pilihan Font Arab */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Gaya Font Kaligrafi Arab
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setArabicFontFamily('Amiri')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  arabicFontFamily === 'Amiri'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-200 ring-2 ring-emerald-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Amiri (Klasik)
              </button>
              <button
                type="button"
                onClick={() => setArabicFontFamily('Scheherazade New')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  arabicFontFamily === 'Scheherazade New'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-200 ring-2 ring-emerald-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Scheherazade New
              </button>
            </div>
          </div>

          {/* Font Latin / Terjemahan Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="body-font-slider" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ukuran Teks Terjemahan & Tafsir: <span className="text-emerald-700 dark:text-emerald-400 font-bold">{bodyFontSize}px</span>
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setBodyFontSize(Math.max(13, bodyFontSize - 1))}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setBodyFontSize(Math.min(22, bodyFontSize + 1))}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="body-font-slider"
              type="range"
              min="13"
              max="22"
              step="1"
              value={bodyFontSize}
              onChange={(e) => setBodyFontSize(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p
              className="mt-2 text-slate-600 dark:text-slate-300 p-2 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm italic"
              style={{ fontSize: `${bodyFontSize}px` }}
            >
              "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." (Contoh keterbacaan teks)
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={resetFonts}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Kembalikan ke Default
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-xs"
          >
            Simpan & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
