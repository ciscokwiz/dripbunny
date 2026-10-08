'use client';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { productById } from '@/config/products';
import { BunnyArt } from '@/components/ui/BunnyArt';
export function FinalCTA() {
  const product = productById(useStore(s => s.variant))!;
  return <section className="final-cta" data-reveal><span className="cta-star star-left" aria-hidden="true">✷</span><div className="final-copy"><p className="eyebrow">LET’S MAKE SOMETHING YOURS.</p><h2>YOUR NEXT<br/>MASTERPIECE<br/><span>IS WAITING.</span></h2><p>Pick your colours. Make a mess. Make it yours.</p><a href="#shop" className="button cream">Get your Drip Bunny <ArrowUpRight size={19}/></a></div><div className="final-art"><BunnyArt paints={product.paints}/><span>one of a kind.<br/>just like you.</span></div><span className="cta-star star-right" aria-hidden="true">✷</span></section>;
}
