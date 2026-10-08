'use client';
import { useState, useEffect, useRef } from 'react';
import { Droplets, Waves, Sparkles } from 'lucide-react';
import { Scene } from '@/components/three/SceneLoader';
import type { PaintPalette } from '@/types/product';
const steps = [
  { title: 'POUR IT.', copy: 'Pick your favourite paints and let the colour flow. This is where your idea comes to life.', icon: Droplets, label: 'A fresh start', coverage: .3 },
  { title: 'SWIRL IT.', copy: 'Watch your colours meet, mingle and make unexpected marble magic. Every pour has its own personality.', icon: Waves, label: 'A happy little experiment', coverage: .7 },
  { title: 'SHOW IT OFF.', copy: 'Follow your kit’s drying instructions, then find a spot for your one-of-a-kind masterpiece.', icon: Sparkles, label: 'Made by you. Only you.', coverage: 1 },
];
const paints: PaintPalette = ['#168fe8', '#88d8ff', '#f7fcff'];
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const shown = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (shown) setActive(Number((shown.target as HTMLElement).dataset.step));
    }, { rootMargin: '-20% 0px -30% 0px', threshold: [0, .25, .5, .75] });
    root.current?.querySelectorAll('[data-step]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <section id="how-it-works" className="section how-section"><div className="section-heading" data-reveal><div><p className="eyebrow">03 / THE GOOD KIND OF MESS</p><h2>THREE STEPS.<br/><span className="serif-pop">ENDLESS POSSIBILITIES.</span></h2></div></div>
    <div className="how-layout" ref={root}><div className="how-visual"><span className="how-doodle">a little pour<br/>goes a long way ↘</span><Scene paints={paints} coverage={steps[active].coverage} seed={active + 2}/><div className="step-dots" aria-label={`Previewing step ${active + 1}`}>{steps.map((step, i) => <button key={step.title} aria-label={`Preview ${step.title}`} aria-pressed={active === i} onClick={() => setActive(i)} className={active === i ? 'active' : ''}/>)}</div><p>{steps[active].label}</p></div>
      <div className="how-steps">{steps.map((step, index) => <article className={`how-step ${active === index ? 'current' : ''}`} data-step={index} key={step.title}><span className="step-number">0{index + 1}</span><div><step.icon size={25}/><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
    </div>
  </section>;
}
