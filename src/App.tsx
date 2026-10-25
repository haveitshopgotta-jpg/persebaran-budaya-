import React, { useState, useMemo } from 'react';
import { CULTURAL_ITEMS, CulturalItem } from './data/culturalData';
import { filterCulturalItems } from './utils/filterUtils';
import { gamelanAmbientPlayer } from './utils/audioSynth';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CulturalMap } from './components/CulturalMap';
import { CulturalCatalog } from './components/CulturalCatalog';
import { PhilosophySection } from './components/PhilosophySection';
import { ContributionForm } from './components/ContributionForm';
import { CultureModal } from './components/CultureModal';
import { Footer } from './components/Footer';

export default function App() {
  const [items, setItems] = useState<CulturalItem[]>(CULTURAL_ITEMS);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Semua Kecamatan');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCulture, setSelectedCulture] = useState<CulturalItem | null>(null);
  const [focusedCultureId, setFocusedCultureId] = useState<string | null>(null);

  // Audio synthesizer state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.45);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      gamelanAmbientPlayer.pause();
      setIsPlayingAudio(false);
    } else {
      gamelanAmbientPlayer.play();
      setIsPlayingAudio(true);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setAudioVolume(vol);
    gamelanAmbientPlayer.setVolume(vol);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Focus culture on map
  const handleFocusOnMap = (item: CulturalItem) => {
    setFocusedCultureId(item.id);
    scrollToSection('peta-section');
  };

  // Add contribution from citizen form
  const handleAddContribution = (newItem: CulturalItem) => {
    setItems((prev) => [newItem, ...prev]);
    // Also select and highlight it
    setFocusedCultureId(newItem.id);
    scrollToSection('peta-section');
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return filterCulturalItems(items, {
      searchQuery,
      selectedKecamatan,
      selectedCategory,
    });
  }, [items, searchQuery, selectedKecamatan, selectedCategory]);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D1B0F] selection:bg-[#D4AF37]/30">
      
      {/* 1. Header (conforming strictly to 3-zone contract) */}
      <Header
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        onNavigate={scrollToSection}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* 2. Hero Section with Gamelan synthesizer and cultural banner */}
        <Hero
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={toggleAudio}
          audioVolume={audioVolume}
          onVolumeChange={handleVolumeChange}
          onExploreMap={() => scrollToSection('peta-section')}
          onExploreCatalog={() => scrollToSection('katalog-section')}
        />

        {/* 3. Interactive Leaflet Map Section */}
        <CulturalMap
          items={filteredItems}
          selectedKecamatan={selectedKecamatan}
          onSelectKecamatan={setSelectedKecamatan}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectCulture={setSelectedCulture}
          focusedCultureId={focusedCultureId}
        />

        {/* 4. Cultural Catalog Section with Cards, Search, and Category tabs */}
        <CulturalCatalog
          items={filteredItems}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedKecamatan={selectedKecamatan}
          onSelectKecamatan={setSelectedKecamatan}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectCulture={setSelectedCulture}
          onFocusOnMap={handleFocusOnMap}
        />

        {/* 5. Philosophy & Cultural Values Section (Cablaka, Egaliter, Guyub Rukun) */}
        <PhilosophySection />

        {/* 6. Citizen Contribution Form */}
        <ContributionForm onAddContribution={handleAddContribution} />

      </main>

      {/* 7. Detailed Culture Modal Dialog */}
      <CultureModal
        item={selectedCulture}
        onClose={() => setSelectedCulture(null)}
      />

      {/* 8. Institutional Footer */}
      <Footer />

    </div>
  );
}
