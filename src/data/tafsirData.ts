/**
 * @license
 * Data materi Tafsir Al-Qur'an dan Ulumul Qur'an
 * Rujukan: Tafsir Ibnu Katsir, Tafsir Al-Jalalain, Tafsir Al-Muyassar, Tafsir Ringkas Kemenag RI.
 */

export interface VerseTafsir {
  verseNumber: number;
  arabic: string;
  translation: string;
  keywords?: { word: string; meaning: string }[];
  asbabunNuzul?: string;
  tafsirSummary: string;
  references: {
    kitab: string;
    author: string;
    quoteOrExplanation: string;
  }[];
  tadabburPoints: string[];
}

export interface ChapterIntro {
  name: string;
  arabicName: string;
  surahNumber: number;
  totalVerses: number;
  classification: 'Makkiyyah' | 'Madaniyyah' | 'Khilaf Ulama';
  otherNames: string[];
  theme: string;
  asbabunNuzulUmum?: string;
  virtues: string[];
}

export interface TheorySection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  content: string;
  keyPoints: string[];
  ulamaQuotes?: { scholar: string; quote: string; source: string }[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceSource: string;
}

export interface FlashcardItem {
  id: string;
  category: string;
  term: string;
  arabicTerm?: string;
  shortDefinition: string;
  detailedExplanation: string;
  exampleOrReference: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  arabicTerm?: string;
  category: 'Kaidah Tafsir' | 'Metode & Corak' | 'Sejarah' | 'Istilah Surah' | 'Ilmu Al-Qur\'an';
  definition: string;
  reference: string;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  badge: string;
  category: 'ulumul_quran' | 'tafsir_surah';
  surahIntro?: ChapterIntro;
  theorySections?: TheorySection[];
  verses?: VerseTafsir[];
  quiz: QuizQuestion[];
}

