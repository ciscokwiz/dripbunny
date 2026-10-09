'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { commerce, productById } from '@/config/products';
import { customKitId, parseConfiguration } from '@/lib/custom-kit';
import type { CartItem, CustomConfiguration, VariantId } from '@/types/product';
interface Store {
  variant: VariantId; items: CartItem[]; cartOpen: boolean;
  selectVariant: (id: VariantId) => void;
  add: (id: VariantId) => void;
  addCustom: (configuration: CustomConfiguration) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  setCartOpen: (open: boolean) => void;
}
function addItem(items: CartItem[], item: CartItem): CartItem[] {
  return items.some(existing => existing.id === item.id) ? items.map(existing => existing.id === item.id ? { ...existing, quantity: Math.min(existing.quantity + 1, commerce.maxQuantity) } : existing) : [...items, item];
}
export function restoreCart(value: unknown): CartItem[] {
  if (!value || typeof value !== 'object' || !('items' in value) || !Array.isArray(value.items)) return [];
  const items: CartItem[] = [];
  for (const entry of value.items) {
    if (typeof entry !== 'object' || entry === null) continue;
    const item = entry as Record<string, unknown>;
    if (typeof item.quantity !== 'number' || !Number.isFinite(item.quantity) || item.quantity < 1) continue;
    const quantity = Math.min(commerce.maxQuantity, Math.floor(item.quantity));
    const configuration = parseConfiguration(item.configuration);
    if (configuration) {
      const id = customKitId(configuration);
      if (!items.some(i => i.id === id)) items.push({ id, quantity, configuration });
    } else if (item.configuration === undefined && typeof item.id === 'string') {
      const product = productById(item.id);
      if (product && !items.some(i => i.id === product.id)) items.push({ id: product.id, quantity });
    }
  }
  return items;
}
export const useStore = create<Store>()(persist(set => ({
  variant: 'ruby', items: [], cartOpen: false,
  selectVariant: variant => set({ variant }),
  add: id => set(state => ({ cartOpen: true, items: addItem(state.items, { id, quantity: 1 }) })),
  addCustom: value => {
    const configuration = parseConfiguration(value);
    if (!configuration) return;
    set(state => ({ cartOpen: true, items: addItem(state.items, { id: customKitId(configuration), quantity: 1, configuration }) }));
  },
  setQuantity: (id, quantity) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(Math.floor(quantity) || 1, commerce.maxQuantity)) } : item) })),
  remove: id => set(state => ({ items: state.items.filter(item => item.id !== id) })),
  setCartOpen: cartOpen => set({ cartOpen }),
}), { name: 'drip-bunny-bag-v1', skipHydration: true, partialize: state => ({ items: state.items }), merge: (persisted, current) => ({ ...current, items: restoreCart(persisted) }) }));
