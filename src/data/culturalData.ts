export type CulturalCategory = 
  | 'Seni Pertunjukan'
  | 'Upacara Adat'
  | 'Kuliner & Kerajinan'
  | 'Sejarah & Cagar Budaya';

export interface CulturalItem {
  id: string;
  title: string;
  category: CulturalCategory;
  kecamatan: string;
  desa: string;
  lat: number;
  lng: number;
  imageUrl: string;
  summary: string;
  historyParagraphs: string[];
  philosophy: {
    coreMeaning: string;
    banyumasanValues: string[];
    symbolicElements: { symbol: string; explanation: string }[];
  };
  youtubeId: string;
  youtubeTitle: string;
  references: { title: string; source: string; year?: string }[];
}

export const CULTURAL_ITEMS: CulturalItem[] = [
  {
    id: 'ebeg-banyumasan',
    title: 'Ebeg Banyumasan',
    category: 'Seni Pertunjukan',
    kecamatan: 'Seluruh Kecamatan (Merata)',
    desa: 'Komunitas Desa se-Banyumas',
    lat: -7.4243,
    lng: 109.2302,
    imageUrl: '/src/assets/images/culture_ebeg_banyumasan_1792897346813.jpg',
    summary: 'Kesenian tari rakyat bertuah dengan anyaman kuda kepang yang melambangkan kegigihan, patriotisme prajurit, dan kekuatan spiritual leluhur Banyumasan.',
    historyParagraphs: [
      'Kesenian Ebeg merupakan seni pertunjukan tari tradisional khas Banyumas yang telah mengakar kuat dalam kehidupan masyarakat agraris pedesaan sejak berabad-abad silam. Konon, ebeg terinspirasi dari latihan ketangkasan prajurit berkuda Pangeran Diponegoro saat melawan penjajah kolonial Belanda di wilayah Lembah Serayu, serta jejak kavaleri prajurit Mataram Kuno.',
      'Dalam pementasannya, sekelompok penari menunggangi ebeg (anyaman bambu yang dibentuk menyerupai kuda) dengan iringan rampak gamelan calung, kendang, dan terompet slompret. Puncak dari pertunjukan ditandai dengan fase "janturan" atau "trance", di mana para penari dirasuki roh indang leluhur yang mencerminkan kedekatan manusia dengan kekuatan alam semesta.',
      'Ebeg bukan semata hiburan tontonan (spectacle), melainkan tatanan ritual komunal pemersatu warga. Di setiap pelosok Banyumas, pagelaran Ebeg selalu menjadi ruang berkumpul antar-generasi yang meruntuhkan sekat strata sosial, merefleksikan karakter masyarakat Banyumas yang guyub dan menjunjung tinggi persaudaraan sejati.'
    ],
    philosophy: {
      coreMeaning: 'Simbol keprajuritan rakyat jelata, keberanian pantang menyerah, dan harmoni antara mikrokosmos (jagad cilik) serta makrokosmos (jagad gede).',
      banyumasanValues: [
        'Cablaka: Kejujuran berekspresi tanpa kepalsuan strata istana',
        'Guyub Rukun: Solidaritas komunal warga pedesaan',
        'Kewibawaan Rakyat: Keberanian mempertahankan kehormatan tanah air'
      ],
      symbolicElements: [
        { symbol: 'Ebeg (Kuda Anyaman Bambu)', explanation: 'Melambangkan daya gerak, kecepatan, serta ketabahan prajurit rakyat dalam menghadapi rintangan hidup.' },
        { symbol: 'Cambuk (Pecut Samandiman)', explanation: 'Simbol kendali diri dan peringatan moral agar manusia senantiasa eling lan waspada terhadap hawa nafsu.' },
        { symbol: 'Sesaji Kembang & Kemenyan', explanation: 'Wujud rasa syukur dan penghormatan kepada Sang Pencipta serta leluhur cikal bakal desa.' }
      ]
    },
    youtubeId: 'Zq1fF_x8h08',
    youtubeTitle: 'Dokumenter Seni Tradisi Ebeg Banyumasan - Pesona Lembah Serayu',
    references: [
      { title: 'Ebeg Banyumasan: Seni Rakyat, Magis, dan Resistensi Sosial', source: 'Jurnal Kebudayaan Universitas Jenderal Soedirman (Unsoed)', year: '2021' },
      { title: 'Inventarisasi Warisan Budaya Takbenda Kabupaten Banyumas', source: 'Dinporabudpar Kabupaten Banyumas', year: '2023' },
      { title: 'Babad Banyumas & Dinamika Seni Kerakyatan Pasundan-Kejawen', source: 'Balai Pelestarian Kebudayaan Wilayah X', year: '2020' }
    ]
  },
  {
    id: 'tari-lengger-calung',
    title: 'Tari Lengger & Musik Calung',
    category: 'Seni Pertunjukan',
    kecamatan: 'Sokaraja & Banyumas',
    desa: 'Pliken, Sokaraja & Kalisube, Banyumas',
    lat: -7.4578,
    lng: 109.2891,
    imageUrl: '/src/assets/images/culture_lengger_calung_1792897347127.jpg',
    summary: 'Seni tari klasik kerakyatan yang diiringi resonansi rumpun bambu calung wulung, melambangkan kesuburan dewi padi dan keramahan batin warga Banyumas.',
    historyParagraphs: [
      'Tari Lengger dan Calung merupakan dwi-tunggal kesenian yang paling identik dengan identitas musikal tanah Banyumas. Berakar dari kata "Le/thuk" (dikira anak laki-laki) dan "Geger" (menghebohkan masyarakat), seni lengger mulanya diperankan oleh penari laki-laki berparas ayu sebagai manifestasi tradisi kesuburan Dewi Sri, sebelum kemudian juga ditarikan oleh perempuan.',
      'Instrumen pengiringnya, calung Banyumasan, dibuat khusus dari bambu wulung pilihan (bambu hitam bertulang tebal) yang dipotong berlaras slendro khas penginyongan. Tabuhan calung menghasilkan melodi yang ritmis, lincah, renyah, dan sarat improvisasi bebas tanpa kekakuan pakem istana keraton.',
      'Seni Lengger Banyumas telah diakui secara nasional sebagai Warisan Budaya Takbenda (WBTb) Indonesia. Tokoh legendaris seperti Dariah (Maestro Lengger Lanang asal Banyumas) membawa nama kesenian ini ke panggung dunia, membuktikan kedalaman nilai artistik dan kemanusiaannya.'
    ],
    philosophy: {
      coreMeaning: 'Penghormatan terhadap kemuliaan bumi pertiwi, ritme alam agraris, serta kebebasan berekspresi jiwa merdeka wong Banyumas.',
      banyumasanValues: [
        'Egaliter: Musik rakyat yang tidak membedakan ningrat dan wong cilik',
        'Suka Cita Panen: Ekspresi syukur atas limpahan rezeki hasil tani',
        'Keluasan Hati: Keramahan terbuka menyambut tamu dan sedulur'
      ],
      symbolicElements: [
        { symbol: 'Sampur (Selendang Tari)', explanation: 'Melambangkan ikatan silaturahmi yang luwes dan keterbukaan komunikasi antar-manusia.' },
        { symbol: 'Calung Wulung', explanation: 'Material bambu melambangkan kerendahan hati, lentur menghadapi terpaan badai, namun kokoh menancap di akar bumi.' },
        { symbol: 'Rias Kembang Cempaka', explanation: 'Menyebarkan keharuman budi pekerti dan ketulusan niat dalam bermasyarakat.' }
      ]
    },
    youtubeId: '8Y3tC9s5R1s',
    youtubeTitle: 'Pesona Lengger Lanang dan Calung Banyumasan - Warisan Budaya Takbenda',
    references: [
      { title: 'Estetika dan Transformasi Gender dalam Tari Lengger Banyumas', source: 'Institut Seni Indonesia (ISI) Surakarta', year: '2022' },
      { title: 'Dariah: Maestro Lengger Banyumasan dan Dedikasi Seumur Hidup', source: 'Kementerian Kebudayaan RI', year: '2019' },
      { title: 'Monografi Musik Calung Banyumas', source: 'Dinas Pemuda Olahraga Kebudayaan dan Pariwisata Banyumas', year: '2022' }
    ]
  },
  {
    id: 'tradisi-cowongan',
    title: 'Tradisi Cowongan (Upacara Pemanggil Hujan)',
    category: 'Upacara Adat',
    kecamatan: 'Rawalo',
    desa: 'Desa Tambaknegara & Rawalo',
    lat: -7.5255,
    lng: 109.1832,
    imageUrl: '/src/assets/images/hero_banyumas_culture_1792897344529.jpg',
    summary: 'Ritual purba masyarakat tepi Sungai Serayu menggunakan media boneka batok kelapa (siwur) untuk memohon berkah hujan pada musim kemarau panjang.',
    historyParagraphs: [
      'Cowongan adalah ritual adat sakral yang telah diwariskan secara turun-temurun oleh masyarakat pedesaan Banyumas, khususnya di Desa Tambaknegara, Kecamatan Rawalo. Ritual ini dilaksanakan ketika musim kemarau panjang melanda dan mengancam sawah serta sumber mata air penduduk.',
      'Media utama ritual ini berupa boneka yang terbuat dari siwur (gayung dari tempurung kelapa), batang bambu, dan daun padi atau jerami yang dirias menyerupai sosok bidadari jelita Dewi Sri. Ritual dipimpin oleh wanita paruh baya (panyumping) yang melantunkan tembang-tembang kidung mantra kuno bernada liris memanggil bidadari langit agar turun membawa tirta kesuburan.',
      'Ketika roh pelindung merasuki boneka Cowongan, boneka tersebut akan terasa sangat berat dan bergerak-gerak menari dengan sendirinya, memberikan isyarat bahwa doa warga telah didengar oleh Sang Penguasa Jagad Raya.'
    ],
    philosophy: {
      coreMeaning: 'Ketergantungan mutlak umat manusia kepada kemurahan Sang Pencipta dan kesadaran ekologis menjaga kelestarian mata air.',
      banyumasanValues: [
        'Spiritualitas Transenden: Kepasrahan total manusia kepada Tuhan Yang Maha Esa',
        'Harmoni Alam: Hubungan timbal balik antara manusia, air, dan tanaman pangan',
        'Gotong Royong Ibu-Ibu: Peran kaum perempuan sebagai penjaga ketahanan pangan desa'
      ],
      symbolicElements: [
        { symbol: 'Siwur (Gayung Batok Kelapa)', explanation: 'Simbol wadah penampung berkah air suci dan kesucian bejana jiwa manusia.' },
        { symbol: 'Kidung Ilir-Ilir & Bidadari', explanation: 'Lantunan doa permohonan dengan tutur bahasa puitis kuno yang menyentuh nurani jagad.' },
        { symbol: 'Kunyit & Bedak Beras', explanation: 'Riasan alami lambang kemurnian doa dan kesiapan menerima rahmat penghidupan.' }
      ]
    },
    youtubeId: 'vG7l6oF7Y2g',
    youtubeTitle: 'Ritual Sakral Cowongan Tambaknegara Rawalo - Memanggil Hujan Banyumas',
    references: [
      { title: 'Ritual Cowongan: Mitos dan Konservasi Air Masyarakat Tradisional Serayu', source: 'Jurnal Antropologi Kebudayaan Jawa', year: '2020' },
      { title: 'Kearifan Lokal Agroklimat dalam Tradisi Banyumasan', source: 'Fakultas Pertanian Unsoed', year: '2021' }
    ]
  },
  {
    id: 'saka-tunggal-rewanda',
    title: 'Masjid Saka Tunggal & Tradisi Rewanda Bojana',
    category: 'Sejarah & Cagar Budaya',
    kecamatan: 'Jatilawang',
    desa: 'Cikakak, Jatilawang',
    lat: -7.5348,
    lng: 109.0712,
    imageUrl: '/src/assets/images/culture_saka_tunggal_rewanda_1792897347821.jpg',
    summary: 'Masjid berarsitektur tiang tunggal kayu jati tertua di tanah Jawa (1288 M) yang dikelilingi ribuan monyet ekor panjang yang hidup rukun berdampingan.',
    historyParagraphs: [
      'Masjid Saka Tunggal Baitussalam didirikan pada tahun 1288 Masehi oleh Kyai Mustolih, menjadikannya salah satu jejak penyebaran ajaran Islam tertua di Nusantara yang mendahului era Walisongo. Keunikan mahakarya arsitektur ini terletak pada tiang penyangga utamanya (saka guru) yang hanya berjumlah SATU batang kayu jati berukir relief klasik.',
      'Di sekitar kompleks masjid yang asri di lereng bukit Cikakak, hidup ribuan kawanan kera ekor panjang (Macaca fascicularis) yang jinak dan dikeramatkan oleh warga. Masyarakat tidak pernah mengganggu satwa tersebut, menciptakan simbiosis mutualisme spiritual yang telah berlangsung ratusan tahun.',
      'Setiap tahun, warga menggelar tradisi "Rewanda Bojana", yaitu upacara perjamuan gunungan buah dan tumpeng hasil bumi khusus dipersembahkan kepada kawanan monyet sebagai wujud terima kasih manusia kepada satwa ciptaan Tuhan yang ikut menjaga keasrian hutan lereng Cikakak.'
    ],
    philosophy: {
      coreMeaning: 'Konsep tauhid (Keesaan Tuhan) yang dipadukan dengan keselarasan mutlak antara ibadah manusia dan pelestarian satwa liar.',
      banyumasanValues: [
        'Tauhid Sejati: Saka Tunggal melambangkan bahwa hanya Allah SWT tiang penegak alam semesta',
        'Welas Asih Makhluk: Memperlakukan hewan hutan sebagai sesama ciptaan yang berhak hidup sejahtera',
        'Pelestarian Cagar Cagar Budaya: Menjaga amanah warisan leluhur melintasi zaman'
      ],
      symbolicElements: [
        { symbol: 'Saka Tunggal Berukir Sayap', explanation: 'Tiang tunggal jati melambangkan keesaan Illahi dan sayap melambangkan tingginya derajat spiritualitas insan kamil.' },
        { symbol: 'Gunungan Buah Rewanda Bojana', explanation: 'Sedekah hasil bumi dari manusia untuk kawanan kera sebagai wujud berbagi rezeki tanpa pamrih.' },
        { symbol: 'Kijing Makam Kyai Mustolih', explanation: 'Pengingat sejarah dakwah damai yang santun dan akomodatif terhadap adat setempat.' }
      ]
    },
    youtubeId: 'q5s1Y9F8z-M',
    youtubeTitle: 'Misteri Masjid Saka Tunggal 1288 M & Jamuan Kera Rewanda Bojana Jatilawang',
    references: [
      { title: 'Arsitektur Vernakular Masjid Kuno Saka Tunggal Cikakak', source: 'Pusat Dokumentasi Arsitektur Indonesia', year: '2020' },
      { title: 'Kajian Etnosains dan Konservasi Primata Hutan Adat Cikakak', source: 'Fakultas Biologi Unsoed', year: '2022' },
      { title: 'Buku Registrasi Cagar Budaya Peringkat Nasional', source: 'Kemendikbudristek RI', year: '2021' }
    ]
  },
  {
    id: 'musik-kenthongan',
    title: 'Musik Kenthongan Banyumasan',
    category: 'Seni Pertunjukan',
    kecamatan: 'Purwokerto Barat',
    desa: 'Kober & Karanglewas',
    lat: -7.4215,
    lng: 109.2155,
    imageUrl: '/src/assets/images/culture_lengger_calung_1792897347127.jpg',
    summary: 'Rampak tabuhan puluhan kentongan bambu berlaras dinamis yang bertransformasi dari sistem keamanan ronda malam menjadi festival musik kolosal spektakuler.',
    historyParagraphs: [
      'Musik Kenthongan berakar dari piranti tanda bahaya pos kamling (ronda malam) warga Banyumas. Pada dekade 1970-an, para seniman kreatif desa memodifikasi batang bambu petung dan wulung dengan berbagai ukuran nada sehingga mampu membawakan lagu-lagu dolanan dan gending Jawa berlaras slendro dan pelog.',
      'Satu grup kenthongan modern umumnya diperkuat oleh 30 hingga 50 personil yang memainkan instrumen angklung, bedug bambu, seruling, ketipung, dan mayoret/penari berbusana adat kreasi. Bunyinya yang membahana, ritmis, dan penuh hentakan dinamis menjadi lambang kegembiraan pemuda-pemudi Banyumas.',
      'Setiap perayaan hari jadi Banyumas dan festival kemerdekaan, Festival Kenthongan digelar di sepanjang jalan protokol Purwokerto, menyedot puluhan ribu penonton dari seluruh pelosok Jawa Tengah.'
    ],
    philosophy: {
      coreMeaning: 'Kesiapsiagaan sosial masyarakat, kerukunan pemuda kampung, dan transformasi fungsional kearifan lokal menjadi seni berdaya saing.',
      banyumasanValues: [
        'Kesiapsiagaan Posronda: Kewaspadaan menjaga ketentraman lingkungan bersama',
        'Kekompakan Ritmis: Kebersamaan harmoni walau memainkan instrumen yang berbeda bentuk',
        'Kreativitas Populis: Kemampuan rakyat mendaur ulang bahan alam sekitar menjadi karya seni'
      ],
      symbolicElements: [
        { symbol: 'Bambu Petung Bertakik', explanation: 'Resonansi rongga bambu menandakan keterbukaan batin yang siap menerima kebaikan.' },
        { symbol: 'Bedug Bambu Bas', explanation: 'Detak ritme jantung komunal yang mengokohkan persatuan langkah warga.' },
        { symbol: 'Busana Blangkon & Selendang', explanation: 'Kombinasi kesopanan adat Jawa dan semangat keterbukaan Banyumasan.' }
      ]
    },
    youtubeId: 'Ww2eA6lP7iQ',
    youtubeTitle: 'Festival Kenthongan Purwokerto Banyumas - Gemuruh Bambu Serayu',
    references: [
      { title: 'Transformasi Akustik Kentongan Ronda Menuju Seni Atraksi Wisata', source: 'Jurnal Musik Etnomusikologi Nusantara', year: '2022' },
      { title: 'Profil Kebudayaan Seni Musik Tradisi Purwokerto', source: 'Dinas Pemuda Olahraga Kebudayaan dan Pariwisata Banyumas', year: '2023' }
    ]
  },
  {
    id: 'batik-gethuk-sokaraja',
    title: 'Batik Tulis & Gethuk Goreng Sokaraja',
    category: 'Kuliner & Kerajinan',
    kecamatan: 'Sokaraja',
    desa: 'Sokaraja Kulon & Kauman Lama Banyumas',
    lat: -7.4589,
    lng: 109.3082,
    imageUrl: '/src/assets/images/culture_batik_gethuk_banyumas_1792897347671.jpg',
    summary: 'Harmoni cita rasa kuliner singkong berbalut gula kelapa murni dan keanggunan kain batik motif Manggar khas kota transit bersejarah Sokaraja.',
    historyParagraphs: [
      'Kecamatan Sokaraja merupakan episentrum perdagangan dan seni kriya bersejarah di Banyumas. Sejak abad ke-19, para pengrajin batik Sokaraja mengembangkan ragam hias batik yang berbeda dari batik Solo dan Yogyakarta. Ciri khas batik Banyumasan terletak pada warna dasarnya yang hangat gelap (sogan gelap kehitaman) dengan motif alam khas pedesaan seperti Motif Ayam Jago, Manggar (bunga kelapa), Jahe Puger, dan Cempaka Mulya.',
      'Di sisi kuliner, Sokaraja melahirkan ikon legendaris Gethuk Goreng. Ditemukan pertama kali pada tahun 1918 oleh Sanpirngad, gethuk goreng berawal dari ide kreatif mengolah sisa gethuk basah dari singkong pilihan agar tidak terbuang sia-sia dengan menggorengnya bersama gula merah nira kelapa asli.',
      'Perpaduan keindahan wastra batik tulis dan legitnya gethuk goreng menjadi simbol keramahtamahan warga Banyumas dalam menyambut setiap pelancong yang singgah di kawasan Lembah Serayu.'
    ],
    philosophy: {
      coreMeaning: 'Kesederhanaan bahan lokal yang dengan ketelatenan dan keikhlasan budi pekerti dapat diolah menjadi mahakarya bernilai tinggi.',
      banyumasanValues: [
        'Ketekunan Pengrajin: Sabar menorehkan malam canting setitik demi setitik',
        'Kecerdikan Mengolah Pangan: Mengubah singkong rakyat menjadi kudapan lezat tahan lama',
        'Kehangatan Rasa: Gula kelapa asli lambang manisnya tutur kata warga'
      ],
      symbolicElements: [
        { symbol: 'Motif Manggar (Bunga Kelapa)', explanation: 'Pohon kelapa yang serbaguna; manusia harus memberi manfaat sejak pucuk daun hingga akarnya.' },
        { symbol: 'Motif Ayam Jago Banyumas', explanation: 'Semangat bangun pagi menjemput rezeki halal dan keberanian bersikap kesatria.' },
        { symbol: 'Besek Bambu Gethuk', explanation: 'Kemasan anyaman ramah lingkungan yang menghembuskan aroma harum alami.' }
      ]
    },
    youtubeId: '3H2wO3cK9l8',
    youtubeTitle: 'Warisan Rasa Gethuk Goreng & Jejak Canting Batik Tulis Sokaraja Banyumas',
    references: [
      { title: 'Karakter Visual dan Makna Simbolik Batik Banyumasan', source: 'Balai Besar Kerajinan dan Batik Yogyakarta', year: '2021' },
      { title: 'Gastronomi Tradisional Jawa: Studi Kasus Gethuk Goreng Sokaraja', source: 'Pusat Studi Pangan Tradisional Unsoed', year: '2020' }
    ]
  },
  {
    id: 'seni-begalan',
    title: 'Seni Tradisi Begalan Pengantin',
    category: 'Upacara Adat',
    kecamatan: 'Seluruh Kecamatan (Merata)',
    desa: 'Wilayah Budaya Lembah Serayu',
    lat: -7.4352,
    lng: 109.2514,
    imageUrl: '/src/assets/images/hero_banyumas_culture_1792897344529.jpg',
    summary: 'Teatrikal dialog humoris sarat petuah kehidupan rumah tangga yang wajib digelar saat putra/putri sulung atau bungsu melangsungkan ijab pernikahan.',
    historyParagraphs: [
      'Tradisi Begalan adalah upacara adat perkawinan khas Banyumasan yang memadukan seni tutur sastra lisan, seni tari jenaka, dan wejangan filosofis mendalam. Begalan wajib digelar bilamana terjadi pernikahan antara anak pertama dengan anak pertama, anak terakhir dengan anak terakhir, atau anak pertama dengan anak bungsu.',
      'Dua orang juru begal (utusan pihak besan dan mempelai pria) berhadapan membawa brengkut—yaitu pikulan perlengkapan dapur tradisional yang terbuat dari tembaga dan anyaman bambu. Mereka berbalas pantun, melontarkan humor khas banyumasan (banyolan cablaka), seraya membedah arti simbolik setiap perabot dapur yang dibawa.',
      'Di akhir atraksi, perabot dapur tersebut diperebutkan oleh para hadirin dan tetangga. Warga meyakini bahwa membawa pulang perkakas begalan akan mendatangkan berkah kerukunan dan kelancaran rezeki bagi rumah tangga masing-masing.'
    ],
    philosophy: {
      coreMeaning: 'Pendidikan pranikah berbasis kearifan lokal mengenai cara memecahkan ujian nafkah, sabar, dan kepemimpinan keluarga.',
      banyumasanValues: [
        'Cablaka Komunikatif: Masalah suami-istri diselesaikan dengan dialog terbuka dan humor yang mencairkan suasana',
        'Bawera (Lapang Dada): Kesediaan menerima kekurangan pasangan hidup',
        'Gotong Royong Keluarga: Rumah tangga kokoh berkat sokongan kerabat dan tetangga sekitar'
      ],
      symbolicElements: [
        { symbol: 'Iyan (Wadah Penampi Beras)', explanation: 'Simbol pikiran yang lapang dan kemampuan memilah mana perkataan yang baik dan mana fitnah.' },
        { symbol: 'Kukusan Bambu Kerucut', explanation: 'Keluarga harus senantiasa mengerucutkan tujuan hidup hanya tertuju kepada ridho Allah Taala.' },
        { symbol: 'Centong Kayu & Siwur', explanation: 'Simbol ketepatan membagi nafkah dan kesabaran mengalirkan kasih sayang sehari-hari.' },
        { symbol: 'Sapu Lidi', explanation: 'Kekuatan persatuan; bila lidi bersatu maka kotoran dan kesusahan hidup mudah dibersihkan.' }
      ]
    },
    youtubeId: '9eL0X7dM8-A',
    youtubeTitle: 'Penuh Tawa & Petuah Bijak: Tradisi Begalan Pernikahan Adat Banyumas',
    references: [
      { title: 'Fungsi Edukatif dan Retorika Tutur dalam Tradisi Begalan Banyumas', source: 'Fakultas Ilmu Budaya Universitas Indonesia', year: '2020' },
      { title: 'Upacara Daur Hidup Perkawinan Adat Penginyongan', source: 'Lembaga Kebudayaan Banyumas (LKB)', year: '2021' }
    ]
  },
  {
    id: 'baturraden-kamandaka',
    title: 'Baturraden & Legenda Raden Kamandaka',
    category: 'Sejarah & Cagar Budaya',
    kecamatan: 'Baturraden',
    desa: 'Desa Kemutug Lor & Karangmangu',
    lat: -7.3115,
    lng: 109.2248,
    imageUrl: '/src/assets/images/hero_banyumas_culture_1792897344529.jpg',
    summary: 'Cagar alam lereng Gunung Slamet yang menjadi latar legenda cinta agung Raden Kamandaka (Lutung Kasarung) dan asal-usul toponimi Batur-Raden.',
    historyParagraphs: [
      'Kawasan Baturraden di lereng selatan Gunung Slamet menyimpan narasi sejarah dan mitologi yang melegenda dalam ingatan kolektif warga Banyumas. Nama "Baturraden" berasal dari dua kata: "Batur" yang bermakna pelayan/pembantu dan "Raden" yang bermakna bangsawan istana.',
      'Kisah ini berpusat pada jalinan asmara tulus antara seorang pemuda abdi kandang kuda (batur) dengan putri adipati dari Kadipaten Kutaliman. Kisah ini bertaut pula dengan kisah kepahlawanan Raden Kamandaka dari Kerajaan Pajajaran yang menyamar di wilayah Pasir Luhur Banyumas demi menemukan cinta sejatinya, Dewi Ciptarasa.',
      'Selain kekayaan legenda, Baturraden memiliki situs cagar budaya petilasan pertapaan gua sarabadak, air terjun suci, serta tradisi upacara resik makam cikal bakal mata air lereng gunung yang lestari hingga kini.'
    ],
    philosophy: {
      coreMeaning: 'Kemurnian cinta dan kesetaraan martabat manusia melampaui kasta feodal serta tanggung jawab menjaga mata air lereng gunung suci Slamet.',
      banyumasanValues: [
        'Anti-Feodalisme: Manusia dinilai dari kebaikan budi, bukan gelar kebangsawanan',
        'Ksatria Pinilih: Keberanian berkorban demi kebenaran rakyat tertindas',
        'Ruwat Bumi: Merawat hutan lindung Gunung Slamet penyangga pulau Jawa'
      ],
      symbolicElements: [
        { symbol: 'Mata Air Pancuran Pitu & Telu', explanation: 'Simbol pembersihan batin dari racun keserakahan dan penyakit jiwa.' },
        { symbol: 'Sosok Lutung Kasarung', explanation: 'Keindahan sejati seringkali tersembunyi di balik rupa luar yang bersahaja.' }
      ]
    },
    youtubeId: 'F2o_gD-wM48',
    youtubeTitle: 'Napak Tilas Legenda Kamandaka & Keagungan Alam Baturraden Banyumas',
    references: [
      { title: 'Toponimi dan Mitologi Pasir Luhur dalam Dinamika Sejarah Banyumas', source: 'Pusat Studi Kebudayaan Jawa UGM', year: '2021' },
      { title: 'Babad Pasir Luhur: Naskah Klasik Sejarah Banyumasan', source: 'Museum Wayang Sendang Mas Banyumas', year: '2018' }
    ]
  },
  {
    id: 'mendoan-nopia-banyumas',
    title: 'Mendoan & Nopia Banyumasan',
    category: 'Kuliner & Kerajinan',
    kecamatan: 'Banyumas (Kota Lama)',
    desa: 'Sudagaran & Pekunden, Banyumas',
    lat: -7.5142,
    lng: 109.2934,
    imageUrl: '/src/assets/images/culture_batik_gethuk_banyumas_1792897347671.jpg',
    summary: 'Ikon gastronomi legendaris kedelai berbungkus daun jati/pisang dimasak setengah matang (mendo) dan kue telur gajah nopia berempah gula jawa.',
    historyParagraphs: [
      'Mendoan adalah warisan kuliner yang paling melekat dalam sanubari masyarakat Banyumas. Kata "mendo" dalam dialek banyumasan berarti lembek atau setengah matang. Berbeda dengan tempe goreng biasa, tempe mendoan dibuat dari kedelai beragi tipis yang dibungkus khusus satu persatu menggunakan daun pisang atau daun jati muda.',
      'Adonan tepung beras berbumbu ketumbar, kencur, bawang putih, dan daun bawang segar digoreng cepat dalam minyak panas membara, menghasilkan tekstur gurih basah yang nikmat disantap bersama sambal kecap rawit pedas.',
      'Di samping mendoan, Desa Wisata Kreatif Pekunden di Kota Lama Banyumas memproduksi Nopia dan Mino (Mini Nopia), yaitu kue bulat berongga berkulit renyah dengan isian gula merah nira kelapa yang dipanggang secara tradisional di dalam gentong tanah liat berpemanas arang kayu.'
    ],
    philosophy: {
      coreMeaning: 'Kelembutan di dalam ketegasan; karakter mendo mencerminkan orang Banyumas yang luwes berkompromi namun berpegang teguh pada prinsip kebenaran.',
      banyumasanValues: [
        'Guyub Mangan Bareng: Menikmati mendoan hangat di warung kopi bersama sahabat tanpa sekat',
        'Kelestarian Nira Kelapa: Mendorong kehidupan penderes kelapa tradisional',
        'Kearifan Kemasan Alami: Menghargai daun pisang dan tanah liat gentong kuno'
      ],
      symbolicElements: [
        { symbol: 'Tempe Daun Pisang Lembaran', explanation: 'Kerapatan fermentasi kedelai melambangkan persatuan warga yang erat dan bermanfaat.' },
        { symbol: 'Gentong Panggangan Tanah Liat Nopia', explanation: 'Api pembakaran arang melambangkan semangat kerja keras yang matang dari dalam.' },
        { symbol: 'Sambal Kecap Cabe Rawit', explanation: 'Citarasa cablaka: apa yang dirasa diungkapkan secara jujur dan menggugah selera.' }
      ]
    },
    youtubeId: 'k4F9m0D3r5Y',
    youtubeTitle: 'Rahasia Gurih Tempe Mendoan Asli Banyumas & Oven Gentong Kuno Nopia',
    references: [
      { title: 'Tempe Mendoan Banyumas: Warisan Budaya Takbenda Indonesia', source: 'Kemendikbudristek RI', year: '2021' },
      { title: 'Etnofood Warisan Kota Lama Banyumas', source: 'Dinporabudpar Kabupaten Banyumas', year: '2022' }
    ]
  }
];

export const BANYUMAS_KECAMATAN_LIST = [
  'Semua Kecamatan',
  'Seluruh Kecamatan (Merata)',
  'Jatilawang',
  'Sokaraja',
  'Banyumas',
  'Rawalo',
  'Purwokerto Barat',
  'Baturraden',
  'Cilongok',
  'Sumbang',
  'Pekuncen',
  'Wangon',
  'Ajibarang',
  'Tambak',
  'Kemranjen'
];

export const CULTURAL_CATEGORIES: CulturalCategory[] = [
  'Seni Pertunjukan',
  'Upacara Adat',
  'Kuliner & Kerajinan',
  'Sejarah & Cagar Budaya'
];
