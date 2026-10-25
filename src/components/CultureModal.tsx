import React, { useState, useEffect } from 'react';
import { CulturalItem } from '../data/culturalData';
import { 
  X, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  Film, 
  GraduationCap, 
  ExternalLink, 
  Share2,
  Check
} from 'lucide-react';

interface CultureModalProps {
  item: CulturalItem | null;
  onClose: () => void;
}

type ModalTab = 'sejarah' | 'filosofi' | 'video' | 'referensi';

export const CultureModal: React.FC<CultureModalProps> = ({ item, onClose }) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('sejarah');
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab when item changes
  useEffect(() => {
    setActiveTab('sejarah');
    setCopiedLink(false);
  }, [item]);

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#1F140A]/75 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header with Visual Imagery */}
        <div className="relative h-44 sm:h-56 md:h-64 bg-[#2D1B0F] overflow-hidden shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0F] via-[#2D1B0F]/60 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Tutup jendela detail budaya"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-[#801B2B] flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            aria-label="Bagikan budaya ini"
            className="absolute top-4 right-16 z-20 h-9 px-3 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center gap-1.5 text-xs transition-colors cursor-pointer border border-white/20"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-300">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Bagikan</span>
              </>
            )}
          </button>

          {/* Header Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] mb-1">
              <span className="bg-[#801B2B] text-white px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                {item.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-white/90">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                Kecamatan {item.kecamatan} ({item.desa})
              </span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold font-cinzel text-white leading-tight">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-[#F5EFEB] border-b border-[#2D1B0F]/10 px-4 md:px-6 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('sejarah')}
            className={`py-3 px-3 text-xs md:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'sejarah'
                ? 'border-[#801B2B] text-[#801B2B]'
                : 'border-transparent text-[#2D1B0F]/70 hover:text-[#2D1B0F]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Asal-usul & Sejarah</span>
          </button>

          <button
            onClick={() => setActiveTab('filosofi')}
            className={`py-3 px-3 text-xs md:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'filosofi'
                ? 'border-[#801B2B] text-[#801B2B]'
                : 'border-transparent text-[#2D1B0F]/70 hover:text-[#2D1B0F]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Makna Filosofis</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`py-3 px-3 text-xs md:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'video'
                ? 'border-[#801B2B] text-[#801B2B]'
                : 'border-transparent text-[#2D1B0F]/70 hover:text-[#2D1B0F]'
            }`}
          >
            <Film className="w-4 h-4 text-red-600" />
            <span>Video YouTube</span>
          </button>

          <button
            onClick={() => setActiveTab('referensi')}
            className={`py-3 px-3 text-xs md:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'referensi'
                ? 'border-[#801B2B] text-[#801B2B]'
                : 'border-transparent text-[#2D1B0F]/70 hover:text-[#2D1B0F]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Sumber Akademis</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ASAL-USUL & SEJARAH (MINIMAL 2-3 PARAGRAF MENDALAM) */}
          {activeTab === 'sejarah' && (
            <div className="space-y-5 text-[#2D1B0F]">
              <div className="p-4 rounded-xl bg-[#F5EFEB]/70 border border-[#D4AF37]/30 text-sm font-medium text-[#2D1B0F]/90 italic font-playfair">
                &ldquo;{item.summary}&rdquo;
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#2D1B0F]/85 font-sans">
                {item.historyParagraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#801B2B] first-letter:float-left first-letter:mr-3 first-letter:leading-none" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#2D1B0F]/10 flex items-center justify-between text-xs text-[#2D1B0F]/60">
                <span>Pusat Budaya: {item.desa}, Kec. {item.kecamatan}</span>
                <span>Koordinat: {item.lat.toFixed(4)}, {item.lng.toFixed(4)}</span>
              </div>
            </div>
          )}

          {/* TAB 2: MAKNA FILOSOFIS & NILAI TRADISI */}
          {activeTab === 'filosofi' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#801B2B] uppercase tracking-wider mb-1 font-cinzel">
                  Intisari Filosofis
                </h4>
                <p className="text-base md:text-lg font-serif font-medium text-[#2D1B0F] italic">
                  &ldquo;{item.philosophy.coreMeaning}&rdquo;
                </p>
              </div>

              {/* Nilai-nilai Ke-Banyumasan */}
              <div>
                <h4 className="text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-3 font-cinzel">
                  Pilar Karakter Wong Banyumas (Penginyongan)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {item.philosophy.banyumasanValues.map((val, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#F5EFEB] p-3.5 rounded-xl border border-[#D4AF37]/35 text-xs text-[#2D1B0F]/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block mr-2" />
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Simbol & Makna Ritual */}
              <div>
                <h4 className="text-xs font-bold text-[#2D1B0F] uppercase tracking-wider mb-3 font-cinzel">
                  Elemen Simbolik & Peralatan Tradisi
                </h4>
                <div className="space-y-3">
                  {item.philosophy.symbolicElements.map((elem, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-[#2D1B0F]/10 flex flex-col sm:flex-row sm:items-start gap-2"
                    >
                      <span className="font-semibold text-xs text-[#801B2B] sm:w-48 shrink-0">
                        {elem.symbol}
                      </span>
                      <p className="text-xs text-[#2D1B0F]/80 leading-relaxed font-sans">
                        {elem.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EMBEDDED PLAYER VIDEO YOUTUBE */}
          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-cinzel text-[#2D1B0F]">
                    {item.youtubeTitle}
                  </h4>
                  <p className="text-xs text-[#2D1B0F]/65 mt-0.5">
                    Dokumentasi audiovisual pertunjukan asli dari tanah Banyumas
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#801B2B] hover:underline font-semibold"
                >
                  <span>Buka di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* YouTube Iframe Embed Frame */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#2D1B0F] shadow-lg bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=0&rel=0`}
                  title={item.youtubeTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-3 bg-[#F5EFEB] rounded-xl text-xs text-[#2D1B0F]/70">
                <p>
                  * Catatan Kuratorial: Tayangan ini merekam pagelaran otentik warga lokal Banyumas dalam rangka pelestarian kesenian rakyat Lembah Serayu.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SUMBER / REFERENSI AKADEMIS & HISTORIS */}
          {activeTab === 'referensi' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#801B2B] uppercase tracking-wider mb-1 font-cinzel">
                  Daftar Pustaka & Verifikasi Ilmiah
                </h4>
                <p className="text-xs text-[#2D1B0F]/70">
                  Data kebudayaan ini divalidasi berdasarkan sumber akademis, arsip cagar budaya, serta publikasi resmi Dinas Kepemudaan, Olahraga, Kebudayaan, dan Pariwisata (Dinporabudpar) Kabupaten Banyumas.
                </p>
              </div>

              <div className="space-y-3">
                {item.references.map((ref, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-[#2D1B0F]/15 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-[#2D1B0F]">
                        {ref.title}
                      </h5>
                      <p className="text-[11px] text-[#801B2B] mt-0.5 font-medium">
                        {ref.source}
                      </p>
                    </div>
                    {ref.year && (
                      <span className="text-xs text-stone-500 font-mono shrink-0">
                        Tahun {ref.year}
                      </span>
                    )}
                  </div>
                ))}

                <div className="p-4 bg-white rounded-xl border border-[#2D1B0F]/15">
                  <h5 className="text-xs font-bold text-[#2D1B0F]">
                    Babad Banyumas & Naskah Mertadiredjan
                  </h5>
                  <p className="text-[11px] text-[#801B2B] mt-0.5 font-medium">
                    Koleksi Naskah Kuno Museum Sendang Mas & Perpustakaan Daerah Banyumas
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#F5EFEB] px-6 py-3.5 border-t border-[#2D1B0F]/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#2D1B0F]/65 hidden sm:inline">
            Warisan Budaya Kabupaten Banyumas
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#2D1B0F] rounded-lg hover:bg-[#4A2D19] transition-colors ml-auto cursor-pointer"
          >
            Tutup Dialog
          </button>
        </div>

      </div>
    </div>
  );
};
