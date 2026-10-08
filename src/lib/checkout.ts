import type { CartItem } from '@/types/product';
export type CheckoutResult = { status: 'unavailable'; message: string } | { status: 'redirect'; url: string };
// Integration boundary: POST IDs and quantities to your server. Reprice there; never trust client totals.
export async function createCheckout(items: readonly CartItem[]): Promise<CheckoutResult> {
  if (!items.length) return { status: 'unavailable', message: 'Your bag is empty. Pick your favourite colourway first.' };
  return { status: 'unavailable', message: 'Payment checkout is not connected yet. Your selection is saved in this browser; no order has been placed.' };
}