export const MODULES: ModuleData[] = [
  {
    id: 'modul-1-ilmu-tafsir',
    number: 1,
    title: 'Dasar-Dasar Ilmu Tafsir (Ulumul Qur\'an)',
    shortDescription: 'Pengertian tafsir, ta\'wil, terjemah, sejarah perkembangan, metode (manahij), corak (ittijahat), serta ilmu-ilmu pendukung tafsir.',
    badge: 'Teori & Kaidah',
    category: 'ulumul_quran',
    theorySections: [
      {
        id: 'sec-1-definisi',
        title: '1. Pengertian Tafsir, Ta\'wil, dan Terjemah',
        subtitle: 'Membedakan tiga istilah kunci dalam memahami kalam Ilahi',
        iconName: 'BookOpen',
        content: `Secara etimologi (bahasa), kata **Tafsir** berasal dari akar kata *fassara - yufassiru - tafsiran* (فَسَّرَ - يُفَسِّرُ - تَفْسِيرًا) yang bermakna *al-bayan* (penjelasan), *al-kasyf* (menyingkap), dan *izh-harul ma'na al-ma'qul* (menampakkan makna yang tersimpan). Allah Ta'ala berfirman: 
*(وَلَا يَأْتُونَكَ بِمَثَلٍ إِلَّا جِئْنَاكَ بِالْحَقِّ وَأَحْسَنَ تَفْسِيرًا)* "Tidaklah orang-orang kafir itu datang kepadamu membawa sesuatu yang ganjil, melainkan Kami datangkan kepadamu suatu yang benar dan penjelasan yang terbaik." (QS. Al-Furqan: 33).

Secara terminologi (istilah syar'i), Imam Az-Zarkasyi mendefinisikan tafsir sebagai:
*"Ilmu untuk memahami Kitabullah yang diturunkan kepada Nabi Muhammad SAW, menjelaskan makna-maknanya, mengeluarkan hukum-hukumnya, serta hikmah-hikmah yang terkandung di dalamnya."*

Adapun **Ta'wil** secara bahasa berasal dari kata *aala - ya'ulu* (آلَ - يَؤُولُ) yang berarti kembali (ar-ruju'). Dalam istilah ulama salaf, ta'wil sering dipakai bersinonim dengan tafsir (sebagaimana doa Nabi untuk Ibnu Abbas: *Allahumma faqqihhu fid-din wa 'allimhut-ta'wil*). Namun menurut ulama muta'akhirin (kontemporer), ta'wil bermakna memalingkan lafal dari makna zhahir (tekstual yang kuat) kepada makna lain yang mungkin (marjuh) karena adanya dalil/indikator pendukung yang kuat.

Sedangkan **Terjemah** adalah mengalihkan pembicaraan dari satu bahasa ke bahasa lain. Terjemah terbagi menjadi:
1. *Terjemah Harfiyyah*: menerjemahkan kata demi kata setara secara tata bahasa (hal ini mustahil secara sempurna dalam Al-Qur'an tanpa mengurangi kedalaman balaghahnya).
2. *Terjemah Maknawiyyah/Tafsariyyah*: menjelaskan makna pesan Al-Qur'an ke dalam bahasa sasaran tanpa terikat susunan kata bahasa aslinya.`,
        keyPoints: [
          'Tafsir berfokus pada penjelasan makna zhahir, riwayat, dan hukum lafazh Al-Qur\'an.',
          'Ta\'wil berorientasi pada makna batin atau kemungkinan makna yang memerlukan penalaran mendalam dengan qarinah.',
          'Terjemah Al-Qur\'an yang beredar di Indonesia (seperti Terjemahan Kemenag RI) merupakan terjemahan maknawiyah, bukan pengganti teks asli Al-Qur\'an.',
        ],
        ulamaQuotes: [
          {
            scholar: 'Imam Az-Zarkasyi (Al-Burhan fi Ulumil Qur\'an)',
            quote: 'التفسير علم يُفهم به كتاب الله المنزل على نبيه محمد صلى الله عليه وسلم، وبيان معانيه، واستخراج أحكامه وحكمه.',
            source: 'Al-Burhan fi \'Ulumil Qur\'an, Jilid 1, Hal. 13',
          },
          {
            scholar: 'Imam Al-Maturidi',
            quote: 'Tafsir adalah memastikan bahwa maksud Allah pada lafal ini adalah begini, sedangkan ta\'wil adalah mentarjih (memilih) salah satu kemungkinan makna tanpa memastikan bahwa itulah kehendak mutlak Allah.',
            source: 'Ta\'wilat Ahlis Sunnah',
          },
        ],
      },
      {
        id: 'sec-2-sejarah',
        title: '2. Sejarah dan Periodisasi Perkembangan Tafsir',
        subtitle: 'Perjalanan transmisi tafsir dari era risalah nubuwah hingga era kontemporer',
        iconName: 'History',
        content: `Ilmu tafsir melewati fase-fase penting dalam sejarah peradaban Islam:

**1. Masa Nabi Muhammad ﷺ:**
Rasulullah adalah mufassir pertama dan utama. Beliau menafsirkan wahyu langsung melalui sabda, ketetapan, dan akhlaknya. Sahabat yang menemui kemusykilan langsung bertanya kepada beliau (misalnya penafsiran kata *azh-zhulm* dalam QS. Al-An'am: 82 yang ditafsirkan Rasulullah sebagai syirik, merujuk nasihat Luqman).

**2. Masa Sahabat (Abad 1 H):**
Setelah wafatnya Rasulullah, para sahabat menjadi rujukan. Sahabat yang paling masyhur dalam tafsir adalah:
- Abdullah bin Abbas r.a. (bergelar *Turjumanul Qur'an* dan *Habrul Ummah*).
- Abdullah bin Mas'ud r.a.
- Ali bin Abi Thalib r.a.
- Ubay bin Ka'ab r.a.
Sumber tafsir masa ini: Al-Qur'an, Sunnah, ijtihad berbasis bahasa Arab murni, dan adat kebiasaan Arab.

**3. Masa Tabi'in (Akhir Abad 1 - 2 H):**
Lahir madrasah-madrasah tafsir besar:
- *Madrasah Makkah*: murid-murid Ibnu Abbas seperti Mujahid, Ikrimah, Atha' bin Abi Rabah, Thawus, dan Said bin Jubair.
- *Madrasah Madinah*: murid-murid Ubay bin Ka'ab seperti Zaid bin Aslam dan Abul Aliyah.
- *Madrasah Irak (Kufah)*: murid-murid Ibnu Mas'ud seperti Alqamah dan Al-Aswad.

**4. Masa Kodifikasi (Tadwin - Abad 2 H dst):**
Awalnya riwayat tafsir dihimpun dalam bab-bab kitab Hadits (seperti dalam Shahih Bukhari). Kemudian lahirlah kitab tafsir mandiri yang tersusun dari Surah Al-Fatihah hingga An-Nas. Pelopor monumentalnya adalah Imam Ibnu Jarir At-Thabari (wafat 310 H) dengan kitabnya *Jami'ul Bayan 'an Ta'wil Ayil Qur'an*.

**5. Masa Kontemporer (Abad 20 - Sekarang):**
Muncul pendekatan tematik dan sosial-kemasyarakatan (Adabi Ijtima'i) untuk menjawab tantangan modernitas, sains, dan peradaban (seperti Tafsir Al-Manar karya Rasyid Ridha & Muhammad Abduh, Tafsir Al-Azhar karya Buya Hamka di Indonesia, dan Tafsir Al-Mishbah karya Prof. Quraish Shihab).`,
        keyPoints: [
          'Rasulullah ﷺ adalah penjelas otoritatif pertama Al-Qur\'an.',
          'Masa sahabat dan tabi\'in mengandalkan transmisi lisan (riwayah) dan kedalaman bahasa Arab.',
          'Kodifikasi sistematis melahirkan mahakarya tafsir salaf seperti Tafsir At-Thabari dan Ibnu Katsir.',
        ],
      },
      {
        id: 'sec-3-metode',
        title: '3. Empat Metode Utama Penafsiran (Manahijut Tafsir)',
        subtitle: 'Cara kerja dan sistematika mufassir dalam menguraikan ayat-ayat Al-Qur\'an',
        iconName: 'Compass',
        content: `Para ulama mengklasifikasikan metode penafsiran menjadi empat metode besar:

1. **Metode Tahlili (Analitis):**
Mufassir menganalisis ayat demi ayat sesuai urutan mushaf dari awal hingga akhir surah, membahas kosakata, asbabun nuzul, munasabah (korelasi antar ayat), analisis gramatikal (i'rab/balaghah), serta hukum fikih.
*Kelebihan:* Menyeluruh dan kaya wawasan bahasa.
*Kelemahan:* Pembahasan topik sering terpecah-pecah di berbagai surah.
*Contoh:* Tafsir Al-Qurthubi, Tafsir Ibnu Katsir.

2. **Metode Ijmali (Global / Ringkas):**
Menjelaskan makna ayat secara ringkas, lugas, dan mudah dicerna masyarakat awam dengan bahasa yang mendekati susunan lafal Al-Qur'an tanpa detail perdebatan rumit.
*Kelebihan:* Praktis, mudah dipahami, tidak bertele-tele.
*Kelemahan:* Kurang mendalam bagi pengkaji hukum dan akidah tingkat lanjut.
*Contoh:* Tafsir Al-Jalalain karya Jalaluddin Al-Mahalli & As-Suyuthi, Tafsir Al-Muyassar.

3. **Metode Muqaran (Komparatif / Perbandingan):**
Membandingkan ayat dengan ayat lain yang bermakna mirip, ayat dengan hadits yang tampak bertentangan, atau membandingkan pendapat para mufassir terdahulu untuk mencari pandangan terkuat (rajih).
*Kelebihan:* Membuka wawasan khilafiyah ilmiah dan toleransi akademis.
*Contoh:* Al-Jami' li Ahkam Al-Qur'an karya Imam Al-Qurthubi.

4. **Metode Maudhu'i (Tematik):**
Menghimpun seluruh ayat Al-Qur'an yang berbicara tentang satu topik tertentu (misal: "Keadilan dalam Al-Qur'an", "Konsep Riba", "Pendidikan Anak"), lalu menyusunnya secara kronologis turunnya ayat dan menganalisisnya secara komprehensif.
*Kelebihan:* Mampu menjawab isu-isu kontemporer secara tuntas dan integratif.
*Kelemahan:* Membutuhkan penguasaan komprehensif atas seluruh isi Al-Qur'an.`,
        keyPoints: [
          'Tahlili = urut mushaf & analitis mendalam.',
          'Ijmali = ringkas, praktis, ramah pemula.',
          'Muqaran = perbandingan pendapat dan penelusuran tarjih.',
          'Maudhu\'i = himpunan ayat per satu tema spesifik.',
        ],
        comparisonTable: {
          headers: ['Metode', 'Sistematika', 'Fokus Utama', 'Tingkat Sasaran'],
          rows: [
            ['Tahlili', 'Sesuai urutan mushaf ayat per ayat', 'Analisis linguistik, i\'rab, riwayat, munasabah', 'Mahasiswa & Peneliti Lanjutan'],
            ['Ijmali', 'Sesuai urutan mushaf ringkas', 'Intisari makna global lafal', 'Pemula & Masyarakat Umum'],
            ['Muqaran', 'Mempertemukan dalil/pendapat', 'Perbandingan madzhab tafsir & komparasi dalil', 'Akademisi & Peneliti Fikih'],
            ['Maudhu\'i', 'Mengumpulkan ayat se-topik', 'Sintesis konsep Al-Qur\'an terhadap isu', 'Pemecahan Masalah Kontemporer'],
          ],
        },
      },
      {
        id: 'sec-4-corak',
        title: '4. Corak dan Pendekatan Tafsir (Al-Ittijahat)',
        subtitle: 'Nuansa kecenderungan minat dan keilmuan penyusun kitab tafsir',
        iconName: 'Palette',
        content: `Corak tafsir mencerminkan latar belakang keilmuan sang mufassir:

**A. Berdasarkan Sumber Rujukan Primer:**
1. **Tafsir bil Ma'tsur (Tafsir bir Riwayah):**
Menafsirkan Al-Qur'an dengan Al-Qur'an, dengan hadits Rasulullah ﷺ, atsar sahabat, dan perkataan tabi'in. Ini adalah tingkatan tafsir tertinggi yang wajib didahulukan.
*Contoh:* Tafsir At-Thabari, Tafsir Ibnu Katsir (*Tafsir Al-Qur'an Al-'Azhim*), Tafsir As-Suyuthi (*Ad-Durr Al-Mantsur*).

2. **Tafsir bir Ra'yi (Tafsir bid Dirayah):**
Menafsirkan Al-Qur'an dengan ijtihad akal sehat yang memenuhi kaidah bahasa Arab, syariat, dan ushuluddin (bukan hawa nafsu pribadi semata).
*Tafsir bir Ra'yi Mahmud (terpuji):* Bersandar pada kaidah syar'i dan bahasa Arab.
*Tafsir bir Ra'yi Madzmum (tercela):* Berdasarkan hawa nafsu atau membela bid'ah tanpa dasar ilmu.
*Contoh:* Tafsir Mafatihul Ghaib (Ar-Razi), Tafsir Al-Baidhawi.

**B. Berdasarkan Keahlian Spesifik:**
- **Corak Fiqhi (Hukum):** Fokus mengekstraksi hukum syariat dan mazhab fikih (misal: *Ahkamul Qur'an* karya Al-Jashshas, *Al-Jami' li Ahkam Al-Qur'an* karya Al-Qurthubi).
- **Corak Lughawi (Kebahasaan & Sastra):** Mendalami keindahan balaghah dan nahwu (misal: *Al-Kasysyaf* karya Az-Zamakhsyari).
- **Corak Adabi Ijtima'i (Sosial Kemasyarakatan):** Menghubungkan petunjuk Al-Qur'an dengan realitas sosial kekinian (misal: *Tafsir Al-Azhar* karya Buya Hamka).
- **Corak Isyari (Sufistik):** Menggali isyarat batin di balik teks tanpa menafikan makna zhahirnya (hanya diterima jika tidak bertentangan dengan syariat zhahir).`,
        keyPoints: [
          'Tafsir bil Ma\'tsur mengedepankan riwayat naqliyah sahih.',
          'Tafsir bir Ra\'yi yang diterima adalah yang berdasar kaidah ijtihad yang sah, bukan penafsiran bebas tanpa dasar keilmuan.',
          'Mengetahui corak kitab membantu pembaca memahami sudut pandang dan fokus uraian mufassir.',
        ],
      },
      {
        id: 'sec-5-ilmu-pendukung',
        title: '5. Ilmu Pendukung (Kaidah-Kaidah Ulumul Qur\'an)',
        subtitle: 'Perangkat penting agar tidak salah memahami maksud ayat',
        iconName: 'Layers',
        content: `Untuk menafsirkan Al-Qur'an, mufassir membutuhkan seperangkat ilmu bantu:

1. **Asbabun Nuzul (Sebab Turunnya Ayat):**
Mengetahui peristiwa atau pertanyaan yang melatarbelakangi turunnya suatu ayat. 
*Kaidah Emas:* 
*(العِبْرَةُ بِعُمُومِ اللَّفْظِ لَا بِخُصُوصِ السَّبَبِ)*
*"Ibrah (patokan hukum) diambil dari keumuman lafal, bukan dari kekhususan sebab turunnya."* Artinya, meski sebab turunnya spesifik pada seorang sahabat/musuh di masa Nabi, hukum hukumnya berlaku umum bagi seluruh umat Islam hingga akhir zaman.

2. **Makkiyyah dan Madaniyyah:**
- *Makkiyyah:* Umumnya turun sebelum hijrah Nabi ke Madinah, berfokus pada pemantapan akidah tauhid, hari kiamat, akhlak, bantahan terhadap kaum musyrikin, serta bahasanya ringkas dan tegas.
- *Madaniyyah:* Umumnya turun setelah hijrah, berfokus pada hukum syariat (ibadah, muamalah, hudud, pernikahan, waris), relasi sosial kenegaraan, dan seruan kepada kaum munafik serta Ahli Kitab.

3. **Nasikh dan Mansukh:**
Pengangkatan hukum syariat yang telah ditetapkan sebelumnya dengan hukum syariat yang datang kemudian dari wahyu Allah. Hal ini menunjukkan hikmah pentahapan (tasyri') bagi kemaslahatan hamba.

4. **Muhkam dan Mutasyabih:**
Allah berfirman dalam QS. Ali 'Imran: 7 bahwa ada ayat *Muhkam* (jelas maknanya tanpa kesamaran, menjadi fondasi kitab/Ummul Kitab) dan *Mutasyabih* (makna yang memerlukan rujukan kepada ayat muhkam atau penyerahan hakikatnya kepada Allah, seperti sifat-sifat Allah dan hakikat hari kiamat).`,
        keyPoints: [
          'Asbabun nuzul menjaga penafsir dari salah menempatkan konteks ayat.',
          'Pembeda Makkiyah-Madaniyyah membantu memahami tahapan pembinaan masyarakat Islam.',
          'Kaidah Al-\'Ibrah bi umumil lafzhi memastikan universalitas ajaran Al-Qur\'an.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Secara etimologis (bahasa), kata "Tafsir" berakar dari kata فَسَّرَ yang memiliki arti pokok...',
        options: [
          'Menghafal dan membaca secara tartil',
          'Menjelaskan, menyingkap, dan menampakkan makna',
          'Menerjemahkan kata demi kata secara harfiah',
          'Mengembalikan sesuatu ke asal muasalnya',
        ],
        correctIndex: 1,
        explanation: 'Secara bahasa, tafsir bermakna al-bayan (penjelasan) dan al-kasyf (menyingkap makna yang tersembunyi), sebagaimana firman Allah dalam QS. Al-Furqan: 33.',
        referenceSource: 'Al-Burhan fi Ulumil Qur\'an karya Imam Az-Zarkasyi',
      },
      {
        id: 'q1-2',
        question: 'Siapakah sahabat Nabi yang mendapat julukan "Turjumanul Qur\'an" (Penerjemah Al-Qur\'an) berkat doa khusus dari Rasulullah ﷺ?',
        options: [
          'Abdullah bin Mas\'ud r.a.',
          'Ubay bin Ka\'ab r.a.',
          'Abdullah bin Abbas r.a.',
          'Ali bin Abi Thalib r.a.',
        ],
        correctIndex: 2,
        explanation: 'Abdullah bin Abbas r.a. didoakan langsung oleh Rasulullah: "Allahumma faqqihhu fid-din wa \'allimhut-ta\'wil" sehingga beliau digelari Habrul Ummah dan Turjumanul Qur\'an.',
        referenceSource: 'Shahih Bukhari & Muqaddimah Tafsir Ibnu Katsir',
      },
      {
        id: 'q1-3',
        question: 'Metode penafsiran yang menghimpun seluruh ayat Al-Qur\'an seputar satu topik tertentu (misal: Keadilan, Pendidikan) untuk dianalisis secara terpadu disebut metode...',
        options: [
          'Tahlili (Analitis)',
          'Ijmali (Global)',
          'Maudhu\'i (Tematik)',
          'Muqaran (Komparatif)',
        ],
        correctIndex: 2,
        explanation: 'Metode Maudhu\'i (tematik) adalah metode yang mengumpulkan ayat-ayat dari berbagai surah yang membahas tema yang sama guna melahirkan pandangan Al-Qur\'an yang komprehensif atas tema tersebut.',
        referenceSource: 'Kaidah Tafsir & Manahijut Tafsir Prof. Quraish Shihab',
      },
      {
        id: 'q1-4',
        question: 'Apakah makna dari kaidah ushul: "العِبْرَةُ بِعُمُومِ اللَّفْظِ لَا بِخُصُوصِ السَّبَبِ"?',
        options: [
          'Hukum ayat hanya berlaku untuk orang yang menjadi sebab turunnya ayat',
          'Patokan hukum diambil dari keumuman lafal ayat, bukan kekhususan sebab turunnya',
          'Lafal khusus harus selalu ditakwil menjadi lafal umum',
          'Sebab turunnya ayat menghapus keumuman teks Al-Qur\'an',
        ],
        correctIndex: 1,
        explanation: 'Kaidah ini menegaskan bahwa meskipun ayat turun karena latar belakang peristiwa seorang sahabat tertentu, hukum dan ibrahnya berlaku umum bagi seluruh umat Islam.',
        referenceSource: 'Al-Itqan fi Ulumil Qur\'an karya Imam As-Suyuthi',
      },
      {
        id: 'q1-5',
        question: 'Kitab tafsir "Al-Jami\' li Ahkam Al-Qur\'an" karya Imam Al-Qurthubi dikenal menonjol dalam corak...',
        options: [
          'Corak Fiqhi (Hukum Syariat)',
          'Corak Isyari (Sufistik Murni)',
          'Corak Falsafi (Filsafat Yunani)',
          'Corak Sastra Bebas',
        ],
        correctIndex: 0,
        explanation: 'Imam Al-Qurthubi memfokuskan tafsirnya pada istinbath (penggalian) hukum-hukum fikih dan dalil mazhab dari setiap ayat Al-Qur\'an.',
        referenceSource: 'Muqaddimah Al-Jami\' li Ahkam Al-Qur\'an',
      },
    ],
  },
  {
    id: 'modul-2-al-fatihah',
    number: 2,
    title: 'Tafsir Surah Al-Fatihah (Ummul Kitab)',
    shortDescription: 'Tafsir lengkap ayat demi ayat Surah Pembuka, kedudukan basmalah, as-sab\'ul matsani, rujukan Ibnu Katsir, Al-Jalalain, dan Kemenag RI.',
    badge: 'Tafsir Surah',
    category: 'tafsir_surah',
    surahIntro: {
      name: 'Al-Fatihah',
      arabicName: 'الفَاتِحَة',
      surahNumber: 1,
      totalVerses: 7,
      classification: 'Makkiyyah',
      otherNames: ['Ummul Qur\'an (Induk Al-Qur\'an)', 'Ummul Kitab', 'As-Sab\'ul Matsani (Tujuh yang Berulang)', 'Asy-Syifa (Penyembuh)', 'Al-Waqiyah', 'Ash-Shalah'],
      theme: 'Pondasi ketauhidan, ubudiyah mutlak hanya kepada Allah, permohonan hidayah jalan lurus, dan pembagian golongan manusia di hadapan petunjuk Allah.',
      asbabunNuzulUmum: 'Diriwayatkan oleh Ali bin Abi Thalib r.a. bahwa Al-Fatihah turun di Makkah dari perbendaharaan di bawah \'Arsy. Surah ini wajib dibaca di setiap rakaat shalat (HR. Bukhari & Muslim: "La shalata liman lam yaqra\' bi fatihatil kitab").',
      virtues: [
        'Surah paling agung dalam Al-Qur\'an menurut sabda Rasulullah ﷺ kepada Abu Sa\'id bin Al-Mu\'alla (HR. Bukhari No. 4474).',
        'Merupakan dialog langsung antara hamba dengan Allah (Hadits Qudsi riwayat Muslim: "Qasamtu ash-shalata baini wa baina \'abdi nishfain...").',
        'Doa ruqyah syar\'iyyah yang menyembuhkan berbagai penyakit lahir dan batin.',
      ],
    },
    verses: [
      {
        verseNumber: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
        keywords: [
          { word: 'بِسْمِ', meaning: 'Dengan menyebut asma/nama agung' },
          { word: 'اللَّهِ', meaning: 'Lafzhul Jalalah: Ilah Yang Maha Esa yang berhak disembah secara mutlak' },
          { word: 'الرَّحْمَٰنِ', meaning: 'Maha Pengasih dengan rahmat luas mencakup seluruh makhluk di dunia' },
          { word: 'الرَّحِيمِ', meaning: 'Maha Penyayang khusus bagi kaum mukminin di akhirat' },
        ],
        tafsirSummary: 'Memulai setiap perbuatan mulia dengan memohon berkah dan pertolongan Allah. Imam Asy-Syafi\'i dan ulama madzhab Syafi\'i berpendapat basmalah adalah ayat pertama dari Al-Fatihah yang dibaca jahr (keras) dalam shalat jahr. Sementara Imam Malik dan madzhab Hanafi memandangnya sebagai ayat tersendiri untuk pemisah antar surah.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir (w. 774 H)',
            quoteOrExplanation: 'Memulai dengan basmalah adalah sunnah pada awal setiap urusan. Nama "Allah" adalah nama khas Yang Mahasuci yang tidak boleh disematkan kepada selain-Nya. Nama "Ar-Rahman" memiliki arti rahmat yang amat luas meliputi seluruh alam di dunia, sedangkan "Ar-Rahim" adalah rahmat yang dikhususkan bagi kaum mukminin di hari akhirat.',
          },
          {
            kitab: 'Tafsir Al-Jalalain',
            author: 'Jalaluddin Al-Mahalli & As-Suyuthi',
            quoteOrExplanation: 'Basmalah adalah ayat pembuka Al-Fatihah menurut qira\'ah kufiyyin dan makkiyyin. Ar-Rahman dan Ar-Rahim adalah dua sifat mubalaghah dari kata rahmah.',
          },
          {
            kitab: 'Tafsir Kemenag RI',
            author: 'Kementerian Agama Republik Indonesia',
            quoteOrExplanation: 'Memulai sesuatu dengan asma Allah menanamkan keikhlasan bahwa segala gerak dan usaha semata-mata karena pertolongan dan karunia Allah.',
          },
        ],
        tadabburPoints: [
          'Membiasakan lisan mengucap bismillah melatih jiwa agar selalu bergantung kepada Sang Pencipta dalam setiap hembusan nafas.',
          'Kombinasi Ar-Rahman dan Ar-Rahim menumbuhkan rasa harap (raja\') yang luas atas ampunan dan kasih sayang Ilahi.',
        ],
      },
      {
        verseNumber: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: 'Segala puji bagi Allah, Tuhan seluruh alam.',
        keywords: [
          { word: 'الْحَمْدُ', meaning: 'Pujian sempurna yang disertai rasa cinta dan pengagungan (Al-Isti\'ghraq/seluruh jenis pujian)' },
          { word: 'رَبِّ', meaning: 'Pencipta, Pemilik, Pengatur, Pendidik, dan Pemelihara' },
          { word: 'الْعَالَمِينَ', meaning: 'Seluruh makhluk selain Allah (alam manusia, jin, malaikat, tumbuhan, fauna, galaksi)' },
        ],
        tafsirSummary: 'Segala macam pujian hakikatnya berpulang kepada Allah atas kesempurnaan dzat, sifat, dan limpahan nikmat-Nya yang tak terhitung. Huruf "Al" pada Al-Hamdu menunjukkan isti\'ghraq (mencakup segala jenis pujian yang ada di langit dan bumi). Kata "Rabb" mencakup tiga dimensi: menciptakan (khalq), memiliki (mulk), dan mengatur (tadbir).',
        references: [
          {
            kitab: 'Tafsir Al-Muyassar',
            author: 'Nukhbah minal Ulama',
            quoteOrExplanation: 'Segala sanjungan dan pujian yang sempurna hanya milik Allah semata, bukan kepada sesembahan selain-Nya. Dialah Penguasa dan Pengatur seluruh alam semesta dengan rahmat dan hikmah-Nya.',
          },
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Al-Hamdu lebih umum daripada Asy-Syukr. Pujian ini diucapkan sebagai ungkapan syukur atas nikmat yang tampak maupun yang tersembunyi. Rabbul \'Alamin berarti Pencipta segala yang ada di alam raya.',
          },
        ],
        tadabburPoints: [
          'Menyadari bahwa pujian manusia yang sampai kepada kita sejatinya adalah pujian atas tirai kebaikan yang Allah bentangkan.',
          'Konsep "Rabbul \'Alamin" membebaskan manusia dari penyembahan kepada sesama makhluk menuju penghambaan kepada Rabb semesta alam.',
        ],
      },
      {
        verseNumber: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'Yang Maha Pengasih, Maha Penyayang.',
        keywords: [
          { word: 'الرَّحْمَٰنِ', meaning: 'Kasih sayang yang melimpah ruah di alam fana' },
          { word: 'الرَّحِيمِ', meaning: 'Kasih sayang abadi di alam baka bagi orang-orang beriman' },
        ],
        tafsirSummary: 'Penyebutan kembali sifat Ar-Rahman dan Ar-Rahim setelah "Rabbul \'Alamin" adalah sentuhan targhib (harapan). Meskipun Allah Mahakuasa atas seluruh alam raya, kekuasaan-Nya dibangun di atas asas kasih sayang, bukan tirani atau kezaliman.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Ketika Allah menyifati diri-Nya sebagai Rabbul \'Alamin yang bisa memunculkan rasa gentar akan keagungan-Nya, Allah langsung menyandingkannya dengan Ar-Rahmanir Rahim agar rasa harap (raja\') seimbang dengan rasa takut (khauf).',
          },
          {
            kitab: 'Tafsir Al-Jalalain',
            author: 'Al-Mahalli & As-Suyuthi',
            quoteOrExplanation: 'Dua sifat ini menegaskan bahwa rahmat Allah senantiasa mendahului murka-Nya sebagaimana tertera dalam hadits qudsi.',
          },
        ],
        tadabburPoints: [
          'Keseimbangan antara khauf (takut) dan raja\' (harap) adalah sayap burung bagi seorang mukmin dalam menempuh jalan menuju ridha Allah.',
        ],
      },
      {
        verseNumber: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Pemilik hari Pembalasan.',
        keywords: [
          { word: 'مَالِكِ / مَلِكِ', meaning: 'Dua qira\'ah mutawatirah: Pemilik mutlak (Maalik) dan Raja diraja (Malik)' },
          { word: 'يَوْمِ الدِّينِ', meaning: 'Hari kiamat, hari hisab dan pembalasan amal perbuatan' },
        ],
        tafsirSummary: 'Meskipun Allah adalah Pemilik dunia dan akhirat, hari pembalasan dikhususkan karena pada hari itu tidak ada satu pun makhluk yang dapat mengaku memiliki kerajaan atau kekuasaan sedikit pun. Seluruh raja dunia tertunduk hina di hadapan Sang Maha Raja.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Hari Ad-Din artinya hari hisab bagi seluruh makhluk. Pada hari itu Allah berfirman: "Limanil mulkul yaum? Lillāhil wāhidil qahhār" (Milik siapakah kerajaan pada hari ini? Milik Allah Yang Maha Esa lagi Maha Mengalahkan).',
          },
          {
            kitab: 'Tafsir Kemenag RI',
            author: 'Kemenag RI',
            quoteOrExplanation: 'Ayat ini mengingatkan manusia akan tanggung jawab moral atas setiap perbuatan di dunia, karena kelak akan ada pengadilan Ilahi yang seadil-adilnya.',
          },
        ],
        tadabburPoints: [
          'Mengingat hari pembalasan adalah rem terkuat pencegah maksiat dan pemicu semangat beramal saleh secara istiqamah.',
        ],
      },
      {
        verseNumber: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.',
        keywords: [
          { word: 'إِيَّاكَ', meaning: 'Bentuk takhshish (pengkhususan): Hanya kepada-Mu semata, tidak kepada selain-Mu' },
          { word: 'نَعْبُدُ', meaning: 'Kami tunduk, taat, dan beribadah secara total' },
          { word: 'نَسْتَعِينُ', meaning: 'Kami memohon ma\'unah (bantuan dan perlindungan)' },
        ],
        tafsirSummary: 'Peralihan gaya bahasa (iltifat) dari orang ketiga (Ghaib: Dia Allah) menjadi orang kedua (Mukhathab: Engkau). Ini adalah inti Al-Qur\'an: Tauhid Ibadah (Uluhiyah) dan Tauhid Isti\'anah. Mendahulukan kata "Iyyaka" (objek) di depan kata kerja berfungsi sebagai hashr (pengkhususan/eksklusif), yaitu penafian syirik.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Ayat ini adalah rahasia dan poros Al-Fatihah. Didahulukannya ibadah sebelum permohonan tolong karena ibadah adalah hak Allah atas hamba-Nya, sedangkan pertolongan adalah hajat hamba kepada Allah. Seseorang tidak akan mampu beribadah tanpa pertolongan-Nya.',
          },
          {
            kitab: 'Madarijus Salikin',
            author: 'Ibnu Qayyim Al-Jauziyyah',
            quoteOrExplanation: '"Iyyaka na\'budu" menolak sifat riya\' (pamer), sedangkan "Iyyaka nasta\'in" menolak sifat kibriya\' (sombong dan ujub).',
          },
        ],
        tadabburPoints: [
          'Bebas dari riya dengan murni beribadah kepada Allah; bebas dari takabur dengan menyadari bahwa tanpa izin Allah, kita tak berdaya melangkah.',
          'Bentuk jamak "kami" (bukan "aku") mengajarkan persaudaraan dan solidaritas kaum mukminin dalam shalat berjamaah.',
        ],
      },
      {
        verseNumber: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Tunjukilah kami jalan yang lurus,',
        keywords: [
          { word: 'اهْدِنَا', meaning: 'Berilah kami bimbingan, petunjuk, dan ketetapan (hidayah taufiq & irsyad)' },
          { word: 'الصِّرَاطَ', meaning: 'Jalan yang lebar, terang, dan lurus tanpa kelokan' },
          { word: 'الْمُسْتَقِيمَ', meaning: 'Lurus, tidak menyimpang ke kanan maupun ke kiri' },
        ],
        tafsirSummary: 'Permohonan doa teragung. Mengapa orang beriman yang sudah shalat masih meminta hidayah? Jawabannya: Hidayah di sini bermakna ats-tsabat (keteguhan di atas kebenaran) dan ziyadatul huda (tambahan petunjuk pada setiap detail urusan hidup yang belum diketahui).',
        references: [
          {
            kitab: 'Tafsir Al-Muyassar',
            author: 'Nukhbah minal Ulama',
            quoteOrExplanation: 'Tunjukilah dan bimbinglah kami ke jalan yang lurus, yaitu agama Islam yang terang benderang yang dibawa oleh Rasulullah ﷺ, dan teguhkanlah kami di atasnya hingga kami berjumpa dengan-Mu.',
          },
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Hamba membutuhkan hidayah setiap detik siang dan malam. Permohonan ini adalah doa agar senantiasa istiqamah di atas manhaj yang benar.',
          },
        ],
        tadabburPoints: [
          'Hidayah bukan tujuan sekali sampai, melainkan perjalanan seumur hidup yang membutuhkan doa istiqamah di setiap rakaat.',
        ],
      },
      {
        verseNumber: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
        keywords: [
          { word: 'أَنْعَمْتَ عَلَيْهِمْ', meaning: 'Para Nabi, shiddiqin, syuhada, dan shalihin (sebagaimana dirinci dalam QS. An-Nisa: 69)' },
          { word: 'الْمَغْضُوبِ عَلَيْهِمْ', meaning: 'Mereka yang mengetahui kebenaran namun enggan mengamalkannya (contoh: Yahudi)' },
          { word: 'الضَّالِّينَ', meaning: 'Mereka yang beramal tanpa ilmu sehingga tersesat dari kebenaran (contoh: Nasrani)' },
        ],
        tafsirSummary: 'Penjelasan rinci jalan yang lurus. Manusia terbagi menjadi tiga golongan: 1) Ahlun Ni\'mah (memiliki ilmu dan mengamalkannya), 2) Al-Maghdhub \'alaihim (berilmu tapi ingkar dan menolak amal), 3) Adh-Dhallin (bersemangat beribadah tapi tanpa ilmu pengetahuan yang benar). Disunnahkan mengucapkan "Aamiin" (Ya Allah kabulkanlah) setelah membaca ayat ini.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Diriwayatkan dari Adi bin Hatim r.a., Rasulullah ﷺ bersabda: "Al-Maghdhub \'alaihim adalah kaum Yahudi dan Adh-Dhallin adalah kaum Nasrani." (HR. Tirmidzi & Ahmad, hadits hasan sahih). Namun hukum ini mencakup siapa saja dari umat ini yang meniru perilaku kedua kaum tersebut: berilmu tanpa amal, atau beramal tanpa ilmu.',
          },
          {
            kitab: 'Tafsir Al-Jalalain',
            author: 'Al-Mahalli & As-Suyuthi',
            quoteOrExplanation: 'Jalan orang-orang yang diberi nikmat adalah jalan petunjuk. Disunnahkan diam sejenak lalu mengucap Aamiin bagi imam, makmum, maupun yang shalat sendirian.',
          },
        ],
        tadabburPoints: [
          'Ilmu tanpa amal melahirkan kemurkaan; amal tanpa ilmu melahirkan kesesatan. Keselamatan hanya ada pada perpaduan ilmu yang shahih dan amal yang saleh.',
          'Meneladani generasi terbaik umat (salafus shalih) yang telah terbukti mendapatkan kenikmatan iman dan istiqamah.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Mengapa Surah Al-Fatihah dinamai dengan "As-Sab\'ul Matsani" (Tujuh yang Berulang)?',
        options: [
          'Karena memiliki tujuh hukum waris yang diulang dalam surah lain',
          'Karena terdiri atas tujuh ayat dan senantiasa dibaca berulang-ulang di setiap rakaat shalat',
          'Karena diturunkan sebanyak tujuh kali di tujuh kota berbeda',
          'Karena mengandung tujuh perumpamaan para nabi',
        ],
        correctIndex: 1,
        explanation: 'Disebut As-Sab\'ul Matsani karena terdiri dari 7 ayat yang selalu diulang-ulang dibaca oleh kaum muslimin dalam setiap rakaat shalat fardhu maupun sunnah.',
        referenceSource: 'Tafsir Ibnu Katsir & QS. Al-Hijr: 87',
      },
      {
        id: 'q2-2',
        question: 'Menurut kaidah bahasa Arab balaghah, apa fungsi didahulukannya objek "إِيَّاكَ" (Hanya kepada-Mu) sebelum kata kerja "نَعْبُدُ" (kami menyembah)?',
        options: [
          'Sebagai pelengkap sajak akhir ayat semata',
          'Sebagai penegas hashr (pengkhususan) agar ibadah murni ditujukan hanya kepada Allah',
          'Sebagai tanda keraguan pelaku ibadah',
          'Sebagai bentuk pengalihan kalimat tanya menjadi kalimat perintah',
        ],
        correctIndex: 1,
        explanation: 'Taqdim ma haqquhut ta\'khir (mendahulukan yang posisinya di belakang) dalam kaidah balaghah berfungsi untuk al-hashr wal ikhtishash (pengkhususan mutlak), menegasikan sekutu bagi Allah.',
        referenceSource: 'Kaidah Balaghah & Tafsir Al-Kasysyaf',
      },
      {
        id: 'q2-3',
        question: 'Dalam hadits qudsi riwayat Imam Muslim mengenai Surah Al-Fatihah, apakah respon Allah ketika hamba membaca "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"?',
        options: [
          '"Majja-dani \'abdi" (Hamba-Ku telah mengagungkan-Ku)',
          '"Hamidani \'abdi" (Hamba-Ku telah memuji-Ku)',
          '"Fawwadha ilayya \'abdi" (Hamba-Ku telah berserah diri kepada-Ku)',
          '"Hadza li \'abdi wa li \'abdi ma sa\'ala"',
        ],
        correctIndex: 1,
        explanation: 'Dalam Hadits Qudsi: "Qasamtu ash-shalata baini wa baina \'abdi nishfain... Fa idza qala: Alhamdu lillahi rabbil \'alamin, qala Allahu Ta\'ala: Hamidani \'abdi (Hamba-Ku telah memuji-Ku)."',
        referenceSource: 'Shahih Muslim No. 395',
      },
      {
        id: 'q2-4',
        question: 'Siapakah golongan manusia yang dimaksud dengan "الْمَغْضُوبِ عَلَيْهِمْ" (mereka yang dimurkai) menurut penjelasan hadits riwayat Adi bin Hatim r.a.?',
        options: [
          'Orang-orang yang beribadah sungguh-sungguh tanpa dasar ilmu',
          'Orang-orang yang telah mengetahui kebenaran namun sengaja mengingkari dan enggan mengamalkannya',
          'Kaum musyrikin Quraisy yang buta huruf',
          'Orang yang ragu-ragu dalam bersedekah',
        ],
        correctIndex: 1,
        explanation: 'Al-Maghdhub \'alaihim adalah mereka yang mengetahui ilmu kebenaran namun tidak mau mengamalkannya karena kesombongan atau hawa nafsu (dicontohkan pada kaum Yahudi).',
        referenceSource: 'Hadits Riwayat Tirmidzi & Tafsir Ibnu Katsir',
      },
      {
        id: 'q2-5',
        question: 'Siapakah empat golongan yang dimaksud dengan "الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ" (orang yang Engkau beri nikmat) sebagaimana dijelaskan dalam QS. An-Nisa ayat 69?',
        options: [
          'Para Raja, Bangsawan, Ahli Astronomi, dan Saudagar kaya',
          'Para Nabi, Shiddiqin (orang yang jujur pembenarannya), Syuhada, dan Shalihin',
          'Kaum Muhajirin, Anshar, Aus, dan Khazraj saja',
          'Para Malaikat Muqarrabin dan penghuni surga firdaus semata',
        ],
        correctIndex: 1,
        explanation: 'Al-Qur\'an menafsirkan Al-Qur\'an: Dalam QS. An-Nisa: 69 dijelaskan bahwa orang-orang yang diberi nikmat oleh Allah adalah para Nabi, Shiddiqin, Syuhada, dan Shalihin.',
        referenceSource: 'QS. An-Nisa: 69 & Kaidah Tafsir Al-Qur\'an bil Qur\'an',
      },
    ],
  },
  {
    id: 'modul-3-al-ikhlas',
    number: 3,
    title: 'Tafsir Surah Al-Ikhlas (Kemurnian Tauhid)',
    shortDescription: 'Tafsir mendalam 4 ayat tauhid murni, makna agung Ash-Shamad, asbabun nuzul sahih, dan fadhilah sepertiga Al-Qur\'an.',
    badge: 'Tafsir Surah',
    category: 'tafsir_surah',
    surahIntro: {
      name: 'Al-Ikhlas',
      arabicName: 'الإِخْلَاص',
      surahNumber: 112,
      totalVerses: 4,
      classification: 'Makkiyyah',
      otherNames: ['At-Tafrid', 'At-Tajrid', 'At-Tauhid', 'An-Najah', 'Al-Wilayah', 'Al-Asas'],
      theme: 'Pembersihan akidah secara mutlak dari segala bentuk syirik, penafian anak, orang tua, dan sekutu yang setara dengan Allah SWT.',
      asbabunNuzulUmum: 'Diriwayatkan dari Ubay bin Ka\'ab r.a. bahwa kaum musyrikin berkata kepada Nabi Muhammad ﷺ: "Wahai Muhammad, sebutkan kepada kami nasab (garis keturunan/silsilah) Tuhanmu!" Maka Allah menurunkan surah ini: Qul huwallahu ahad, Allahush-shamad... (HR. Ahmad, Tirmidzi, dan Hakim, hadits sahih).',
      virtues: [
        'Bernilai sebanding dengan sepertiga Al-Qur\'an (Tsu-lu-tsul Qur\'an) karena Al-Qur\'an mencakup tiga pilar besar: Akidah Tauhid, Hukum Syariat, dan Kisah-Kisah Umat Terdahulu (HR. Bukhari No. 5013).',
        'Mencintai surah ini menjadi sebab masuk ke dalam surga, sebagaimana sabda Nabi kepada sahabat Anshar: "Hubbuka iyyāhā adkhalakal jannah" (HR. Bukhari).',
        'Disunnahkan dibaca bersama Al-Mu\'awwidzatain setiap pagi, petang, menjelang tidur, dan setelah shalat fardhu.',
      ],
    },
    verses: [
      {
        verseNumber: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        translation: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
        keywords: [
          { word: 'قُلْ', meaning: 'Katakanlah (perintah tegas dari Allah kepada Rasul-Nya dan umatnya)' },
          { word: 'هُوَ', meaning: 'Dhamir sya\'n: Dialah Dzat yang kalian tanyakan hakikat-Nya' },
          { word: 'اللَّهُ', meaning: 'Dzat Yang Mahasempurna, tiada tandingan bagi-Nya' },
          { word: 'أَحَدٌ', meaning: 'Maha Tunggal, Esa dalam Dzat, Sifat, dan Perbuatan-Nya (tidak tersusun dari bagian-bagian)' },
        ],
        tafsirSummary: 'Perintah bagi Nabi ﷺ dan setiap mukmin untuk menegaskan akidah tauhid. Kata "Ahad" lebih mendalam daripada kata "Wahid". Jika "Wahid" bisa memiliki kelanjutan hitungan (dua, tiga), maka "Ahad" menafikan secara mutlak adanya bilangan kedua atau pecahan dalam Dzat Allah.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Artinya: Dialah Yang Tunggal, tiada sekutu, tiada tandingan, tiada wakil, tiada yang menyerupai-Nya. Sifat ini tidak boleh disematkan kepada siapa pun selain Allah Ta\'ala karena kesempurnaan mutlak hanya milik-Nya.',
          },
          {
            kitab: 'Tafsir Al-Jalalain',
            author: 'Al-Mahalli & As-Suyuthi',
            quoteOrExplanation: 'Kata "Huwa" adalah dhamir sya\'n. "Ahad" adalah khabar kedua yang menegaskan keesaan Allah yang tidak terbagi.',
          },
        ],
        tadabburPoints: [
          'Tauhid adalah asas tegaknya alam semesta dan keselamatan abadi seorang hamba.',
          'Menolak segala paham politeisme, dualisme ketuhanan, maupun trinitas.',
        ],
      },
      {
        verseNumber: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        translation: 'Allah tempat meminta segala sesuatu.',
        keywords: [
          { word: 'الصَّمَدُ', meaning: 'As-Sayyid (Pemimpin Tertinggi) yang dituju segala makhluk untuk hajat kebutuhan mereka; Dzat yang Maha Sempurna kekuasaan-Nya' },
        ],
        tafsirSummary: 'Lafal "Ash-Shamad" adalah nama agung yang sarat makna mendalam menurut ulama salaf. Ibnu Abbas r.a. menafsirkan: "Ash-Shamad adalah Penguasa yang telah mencapai puncak kekuasaan-Nya, Mahamulia yang sempurna dalam kemuliaan-Nya, Maha Mengetahui yang sempurna dalam ilmu-Nya." Ulama lain menafsirkan: Dzat yang tidak berongga, tidak makan dan tidak minum.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Ali bin Abi Thalhah meriwayatkan dari Ibnu Abbas: "Ash-Shamad adalah Pemimpin yang sempurna kepemimpinannya, Yang Mahabesar yang sempurna kebesarannya, Yang Mahasantun yang sempurna kesantunannya. Sifat ini hanya layak bagi Allah Azza wa Jalla." Mujahid dan Al-Hasan Al-Bashri berkata: "Dzat yang tetap kekal abadi setelah musnahnya seluruh makhluk."',
          },
          {
            kitab: 'Tafsir Al-Muyassar',
            author: 'Nukhbah minal Ulama',
            quoteOrExplanation: 'Allah adalah Dzat yang seluruh makhluk bergantung dan bersandar kepada-Nya dalam segala kebutuhan dan permohonan mereka, karena kekayaan dan kemandirian-Nya yang mutlak.',
          },
        ],
        tadabburPoints: [
          'Jika Allah adalah Ash-Shamad tempat bergantung seluruh semesta, alangkah meruginya hati yang menggantungkan harapannya kepada makhluk yang fana.',
          'Memohon hanya kepada Ash-Shamad melahirkan ketenangan batin dari rasa cemas masa depan.',
        ],
      },
      {
        verseNumber: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translation: 'Dia tidak beranak dan tidak pula diperanakkan,',
        keywords: [
          { word: 'لَمْ يَلِدْ', meaning: 'Tidak melahirkan atau memiliki keturunan/anak' },
          { word: 'لَمْ يُولَدْ', meaning: 'Tidak dilahirkan dari orang tua, ibu, atau perantara mana pun' },
        ],
        tafsirSummary: 'Penafian tegas bahwa Allah memiliki anak atau lahir dari orang tua. Anak biasanya serupa dengan orang tuanya, sedangkan Allah tidak ada sesuatu pun yang serupa dengan-Nya. Ayat ini membantah kaum musyrikin Arab yang mengklaim malaikat adalah anak perempuan Allah, kaum Nasrani yang mengklaim Isa anak Allah, dan kaum Yahudi yang mengklaim Uzair anak Allah.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Allah tidak membutuhkan anak karena Dia tidak membutuhkan pelanjut atau pembantu. Allah juga tidak dilahirkan karena Dia adalah Al-Awwal (Yang Awal tanpa permulaan) dan Al-Akhir (Yang Akhir tanpa kesudahan). Segala sesuatu diciptakan oleh-Nya.',
          },
          {
            kitab: 'Tafsir Kemenag RI',
            author: 'Kemenag RI',
            quoteOrExplanation: 'Melahirkan dan dilahirkan adalah sifat makhluk biologis yang fana dan memiliki keterbatasan. Menyematkan anak kepada Allah adalah bentuk penghinaan besar terhadap kesucian Dzat-Nya.',
          },
        ],
        tadabburPoints: [
          'Menjaga kemurnian akidah dari penyimpangan teologis dan antropomorfisme yang merendahkan keagungan Tuhan.',
        ],
      },
      {
        verseNumber: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translation: 'dan tidak ada sesuatu pun yang setara dengan Dia.',
        keywords: [
          { word: 'كُفُوًا', meaning: 'Sekufu: sepadan, setara, serupa, atau sebanding' },
          { word: 'أَحَدٌ', meaning: 'Siapa pun atau apa pun di alam wujud' },
        ],
        tafsirSummary: 'Puncak penegasan tanzih (penyucian Allah). Tidak ada satu pun makhluk yang setara dengan-Nya dalam dzat, nama, sifat, maupun perbuatan. Ayat ini senada dengan firman-Nya dalam QS. Asy-Syura: 11: "Laisa kamitslihi syai-un wa huwas-sami\'ul bashir" (Tidak ada sesuatu pun yang serupa dengan Dia, dan Dialah Yang Maha Mendengar lagi Maha Melihat).',
        references: [
          {
            kitab: 'Tafsir Al-Muyassar',
            author: 'Nukhbah minal Ulama',
            quoteOrExplanation: 'Tidak ada seorang pun atau sesuatu pun dari makhluk-Nya yang sebanding atau serupa dengan-Nya dalam keagungan dan kesempurnaan-Nya.',
          },
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Artinya tidak ada tandingan, keserupaan, atau kesejajaran bagi Allah. Dialah Rabb dan Penguasa segalanya.',
          },
        ],
        tadabburPoints: [
          'Memahami ketiadaan sekufu melenyapkan rasa putus asa, karena Tuhan yang kita sembah adalah Tuhan yang Mahakuasa tanpa batas.',
          'Pondasi ketundukan total: hanya Dzat yang tiada tandingan yang berhak ditaati secara mutlak dalam kehidupan.',
        ],
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Apakah latar belakang sebab turunnya (asbabun nuzul) Surah Al-Ikhlas menurut hadits sahih riwayat Ubay bin Ka\'ab r.a.?',
        options: [
          'Permintaan kaum musyrikin agar Nabi ﷺ menyebutkan silsilah (nasab) Tuhannya',
          'Perdebatan seputar arah kiblat shalat',
          'Pertanyaan para sahabat tentang tata cara zakat',
          'Tuduhan kaum munafik tentang perang Badar',
        ],
        correctIndex: 0,
        explanation: 'Kaum musyrikin menantang Nabi ﷺ: "Sebutkan nasab Tuhanmu kepada kami!" Maka Allah menurunkan Surah Al-Ikhlas untuk membantah anggapan bahwa Allah memiliki silsilah keturunan.',
        referenceSource: 'HR. Ahmad & Tirmidzi; Tafsir Ibnu Katsir',
      },
      {
        id: 'q3-2',
        question: 'Menurut penafsiran sahabat agung Ibnu Abbas r.a., apakah makna kata "الصَّمَدُ" (Ash-Shamad)?',
        options: [
          'Dzat yang menciptakan siang dan malam secara bergiliran',
          'Pemimpin yang Maha Sempurna dalam kepemimpinan, kemuliaan, dan keagungan-Nya, yang dituju seluruh makhluk',
          'Cahaya yang menerangi langit dan bumi',
          'Pemilik perbendaharaan emas dan perak',
        ],
        correctIndex: 1,
        explanation: 'Ibnu Abbas r.a. menjelaskan Ash-Shamad adalah As-Sayyid alladzi qad kamula fi su\'dudih (Penguasa/Pemimpin yang telah sempurna kemuliaan dan keagungan-Nya, tempat bersandar seluruh makhluk).',
        referenceSource: 'Tafsir At-Thabari & Tafsir Ibnu Katsir',
      },
      {
        id: 'q3-3',
        question: 'Mengapa Rasulullah ﷺ menyebut Surah Al-Ikhlas sebanding dengan sepertiga Al-Qur\'an (Tsu-lu-tsul Qur\'an)?',
        options: [
          'Karena jumlah hurufnya tepat sepertiga dari seluruh huruf Al-Qur\'an',
          'Karena Al-Qur\'an berintikan 3 pilar: Akidah/Tauhid, Hukum Syariat, dan Kisah; dan surah ini memurnikan pilar Akidah Tauhid',
          'Karena surah ini harus dibaca sepertiga malam saja',
          'Karena pahalanya hanya diberikan kepada sepertiga umat Islam',
        ],
        correctIndex: 1,
        explanation: 'Kandungan Al-Qur\'an terbagi atas tiga pokok: Tauhid, Ahkam (hukum), dan Akhbar (kisah). Surah Al-Ikhlas memuat tauhid secara murni tanpa campuran hukum dan kisah.',
        referenceSource: 'Syarah Shahih Muslim Imam An-Nawawi & Fathul Bari',
      },
      {
        id: 'q3-4',
        question: 'Apakah perbedaan mendasar antara kata "Ahad" (أَحَدٌ) dan kata "Wahid" (وَاحِدٌ) dalam penegasan sifat Allah?',
        options: [
          '"Ahad" hanya untuk manusia, "Wahid" untuk malaikat',
          '"Ahad" menafikan secara mutlak adanya bilangan kedua atau bagian, sedangkan "Wahid" masih memungkinkan kelanjutan hitungan',
          '"Ahad" bermakna hari Ahad, "Wahid" bermakna hari Senin',
          'Keduanya tidak memiliki perbedaan makna sedikit pun',
        ],
        correctIndex: 1,
        explanation: 'Kata "Ahad" adalah sifat mutlak yang menafikan keberadaan sekutu atau pecahan sama sekali. Oleh karena itu tidak dikatakan "Allah Wahid" dalam ayat ini, melainkan "Allahu Ahad".',
        referenceSource: 'Kaidah Lughawiyyah & Mufradat Alfazhil Qur\'an Al-Isfahani',
      },
      {
        id: 'q3-5',
        question: 'Ayat "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" memiliki makna yang sejalan dengan ayat tanzih (penyucian) Allah dalam QS. Asy-Syura ayat 11, yaitu...',
        options: [
          'لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ',
          'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
          'وَتَوَكَّلْ عَلَى الْعَزِيزِ الرَّحِيمِ',
          'فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ',
        ],
        correctIndex: 0,
        explanation: 'Kedua ayat tersebut merupakan fondasi penafian keserupaan Allah dengan makhluk (tanzih): tidak ada sesuatu pun yang setara atau serupa dengan-Nya.',
        referenceSource: 'QS. Asy-Syura: 11 & Tafsir Al-Muyassar',
      },
    ],
  },
  {
    id: 'modul-4-al-falaq-annas',
    number: 4,
    title: 'Tafsir Al-Mu\'awwidzatain (Surah Al-Falaq & An-Nas)',
    shortDescription: 'Tafsir dua surah perlindungan dari kejahatan makhluk, sihir, hasad, dan bisikan was-was setan serta jin.',
    badge: 'Tafsir Surah Tambahan',
    category: 'tafsir_surah',
    surahIntro: {
      name: 'Al-Mu\'awwidzatain (Al-Falaq & An-Nas)',
      arabicName: 'المُعَوِّذَتَيْن (الفَلَق والنَّاس)',
      surahNumber: 113,
      totalVerses: 11,
      classification: 'Makkiyyah',
      otherNames: ['Al-Musyaqsyiqatain', 'Surah Perlindungan'],
      theme: 'Pendidikan tawakkal dan memohon perlindungan (isti\'adzah) kepada Allah dari segala marabahaya tampak, tak tampak, sihir, dengki, dan bisikan jahat.',
      asbabunNuzulUmum: 'Diriwayatkan dari Aisyah r.a. dan Zaid bin Arqam r.a. bahwa Rasulullah ﷺ pernah disihir oleh Labid bin Al-A\'sham (seorang Yahudi) melalui simpul-simpul tali. Maka Malaikat Jibril membimbing beliau membaca Al-Mu\'awwidzatain, dan setiap satu ayat dibaca terbukalah satu simpul hingga beliau sembuh bugar (HR. Bukhari & Muslim).',
      virtues: [
        'Tidak ada doa perlindungan yang menyamai keutamaan kedua surah ini sebagaimana sabda Nabi ﷺ kepada Uqbah bin Amir: "Lam yuta\'awwadz bimitslihima" (HR. Muslim No. 814).',
        'Benteng harian mukmin dari ' + "'ain (pandangan dengki) dan kejahatan syaitan.",
      ],
    },
    verses: [
      {
        verseNumber: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        translation: 'Katakanlah, "Aku berlindung kepada Tuhan yang menguasai subuh (fajar),',
        keywords: [
          { word: 'أَعُوذُ', meaning: 'Aku berlindung, berpegang teguh, dan bersandar' },
          { word: 'الْفَلَقِ', meaning: 'Waktu subuh/fajar yang membelah kegelapan malam, atau seluruh ciptaan yang terbelah (biji tumbuh, air memancar)' },
        ],
        tafsirSummary: 'Memohon perlindungan kepada Rabb yang Mahakuasa menerbitkan cahaya fajar setelah pekatnya malam gulita. Hal ini memberikan optimisme bahwa Allah Maha Mampu menyingkap segala marabahaya dan kesulitan hidup hamba-Nya.',
        references: [
          {
            kitab: 'Tafsir Ibnu Katsir',
            author: 'Imam Ibnu Katsir',
            quoteOrExplanation: 'Al-Falaq adalah waktu subuh menurut mayoritas mufassir. Allah mengkhususkan Rabbul Falaq karena terbitnya fajar adalah bukti kekuasaan Allah mengubah kegelapan menjadi terang benderang.',
          },
        ],
        tadabburPoints: ['Harapan selalu ada; sebagaimana fajar senantiasa mengusir pekatnya malam, pertolongan Allah pasti menyinari kegelapan ujian hidup.'],
      },
      {
        verseNumber: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        translation: 'dari kejahatan (makhluk yang) Dia ciptakan,',
        keywords: [{ word: 'مَا خَلَقَ', meaning: 'Segala makhluk ciptaan Allah yang berpotensi menimbulkan bahaya (jin, manusia, racun, hewan berbisa)' }],
        tafsirSummary: 'Perlindungan universal dari segala mara bahaya makhluk di semesta alam.',
        references: [{ kitab: 'Tafsir Al-Muyassar', author: 'Nukhbah minal Ulama', quoteOrExplanation: 'Dari keburukan seluruh makhluk ciptaan-Nya yang membahayakan lahir maupun batin.' }],
        tadabburPoints: ['Makhluk tidak memiliki kuasa mendatangkan bahaya secara mandiri kecuali dengan takdir Allah; maka berlindunglah kepada Sang Pencipta makhluk.'],
      },
      {
        verseNumber: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        translation: 'dan dari kejahatan malam apabila telah gelap gulita,',
        keywords: [
          { word: 'غَاسِقٍ', meaning: 'Malam hari ketika kegelapan telah pekat' },
          { word: 'وَقَبَ', meaning: 'Telah masuk dan menyelimuti segalanya' },
        ],
        tafsirSummary: 'Malam hari dikhususkan karena pada saat malam yang sunyi dan gelap, banyak binatang buas, makhluk halus, dan penjahat melancarkan niat buruk mereka.',
        references: [{ kitab: 'Tafsir Ibnu Katsir', author: 'Imam Ibnu Katsir', quoteOrExplanation: 'Ghasikin idza waqab artinya malam hari ketika kegelapannya telah menyelimuti alam semesta.' }],
        tadabburPoints: ['Pentingnya dzikir petang dan membaca doa sebelum tidur sebagai tameng Ilahi saat manusia terlelap dalam kelalaian tidur.'],
      },
      {
        verseNumber: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        translation: 'dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),',
        keywords: [
          { word: 'النَّفَّاثَاتِ', meaning: 'Jiwa-jiwa penyihir yang meniupkan mantera bercampur ludah' },
          { word: 'الْعُقَدِ', meaning: 'Simpul-simpul ikatan tali yang dijadikan media sihir' },
        ],
        tafsirSummary: 'Berlindung dari tipu daya sihir. Meniup pada ikatan tali adalah kebiasaan tukang sihir untuk mengikat mantra jahat.',
        references: [{ kitab: 'Tafsir Al-Jalalain', author: 'Al-Mahalli & As-Suyuthi', quoteOrExplanation: 'An-Naffatsat adalah jiwa para penyihir wanita atau lelaki yang meniup pada tali-tali yang disimpul saat melantunkan mantra kutukan.' }],
        tadabburPoints: ['Sihir adalah hakikat yang berbahaya dan kufur, namun pengaruhnya dapat dihancurkan dengan ruqyah syar\'iyyah Al-Qur\'an.'],
      },
      {
        verseNumber: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'dan dari kejahatan orang yang dengki apabila dia dengki.',
        keywords: [
          { word: 'حَاسِدٍ', meaning: 'Orang yang menginginkan hilangnya nikmat dari saudaranya' },
          { word: 'إِذَا حَسَدَ', meaning: 'Ketika kedengkian itu ia wujudkan dalam pandangan ' + "'ain, perkataan, atau tindakan nyata" },
        ],
        tafsirSummary: 'Hasad (dengki) adalah dosa pertama yang dilakukan Iblis kepada Nabi Adam dan Qabil kepada Habil. Penyakit hasad merusak amal saleh dan mendorong orang berbuat jahat kepada yang didengki.',
        references: [{ kitab: 'Tafsir Ibnu Katsir', author: 'Imam Ibnu Katsir', quoteOrExplanation: 'Hasad adalah mengharap hilangnya nikmat dari orang lain. Seseorang yang dengki memiliki pancaran jiwa buruk yang dapat membahayakan melalui pandangan mata (al-\'ain).' }],
        tadabburPoints: ['Pembersihan hati: Bersyukurlah atas rezeki orang lain dan jangan biarkan racun hasad bersarang di dalam dada.'],
      },
      {
        verseNumber: 6,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        translation: 'Katakanlah, "Aku berlindung kepada Tuhannya manusia,',
        keywords: [{ word: 'بِرَبِّ النَّاسِ', meaning: 'Pencipta, Pemelihara, dan Pendidik umat manusia' }],
        tafsirSummary: 'Memulai Surah An-Nas dengan menyebut manusia secara khusus untuk memuliakan keturunan Adam dan mengingatkan bahwa manusia adalah sasaran utama godaan setan.',
        references: [{ kitab: 'Tafsir Al-Muyassar', author: 'Nukhbah minal Ulama', quoteOrExplanation: 'Tiga sifat agung dalam Surah An-Nas: Rububiyyah (Rabb manusia), Mulk (Raja manusia), dan Uluhiyyah (Sembahan manusia).' }],
        tadabburPoints: ['Manusia lemah dan rentan tergelincir, maka wajib selalu berlindung kepada Rabb-nya.'],
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Dua surah yang dikenal dengan julukan "Al-Mu\'awwidzatain" (Dua Surah Perlindungan) adalah...',
        options: [
          'Al-Baqarah dan Ali Imran',
          'Al-Falaq dan An-Nas',
          'Al-Ikhlas dan Al-Kautsar',
          'Ad-Dhuha dan Al-Insyirah',
        ],
        correctIndex: 1,
        explanation: 'Al-Mu\'awwidzatain adalah sebutan masyhur untuk Surah Al-Falaq dan Surah An-Nas.',
        referenceSource: 'Kutubus Sittah & Tafsir Ibnu Katsir',
      },
      {
        id: 'q4-2',
        question: 'Apakah yang dimaksud dengan perbuatan "Hasad" yang dimintakan perlindungan darinya dalam surah Al-Falaq?',
        options: [
          'Rasa ingin meniru kebaikan orang lain tanpa membencinya (Ghibthah)',
          'Rasa dengki yang mengharapkan agar kenikmatan orang lain lenyap',
          'Sifat pelit dalam membelanjakan harta',
          'Rasa takut terhadap kemiskinan',
        ],
        correctIndex: 1,
        explanation: 'Hasad secara syar\'i adalah tamanni zawalin ni\'mah \'anil ghair (berharap hilangnya kenikmatan dari saudaranya).',
        referenceSource: 'Ihya Ulumiddin & Tafsir Ibnu Katsir',
      },
    ],
  },
];

