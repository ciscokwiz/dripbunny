import type { CustomConfiguration } from '@/types/product';
export const defaultConfiguration: CustomConfiguration = { base: '#fff4e7', paints: ['#f34868', '#ffc167', '#fff4e7'], seed: 1, blanks: 1, notes: '' };
const hex = /^#[0-9a-f]{6}$/i;
export function parseConfiguration(value: unknown): CustomConfiguration | null {
  if (!value || typeof value !== 'object') return null;
  const c = value as Record<string, unknown>;
  if (typeof c.base !== 'string' || !hex.test(c.base) || !Array.isArray(c.paints) || c.paints.length !== 3 || !c.paints.every(paint => typeof paint === 'string' && hex.test(paint))) return null;
  if (typeof c.seed !== 'number' || !Number.isFinite(c.seed) || c.seed < 0 || c.seed > 100000 || typeof c.blanks !== 'number' || !Number.isInteger(c.blanks) || c.blanks < 1 || c.blanks > 10 || typeof c.notes !== 'string' || c.notes.length > 500) return null;
  return { base: c.base.toLowerCase(), paints: [c.paints[0].toLowerCase(), c.paints[1].toLowerCase(), c.paints[2].toLowerCase()], seed: Math.round(c.seed * 1000000) / 1000000, blanks: c.blanks, notes: c.notes.trim() };
}
export function customKitId(configuration: CustomConfiguration) {
  return `custom:${JSON.stringify([configuration.base, ...configuration.paints, configuration.seed, configuration.blanks, configuration.notes])}`;
}
