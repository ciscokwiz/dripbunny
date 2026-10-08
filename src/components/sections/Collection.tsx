'use client';
import { useState, useCallback, type CSSProperties } from 'react';
import Image from 'next/image';
import { Plus, ArrowUpRight, Check } from 'lucide-react';
import { products, kitContents, formatMoney } from '@/config/products';
import type { Product } from '@/types/product';
import { useStore } from '@/store/useStore';
import { BunnyArt } from '@/components/ui/BunnyArt';
import { Modal } from '@/components/ui/Modal';
export function Collection() {
  const add = useStore(s => s.add);
  const [quick, setQuick] = useState<Product | null>(null);
  const close = useCallback(() => setQuick(null), []);
  return <section id="shop" className="section shop-section"><div className="section-heading" data-reveal><div><p className="eyebrow">04 / SHOP THE COLLECTION</p><h2>PICK A COLOUR.<br/><span className="serif-pop">START CREATING.</span></h2></div><p>A whole lot of creativity.<br/>All in one little box.</p></div>
    <div className="product-grid">{products.map((product, index) => <article className="product-card" key={product.id} style={{ '--card-colour': product.primary, '--card-pale': product.background, '--card-ink': product.accent } as CSSProperties}>
      <button className="product-art" aria-label={`Quick view ${product.name}`} onClick={() => setQuick(product)}><span className="product-edition">MARBLE POUR KIT / 0{index + 1}</span>{product.image ? <Image src={product.image} alt={`${product.name} Drip Bunny product packaging`} width={450} height={600}/> : <><BunnyArt paints={product.paints}/><span className="sample-label">SAMPLE ART · PRODUCT PHOTO TO COME</span></>}<span className="quick-view">Take a closer look <ArrowUpRight size={16}/></span></button>
      <div className="product-info"><div><h3>{product.name}</h3><span>{product.priceMinor === null ? 'Price to be confirmed' : formatMoney(product.priceMinor)}</span></div><p>{product.note}</p><details className="kit-details"><summary>What’s included</summary><ul>{kitContents.map(item => <li key={item}>{item}</li>)}</ul></details><button className="button add-button" onClick={() => add(product.id)}>Add to bag <Plus size={18}/></button></div>
    </article>)}</div><p className="shop-note">Ages 8+ · Colourway names are proposed labels. Prices and payment checkout are awaiting confirmation.</p>
    <Modal open={!!quick} close={close} title={quick?.name || 'Kit details'}>{quick && <div className="quick-layout"><div style={{ background: quick.background }}><BunnyArt paints={quick.paints}/><p className="fine-print">Sample colour artwork · not a product photograph</p></div><div><p className="eyebrow">DRIP BUNNY / MARBLE POUR KIT</p><p>{quick.description}</p><ul className="included-list">{kitContents.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><p className="fine-print">Ages 8+. Follow the safety and use instructions included with the kit.</p><strong>{quick.priceMinor === null ? 'Price awaiting confirmation' : formatMoney(quick.priceMinor)}</strong><button className="button primary full" onClick={() => { add(quick.id); close(); }}>Add to bag <Plus size={18}/></button></div></div>}</Modal>
  </section>;
}
