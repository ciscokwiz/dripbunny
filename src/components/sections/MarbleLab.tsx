'use client';
import { useState, type CSSProperties } from 'react';
import { RotateCcw, Shuffle, Droplets, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { products } from '@/config/products';
import { Scene } from '@/components/three/SceneLoader';
import type { PaintPalette } from '@/types/product';
const initial: PaintPalette = ['#f34868', '#ffc167', '#fff4e7'];
export function MarbleLab() {
  const [paints, setPaints] = useState<PaintPalette>(initial);
  const [base, setBase] = useState('#fff4e7');
  const [coverage, setCoverage] = useState(0);
  const [seed, setSeed] = useState(1);
  const [rotate, setRotate] = useState(false);
  const [status, setStatus] = useState('Your blank bunny is ready. Pick three paints and pour.');
  const [preset, setPreset] = useState<string | null>(null);
  const updatePaint = (index: number, value: string) => { setPaints(current => [index === 0 ? value : current[0], index === 1 ? value : current[1], index === 2 ? value : current[2]]); setPreset(null); };
  const pour = () => { setCoverage(1); setSeed(s => s + .6); setStatus('Paint poured! Drag to explore your new marble pattern.'); };
  const remix = () => { setSeed(s => s + 2.1); setCoverage(1); setStatus('A fresh swirl. Same colours, a whole new creation.'); };
  const reset = () => { setCoverage(0); setSeed(1); setPaints(initial); setBase('#fff4e7'); setPreset(null); setRotate(false); setStatus('Back to a blank canvas. What will you make next?'); };
  return <section id="marble-lab" className="lab-section section"><div className="section-heading" data-reveal><div><p className="eyebrow">02 / THE MARBLE LAB</p><h2>LET YOUR<br/><span className="serif-pop">COLOURS RUN WILD.</span></h2></div><p>No two pours are alike.<br/>And that’s the whole point.</p></div>
    <div className="lab-layout"><div className="lab-stage"><span className="lab-badge"><span/> LIVE COLOUR PLAYGROUND</span><span className="lab-ring" aria-hidden="true"/><Scene paints={paints} base={base} coverage={coverage} seed={seed} autoRotate={rotate}/><div className="lab-caption"><MoveHorizontal size={16}/> Drag your bunny to explore every angle</div></div>
      <div className="lab-controls"><span className="lab-number">YOUR STUDIO, YOUR RULES</span><h3>Make your own<br/>masterpiece.</h3><p>Choose your palette. Pour a little magic. See where the swirl takes you.</p>
        <fieldset><legend><span>01</span> Start with a canvas</legend><div className="base-colours">{[['Cream', '#fff4e7'], ['White', '#ffffff'], ['Blush', '#ffd9e1'], ['Midnight', '#3c2547']].map(([name, color]) => <button key={color} style={{ background: color }} aria-label={`${name} base`} aria-pressed={base === color} className={base === color ? 'base-selected' : ''} onClick={() => setBase(color)} />)}</div></fieldset>
        <fieldset><legend><span>02</span> Pick three pour paints</legend><div className="paint-inputs">{paints.map((color, i) => <label key={i} style={{ '--paint': color } as CSSProperties}><input type="color" value={color} onChange={event => updatePaint(i, event.target.value)} aria-label={`Paint colour ${i + 1}`}/><span>PAINT 0{i + 1}</span></label>)}</div></fieldset>
        <div className="palette-presets"><span>Need a little inspiration?</span><div>{products.map(p => <button key={p.id} className={preset === p.id ? 'preset-active' : ''} aria-pressed={preset === p.id} onClick={() => { setPaints(p.paints); setPreset(p.id); }}>{p.name}</button>)}</div></div>
        <button className="button primary full pour-button" onClick={pour}><Droplets size={18}/> Pour the paint <ArrowUpRight size={18}/></button>
        <div className="lab-tools"><button onClick={remix}><Shuffle size={16}/> Remix</button><button onClick={() => setRotate(value => !value)} aria-pressed={rotate}><MoveHorizontal size={16}/>{rotate ? 'Stop spin' : 'Auto spin'}</button><button onClick={reset}><RotateCcw size={16}/> Reset</button></div>
        <p className="lab-status" role="status">{status}</p><p className="fine-print">A playful procedural preview, not a fluid simulation or an exact prediction of your physical pour.</p>
      </div>
    </div><div className="lab-cta"><span>Love your creation? Make it real.</span><a href="#shop">Get a Drip Bunny kit <ArrowUpRight size={17}/></a></div>
  </section>;
}
