// Entry point – re-exports card modules and registers customCards
export * from './universal-remote-card';
export * from './android-tv-card';
export * from './editor';

// Register with HA card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'universal-remote-card',
  name: 'Universal Remote Card',
  description: 'Universal remote control card – Fire TV, Android TV, Apple TV, and more',
  preview: true,
  documentationURL: 'https://github.com/your-org/Fire-Tv#readme',
});
