import type { Product } from '@/types/product';
export const commerce = { currency: 'USD', locale: 'en-US', maxQuantity: 20 } as const;
// Proposed colourway labels. Confirm names, currency and prices with the business.
export const products: readonly Product[] = [
  { id: 'ruby', name: 'Ruby Rush', note: 'A little bold. A lot of you.', description: 'Raspberry reds meet candy pinks and creamy white. For the beautifully bold.', primary: '#F34868', secondary: '#FF8BA3', accent: '#C82046', background: '#FFF0F3', paints: ['#e52d51', '#ff98b1', '#fff5e9'], priceMinor: null, image: null },
  { id: 'blue', name: 'Blue Splash', note: 'Cool colours. Wild ideas.', description: 'Icy blues, ocean swirls and a splash of white. Dive into your imagination.', primary: '#168FE8', secondary: '#88D8FF', accent: '#0759B8', background: '#EAF7FF', paints: ['#087fc8', '#8edfff', '#f4fcff'], priceMinor: null, image: null },
  { id: 'green', name: 'Green Swirl', note: 'Fresh paint. Fresh possibilities.', description: 'Emerald greens and soft mint tumble together. A fresh take on making it yours.', primary: '#27A669', secondary: '#A0E5B0', accent: '#087847', background: '#EEFAF1', paints: ['#07804b', '#90dba7', '#f1fff0'], priceMinor: null, image: null },
  { id: 'gold', name: 'Golden Drip', note: 'Your own little ray of sunshine.', description: 'Golden yellows, warm orange and creamy white. Pour a little sunshine.', primary: '#F5AC24', secondary: '#FFE283', accent: '#D47B0B', background: '#FFF7E5', paints: ['#f5b01d', '#ffdc7e', '#fff9df'], priceMinor: null, image: null },
];
export const kitContents = ['1 Bunny Figure', '3 Premium Pour Paints', '2 Mixing Cups', '1 Pair of Gloves'] as const;
export function productById(id: string) { return products.find(product => product.id === id); }
export function formatMoney(minor: number) { return new Intl.NumberFormat(commerce.locale, { style: 'currency', currency: commerce.currency }).format(minor / 100); }