export const FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'Kaidah Tafsir',
    term: 'Tafsir',
    arabicTerm: 'تَفْسِير',
    shortDefinition: 'Menjelaskan makna dan menyingkap maksud ayat Al-Qur\'an.',
    detailedExplanation: 'Berasal dari kata "fassara - yufassiru" yang berarti menyingkap dan menampakkan makna. Ilmu untuk memahami Al-Qur\'an, menjelaskan makna-maknanya, dan mengeluarkan hukum serta hikmahnya.',
    exampleOrReference: 'QS. Al-Furqan: 33; Al-Burhan fi Ulumil Qur\'an.',
  },
  {
    id: 'fc-2',
    category: 'Kaidah Tafsir',
    term: 'Ta\'wil',
    arabicTerm: 'تَأْوِيل',
    shortDefinition: 'Memalingkan lafal dari makna zhahir ke makna lain dengan qarinah.',
    detailedExplanation: 'Secara etimologi berarti kembali (ar-ruju\'). Menurut ulama muta\'akhirin, ta\'wil adalah memalingkan lafal dari makna yang kuat (zhahir) kepada makna yang marjuh karena adanya dalil/indikator pendukung yang sah.',
    exampleOrReference: 'Doa Nabi untuk Ibnu Abbas: "Allahumma faqqihhu fid-din wa \'allimhut-ta\'wil".',
  },
  {
    id: 'fc-3',
    category: 'Metode & Corak',
    term: 'Metode Tahlili',
    arabicTerm: 'المَنْهَج التَّحْلِيلِي',
    shortDefinition: 'Metode analitis runtut per ayat sesuai urutan mushaf.',
    detailedExplanation: 'Mufassir mengupas ayat demi ayat secara analitis dari aspek kosakata, asbabun nuzul, munasabah, gramatikal bahasa (i\'rab), dan hukum fikih secara menyeluruh.',
    exampleOrReference: 'Tafsir Ibnu Katsir, Tafsir Al-Qurthubi, Tafsir Al-Baidhawi.',
  },
  {
    id: 'fc-4',
    category: 'Metode & Corak',
    term: 'Metode Ijmali',
    arabicTerm: 'المَنْهَج الإِجْمَالِي',
    shortDefinition: 'Metode penafsiran global, ringkas, dan mudah dipahami.',
    detailedExplanation: 'Menjelaskan makna Al-Qur\'an secara ringkas dan lugas tanpa perdebatan panjang, sangat cocok untuk pemula dan pembaca umum.',
    exampleOrReference: 'Tafsir Al-Jalalain karya Imam Al-Mahalli & As-Suyuthi, Tafsir Al-Muyassar.',
  },
  {
    id: 'fc-5',
    category: 'Metode & Corak',
    term: 'Metode Maudhu\'i',
    arabicTerm: 'المَنْهَج المَوْضُوعِي',
    shortDefinition: 'Metode tematik yang mengumpulkan ayat se-topik.',
    detailedExplanation: 'Mufassir menghimpun seluruh ayat yang membicarakan suatu judul atau tema tertentu dari berbagai surah, lalu menyusun pandangan Al-Qur\'an yang komprehensif.',
    exampleOrReference: 'Kitab-kitab tafsir tematik kontemporer (misal: Konsep Riba dalam Al-Qur\'an).',
  },
  {
    id: 'fc-6',
    category: 'Metode & Corak',
    term: 'Tafsir bil Ma\'tsur',
    arabicTerm: 'التَّفْسِير بِالمَأْثُور',
    shortDefinition: 'Tafsir berdasarkan riwayat Al-Qur\'an, Sunnah, dan atsar sahabat.',
    detailedExplanation: 'Menafsirkan Al-Qur\'an dengan Al-Qur\'an, dengan hadits Rasulullah ﷺ yang sahih, serta perkataan sahabat dan tabi\'in. Ini adalah tingkatan rujukan tertinggi.',
    exampleOrReference: 'Jami\'ul Bayan karya At-Thabari, Tafsir Al-Qur\'an Al-\'Azhim karya Ibnu Katsir.',
  },
  {
    id: 'fc-7',
    category: 'Metode & Corak',
    term: 'Tafsir bir Ra\'yi',
    arabicTerm: 'التَّفْسِير بِالرَّأْي',
    shortDefinition: 'Tafsir berbasis ijtihad akal dengan kaidah syariat dan bahasa Arab.',
    detailedExplanation: 'Ijtihad mufassir yang menguasai perangkat bahasa Arab, ushul fiqih, dan kaidah tafsir. Terbagi menjadi Ra\'yi Mahmud (terpuji) dan Ra\'yi Madzmum (tercela tanpa dasar ilmu).',
    exampleOrReference: 'Tafsir Mafatihul Ghaib (Ar-Razi).',
  },
  {
    id: 'fc-8',
    category: 'Kaidah Tafsir',
    term: 'Asbabun Nuzul',
    arabicTerm: 'أَسْبَاب النُّزُول',
    shortDefinition: 'Peristiwa atau pertanyaan yang melatarbelakangi turunnya ayat.',
    detailedExplanation: 'Mengetahui konteks historis diturunkannya suatu ayat. Membantu memahami hikmah tasyri\' dan mencegah kesalahpahaman konteks hukum.',
    exampleOrReference: 'Kitab Asbabun Nuzul karya Al-Wahidi dan As-Suyuthi.',
  },
  {
    id: 'fc-9',
    category: 'Kaidah Tafsir',
    term: 'Makkiyyah & Madaniyyah',
    arabicTerm: 'المَكِّي والمَدَنِي',
    shortDefinition: 'Klasifikasi ayat sebelum vs sesudah hijrah Rasulullah ﷺ.',
    detailedExplanation: 'Makkiyyah turun sebelum hijrah (fokus tauhid, kiamat, akhlak, ringkas); Madaniyyah turun setelah hijrah (fokus hukum syariat, muamalah, sosial kemasyarakatan).',
    exampleOrReference: 'Surah Al-Baqarah (Madaniyyah), Surah Al-Ikhlas (Makkiyyah).',
  },
  {
    id: 'fc-10',
    category: 'Kaidah Tafsir',
    term: 'Nasikh dan Mansukh',
    arabicTerm: 'النَّاسِخ والمَنْسُوخ',
    shortDefinition: 'Pengangkatan hukum syar\'i terdahulu oleh ketetapan syar\'i berikutnya.',
    detailedExplanation: 'Hikmah pentahapan hukum bagi umat Islam, seperti pentahapan keharaman khamr dan perubahan arah kiblat dari Baitul Maqdis ke Ka\'bah.',
    exampleOrReference: 'QS. Al-Baqarah: 106 ("Mā nansakh min āyatin au nunsihā nabi bi khairin minhā...").',
  },
  {
    id: 'fc-11',
    category: 'Istilah Surah',
    term: 'As-Sab\'ul Matsani',
    arabicTerm: 'السَّبْع المَثَانِي',
    shortDefinition: 'Tujuh ayat yang selalu diulang-ulang (Surah Al-Fatihah).',
    detailedExplanation: 'Gelar Al-Fatihah karena terdiri atas tujuh ayat agung yang senantiasa dibaca berulang-ulang di setiap rakaat shalat fardhu dan sunnah.',
    exampleOrReference: 'QS. Al-Hijr: 87; HR. Bukhari dari Abu Sa\'id bin Al-Mu\'alla.',
  },
  {
    id: 'fc-12',
    category: 'Istilah Surah',
    term: 'Ash-Shamad',
    arabicTerm: 'الصَّمَد',
    shortDefinition: 'Dzat tempat bergantung seluruh makhluk atas segala hajatnya.',
    detailedExplanation: 'Menurut Ibnu Abbas r.a.: Penguasa yang sempurna dalam kepemimpinan dan kemuliaan-Nya. Menurut ahli bahasa: Yang dituju dalam segala permohonan dan tidak berongga.',
    exampleOrReference: 'QS. Al-Ikhlas: 2; Tafsir At-Thabari.',
  },
];

