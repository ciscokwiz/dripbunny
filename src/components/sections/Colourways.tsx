'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { products, productById } from '@/config/products';
import { useStore } from '@/store/useStore';
import { BunnyArt } from '@/components/ui/BunnyArt';
export function Colourways() {
  const variant = useStore(s => s.variant), select = useStore(s => s.selectVariant), product = productById(variant)!;
  const reduced = useReducedMotion();
  return <section id="colourways" className="section colourways"><div className="section-heading" data-reveal><div><p className="eyebrow">01 / FIND YOUR COLOUR</p><h2>WHAT’S YOUR <span className="serif-pop">DRIP?</span></h2></div><p>Four colourful ways<br/>to make it yours.</p></div>
    <div className="colourway-grid">{products.map((p, index) => <button key={p.id} className={`colourway ${p.id === variant ? 'active' : ''}`} aria-pressed={p.id === variant} onClick={() => select(p.id)} style={{ '--card-colour': p.primary, '--card-pale': p.background, '--card-ink': p.accent } as CSSProperties}>
      <span className="colourway-top"><span>0{index + 1}</span><span className="selected-check">{p.id === variant ? <Check size={16}/> : <ArrowUpRight size={16}/>}</span></span><BunnyArt paints={p.paints} /><span className="colourway-name">{p.name}</span><span className="colourway-note">{p.note}</span>
    </button>)}</div>
    <div className="variant-description" aria-live="polite"><AnimatePresence initial={false} mode="wait"><motion.p key={variant} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span style={{ color: product.accent }}>✷ {product.name}</span> {product.description}</motion.p></AnimatePresence><a href="#marble-lab">Or mix up your own <ArrowUpRight size={16}/></a></div>
  </section>;
}
