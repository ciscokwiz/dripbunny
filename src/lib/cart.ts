import { productById } from '@/config/products';
import type { CartItem } from '@/types/product';
export function cartTotal(items: readonly CartItem[]): number | null {
  if (!items.length) return 0;
  let total = 0;
  for (const item of items) {
    const product = productById(item.id);
    if (!product || product.priceMinor === null) return null;
    total += product.priceMinor * item.quantity;
  }
  return total;
}
export function itemCount(items: readonly CartItem[]) { return items.reduce((count, item) => count + item.quantity, 0); }
