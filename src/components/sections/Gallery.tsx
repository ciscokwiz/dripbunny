'use client';
import { useCallback, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BunnyArt } from '@/components/ui/BunnyArt';
import { Modal } from '@/components/ui/Modal';
import type { PaintPalette } from '@/types/product';
const samples: { title: string; paints: PaintPalette; background: string; tag: string }[] = [
  { title: 'Berry beautiful.', paints: ['#d72c54', '#ffbdce', '#fff6ef'], background: '#fbdce5', tag: 'RASPBERRY / BLUSH / CREAM' },
  { title: 'Out of the blue.', paints: ['#2445a6', '#86dcff', '#fff6ef'], background: '#d6edfb', tag: 'COBALT / ICE / CREAM' },
  { title: 'Stay golden.', paints: ['#f2a113', '#f5dc88', '#fff6ef'], background: '#f7e4a0', tag: 'GOLD / SUNSHINE / CREAM' },
  { title: 'Freshly poured.', paints: ['#0b8663', '#a2d89d', '#fff6ef'], background: '#dceaca', tag: 'EMERALD / MINT / CREAM' },
];
export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const sample = selected === null ? null : samples[selected];
  return <section id="gallery" className="section gallery-section"><div className="section-heading" data-reveal><div><p className="eyebrow">06 / MADE TO BE DIFFERENT</p><h2>NO TWO<br/><span className="serif-pop">BUNNIES ALIKE.</span></h2></div><p>One bunny. Infinite possibilities.<br/>Here’s a little inspiration.</p></div>
    <div className="gallery-grid">{samples.map((art, index) => <button key={art.title} className={`gallery-piece piece-${index}`} onClick={() => setSelected(index)} style={{ '--gallery-bg': art.background } as CSSProperties}><span className="gallery-label">STUDIO SAMPLE / 0{index + 1}</span><BunnyArt paints={art.paints}/><div><h3>{art.title}</h3><ArrowUpRight size={22}/></div><span className="gallery-palette">{art.tag}</span></button>)}</div><p className="fine-print gallery-disclosure">Brand-created digital sample artwork. Customer photographs and creator credits will appear here when supplied with permission.</p>
    <Modal open={sample !== null} close={close} title={sample?.title || 'Studio sample'}>{sample && <div className="gallery-modal" style={{ background: sample.background }}><BunnyArt paints={sample.paints}/><p>{sample.tag}</p><p className="fine-print">Brand-created illustration. Every physical pour will be different.</p><a className="button primary" href="#marble-lab" onClick={close}>Try your own palette <ArrowUpRight size={18}/></a></div>}</Modal>
  </section>;
}
