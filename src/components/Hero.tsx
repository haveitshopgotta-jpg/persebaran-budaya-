import React from 'react';
import { MapPin, Compass, Play, Pause, Volume2, Sparkles, Music } from 'lucide-react';

interface HeroProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  audioVolume: number;
  onVolumeChange: (val: number) => void;
  onExploreMap: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isPlayingAudio,
  onToggleAudio,
  audioVolume,
  onVolumeChange,
  onExploreMap,
  onExploreCatalog,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] to-[#FDFBF7] pt-8 pb-14 md:py-16 border-b border-[#2D1B0F]/10">
      {/* Subtle traditional batik watermark accents */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2D1B0F 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#801B2B] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Warisan Adiluhung Lembah Serayu</span>
              <span aria-hidden="true">·</span>
              <span>Jawa Tengah</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold font-cinzel text-[#2D1B0F] tracking-tight leading-[1.15] text-balance">
              Jelajah Budaya <br className="hidden sm:inline" />
              <span className="text-[#801B2B] relative inline-block">
                Banyumasan
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/80 to-transparent" />
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#2D1B0F]/80 leading-relaxed font-sans max-w-2xl text-pretty">
              Peta interaktif persebaran tradisi leluhur, seni pertunjukan sakral, 
              kearifan arsitektur kayu jati, dan gastronomi otentik di 27 kecamatan 
              Kabupaten Banyumas berjiwa <span className="font-semibold text-[#2D1B0F]">Cablaka</span> yang egaliter nan bersahaja.
            </p>

            {/* Ambient Gamelan / Calung Controller Widget */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#D4AF37]/35 rounded-xl p-4 shadow-sm max-w-xl">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onToggleAudio}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#801B2B] text-white shadow-md scale-105'
                        : 'bg-[#2D1B0F] text-[#D4AF37] hover:bg-[#4A2D19]'
                    }`}
                    aria-label={isPlayingAudio ? 'Jeda alunan gamelan' : 'Putar alunan gamelan'}
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-xs font-semibold text-[#2D1B0F]">
                        Suasana Gamelan & Calung
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2D1B0F]/65 mt-0.5">
                      {isPlayingAudio ? 'Sedang mengalun • Laras Slendro Khas Banyumas' : 'Klik putar untuk menghidupkan audio tradisional'}
                    </p>
                  </div>
                </div>

                {/* Animated visualizer bars + volume */}
                <div className="flex items-center gap-4">
                  {isPlayingAudio && (
                    <div className="flex items-end gap-1 h-5 px-2" aria-hidden="true">
                      <span className="w-1 bg-[#D4AF37] rounded-full animate-[bounce_0.8s_infinite] h-3" />
                      <span className="w-1 bg-[#801B2B] rounded-full animate-[bounce_0.6s_infinite] h-5" />
                      <span className="w-1 bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite] h-4" />
                      <span className="w-1 bg-[#801B2B] rounded-full animate-[bounce_0.7s_infinite] h-2" />
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#2D1B0F]/60" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audioVolume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-16 accent-[#D4AF37] h-1.5 cursor-pointer bg-stone-200 rounded-lg"
                      aria-label="Atur volume gamelan"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreMap}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2D1B0F] text-[#FDFBF7] font-medium text-sm hover:bg-[#4A2D19] transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                Jelajah Peta Wilayah
              </button>
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#2D1B0F]/20 text-[#2D1B0F] font-medium text-sm hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#801B2B]" />
                Telusuri Katalog Tradisi
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Cultural Visual Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#2D1B0F] group">
              <img
                src="/src/assets/images/hero_banyumas_culture_1792897344529.jpg"
                alt="Pertunjukan seni tradisi tari Lengger dan instrumen calung di Pendopo Banyumas"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Artistic Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0F]/90 via-[#2D1B0F]/25 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                  Dokumentasi Budaya
                </div>
                <h2 className="text-lg font-cinzel font-bold text-white">
                  Pendopo Si Panji & Pagelaran Calung
                </h2>
                <p className="text-xs text-white/80 mt-1 line-clamp-2">
                  Harmonisasi gerak tari tradisi dan gemuruh calung wulung yang mencerminkan keteguhan batin wong Banyumas.
                </p>
              </div>
            </div>

            {/* Antique Teak Accent Tag */}
            <div className="absolute -bottom-4 -left-4 bg-[#2D1B0F] text-[#FDFBF7] border border-[#D4AF37] rounded-xl px-4 py-2.5 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
              <div>
                <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">Status Cagar Budaya</p>
                <p className="text-xs font-medium text-white">Warisan Budaya Takbenda (WBTb)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width Curatorial strip */}
        <div className="mt-12 pt-8 border-t border-[#2D1B0F]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <div className="text-2xl md:text-3xl font-bold font-cinzel text-[#801B2B] tabular-nums">9+</div>
            <div className="text-xs text-[#2D1B0F]/70 font-medium mt-0.5">Tradisi & Kesenian Wajib</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-cinzel text-[#2D1B0F] tabular-nums">27</div>
            <div className="text-xs text-[#2D1B0F]/70 font-medium mt-0.5">Kecamatan Persebaran</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-cinzel text-[#D4AF37] tabular-nums">1288 M</div>
            <div className="text-xs text-[#2D1B0F]/70 font-medium mt-0.5">Jejak Sejarah Saka Tunggal</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-cinzel text-[#2D1B0F] tabular-nums">100%</div>
            <div className="text-xs text-[#2D1B0F]/70 font-medium mt-0.5">Dokumentasi Audio & Video</div>
          </div>
        </div>

      </div>
    </section>
  );
};
