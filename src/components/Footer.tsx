import React from 'react';
import { Compass, Landmark, BookMarked, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F140A] text-[#FDFBF7] border-t border-[#D4AF37]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <span className="text-xl font-bold font-cinzel text-white">
                Peta Budaya Banyumas
              </span>
            </div>
            <p className="text-xs text-[#FDFBF7]/70 leading-relaxed font-sans max-w-sm">
              Inisiatif digital preservasi dan visualisasi geospasial warisan budaya, 
              seni pertunjukan tradisi, dan kearifan lokal di 27 kecamatan Kabupaten Banyumas, Jawa Tengah.
            </p>
          </div>

          {/* References & Institutional Partners */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-cinzel mb-2 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              <span>Sumber & Rujukan Resmi</span>
            </h4>
            <ul className="text-xs text-[#FDFBF7]/75 space-y-1.5 font-sans">
              <li>• Dinporabudpar Kabupaten Banyumas</li>
              <li>• Balai Pelestarian Kebudayaan (BPK) Wilayah X</li>
              <li>• Pusat Studi Kebudayaan Universitas Jenderal Soedirman</li>
              <li>• Babad Banyumas & Koleksi Museum Wayang Sendang Mas</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-cinzel mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Navigasi Cepat</span>
            </h4>
            <ul className="text-xs text-[#FDFBF7]/75 space-y-1.5 font-sans">
              <li>
                <a href="#peta-section" className="hover:text-[#D4AF37] transition-colors">
                  Peta Persebaran Interaktif
                </a>
              </li>
              <li>
                <a href="#katalog-section" className="hover:text-[#D4AF37] transition-colors">
                  Katalog Kesenian & Tradisi
                </a>
              </li>
              <li>
                <a href="#nilai-section" className="hover:text-[#D4AF37] transition-colors">
                  Filosofi Cablaka & Prasaja
                </a>
              </li>
              <li>
                <a href="#kontribusi-section" className="hover:text-[#D4AF37] transition-colors">
                  Formulir Usulan Warga
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & appreciation */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF7]/60">
          <p>© {new Date().getFullYear()} Peta & Persebaran Budaya Kabupaten Banyumas. Dilestarikan untuk Generasi Penerus Bangsa.</p>
          <div className="flex items-center gap-1 text-[#D4AF37]">
            <Heart className="w-3.5 h-3.5 fill-current text-[#801B2B]" />
            <span>Tresna Budaya Banyumas</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
