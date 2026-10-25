import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isPlayingAudio,
  onToggleAudio,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2D1B0F]/10 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg md:text-xl font-bold tracking-tight text-[#2D1B0F] font-cinzel whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
          Budaya Banyumas
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2D1B0F]/80">
          <button
            onClick={() => onNavigate('peta-section')}
            className="hover:text-[#2D1B0F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Peta Persebaran
          </button>
          <button
            onClick={() => onNavigate('katalog-section')}
            className="hover:text-[#2D1B0F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Katalog Budaya
          </button>
          <button
            onClick={() => onNavigate('nilai-section')}
            className="hover:text-[#2D1B0F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Filosofi Cablaka
          </button>
          <button
            onClick={() => onNavigate('kontribusi-section')}
            className="hover:text-[#2D1B0F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Usul Tradisi Warga
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Jeda suara gamelan' : 'Putar suara gamelan'}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#2D1B0F] text-[#FDFBF7] border-[#D4AF37]'
                : 'bg-white text-[#2D1B0F] border-[#2D1B0F]/20 hover:border-[#D4AF37]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span className="whitespace-nowrap hidden sm:inline">Gamelan Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#2D1B0F]/60" />
                <span className="whitespace-nowrap hidden sm:inline">Suasana Gamelan</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate('peta-section')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D1B0F] rounded-lg hover:bg-[#4A2D19] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Buka Peta
          </button>
        </div>
      </div>
    </header>
  );
};
