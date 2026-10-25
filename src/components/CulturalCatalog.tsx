import React from 'react';
import { CulturalItem, CulturalCategory, BANYUMAS_KECAMATAN_LIST, CULTURAL_CATEGORIES } from '../data/culturalData';
import { Search, MapPin, Film, BookOpen, ArrowUpRight, Sparkles, X } from 'lucide-react';

interface CulturalCatalogProps {
  items: CulturalItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedKecamatan: string;
  onSelectKecamatan: (kec: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectCulture: (item: CulturalItem) => void;
  onFocusOnMap: (item: CulturalItem) => void;
}

export const CulturalCatalog: React.FC<CulturalCatalogProps> = ({
  items,
  searchQuery,
  onSearchChange,
  selectedKecamatan,
  onSelectKecamatan,
  selectedCategory,
  onSelectCategory,
  onSelectCulture,
  onFocusOnMap,
}) => {
  return (
    <section id="katalog-section" className="py-14 md:py-20 bg-[#F5EFEB]/40 border-t border-[#2D1B0F]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#801B2B] tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Katalog Komprehensif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#2D1B0F] tracking-tight">
            Katalog Warisan Budaya Banyumasan
          </h2>
          <p className="text-sm md:text-base text-[#2D1B0F]/75 mt-2 font-sans">
            Eksplorasi dokumentasi mendalam mulai dari kesenian rakyat legendaris, 
            ritual sakral siklus hidup, hingga seni kriya batik dan tradisi gastronomi warisan para leluhur.
          </p>
        </div>

        {/* Filter & Search Bar Cluster */}
        <div className="bg-white rounded-2xl p-5 border border-[#2D1B0F]/15 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input with Icon & Clear button */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-[#2D1B0F]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari budaya, kesenian, nilai filosofis, atau kecamatan (misal: Ebeg, Lengger, Cowongan)..."
                className="w-full pl-10 pr-10 py-2.5 text-xs md:text-sm text-[#2D1B0F] bg-[#FDFBF7] border border-[#2D1B0F]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder:text-[#2D1B0F]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Kecamatan Selector */}
            <div className="md:col-span-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#801B2B] shrink-0 hidden sm:block" />
              <select
                aria-label="Pilih Kecamatan"
                value={selectedKecamatan}
                onChange={(e) => onSelectKecamatan(e.target.value)}
                className="w-full py-2.5 px-3 text-xs md:text-sm text-[#2D1B0F] bg-[#FDFBF7] border border-[#2D1B0F]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
              >
                {BANYUMAS_KECAMATAN_LIST.map((kec) => (
                  <option key={kec} value={kec}>
                    {kec === 'Semua Kecamatan' ? '📍 Seluruh Wilayah Banyumas' : `Kecamatan ${kec}`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#2D1B0F]/10 pb-1">
            <span className="text-xs font-semibold text-[#2D1B0F]/60 whitespace-nowrap shrink-0 mr-1">
              Kategori:
            </span>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#2D1B0F] text-[#FDFBF7]'
                  : 'bg-[#FDFBF7] text-[#2D1B0F]/70 hover:text-[#2D1B0F] border border-[#2D1B0F]/10'
              }`}
            >
              Semua ({items.length})
            </button>
            {CULTURAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D1B0F] text-[#FDFBF7]'
                    : 'bg-[#FDFBF7] text-[#2D1B0F]/70 hover:text-[#2D1B0F] border border-[#2D1B0F]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Culture Cards Grid */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#2D1B0F]/10 p-12 text-center max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-[#2D1B0F]">
              Tidak Ada Budaya Ditemukan
            </h3>
            <p className="text-xs text-[#2D1B0F]/70 mt-1">
              Tidak ada data yang cocok dengan kata kunci &quot;{searchQuery}&quot; atau filter yang dipilih.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectKecamatan('Semua Kecamatan');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#2D1B0F] text-white rounded-lg hover:bg-[#4A2D19] transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectCulture(item)}
                className="bg-white rounded-2xl border border-[#2D1B0F]/15 overflow-hidden card-heritage-hover flex flex-col cursor-pointer group"
              >
                {/* Visual Image with Fallback */}
                <div className="relative h-52 overflow-hidden bg-[#2D1B0F]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle category tag badge with calm aesthetic */}
                  <div className="absolute top-3 left-3 bg-[#2D1B0F]/90 backdrop-blur-sm text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#D4AF37]/40">
                    {item.category}
                  </div>

                  {/* Video indicator badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                    <Film className="w-3 h-3 text-red-400" />
                    <span>YouTube HD</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Zero-Pill Unboxed Metadata as mandated by Constitution */}
                    <div className="flex items-center gap-1.5 text-xs text-[#801B2B] font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Kecamatan {item.kecamatan}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-[#2D1B0F]/60 font-normal">{item.desa}</span>
                    </div>

                    <h3 className="text-xl font-bold font-cinzel text-[#2D1B0F] group-hover:text-[#801B2B] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#2D1B0F]/75 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                      {item.summary}
                    </p>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="mt-6 pt-4 border-t border-[#2D1B0F]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label={`Lihat ${item.title} di peta`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFocusOnMap(item);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-[#2D1B0F]/70 hover:text-[#2D1B0F] font-medium transition-colors cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] pointer-events-none" />
                      <span>Lihat di Peta</span>
                    </button>

                    <button
                      type="button"
                      aria-label={`Lihat detail ${item.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCulture(item);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2D1B0F] rounded-lg group-hover:bg-[#801B2B] transition-colors cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5 pointer-events-none" />
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
