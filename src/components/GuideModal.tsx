import React from 'react';
import { X, Download, Code, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { generateStandaloneHtml, triggerDownload } from '../utils/exportHtml';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadSingleHtml = () => {
    const html = generateStandaloneHtml();
    triggerDownload('tafsir-alquran-mandiri.html', html);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panduan Menambah Materi & Ekspor Single File HTML"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="w-full max-w-2xl my-8 rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Panduan Tambah Materi & Ekspor Mandiri
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Struktur data JavaScript modular dan ekspor 1 file HTML murni
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Tutup panduan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="mt-4 space-y-5 overflow-y-auto pr-1 text-sm text-slate-700 dark:text-slate-300">
          {/* Quick Action: Unduh Single File HTML */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Kebutuhan Single File HTML (Sesuai Permintaan Anda)
                </h4>
                <p className="mt-1 text-xs text-emerald-800/90 dark:text-emerald-200/90 leading-relaxed">
                  Seluruh aplikasi ini dapat Anda unduh menjadi <strong>1 file HTML mandiri</strong> (HTML + CSS + JavaScript murni jadi satu) tanpa memerlukan Node.js atau bundler. Anda dapat langsung mengklik file tersebut dua kali untuk membukanya di browser apa saja secara offline.
                </p>
              </div>
              <button
                onClick={handleDownloadSingleHtml}
                className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="h-4 w-4" />
                Unduh .HTML Mandiri
              </button>
            </div>
          </div>

          {/* Section 1: Cara Menambah Modul Baru */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              1. Di Mana Letak Data Materi?
            </h4>
            <p className="leading-relaxed">
              Seluruh materi disimpan terpusat di file <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-mono text-xs">src/data/tafsirData.ts</code> (atau di dalam tag <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">&lt;script&gt;</code> pada file HTML mandiri). Bagian data dipisahkan sepenuhnya dari logika tampilan.
            </p>
          </div>

          {/* Section 2: Struktur Objek Surah */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              2. Contoh Format Menambah Surah Baru
            </h4>
            <p className="mb-2 text-xs text-slate-600 dark:text-slate-400">
              Cukup tambahkan objek baru ke dalam array <code className="font-mono text-emerald-600">MODULES</code>:
            </p>
            <pre className="rounded-xl bg-slate-950 p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
{`{
  id: 'modul-surah-al-kautsar',
  number: 5,
  title: 'Tafsir Surah Al-Kautsar (Nikmat yang Berlimpah)',
  shortDescription: 'Surah terpendek dalam Al-Qur\\'an yang menghibur hati Rasulullah SAW.',
  badge: 'Tafsir Surah',
  category: 'tafsir_surah',
  surahIntro: {
    name: 'Al-Kautsar',
    arabicName: 'الكَوْثَر',
    surahNumber: 108,
    totalVerses: 3,
    classification: 'Makkiyyah',
    theme: 'Pemberian telaga Al-Kautsar, perintah shalat dan qurban, serta kehinaan musuh Islam.'
  },
  verses: [
    {
      verseNumber: 1,
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      translation: 'Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.',
      tafsirSummary: 'Al-Kautsar adalah kebaikan melimpah di dunia dan akhirat, termasuk telaga di surga.',
      references: [
        {
          kitab: 'Tafsir Ibnu Katsir',
          author: 'Imam Ibnu Katsir',
          quoteOrExplanation: 'Al-Kautsar adalah sungai di surga yang dianugerahkan kepada Rasulullah...'
        }
      ],
      tadabburPoints: ['Rasa syukur yang mendalam atas nikmat iman dan hidayah.']
    }
  ],
  quiz: [
    {
      id: 'q5-1',
      question: 'Apakah arti Al-Kautsar menurut riwayat Ibnu Abbas r.a.?',
      options: ['Kebaikan yang banyak', 'Kuda perang', 'Harta rampasan', 'Kekuatan fisik'],
      correctIndex: 0,
      explanation: 'Al-Kautsar bermakna kebaikan yang melimpah ruah.',
      referenceSource: 'Shahih Bukhari & Tafsir Ibnu Katsir'
    }
  ]
}`}
            </pre>
          </div>

          {/* Section 3: Standar Penulisan */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              Standar Kualitas Konten (PENTING):
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>Teks Arab harus bersumber dari Mushaf Standar Indonesia atau Madinah dengan harakat lengkap.</li>
              <li>Wajib menyertakan sumber rujukan kitab muktabar pada setiap kutipan tafsir.</li>
              <li>Gunakan narasi bahasa yang santun, objektif, dan memuat hikmah tadabbur.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
