import { Gift, Palette, Users } from 'lucide-react';
const cards = [
  { icon: Palette, number: '01', title: 'Little artists.\nBig ideas.', label: 'CREATIVE PLAY', copy: 'A hands-on canvas for curious imaginations. See what happens when you let your colours do the talking.' },
  { icon: Gift, number: '02', title: 'Gift a little\ncolour.', label: 'GIFTING', copy: 'For the person who loves making things their own. A creative surprise with a personal touch.' },
  { icon: Users, number: '03', title: 'Better\ntogether.', label: 'GROUP ACTIVITIES', copy: 'Gather your favourite people, pick your palettes and make a colourful memory together.' },
];
export function Editorial() {
  return <section className="section editorial-section"><div className="section-heading" data-reveal><div><p className="eyebrow">07 / MADE FOR GOOD TIMES</p><h2>A LITTLE PAINT.<br/><span className="serif-pop">A LOT OF FUN.</span></h2></div></div><div className="editorial-grid">{cards.map(card => <article className="editorial-card" key={card.number} data-reveal><div><span>{card.label}</span><card.icon size={28}/></div><h3>{card.title}</h3><p>{card.copy}</p><span className="editorial-number" aria-hidden="true">{card.number}</span></article>)}</div></section>;
}
