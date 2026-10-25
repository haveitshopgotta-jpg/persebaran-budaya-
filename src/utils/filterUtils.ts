import { CulturalItem, CulturalCategory } from '../data/culturalData';

export interface FilterState {
  searchQuery: string;
  selectedKecamatan: string;
  selectedCategory: string; // 'all' or CulturalCategory
}

export function filterCulturalItems(
  items: CulturalItem[],
  filters: FilterState
): CulturalItem[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // 1. Kecamatan Filter
    if (filters.selectedKecamatan && filters.selectedKecamatan !== 'Semua Kecamatan') {
      const matchKecamatan = 
        item.kecamatan.toLowerCase().includes(filters.selectedKecamatan.toLowerCase()) ||
        item.kecamatan.includes('Seluruh Kecamatan') ||
        (filters.selectedKecamatan === 'Seluruh Kecamatan (Merata)' && item.kecamatan.includes('Seluruh'));
      if (!matchKecamatan) return false;
    }

    // 2. Category Filter
    if (filters.selectedCategory && filters.selectedCategory !== 'all') {
      if (item.category !== filters.selectedCategory) return false;
    }

    // 3. Search Query (matches title, summary, kecamatan, desa, philosophy, or keywords)
    if (query) {
      const titleMatch = item.title.toLowerCase().includes(query);
      const summaryMatch = item.summary.toLowerCase().includes(query);
      const kecamatanMatch = item.kecamatan.toLowerCase().includes(query);
      const desaMatch = item.desa.toLowerCase().includes(query);
      const historyMatch = item.historyParagraphs.some((p) => p.toLowerCase().includes(query));
      const valueMatch = item.philosophy.banyumasanValues.some((v) => v.toLowerCase().includes(query));
      if (!titleMatch && !summaryMatch && !kecamatanMatch && !desaMatch && !historyMatch && !valueMatch) {
        return false;
      }
    }

    return true;
  });
}

export interface ContributionFormData {
  namaBudaya: string;
  kategori: CulturalCategory | '';
  kecamatan: string;
  desa: string;
  deskripsi: string;
  linkYoutube: string;
  namaPengusul: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContributionForm(data: ContributionFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.namaBudaya || data.namaBudaya.trim().length < 3) {
    errors.namaBudaya = 'Nama budaya minimal harus 3 karakter.';
  }

  if (!data.kategori) {
    errors.kategori = 'Pilih kategori budaya.';
  }

  if (!data.kecamatan || data.kecamatan === 'Semua Kecamatan') {
    errors.kecamatan = 'Pilih kecamatan yang sesuai di Banyumas.';
  }

  if (!data.deskripsi || data.deskripsi.trim().length < 20) {
    errors.deskripsi = 'Deskripsi budaya minimal harus 20 karakter.';
  }

  if (!data.namaPengusul || data.namaPengusul.trim().length < 2) {
    errors.namaPengusul = 'Nama pengusul wajib diisi.';
  }

  if (data.linkYoutube && data.linkYoutube.trim().length > 0) {
    const isYoutubeLink = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,15})/.test(
      data.linkYoutube.trim()
    );
    if (!isYoutubeLink) {
      errors.linkYoutube = 'Format tautan YouTube tidak valid (contoh: https://youtu.be/... atau https://youtube.com/watch?v=...)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function extractYoutubeId(urlOrId: string): string {
  if (!urlOrId) return 'Zq1fF_x8h08';
  const match = urlOrId.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,15})/);
  if (match && match[1]) {
    return match[1];
  }
  return urlOrId.length >= 8 && !urlOrId.includes('/') ? urlOrId : 'Zq1fF_x8h08';
}
