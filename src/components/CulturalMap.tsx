import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CulturalItem, CulturalCategory, BANYUMAS_KECAMATAN_LIST, CULTURAL_CATEGORIES } from '../data/culturalData';
import { MapPin, ExternalLink, Compass, Layers, Eye } from 'lucide-react';

interface CulturalMapProps {
  items: CulturalItem[];
  selectedKecamatan: string;
  onSelectKecamatan: (kec: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectCulture: (item: CulturalItem) => void;
  focusedCultureId?: string | null;
}

export const CulturalMap: React.FC<CulturalMapProps> = ({
  items,
  selectedKecamatan,
  onSelectKecamatan,
  selectedCategory,
  onSelectCategory,
  onSelectCulture,
  focusedCultureId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Banyumas center coordinate: ~ -7.47, 109.24
    const map = L.map(mapContainerRef.current, {
      center: [-7.46, 109.23],
      zoom: 11,
      minZoom: 9,
      maxZoom: 18,
      scrollWheelZoom: true,
    });

    // OpenStreetMap standard tiles (completely free, no API key required, crisp topography of Banyumas & Serayu river)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers whenever items change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    items.forEach((item) => {
      // Pick icon color according to category
      let badgeColor = '#D4AF37'; // gold default
      let iconSymbol = '🎭';
      if (item.category === 'Upacara Adat') {
        badgeColor = '#801B2B';
        iconSymbol = '🕯️';
      } else if (item.category === 'Kuliner & Kerajinan') {
        badgeColor = '#B8621B';
        iconSymbol = '🍲';
      } else if (item.category === 'Sejarah & Cagar Budaya') {
        badgeColor = '#2F5233';
        iconSymbol = '🏛️';
      }

      const customIcon = L.divIcon({
        className: 'custom-banyumas-marker',
        html: `
          <div style="
            position: relative;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #2D1B0F;
            border: 2px solid ${badgeColor};
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(45, 27, 15, 0.45);
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="font-size: 16px; user-select: none;">${iconSymbol}</span>
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid #2D1B0F;
            "></div>
          </div>
        `,
        iconSize: [36, 42],
        iconAnchor: [18, 40],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);

      // Popup content matching specification: Foto, Nama Budaya, dan tombol "Lihat Detail & Video YouTube"
      const popupHtml = `
        <div style="width: 260px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="position: relative; width: 100%; height: 130px; overflow: hidden; border-top-left-radius: 12px; border-top-right-radius: 12px; background: #2D1B0F;">
            <img 
              src="${item.imageUrl}" 
              alt="${item.title}" 
              style="width: 100%; height: 100%; object-fit: cover;"
              onerror="this.style.display='none'"
            />
            <div style="position: absolute; top: 8px; left: 8px; background: rgba(45, 27, 15, 0.85); color: #D4AF37; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(212, 175, 55, 0.5);">
              ${item.category}
            </div>
          </div>
          <div style="padding: 12px 14px 14px;">
            <div style="font-size: 11px; color: #801B2B; font-weight: 600; text-transform: uppercase; margin-bottom: 2px;">
              Kec. ${item.kecamatan}
            </div>
            <h4 style="margin: 0; font-family: 'Cinzel', serif; font-size: 15px; font-weight: 700; color: #2D1B0F; line-height: 1.25;">
              ${item.title}
            </h4>
            <p style="margin: 6px 0 12px; font-size: 12px; color: #55443B; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${item.summary}
            </p>
            <button 
              id="btn-popup-${item.id}"
              style="
                width: 100%;
                background-color: #2D1B0F;
                color: #FDFBF7;
                border: 1px solid #D4AF37;
                padding: 7px 10px;
                font-size: 11px;
                font-weight: 600;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
              "
            >
              <span>Lihat Detail & Video YouTube</span>
              <span style="color: #D4AF37;">→</span>
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Attach button event listener when popup opens
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${item.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectCulture(item);
          };
        }
      });

      markersRef.current[item.id] = marker;
    });

    // Fit bounds if markers exist
    if (items.length > 0 && map) {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.18));
    }
  }, [items, onSelectCulture]);

  // Handle focusing culture from external selection
  useEffect(() => {
    if (!focusedCultureId || !mapInstanceRef.current) return;
    const targetMarker = markersRef.current[focusedCultureId];
    if (targetMarker) {
      mapInstanceRef.current.flyTo(targetMarker.getLatLng(), 13, { duration: 1.2 });
      setTimeout(() => {
        targetMarker.openPopup();
      }, 700);
    }
  }, [focusedCultureId]);

  return (
    <section id="peta-section" className="py-12 md:py-16 bg-[#FDFBF7] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#801B2B] tracking-wider uppercase mb-1">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Geospasial Budaya Tradisional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cinzel text-[#2D1B0F] tracking-tight">
              Peta Persebaran Budaya Banyumas
            </h2>
            <p className="text-sm md:text-base text-[#2D1B0F]/70 mt-1 max-w-2xl font-sans">
              Klik setiap pin penanda di peta untuk melihat ringkasan tradisi di kecamatan setempat, 
              atau klik tombol untuk membedah sejarah lengkap dan tayangan video dokumenter.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-[#2D1B0F]/60">
              Menampilkan <span className="font-semibold text-[#2D1B0F] tabular-nums">{items.length}</span> tradisi
            </span>
            <button
              onClick={() => {
                onSelectKecamatan('Semua Kecamatan');
                onSelectCategory('all');
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([-7.46, 109.23], 11);
                }
              }}
              className="px-3 py-1.5 text-xs font-medium text-[#2D1B0F] bg-white border border-[#2D1B0F]/20 rounded-md hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              Reset Tampilan Peta
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-[#F5EFEB] p-4 rounded-xl border border-[#2D1B0F]/10 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Kecamatan Dropdown Selector */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#801B2B] shrink-0" />
            <label htmlFor="kecamatan-map-select" className="text-xs font-semibold text-[#2D1B0F] whitespace-nowrap">
              Kecamatan:
            </label>
            <select
              id="kecamatan-map-select"
              value={selectedKecamatan}
              onChange={(e) => onSelectKecamatan(e.target.value)}
              className="bg-white text-xs font-medium text-[#2D1B0F] border border-[#2D1B0F]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] w-full md:w-56 cursor-pointer"
            >
              {BANYUMAS_KECAMATAN_LIST.map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter Tabs */}
          <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#2D1B0F] text-[#FDFBF7] shadow-sm'
                  : 'bg-white text-[#2D1B0F]/80 hover:text-[#2D1B0F] border border-[#2D1B0F]/10'
              }`}
            >
              Semua Kategori
            </button>
            {CULTURAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D1B0F] text-[#FDFBF7] shadow-sm'
                    : 'bg-white text-[#2D1B0F]/80 hover:text-[#2D1B0F] border border-[#2D1B0F]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Map Container & Quick Side Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Leaflet Map View */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-lg relative h-[480px] md:h-[540px]">
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Map Legend Overlay in bottom left */}
            <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-[#2D1B0F]/15 rounded-lg p-3 shadow-md text-[11px] hidden sm:block">
              <div className="font-semibold text-[#2D1B0F] mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Legenda Kategori</span>
              </div>
              <div className="space-y-1 text-[#2D1B0F]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                  <span>Seni Pertunjukan (Ebeg, Calung, Kenthongan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#801B2B]" />
                  <span>Upacara Adat (Cowongan, Begalan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B8621B]" />
                  <span>Kuliner & Kerajinan (Batik, Gethuk, Mendoan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F5233]" />
                  <span>Sejarah & Cagar Budaya (Saka Tunggal, Baturraden)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Locator Rail */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-[480px] md:h-[540px] bg-[#F5EFEB]/70 rounded-2xl border border-[#2D1B0F]/15 p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D1B0F]/10">
              <span className="text-xs font-bold text-[#2D1B0F] uppercase tracking-wider font-cinzel">
                Daftar Lokasi Pin
              </span>
              <span className="text-[11px] text-[#2D1B0F]/60">
                Klik untuk sorot
              </span>
            </div>

            <div className="overflow-y-auto space-y-2.5 pr-1 mt-3 flex-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const marker = markersRef.current[item.id];
                    if (marker && mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo(marker.getLatLng(), 13, { duration: 1 });
                      setTimeout(() => marker.openPopup(), 600);
                    }
                  }}
                  className="bg-white p-3 rounded-xl border border-[#2D1B0F]/10 hover:border-[#D4AF37] hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold text-[#801B2B] uppercase">
                      {item.kecamatan}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCulture(item);
                      }}
                      className="text-[10px] text-[#D4AF37] hover:text-[#2D1B0F] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      Detail
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-[#2D1B0F] font-cinzel mt-1 group-hover:text-[#801B2B] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#2D1B0F]/70 line-clamp-1 mt-0.5">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
