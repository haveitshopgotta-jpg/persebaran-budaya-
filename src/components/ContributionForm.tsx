import React, { useState } from 'react';
import { 
  ContributionFormData, 
  validateContributionForm, 
  extractYoutubeId 
} from '../utils/filterUtils';
import { 
  BANYUMAS_KECAMATAN_LIST, 
  CULTURAL_CATEGORIES, 
  CulturalCategory, 
  CulturalItem 
} from '../data/culturalData';
import { Send, CheckCircle2, AlertCircle, PlusCircle, Sparkles } from 'lucide-react';

interface ContributionFormProps {
  onAddContribution: (newItem: CulturalItem) => void;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({ onAddContribution }) => {
  const [formData, setFormData] = useState<ContributionFormData>({
    namaBudaya: '',
    kategori: '',
    kecamatan: '',
    desa: '',
    deskripsi: '',
    linkYoutube: '',
    namaPengusul: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [lastSubmittedTitle, setLastSubmittedTitle] = useState('');

  const handleChange = (
    field: keyof ContributionFormData, 
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContributionForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Coordinates fallback map approximate for Banyumas sub-districts
    const kecCoords: Record<string, [number, number]> = {
      Jatilawang: [-7.5348, 109.0712],
      Sokaraja: [-7.4589, 109.3082],
      Banyumas: [-7.5142, 109.2934],
      Rawalo: [-7.5255, 109.1832],
      'Purwokerto Barat': [-7.4215, 109.2155],
      Baturraden: [-7.3115, 109.2248],
      Cilongok: [-7.4112, 109.1325],
      Sumbang: [-7.3789, 109.2612],
      Pekuncen: [-7.3512, 109.0745],
      Wangon: [-7.5189, 109.0534],
      Ajibarang: [-7.4089, 109.0762],
      Tambak: [-7.6189, 109.3982],
      Kemranjen: [-7.5812, 109.3145],
    };

    const coords = kecCoords[formData.kecamatan] || [-7.4600 + (Math.random() - 0.5) * 0.08, 109.2300 + (Math.random() - 0.5) * 0.08];

    const newItem: CulturalItem = {
      id: `warga-${Date.now()}`,
      title: formData.namaBudaya.trim(),
      category: formData.kategori as CulturalCategory,
      kecamatan: formData.kecamatan,
      desa: formData.desa.trim() || `Desa di Kec. ${formData.kecamatan}`,
      lat: coords[0],
      lng: coords[1],
      imageUrl: '/src/assets/images/hero_banyumas_culture_1792897344529.jpg',
      summary: formData.deskripsi.trim().slice(0, 140) + '...',
      historyParagraphs: [
        formData.deskripsi.trim(),
        `Tradisi ini diusulkan secara partisipatif oleh warga pegiat budaya Banyumasan (${formData.namaPengusul}) sebagai bagian dari pendataan kearifan lokal di wilayah Kecamatan ${formData.kecamatan}.`,
        'Upaya inventarisasi mandiri ini mencerminkan semangat Cablaka dan gotong-royong masyarakat Lembah Serayu dalam memelihara mata rantai tradisi cikal bakal desa agar tidak lekang tergerus zaman modern.'
      ],
      philosophy: {
        coreMeaning: `Warisan kearifan lokal warga ${formData.kecamatan} untuk kebersamaan hidup dan kelestarian adab pedesaan.`,
        banyumasanValues: [
          'Gotong Royong Komunal',
          'Kearifan Lokal Desa',
          'Partisipasi Warga'
        ],
        symbolicElements: [
          { symbol: 'Adat Desa', explanation: 'Aturan tidak tertulis yang menjaga kerukunan antar warga sedulur.' }
        ]
      },
      youtubeId: extractYoutubeId(formData.linkYoutube),
      youtubeTitle: `Dokumentasi Warga: ${formData.namaBudaya} Kec. ${formData.kecamatan}`,
      references: [
        { title: `Usulan Inventarisasi Budaya Komunitas Desa Kec. ${formData.kecamatan}`, source: `Kontributor: ${formData.namaPengusul}`, year: '2026' }
      ]
    };

    onAddContribution(newItem);
    setLastSubmittedTitle(formData.namaBudaya);
    setIsSubmittedSuccess(true);

    // Reset form
    setFormData({
      namaBudaya: '',
      kategori: '',
      kecamatan: '',
      desa: '',
      deskripsi: '',
      linkYoutube: '',
      namaPengusul: '',
    });
    setErrors({});
  };

  return (
    <section id="kontribusi-section" className="py-14 md:py-20 bg-[#FDFBF7] border-t border-[#2D1B0F]/10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#801B2B] tracking-wider uppercase mb-1">
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Partisipasi Komunitas Budaya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#2D1B0F] tracking-tight">
            Formulir Kontribusi Warga
          </h2>
          <p className="text-xs md:text-sm text-[#2D1B0F]/75 mt-2 font-sans">
            Apakah desa atau kecamatan Anda di Banyumas memiliki tradisi, kesenian rakyat, 
            ritual adat, atau kuliner khas yang belum terdata? Daftarkan di sini agar tampil di peta interaktif!
          </p>
        </div>

        {/* Success Alert Banner */}
        {isSubmittedSuccess && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Matur nuwun! Usulan &quot;{lastSubmittedTitle}&quot; berhasil didaftarkan.</span>
              <p className="mt-0.5 text-emerald-800 text-xs">
                Data telah langsung masuk ke peta interaktif dan katalog budaya secara otomatis. Anda dapat melihatnya sekarang di bagian atas.
              </p>
              <button
                onClick={() => setIsSubmittedSuccess(false)}
                className="mt-2 text-xs font-semibold text-emerald-700 underline cursor-pointer"
              >
                Tutup pemberitahuan
              </button>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-[#2D1B0F]/15 p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nama Budaya */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Nama Budaya / Tradisi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaBudaya}
                  onChange={(e) => handleChange('namaBudaya', e.target.value)}
                  placeholder="Contoh: Kenthongan Desa Karangnangka"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 ${
                    errors.namaBudaya 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                  }`}
                />
                {errors.namaBudaya && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.namaBudaya}
                  </p>
                )}
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Kategori Budaya <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => handleChange('kategori', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 cursor-pointer ${
                    errors.kategori 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                  }`}
                >
                  <option value="">-- Pilih Kategori --</option>
                  {CULTURAL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.kategori && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.kategori}
                  </p>
                )}
              </div>

              {/* Kecamatan */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Kecamatan <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.kecamatan}
                  onChange={(e) => handleChange('kecamatan', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 cursor-pointer ${
                    errors.kecamatan 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                  }`}
                >
                  <option value="">-- Pilih Kecamatan di Banyumas --</option>
                  {BANYUMAS_KECAMATAN_LIST.filter(k => k !== 'Semua Kecamatan').map((kec) => (
                    <option key={kec} value={kec}>
                      Kecamatan {kec}
                    </option>
                  ))}
                </select>
                {errors.kecamatan && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.kecamatan}
                  </p>
                )}
              </div>

              {/* Nama Desa */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Nama Desa / Dusun
                </label>
                <input
                  type="text"
                  value={formData.desa}
                  onChange={(e) => handleChange('desa', e.target.value)}
                  placeholder="Contoh: Desa Karangnangka RW 03"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border border-[#2D1B0F]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

            </div>

            {/* Deskripsi & Sejarah Lengkap */}
            <div>
              <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                Deskripsi, Asal-usul, & Tata Cara Tradisi <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.deskripsi}
                onChange={(e) => handleChange('deskripsi', e.target.value)}
                placeholder="Ceritakan asal-usul tradisi, waktu pelaksanaan ritual, alat musik yang digunakan, dan makna filosofis bagi masyarakat setempat..."
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 leading-relaxed ${
                  errors.deskripsi 
                    ? 'border-red-400 focus:ring-red-400' 
                    : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                }`}
              />
              {errors.deskripsi && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.deskripsi}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Link Video YouTube */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Tautan Video YouTube (Dokumenter / Pertunjukan)
                </label>
                <input
                  type="url"
                  value={formData.linkYoutube}
                  onChange={(e) => handleChange('linkYoutube', e.target.value)}
                  placeholder="Contoh: https://youtu.be/... atau https://youtube.com/..."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 ${
                    errors.linkYoutube 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                  }`}
                />
                {errors.linkYoutube && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.linkYoutube}
                  </p>
                )}
              </div>

              {/* Nama Pengusul */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-1.5 font-cinzel">
                  Nama Pengusul / Komunitas Budaya <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaPengusul}
                  onChange={(e) => handleChange('namaPengusul', e.target.value)}
                  placeholder="Contoh: Sanggar Seni Langen Budaya"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border rounded-xl focus:outline-none focus:ring-1 ${
                    errors.namaPengusul 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-[#2D1B0F]/20 focus:ring-[#D4AF37]'
                  }`}
                />
                {errors.namaPengusul && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.namaPengusul}
                  </p>
                )}
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D1B0F] text-[#FDFBF7] font-semibold text-xs sm:text-sm hover:bg-[#801B2B] transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Kirimkan Usulan Budaya</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
