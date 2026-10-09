'use client';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Minus, Plus, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cartTotal, cartItemUnitPrice, itemCount } from '@/lib/cart';
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
        const product = productById(item.id), configuration = item.configuration;
        if (!product && !configuration) return null;
        const name = configuration ? 'Your custom paint kit' : product!.name;
        const price = cartItemUnitPrice(item);
        const paints = configuration?.paints || product!.paints;
        return <article className="cart-item" key={item.id}>
          <div className="cart-art" style={{ background: product?.background || '#fff0f3' }}><BunnyArt paints={paints} seed={configuration?.seed} /></div>
          <div className="cart-item-info"><h3>{name}</h3>{configuration ? <div className="cart-configuration"><p>{configuration.blanks} blank {configuration.blanks === 1 ? 'bunny' : 'bunnies'} + 3 selected paints</p><p>Base request: <code>{configuration.base}</code></p><div className="cart-paint-swatches">{configuration.paints.map((paint, index) => <span key={index}><i style={{ background: paint }}/><code>{paint}</code></span>)}</div>{configuration.notes && <p className="custom-notes">{configuration.notes}</p>}<p>Preview pattern saved · physical pour will vary</p></div> : <p>Marble Pour Kit</p>}<strong>{price === null ? 'Price to be confirmed' : formatMoney(price)}</strong>
            <div className="quantity-row"><div className="quantity-control"><button aria-label={`Decrease ${name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={14}/></button><span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span><button aria-label={`Increase ${name} quantity`} disabled={item.quantity >= commerce.maxQuantity} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button></div><button className="icon-button" aria-label={`Remove ${name}`} onClick={() => remove(item.id)}><Trash2 size={17}/></button></div>
          </div>
        </article>;
      })}</div>
      <div className="cart-bottom"><div className="subtotal"><span>Subtotal</span><strong>{total === null ? 'Awaiting pricing' : formatMoney(total)}</strong></div><p className="fine-print">Pricing, delivery and payment checkout need confirmation before orders can be placed.</p><button className="button primary full" onClick={checkout}>Check checkout status <ArrowUpRight size={18}/></button><p className="checkout-message" role="status">{message}</p><button className="text-button full" onClick={close}>Keep exploring</button></div>
    </> : <div className="empty-cart"><ShoppingBag size={48}/><h3>A little empty.<br/>A lot of possibilities.</h3><p>Your next masterpiece starts with a colour.</p><Link className="button primary" href="/#shop" onClick={close}>Pick your drip <ArrowUpRight size={18}/></Link></div>}
  </Modal>;
}
