import { customKitPricing, productById } from '@/config/products';
import type { CartItem } from '@/types/product';
export function cartItemUnitPrice(item: CartItem): number | null {
  if (item.configuration) {
    if (customKitPricing.blankPriceMinor === null || customKitPricing.paintSetPriceMinor === null) return null;
    return item.configuration.blanks * customKitPricing.blankPriceMinor + customKitPricing.paintSetPriceMinor;
  }
  return productById(item.id)?.priceMinor ?? null;
}
export function cartTotal(items: readonly CartItem[]): number | null {
  let total = 0;
  for (const item of items) {
    const price = cartItemUnitPrice(item);
    if (price === null) return null;
    total += price * item.quantity;
  }
  return total;
}
export function itemCount(items: readonly CartItem[]) { return items.reduce((count, item) => count + item.quantity, 0); }