export const GLOSSARY: GlossaryItem[] = [
  {
    id: 'gl-1',
    term: 'Asbabun Nuzul',
    arabicTerm: 'أسباب النزول',
    category: 'Kaidah Tafsir',
    definition: 'Sebab-sebab atau latar belakang historis berupa peristiwa atau pertanyaan yang menjadi momentum turunnya satu atau beberapa ayat Al-Qur\'an.',
    reference: 'Kitab Lubabun Nuqul fi Asbabin Nuzul karya Imam As-Suyuthi.',
  },
  {
    id: 'gl-2',
    term: 'Al-\'Ibrah bi \'Umumil Lafzhi',
    arabicTerm: 'العبرة بعموم اللفظ لا بخصوص السبب',
    category: 'Kaidah Tafsir',
    definition: 'Kaidah pokok tafsir yang menyatakan bahwa patokan hukum diambil dari keumuman lafazh ayat, bukan dari kekhususan orang atau peristiwa yang melatarbelakangi turunnya.',
    reference: 'Qawa\'idut Tafsir karya Dr. Khalid As-Sabt.',
  },
  {
    id: 'gl-3',
    term: 'Tahlili',
    arabicTerm: 'تحليلي',
    category: 'Metode & Corak',
    definition: 'Metode penafsiran analitis yang mengkaji ayat demi ayat secara runtut sesuai urutan dalam mushaf, mengupas kosakata, gramatikal (nahwu-sharaf), asbabun nuzul, dan munasabah.',
    reference: 'Manahijut Tafsir.',
  },
  {
    id: 'gl-4',
    term: 'Ijmali',
    arabicTerm: 'إجمالي',
    category: 'Metode & Corak',
    definition: 'Metode penafsiran global dan ringkas yang menguraikan maksud ayat dengan bahasa yang lugas dan mudah dipahami oleh khalayak umum.',
    reference: 'Tafsir Al-Jalalain & Tafsir Al-Muyassar.',
  },
  {
    id: 'gl-5',
    term: 'Maudhu\'i',
    arabicTerm: 'موضوعي',
    category: 'Metode & Corak',
    definition: 'Metode penafsiran tematik yang menghimpun seluruh ayat Al-Qur\'an seputar satu topik tertentu untuk dianalisis dan disintesis menjadi konsep utuh.',
    reference: 'Al-Bidayah fit Tafsir Al-Maudhu\'i karya Dr. Abdul Hayy Al-Farmawi.',
  },
  {
    id: 'gl-6',
    term: 'Muqaran',
    arabicTerm: 'مقارن',
    category: 'Metode & Corak',
    definition: 'Metode penafsiran komparatif yang memperbandingkan beberapa ayat yang tampak berbeda, ayat dengan hadits, atau membandingkan ragam pendapat para mufassir.',
    reference: 'Al-Jami\' li Ahkam Al-Qur\'an karya Al-Qurthubi.',
  },
  {
    id: 'gl-7',
    term: 'Tafsir bil Ma\'tsur',
    arabicTerm: 'التفسير بالمأثور',
    category: 'Metode & Corak',
    definition: 'Penafsiran yang bersumber dari nash Al-Qur\'an, sunnah Nabi Muhammad ﷺ, atsar para sahabat, dan perkataan tabi\'in.',
    reference: 'Tafsir Ibnu Katsir & Tafsir At-Thabari.',
  },
  {
    id: 'gl-8',
    term: 'Tafsir bir Ra\'yi',
    arabicTerm: 'التفسير بالرأي',
    category: 'Metode & Corak',
    definition: 'Penafsiran Al-Qur\'an yang menggunakan instrumen ijtihad akal dengan bertumpu pada kaidah bahasa Arab, syariat, dan ushuluddin yang benar.',
    reference: 'Mafatihul Ghaib karya Fakhruddin Ar-Razi.',
  },
  {
    id: 'gl-9',
    term: 'Makkiyyah',
    arabicTerm: 'مكية',
    category: 'Ilmu Al-Qur\'an',
    definition: 'Ayat atau surah yang diturunkan sebelum peristiwa hijrahnya Nabi Muhammad ﷺ ke Madinah, didominasi tema akidah, tauhid, surga-neraka, dan akhlak.',
    reference: 'Al-Itqan fi Ulumil Qur\'an.',
  },
  {
    id: 'gl-10',
    term: 'Madaniyyah',
    arabicTerm: 'مدنية',
    category: 'Ilmu Al-Qur\'an',
    definition: 'Ayat atau surah yang diturunkan setelah Nabi ﷺ berhijrah ke Madinah, berfokus pada pranata hukum syariat, muamalah, jihad, dan seruan kepada kaum munafik & Ahli Kitab.',
    reference: 'Al-Itqan fi Ulumil Qur\'an.',
  },
  {
    id: 'gl-11',
    term: 'Nasikh dan Mansukh',
    arabicTerm: 'الناسخ والمنسوخ',
    category: 'Kaidah Tafsir',
    definition: 'Konsep penggantian atau penghapusan suatu ketetapan hukum syar\'i dengan ketetapan hukum syar\'i yang datang kemudian dari wahyu Allah.',
    reference: 'Al-Burhan karya Az-Zarkasyi.',
  },
  {
    id: 'gl-12',
    term: 'Muhkam',
    arabicTerm: 'محكم',
    category: 'Ilmu Al-Qur\'an',
    definition: 'Ayat-ayat yang maknanya terang benderang, jelas, dan tidak mengandung kesamaran atau kerancuan, menjadi pokok isi Al-Qur\'an (Ummul Kitab).',
    reference: 'QS. Ali \'Imran: 7.',
  },
  {
    id: 'gl-13',
    term: 'Mutasyabih',
    arabicTerm: 'متشابه',
    category: 'Ilmu Al-Qur\'an',
    definition: 'Ayat-ayat yang maknanya samar atau memiliki kemungkinan multitafsir yang membutuhkan perujukan kepada ayat muhkam atau penyerahan hakikatnya kepada Allah.',
    reference: 'QS. Ali \'Imran: 7.',
  },
  {
    id: 'gl-14',
    term: 'Munasabah',
    arabicTerm: 'المناسبة',
    category: 'Kaidah Tafsir',
    definition: 'Ilmu yang mengkaji keterkaitan, korelasi, dan keserasian yang indah antara satu ayat dengan ayat sebelumnya, atau antara satu surah dengan surah lainnya.',
    reference: 'Nazhmud Durar fi Tanasubil Ayat was Suwar karya Al-Biqa\'i.',
  },
  {
    id: 'gl-15',
    term: 'Ash-Shamad',
    arabicTerm: 'الصمد',
    category: 'Istilah Surah',
    definition: 'Sifat agung Allah: Dzat Yang Maha Sempurna dalam kepemimpinan dan kemuliaan-Nya, tempat bermuara dan bersandar segala makhluk atas seluruh kebutuhan mereka.',
    reference: 'QS. Al-Ikhlas: 2; Atsar Ibnu Abbas r.a.',
  },
  {
    id: 'gl-16',
    term: 'As-Sab\'ul Matsani',
    arabicTerm: 'السبع المثاني',
    category: 'Istilah Surah',
    definition: 'Tujuh ayat yang selalu diulang-ulang pembacaannya di setiap rakaat shalat, yaitu Surah Al-Fatihah.',
    reference: 'QS. Al-Hijr: 87.',
  },
  {
    id: 'gl-17',
    term: 'Al-Mu\'awwidzatain',
    arabicTerm: 'المعوذتين',
    category: 'Istilah Surah',
    definition: 'Dua surah benteng perlindungan dalam Al-Qur\'an, yaitu Surah Al-Falaq dan Surah An-Nas.',
    reference: 'Shahih Muslim No. 814.',
  },
  {
    id: 'gl-18',
    term: 'Turjumanul Qur\'an',
    arabicTerm: 'ترجمان القرآن',
    category: 'Sejarah',
    definition: 'Gelar kehormatan bagi sahabat mulia Abdullah bin Abbas r.a. (sepupu Nabi ﷺ) yang bermakna "Penerjemah/Juru Bicara Al-Qur\'an" karena keluasan pemahamannya.',
    reference: 'Siyar A\'lamin Nubala karya Adz-Dzahabi.',
  },
];
