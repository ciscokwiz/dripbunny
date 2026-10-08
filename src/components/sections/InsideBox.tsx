'use client';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { BunnyArt } from '@/components/ui/BunnyArt';
import { products } from '@/config/products';
const contents = [
  { name: 'Bunny figure', count: '01', detail: 'Your blank canvas. A friendly bunny figure ready for a colourful transformation.', kind: 'bunny' },
  { name: 'Pour paints', count: '03', detail: 'Three premium pour paints. Let your colours find their own way.', kind: 'paint' },
  { name: 'Mixing cups', count: '02', detail: 'Two mixing cups to help bring your colours together.', kind: 'cup' },
  { name: 'Pair of gloves', count: '01', detail: 'One pair of gloves, included for your painting session.', kind: 'glove' },
] as const;
export function InsideBox() {
  const [active, setActive] = useState(0);
  return <section id="inside-box" className="section box-section"><div className="section-heading" data-reveal><div><p className="eyebrow">05 / WHAT’S IN THE BOX?</p><h2>EVERYTHING YOU NEED<br/><span className="serif-pop">TO GET DRIPPING.</span></h2></div><p>Just add imagination.<br/>We’ve packed the rest.</p></div>
    <div className="unboxing-grid">{contents.map((item, index) => <button key={item.name} className={`kit-object ${active === index ? 'active' : ''}`} aria-pressed={active === index} onClick={() => setActive(index)}><span className="object-count">×{item.count}</span><div className={`object-illustration ${item.kind}`} aria-hidden="true">{item.kind === 'bunny' ? <BunnyArt paints={['#e8dfd2', '#fffaf1', '#ffffff']}/> : item.kind === 'paint' ? <div className="bottles">{products.slice(0, 3).map(p => <span className="paint-bottle" key={p.id} style={{ background: p.primary }}><i/><b>DRIP<br/>BUNNY</b></span>)}</div> : item.kind === 'cup' ? <div className="cups"><span/><span/></div> : <svg viewBox="0 0 150 160"><path d="M47 132 L30 77 Q25 60 36 59 Q42 58 48 72 L49 28 Q49 16 59 17 Q68 17 68 29 L69 65 L71 16 Q72 6 80 9 Q88 11 86 22 L86 66 L92 25 Q94 16 102 20 Q108 22 106 33 L100 73 L108 44 Q112 33 119 37 Q126 42 120 54 L110 106 L99 133 Z" fill="#fffaf0" stroke="#cec0ae" strokeWidth="2"/><path d="M47 132 L99 133 L96 151 L52 151 Z" fill="#e5dac8"/></svg>}</div><span className="object-bottom"><strong>{item.name}</strong><span className="object-plus">{active === index ? <Check size={16}/> : <Plus size={16}/>}</span></span></button>)}</div>
    <div className="unboxing-description" role="status"><strong>{contents[active].name}</strong><p>{contents[active].detail}</p><span>Illustrated kit contents</span></div>
  </section>;
}
