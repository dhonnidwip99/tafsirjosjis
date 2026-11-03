/**
 * Utility to generate and download a 100% self-contained standalone HTML file
 * containing HTML, CSS, complete Tafsir data objects, and pure Vanilla JavaScript logic.
 */

import { MODULES, FLASHCARDS, GLOSSARY } from '../data/tafsirData';

export function generateStandaloneHtml(): string {
  const jsonModules = JSON.stringify(MODULES, null, 2);
  const jsonFlashcards = JSON.stringify(FLASHCARDS, null, 2);
  const jsonGlossary = JSON.stringify(GLOSSARY, null, 2);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TafsirPedia Mandiri - Belajar Ilmu & Tafsir Al-Qur'an</title>
  <meta name="description" content="Aplikasi interaktif mandiri belajar tafsir Al-Qur'an dan Ulumul Qur'an dalam satu file HTML.">
  <!-- Google Fonts: Amiri (Arab) & Inter (Latin) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Scheherazade+New:wght@400;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* ==========================================================
       BAGIAN 1: CSS & TEMA (Hijau Islami, Krem, Emas & Gelap)
       ========================================================== */
    :root {
      --bg-main: #f8faf9;
      --bg-card: #ffffff;
      --bg-muted: #f0fdf4;
      --border-color: #dcfce7;
      --border-subtle: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #475569;
      --primary: #047857; /* Emerald 700 */
      --primary-hover: #065f46;
      --primary-light: #ecfdf5;
      --accent-gold: #b45309; /* Warm Amber */
      --gold-bg: #fef3c7;
      --danger: #dc2626;
      --success: #16a34a;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --font-arabic-size: 28px;
      --font-body-size: 16px;
    }

    [data-theme="dark"] {
      --bg-main: #061e14;
      --bg-card: #0c2d20;
      --bg-muted: #133e2c;
      --border-color: #1f513b;
      --border-subtle: #1e3a2f;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --primary: #10b981;
      --primary-hover: #34d399;
      --primary-light: #064e3b;
      --accent-gold: #fbbf24;
      --gold-bg: #451a03;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      font-size: var(--font-body-size);
      line-height: 1.6;
    }

    .arabic-text {
      font-family: 'Amiri', 'Scheherazade New', serif;
      direction: rtl;
      text-align: right;
      font-size: var(--font-arabic-size);
      line-height: 2.2;
      color: var(--text-main);
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 16px;
    }

    /* HEADER & NAV */
    header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: var(--shadow);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      gap: 12px;
      flex-wrap: wrap;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--primary);
      font-weight: 800;
      font-size: 1.25rem;
    }

    .brand-icon {
      background: var(--primary-light);
      color: var(--primary);
      padding: 8px 12px;
      border-radius: 12px;
      font-weight: bold;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-main);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
    }

    .btn:hover {
      background: var(--bg-muted);
    }

    .btn-primary {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    /* TABS NAV */
    .nav-tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--border-subtle);
      margin-top: 16px;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .nav-tab {
      padding: 10px 18px;
      border: none;
      background: none;
      color: var(--text-muted);
      cursor: pointer;
      font-weight: 600;
      border-bottom: 3px solid transparent;
      white-space: nowrap;
    }

    .nav-tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }

    /* CARD STYLING */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: var(--shadow);
    }

    .banner-disclaimer {
      background: #fefce8;
      border-left: 4px solid #ca8a04;
      padding: 12px 16px;
      border-radius: 8px;
      color: #713f12;
      font-size: 0.875rem;
      margin: 16px 0;
    }

    [data-theme="dark"] .banner-disclaimer {
      background: #422006;
      border-left-color: #facc15;
      color: #fef08a;
    }

    /* ACCORDION */
    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 12px 0;
      user-select: none;
    }

    .accordion-body {
      display: none;
      padding-top: 12px;
      border-top: 1px dashed var(--border-subtle);
    }

    .accordion-body.open {
      display: block;
    }

    /* FLASHCARD 3D */
    .flashcard-container {
      perspective: 1000px;
      max-width: 600px;
      margin: 20px auto;
      height: 320px;
      cursor: pointer;
    }

    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flashcard-inner.flipped {
      transform: rotateY(180deg);
    }

    .flashcard-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
      border-radius: 16px;
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      box-shadow: var(--shadow);
    }

    .flashcard-back {
      transform: rotateY(180deg);
      background: var(--bg-muted);
      border-color: var(--primary);
    }

    /* QUIZ STYLES */
    .quiz-option {
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-main);
      cursor: pointer;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .quiz-option:hover {
      background: var(--bg-muted);
      border-color: var(--primary);
    }

    .quiz-option.correct {
      background: #dcfce7 !important;
      border-color: #16a34a !important;
      color: #14532d !important;
      font-weight: 600;
    }

    .quiz-option.wrong {
      background: #fee2e2 !important;
      border-color: #dc2626 !important;
      color: #7f1d1d !important;
    }

    /* SEARCH INPUT */
    .search-box {
      width: 100%;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-main);
      font-size: 1rem;
      margin-bottom: 16px;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: var(--primary-light);
      color: var(--primary);
    }

    .gold-badge {
      background: var(--gold-bg);
      color: var(--accent-gold);
    }

    footer {
      border-top: 1px solid var(--border-subtle);
      padding: 24px 0;
      margin-top: 40px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="container header-inner">
      <a href="#" class="brand" onclick="showTab('beranda'); return false;">
        <span class="brand-icon">📖</span>
        <span>TafsirPedia Mandiri</span>
      </a>
      
      <div class="header-actions">
        <!-- Pengatur Ukuran Font -->
        <button class="btn" title="Kecilkan Font" onclick="adjustFontSize(-2)">A-</button>
        <button class="btn" title="Besarkan Font" onclick="adjustFontSize(2)">A+</button>
        <!-- Toggle Tema Gelap/Terang -->
        <button class="btn" id="themeBtn" onclick="toggleTheme()">🌙 Mode Gelap</button>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Adab & Catatan Penuntut Ilmu -->
    <div class="banner-disclaimer">
      <strong>⚠️ Catatan Adab Penuntut Ilmu:</strong> Aplikasi ini disusun sebagai sarana bantu belajar awal bagi pemula dan menengah. Untuk pendalaman sanad keilmuan dan fatwa hukum syar'i, sangat dianjurkan untuk senantiasa bertalaqqi kepada para asatidz dan ulama yang berkompeten.
    </div>

    <!-- TABS NAVIGASI -->
    <nav class="nav-tabs" aria-label="Navigasi Utama">
      <button class="nav-tab active" onclick="showTab('beranda')">🏠 Beranda & Modul</button>
      <button class="nav-tab" onclick="showTab('flashcards')">🗂️ Kartu Ringkasan (Flashcard)</button>
      <button class="nav-tab" onclick="showTab('glosarium')">📚 Glosarium A-Z</button>
      <button class="nav-tab" onclick="showTab('kuis')">📝 Uji Pemahaman (Kuis)</button>
      <button class="nav-tab" onclick="showTab('panduan')">⚙️ Panduan Tambah Materi</button>
    </nav>

    <!-- KONTEN TAB: BERANDA & MODUL -->
    <section id="tab-beranda" class="tab-content" style="margin-top: 20px;">
      <input type="text" id="searchInput" class="search-box" placeholder="🔍 Cari ayat, istilah tafsir, nama surah, atau topik..." oninput="handleSearch(this.value)">
      
      <div id="moduleList"></div>
      <div id="moduleDetail" style="display: none;"></div>
    </section>

    <!-- KONTEN TAB: FLASHCARD -->
    <section id="tab-flashcards" class="tab-content" style="display: none; margin-top: 20px;">
      <div class="card" style="text-align: center;">
        <h2 style="color: var(--primary);">Kartu Ringkasan Istilah Kunci</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Klik pada kartu untuk membalik (melihat penjelasan & rujukan). Gunakan tombol navigasi di bawah.</p>
        
        <div class="flashcard-container" onclick="flipCard()">
          <div class="flashcard-inner" id="flashcardInner">
            <!-- Sisi Depan -->
            <div class="flashcard-face" id="cardFront">
              <span class="badge" id="cardCategory">Kategori</span>
              <div class="arabic-text" id="cardArabic" style="margin-top: 10px;"></div>
              <h2 id="cardTerm" style="margin: 12px 0;">Istilah</h2>
              <p id="cardShort" style="color: var(--text-muted);"></p>
              <span style="margin-top: 16px; font-size: 0.8rem; color: var(--primary);">👆 Klik untuk membalik kartu</span>
            </div>
            <!-- Sisi Belakang -->
            <div class="flashcard-face flashcard-back" id="cardBack">
              <h3 id="cardBackTitle" style="color: var(--primary); margin-bottom: 8px;">Uraian Mendalam</h3>
              <p id="cardDetailed" style="font-size: 0.95rem; margin-bottom: 12px;"></p>
              <div style="font-size: 0.85rem; color: var(--accent-gold); font-style: italic;" id="cardRef"></div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 14px;">
          <button class="btn" onclick="prevCard()">⬅️ Sebelumnya</button>
          <span id="cardCounter" style="display: flex; align-items: center; font-weight: 600;">1 / 10</span>
          <button class="btn" onclick="nextCard()">Selanjutnya ➡️</button>
        </div>
      </div>
    </section>

    <!-- KONTEN TAB: GLOSARIUM -->
    <section id="tab-glosarium" class="tab-content" style="display: none; margin-top: 20px;">
      <input type="text" id="glossarySearch" class="search-box" placeholder="🔍 Cari istilah di kamus glosarium..." oninput="renderGlossary(this.value)">
      <div id="glossaryList"></div>
    </section>

    <!-- KONTEN TAB: KUIS -->
    <section id="tab-kuis" class="tab-content" style="display: none; margin-top: 20px;">
      <div class="card">
        <h2 style="color: var(--primary); margin-bottom: 8px;">Pilih Modul Kuis</h2>
        <div id="quizModuleSelector" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;"></div>
        <div id="quizContainer"></div>
      </div>
    </section>

    <!-- KONTEN TAB: PANDUAN TAMBAH MATERI -->
    <section id="tab-panduan" class="tab-content" style="display: none; margin-top: 20px;">
      <div class="card">
        <h2 style="color: var(--primary); margin-bottom: 12px;">Panduan Menambah Materi Baru</h2>
        <p>Aplikasi ini menyimpan data materi dalam struktur array JavaScript (<code>MODULES</code>) yang berada pada tag <code>&lt;script&gt;</code> di bawah file ini. Anda dapat membuka file ini di teks editor manapun (VS Code, Notepad, dll.) dan menambahkan surah atau bab baru.</p>
        
        <h4 style="margin: 16px 0 8px;">Format Menambah Surah Baru:</h4>
        <pre style="background: var(--bg-muted); padding: 14px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; border: 1px solid var(--border-subtle);">
{
  id: 'modul-surah-an-nasr',
  number: 5,
  title: 'Tafsir Surah An-Nasr',
  shortDescription: 'Tafsir pertolongan Allah dan tanda dekatnya wafat Rasulullah.',
  badge: 'Tafsir Surah',
  category: 'tafsir_surah',
  surahIntro: {
    name: 'An-Nasr',
    arabicName: 'النَّصْر',
    surahNumber: 110,
    totalVerses: 3,
    classification: 'Madaniyyah',
    theme: 'Kemenangan Islam dan perintah tasbih serta istighfar.'
  },
  verses: [
    {
      verseNumber: 1,
      arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
      translation: 'Apabila telah datang pertolongan Allah dan kemenangan,',
      tafsirSummary: 'Pertolongan Allah dalam menaklukkan kota Makkah (Fathu Makkah).',
      references: [
        { kitab: 'Tafsir Ibnu Katsir', author: 'Ibnu Katsir', quoteOrExplanation: 'Maksud Al-Fath di sini adalah penaklukan Makkah...' }
      ],
      tadabburPoints: ['Kemenangan sejati datang semata-mata dari Allah.']
    }
  ],
  quiz: [ /* daftar soal */ ]
}
        </pre>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p><strong>TafsirPedia Al-Qur'an</strong> — Aplikasi Belajar Mandiri Berbasis Web (Single File HTML).</p>
      <p style="margin-top: 4px; font-size: 0.8rem;">Rujukan: Tafsir Ibnu Katsir, Tafsir Al-Jalalain, Tafsir Al-Muyassar, dan Tafsir Kemenag RI.</p>
    </div>
  </footer>

  <!-- ==========================================================
       BAGIAN 2: DATA STRUKTUR (JAVASCRIPT OBJECTS)
       ========================================================== -->
  <script>
    // Data Modul Lengkap
    const MODULES = ${jsonModules};

    // Data Kartu Ringkasan (Flashcard)
    const FLASHCARDS = ${jsonFlashcards};

    // Data Glosarium Istilah
    const GLOSSARY = ${jsonGlossary};

    /* ==========================================================
       BAGIAN 3: LOGIKA & INTERAKTIVITAS (VANILLA JAVASCRIPT)
       ========================================================== */
    let currentModuleIndex = 0;
    let currentFlashcardIndex = 0;
    let selectedQuizModuleId = MODULES[0].id;
    let currentQuizIndex = 0;
    let currentQuizScore = 0;
    let quizAnswered = false;

    // Inisialisasi saat halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {
      renderModuleList();
      renderGlossary();
      initFlashcard();
      initQuizSelectors();
      initTheme();
    });

    // Navigasi Tab
    function showTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));

      const target = document.getElementById('tab-' + tabName);
      if (target) target.style.display = 'block';

      // update nav active class
      const tabs = Array.from(document.querySelectorAll('.nav-tab'));
      const found = tabs.find(t => t.getAttribute('onclick')?.includes(tabName));
      if (found) found.classList.add('active');

      if (tabName === 'beranda') {
        document.getElementById('moduleList').style.display = 'block';
        document.getElementById('moduleDetail').style.display = 'none';
      }
    }

    // Render Daftar Modul di Beranda
    function renderModuleList() {
      const container = document.getElementById('moduleList');
      container.innerHTML = MODULES.map((mod, index) => \`
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <div>
              <span class="badge">\${mod.badge}</span>
              <h3 style="margin: 6px 0; color: var(--primary);">Modul \${mod.number}: \${mod.title}</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem;">\${mod.shortDescription}</p>
            </div>
            <button class="btn btn-primary" onclick="openModule(\${index})">Buka Materi 📖</button>
          </div>
        </div>
      \`).join('');
    }

    // Buka Detail Modul
    function openModule(index) {
      currentModuleIndex = index;
      const mod = MODULES[index];
      const listEl = document.getElementById('moduleList');
      const detailEl = document.getElementById('moduleDetail');

      listEl.style.display = 'none';
      detailEl.style.display = 'block';

      let contentHtml = \`
        <button class="btn" onclick="backToList()" style="margin-bottom: 16px;">⬅️ Kembali ke Daftar Modul</button>
        <div class="card">
          <span class="badge">\${mod.badge}</span>
          <h1 style="color: var(--primary); margin: 8px 0;">\${mod.title}</h1>
          <p style="color: var(--text-muted); margin-bottom: 16px;">\${mod.shortDescription}</p>
      \`;

      // Jika modul Ulumul Quran (Theory)
      if (mod.theorySections) {
        contentHtml += mod.theorySections.map(sec => \`
          <div class="card" style="background: var(--bg-muted); border-left: 4px solid var(--primary); margin-top: 14px;">
            <h3>\${sec.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">\${sec.subtitle}</p>
            <div style="white-space: pre-line; line-height: 1.7;">\${sec.content}</div>
          </div>
        \`).join('');
      }

      // Jika modul Tafsir Surah (Verses)
      if (mod.verses) {
        if (mod.surahIntro) {
          contentHtml += \`
            <div class="card" style="background: var(--bg-muted); border-left: 4px solid var(--accent-gold); margin-bottom: 20px;">
              <h3 style="color: var(--accent-gold);">Pengantar Surah: \${mod.surahIntro.name} (\${mod.surahIntro.arabicName})</h3>
              <p><strong>Golongan:</strong> \${mod.surahIntro.classification} | <strong>Jumlah Ayat:</strong> \${mod.surahIntro.totalVerses}</p>
              <p style="margin-top: 8px;"><strong>Tema Pokok:</strong> \${mod.surahIntro.theme}</p>
              \${mod.surahIntro.asbabunNuzulUmum ? \`<p style="margin-top: 6px;"><strong>Asbabun Nuzul:</strong> \${mod.surahIntro.asbabunNuzulUmum}</p>\` : ''}
            </div>
          \`;
        }

        contentHtml += mod.verses.map(v => \`
          <div class="card" style="margin-top: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span class="badge gold-badge">Ayat \${v.verseNumber}</span>
            </div>
            
            <div class="arabic-text">\${v.arabic}</div>
            <p style="font-style: italic; color: var(--text-muted); margin: 12px 0; border-left: 3px solid var(--border-subtle); padding-left: 12px;">
              "\${v.translation}"
            </p>

            <div style="margin-top: 14px;">
              <strong>Uraian Tafsir:</strong>
              <p style="margin-top: 4px;">\${v.tafsirSummary}</p>
            </div>

            <!-- Rujukan Kitab Muktabar -->
            <div style="margin-top: 12px; background: var(--bg-muted); padding: 12px; border-radius: 8px;">
              <strong style="color: var(--primary); font-size: 0.85rem;">Rujukan Kitab Muktabar:</strong>
              \${v.references.map(r => \`
                <div style="margin-top: 6px; font-size: 0.85rem;">
                  <strong>\${r.kitab} (\${r.author}):</strong> \${r.quoteOrExplanation}
                </div>
              \`).join('')}
            </div>

            <!-- Poin Tadabbur -->
            \${v.tadabburPoints && v.tadabburPoints.length ? \`
              <div style="margin-top: 10px; font-size: 0.85rem; color: var(--accent-gold);">
                <strong>💡 Mutiara Tadabbur:</strong>
                <ul style="padding-left: 20px; margin-top: 4px;">
                  \${v.tadabburPoints.map(p => \`<li>\${p}</li>\`).join('')}
                </ul>
              </div>
            \` : ''}
          </div>
        \`).join('');
      }

      contentHtml += \`</div>\`;
      detailEl.innerHTML = contentHtml;
    }

    function backToList() {
      document.getElementById('moduleList').style.display = 'block';
      document.getElementById('moduleDetail').style.display = 'none';
    }

    // FLASHCARD LOGIC
    function initFlashcard() {
      showFlashcard(currentFlashcardIndex);
    }

    function showFlashcard(index) {
      const card = FLASHCARDS[index];
      const inner = document.getElementById('flashcardInner');
      inner.classList.remove('flipped');

      document.getElementById('cardCategory').innerText = card.category;
      document.getElementById('cardArabic').innerText = card.arabicTerm || '';
      document.getElementById('cardTerm').innerText = card.term;
      document.getElementById('cardShort').innerText = card.shortDefinition;
      document.getElementById('cardDetailed').innerText = card.detailedExplanation;
      document.getElementById('cardRef').innerText = 'Rujukan: ' + card.exampleOrReference;
      document.getElementById('cardCounter').innerText = (index + 1) + ' / ' + FLASHCARDS.length;
    }

    function flipCard() {
      document.getElementById('flashcardInner').classList.toggle('flipped');
    }

    function nextCard() {
      currentFlashcardIndex = (currentFlashcardIndex + 1) % FLASHCARDS.length;
      showFlashcard(currentFlashcardIndex);
    }

    function prevCard() {
      currentFlashcardIndex = (currentFlashcardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
      showFlashcard(currentFlashcardIndex);
    }

    // GLOSARIUM LOGIC
    function renderGlossary(filterText = '') {
      const listEl = document.getElementById('glossaryList');
      const filtered = GLOSSARY.filter(item => {
        const query = filterText.toLowerCase();
        return item.term.toLowerCase().includes(query) ||
               (item.arabicTerm && item.arabicTerm.includes(query)) ||
               item.definition.toLowerCase().includes(query);
      });

      if (filtered.length === 0) {
        listEl.innerHTML = '<div class="card"><p>Tidak ada istilah yang cocok dengan pencarian.</p></div>';
        return;
      }

      listEl.innerHTML = filtered.map(item => \`
        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="color: var(--primary);">\${item.term}</h3>
            \${item.arabicTerm ? \`<span class="arabic-text" style="font-size: 1.4rem;">\${item.arabicTerm}</span>\` : ''}
          </div>
          <span class="badge" style="margin: 6px 0;">\${item.category}</span>
          <p style="margin-top: 6px;">\${item.definition}</p>
          <div style="margin-top: 8px; font-size: 0.8rem; color: var(--accent-gold);">Rujukan: \${item.reference}</div>
        </div>
      \`).join('');
    }

    // KUIS LOGIC
    function initQuizSelectors() {
      const selector = document.getElementById('quizModuleSelector');
      selector.innerHTML = MODULES.map((mod, i) => \`
        <button class="btn \${i === 0 ? 'btn-primary' : ''}" onclick="selectQuizModule('\${mod.id}', this)">
          Modul \${mod.number}
        </button>
      \`).join('');
      loadQuizQuestion(MODULES[0].id, 0);
    }

    function selectQuizModule(modId, btn) {
      selectedQuizModuleId = modId;
      document.querySelectorAll('#quizModuleSelector .btn').forEach(b => b.classList.remove('btn-primary'));
      btn.classList.add('btn-primary');
      currentQuizIndex = 0;
      currentQuizScore = 0;
      loadQuizQuestion(modId, 0);
    }

    function loadQuizQuestion(modId, qIndex) {
      quizAnswered = false;
      const mod = MODULES.find(m => m.id === modId);
      if (!mod || !mod.quiz || qIndex >= mod.quiz.length) {
        // Tampilkan Skor Akhir
        showQuizResult(mod);
        return;
      }

      const q = mod.quiz[qIndex];
      const container = document.getElementById('quizContainer');
      container.innerHTML = \`
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span class="badge">Soal \${qIndex + 1} dari \${mod.quiz.length}</span>
          <span style="font-weight: 600; font-size: 0.9rem;">Skor Sementara: \${currentQuizScore}</span>
        </div>
        <h3 style="margin-bottom: 16px;">\${q.question}</h3>
        <div id="optionsList">
          \${q.options.map((opt, i) => \`
            <button class="quiz-option" onclick="checkAnswer(\${i})">\${opt}</button>
          \`).join('')}
        </div>
        <div id="quizFeedback" style="display: none; margin-top: 16px;"></div>
      \`;
    }

    function checkAnswer(chosenIndex) {
      if (quizAnswered) return;
      quizAnswered = true;

      const mod = MODULES.find(m => m.id === selectedQuizModuleId);
      const q = mod.quiz[currentQuizIndex];
      const options = document.querySelectorAll('.quiz-option');
      const feedback = document.getElementById('quizFeedback');

      if (chosenIndex === q.correctIndex) {
        currentQuizScore++;
        options[chosenIndex].classList.add('correct');
        feedback.innerHTML = \`
          <div style="background: #dcfce7; padding: 12px; border-radius: 8px; color: #14532d; border-left: 4px solid #16a34a;">
            <strong>✅ Benar!</strong> \${q.explanation}
            <div style="font-size: 0.8rem; margin-top: 4px; color: #166534;">Sumber: \${q.referenceSource}</div>
          </div>
          <button class="btn btn-primary" style="margin-top: 12px;" onclick="nextQuiz()">Soal Selanjutnya ➡️</button>
        \`;
      } else {
        options[chosenIndex].classList.add('wrong');
        options[q.correctIndex].classList.add('correct');
        feedback.innerHTML = \`
          <div style="background: #fee2e2; padding: 12px; border-radius: 8px; color: #7f1d1d; border-left: 4px solid #dc2626;">
            <strong>❌ Kurang Tepat.</strong> \${q.explanation}
            <div style="font-size: 0.8rem; margin-top: 4px; color: #991b1b;">Sumber: \${q.referenceSource}</div>
          </div>
          <button class="btn btn-primary" style="margin-top: 12px;" onclick="nextQuiz()">Soal Selanjutnya ➡️</button>
        \`;
      }
      feedback.style.display = 'block';
    }

    function nextQuiz() {
      currentQuizIndex++;
      loadQuizQuestion(selectedQuizModuleId, currentQuizIndex);
    }

    function showQuizResult(mod) {
      const container = document.getElementById('quizContainer');
      const total = mod.quiz.length;
      const pct = Math.round((currentQuizScore / total) * 100);

      container.innerHTML = \`
        <div style="text-align: center; padding: 20px 0;">
          <h2 style="color: var(--primary);">Hasil Kuis Selesai! 🎉</h2>
          <div style="font-size: 3rem; font-weight: 800; color: var(--primary); margin: 12px 0;">\${pct}%</div>
          <p>Anda menjawab benar <strong>\${currentQuizScore}</strong> dari <strong>\${total}</strong> pertanyaan.</p>
          <button class="btn btn-primary" style="margin-top: 20px;" onclick="loadQuizQuestion('\${mod.id}', 0); currentQuizIndex = 0; currentQuizScore = 0;">
            🔄 Ulangi Kuis Modul Ini
          </button>
        </div>
      \`;
    }

    // PENCARIAN GLOBAL
    function handleSearch(query) {
      if (!query.trim()) {
        renderModuleList();
        return;
      }
      const q = query.toLowerCase();
      const container = document.getElementById('moduleList');
      const results = [];

      MODULES.forEach((mod, modIdx) => {
        if (mod.title.toLowerCase().includes(q) || mod.shortDescription.toLowerCase().includes(q)) {
          results.push(\`<div class="card"><strong>Modul: \${mod.title}</strong><p>\${mod.shortDescription}</p><button class="btn btn-primary" onclick="openModule(\${modIdx})">Buka Modul</button></div>\`);
        }
        if (mod.verses) {
          mod.verses.forEach(v => {
            if (v.translation.toLowerCase().includes(q) || v.arabic.includes(q) || v.tafsirSummary.toLowerCase().includes(q)) {
              results.push(\`<div class="card"><span class="badge">\${mod.title} - Ayat \${v.verseNumber}</span><div class="arabic-text" style="font-size: 1.2rem;">\${v.arabic}</div><p style="font-style: italic;">"\${v.translation}"</p><button class="btn btn-primary" onclick="openModule(\${modIdx})">Lihat Tafsir Lengkap</button></div>\`);
            }
          });
        }
      });

      if (results.length === 0) {
        container.innerHTML = '<div class="card"><p>Tidak ditemukan materi yang cocok dengan: "' + query + '"</p></div>';
      } else {
        container.innerHTML = results.join('');
      }
    }

    // PENGATUR UKURAN FONT & TEMA
    let arabicSize = 28;
    let bodySize = 16;

    function adjustFontSize(delta) {
      arabicSize = Math.max(20, Math.min(44, arabicSize + delta * 2));
      bodySize = Math.max(13, Math.min(22, bodySize + delta));
      document.documentElement.style.setProperty('--font-arabic-size', arabicSize + 'px');
      document.documentElement.style.setProperty('--font-body-size', bodySize + 'px');
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      document.getElementById('themeBtn').innerText = next === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    }

    function initTheme() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeBtn').innerText = '☀️ Mode Terang';
      }
    }
  </script>
</body>
</html>`;
}

export function triggerDownload(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
