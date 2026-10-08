'use client';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MoveHorizontal, Sparkles } from 'lucide-react';
import { products, productById } from '@/config/products';
import { useStore } from '@/store/useStore';
import { Scene } from '@/components/three/SceneLoader';
export function Hero() {
  const variant = useStore(s => s.variant), select = useStore(s => s.selectVariant);
  const product = productById(variant)!;
  const theme = { '--theme': product.primary, '--theme-pale': product.background, '--theme-secondary': product.secondary, '--theme-accent': product.accent } as CSSProperties;
  return <section id="home" className="hero" style={theme}>
    <div className="hero-grain" aria-hidden="true" />
    <div className="hero-copy"><motion.p className="eyebrow" initial={false} animate={{ opacity: 1, y: 0 }}><span className="tiny-star">✷</span> A LITTLE PAINT. A LOT OF POSSIBILITY.</motion.p>
      <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .65 }}>POUR.<br/><span>PAINT.</span><br/>PLAY<span className="heading-dot">.</span></motion.h1>
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .6 }}><p className="hero-description">Meet your blank canvas for colourful, swirly, one-of-a-kind creations. Pick your colours. Make it yours.</p><div className="hero-buttons"><a href="#shop" className="button primary">Shop the kits <ArrowUpRight size={19}/></a><a href="#marble-lab" className="button outline">Play with colours <Sparkles size={17}/></a></div><div className="hero-small"><span>DIY MARBLE POUR KIT</span><i/>AGES 8+</div></motion.div>
    </div>
    <motion.div className="hero-stage" initial={false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .12, type: 'spring', bounce: .18 }}>
      <div className="stage-blob" aria-hidden="true"/><span className="stage-orbit orbit-one" aria-hidden="true"/><span className="stage-orbit orbit-two" aria-hidden="true"/>
      <div className="hero-sticker"><span>NO RULES.</span><strong>JUST<br/>COLOUR.</strong><Sparkles size={18}/></div>
      <Scene paints={product.paints} seed={products.indexOf(product) + 1} className="hero-bunny" />
      <div className="rotate-hint"><MoveHorizontal size={17}/><span>Go on. Give it a spin.</span></div>
      <span className="art-note">3D colour preview · your pour will be unique</span>
    </motion.div>
    <div className="hero-bottom"><a href="#colourways" className="scroll-cue"><ArrowDown size={17}/> ENTER THE WORLD OF DRIP</a><div className="hero-swatches"><span>YOUR COLOUR, YOUR CALL</span>{products.map(p => <button key={p.id} aria-label={`Preview ${p.name}`} aria-pressed={variant === p.id} onClick={() => select(p.id)} style={{ '--swatch': p.primary } as CSSProperties} className={`swatch ${variant === p.id ? 'selected' : ''}`}/>)}</div></div>
  </section>;
}
