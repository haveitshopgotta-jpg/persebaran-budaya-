import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  filterCulturalItems, 
  validateContributionForm, 
  extractYoutubeId 
} from './filterUtils';
import { CULTURAL_ITEMS } from '../data/culturalData';

test('filterCulturalItems returns all items when filters are empty', () => {
  const result = filterCulturalItems(CULTURAL_ITEMS, {
    searchQuery: '',
    selectedKecamatan: 'Semua Kecamatan',
    selectedCategory: 'all'
  });
  assert.equal(result.length, CULTURAL_ITEMS.length);
});

test('filterCulturalItems filters by kecamatan correctly', () => {
  const result = filterCulturalItems(CULTURAL_ITEMS, {
    searchQuery: '',
    selectedKecamatan: 'Rawalo',
    selectedCategory: 'all'
  });
  // Should include Cowongan (Rawalo) and items present across whole kecamatan
  assert.ok(result.some(item => item.id === 'tradisi-cowongan'));
});

test('filterCulturalItems filters by category correctly', () => {
  const pertunjukan = filterCulturalItems(CULTURAL_ITEMS, {
    searchQuery: '',
    selectedKecamatan: 'Semua Kecamatan',
    selectedCategory: 'Seni Pertunjukan'
  });
  assert.ok(pertunjukan.length > 0);
  assert.ok(pertunjukan.every(item => item.category === 'Seni Pertunjukan'));
});

test('filterCulturalItems matches search query in title and description', () => {
  const result = filterCulturalItems(CULTURAL_ITEMS, {
    searchQuery: 'mendoan',
    selectedKecamatan: 'Semua Kecamatan',
    selectedCategory: 'all'
  });
  assert.ok(result.some(item => item.title.includes('Mendoan')));
});

test('validateContributionForm catches empty required fields', () => {
  const emptyResult = validateContributionForm({
    namaBudaya: '',
    kategori: '',
    kecamatan: 'Semua Kecamatan',
    desa: '',
    deskripsi: '',
    linkYoutube: '',
    namaPengusul: ''
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.namaBudaya);
  assert.ok(emptyResult.errors.kategori);
  assert.ok(emptyResult.errors.kecamatan);
  assert.ok(emptyResult.errors.deskripsi);
  assert.ok(emptyResult.errors.namaPengusul);
});

test('validateContributionForm passes with valid data', () => {
  const validResult = validateContributionForm({
    namaBudaya: 'Kenthongan Karanglewas',
    kategori: 'Seni Pertunjukan',
    kecamatan: 'Purwokerto Barat',
    desa: 'Karanglewas Kidul',
    deskripsi: 'Seni musik bambu tradisional yang dibawakan secara kolosal oleh pemuda desa.',
    linkYoutube: 'https://youtu.be/Ww2eA6lP7iQ',
    namaPengusul: 'Bambang Pamungkas'
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('extractYoutubeId extracts video IDs correctly', () => {
  assert.equal(extractYoutubeId('https://www.youtube.com/watch?v=Zq1fF_x8h08'), 'Zq1fF_x8h08');
  assert.equal(extractYoutubeId('https://youtu.be/8Y3tC9s5R1s'), '8Y3tC9s5R1s');
  assert.equal(extractYoutubeId('vG7l6oF7Y2g'), 'vG7l6oF7Y2g');
});
