'use client';
import { useCallback, useState } from 'react';
import { Minus, Plus, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cartTotal, itemCount } from '@/lib/cart';
import { createCheckout } from '@/lib/checkout';
import { productById, formatMoney, commerce } from '@/config/products';
import { Modal } from '@/components/ui/Modal';
import { BunnyArt } from '@/components/ui/BunnyArt';
export function CartDrawer() {
  const { items, cartOpen, setCartOpen, setQuantity, remove } = useStore();
  const [message, setMessage] = useState('');
  const close = useCallback(() => { setCartOpen(false); setMessage(''); }, [setCartOpen]);
  const total = cartTotal(items);
  async function checkout() { const result = await createCheckout(items); if (result.status === 'redirect') window.location.assign(result.url); else setMessage(result.message); }
  return <Modal open={cartOpen} close={close} title={`Your bag (${itemCount(items)})`} drawer>
    {items.length ? <>
      <p className="cart-intro">Good choices. Great creations ahead.</p>
      <div className="cart-items">{items.map(item => {
        const product = productById(item.id); if (!product) return null;
        return <article className="cart-item" key={item.id}>
          <div className="cart-art" style={{ background: product.background }}><BunnyArt paints={product.paints} /></div>
          <div className="cart-item-info"><h3>{product.name}</h3><p>Marble Pour Kit</p><strong>{product.priceMinor === null ? 'Price to be confirmed' : formatMoney(product.priceMinor)}</strong>
            <div className="quantity-row"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={14}/></button><span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={item.quantity >= commerce.maxQuantity} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button></div><button className="icon-button" aria-label={`Remove ${product.name}`} onClick={() => remove(item.id)}><Trash2 size={17}/></button></div>
          </div>
        </article>;
      })}</div>
      <div className="cart-bottom"><div className="subtotal"><span>Subtotal</span><strong>{total === null ? 'Awaiting pricing' : formatMoney(total)}</strong></div><p className="fine-print">Pricing, delivery and payment checkout need confirmation before orders can be placed.</p><button className="button primary full" onClick={checkout}>Check checkout status <ArrowUpRight size={18}/></button><p className="checkout-message" role="status">{message}</p><button className="text-button full" onClick={close}>Keep exploring</button></div>
    </> : <div className="empty-cart"><ShoppingBag size={48}/><h3>A little empty.<br/>A lot of possibilities.</h3><p>Your next masterpiece starts with a colour.</p><a className="button primary" href="#shop" onClick={close}>Pick your drip <ArrowUpRight size={18}/></a></div>}
  </Modal>;
}
