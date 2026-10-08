'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { commerce, productById } from '@/config/products';
import type { CartItem, VariantId } from '@/types/product';
interface Store {
  variant: VariantId; items: CartItem[]; cartOpen: boolean;
  selectVariant: (id: VariantId) => void;
  add: (id: VariantId) => void;
  setQuantity: (id: VariantId, quantity: number) => void;
  remove: (id: VariantId) => void;
  setCartOpen: (open: boolean) => void;
}
export const useStore = create<Store>()(persist((set) => ({
  variant: 'ruby', items: [], cartOpen: false,
  selectVariant: variant => set({ variant }),
  add: id => set(state => ({ cartOpen: true, items: state.items.some(item => item.id === id) ? state.items.map(item => item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, commerce.maxQuantity) } : item) : [...state.items, { id, quantity: 1 }] })),
  setQuantity: (id, quantity) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(Math.floor(quantity) || 1, commerce.maxQuantity)) } : item) })),
  remove: id => set(state => ({ items: state.items.filter(item => item.id !== id) })),
  setCartOpen: cartOpen => set({ cartOpen }),
}), { name: 'drip-bunny-bag-v1', skipHydration: true, partialize: state => ({ items: state.items }), merge: (persisted, current) => {
  const value = persisted as { items?: unknown } | undefined;
  const items: CartItem[] = [];
  if (Array.isArray(value?.items)) for (const entry of value.items) {
    if (typeof entry !== 'object' || entry === null) continue;
    const item = entry as { id?: unknown; quantity?: unknown };
    const product = typeof item.id === 'string' ? productById(item.id) : undefined;
    if (product && typeof item.quantity === 'number' && Number.isFinite(item.quantity) && item.quantity >= 1 && !items.some(i => i.id === product.id)) items.push({ id: product.id, quantity: Math.min(commerce.maxQuantity, Math.floor(item.quantity)) });
  }
  return { ...current, items };
}}));
