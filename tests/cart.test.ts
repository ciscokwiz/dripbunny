import { beforeEach, describe, expect, it } from 'vitest';
import { cartTotal, itemCount } from '@/lib/cart';
import { products, commerce, productById } from '@/config/products';
import { useStore } from '@/store/useStore';
import { createCheckout } from '@/lib/checkout';
describe('bag and catalogue', () => {
  beforeEach(() => useStore.setState({ items: [], cartOpen: false, variant: 'ruby' }));
  it('tracks variants separately and combines duplicate additions', () => {
    useStore.getState().add('ruby'); useStore.getState().add('blue'); useStore.getState().add('ruby');
    expect(useStore.getState().items).toEqual([{ id: 'ruby', quantity: 2 }, { id: 'blue', quantity: 1 }]);
    expect(itemCount(useStore.getState().items)).toBe(3);
  });
  it('clamps quantity and removes selected items only', () => {
    useStore.getState().add('gold'); useStore.getState().add('green');
    useStore.getState().setQuantity('gold', 999);
    expect(useStore.getState().items[0].quantity).toBe(commerce.maxQuantity);
    useStore.getState().setQuantity('gold', -4);
    expect(useStore.getState().items[0].quantity).toBe(1);
    useStore.getState().remove('gold');
    expect(useStore.getState().items).toEqual([{ id: 'green', quantity: 1 }]);
  });
  it('does not present unknown prices as free', () => {
    expect(cartTotal([])).toBe(0);
    expect(cartTotal([{ id: 'ruby', quantity: 3 }])).toBeNull();
  });
  it('calculates configured prices using integer minor units', () => {
    const original = products[0].priceMinor;
    products[0].priceMinor = 1234;
    try { expect(cartTotal([{ id: 'ruby', quantity: 3 }])).toBe(3702); }
    finally { products[0].priceMinor = original; }
  });
  it('changes the selected preview independently of the bag', () => {
    useStore.getState().selectVariant('green');
    expect(useStore.getState().variant).toBe('green');
    expect(productById('green')?.paints).toHaveLength(3);
    expect(useStore.getState().items).toEqual([]);
  });
  it('clearly reports the unavailable payment boundary', async () => {
    const result = await createCheckout([{ id: 'blue', quantity: 1 }]);
    expect(result.status).toBe('unavailable');
    if (result.status === 'unavailable') expect(result.message).toContain('no order has been placed');
  });
});
