import { expect, it } from 'vitest';
import { restoreCart } from '@/store/useStore';
import { customKitId, defaultConfiguration } from '@/lib/custom-kit';
it('restores existing curated bags and custom specifications together', () => {
  const configuration = { ...defaultConfiguration, blanks: 3, notes: 'Emerald paint request' };
  const restored = restoreCart({ items: [{ id: 'ruby', quantity: 2 }, { id: 'untrusted-id', quantity: 1, configuration }] });
  expect(restored).toEqual([{ id: 'ruby', quantity: 2 }, { id: customKitId(configuration), quantity: 1, configuration }]);
});
it('discards corrupt custom data without promoting it to a curated kit', () => {
  expect(restoreCart({ items: [{ id: 'ruby', quantity: 1, configuration: { ...defaultConfiguration, paints: ['oops'] } }, { id: 'custom:bad', quantity: 1 }] })).toEqual([]);
});

import { customKitPricing } from '@/config/products';
import { cartTotal } from '@/lib/cart';
it('calculates custom blank and paint set prices with bag quantity', () => {
  const old = { ...customKitPricing };
  customKitPricing.blankPriceMinor = 1000;
  customKitPricing.paintSetPriceMinor = 500;
  try { expect(cartTotal([{ id: customKitId(defaultConfiguration), quantity: 2, configuration: { ...defaultConfiguration, blanks: 3 } }])).toBe(7000); }
  finally { Object.assign(customKitPricing, old); }
});
