'use client';
import { useState, useEffect, useRef } from 'react';
import { Droplets, Waves, Sparkles } from 'lucide-react';
import { Scene } from '@/components/three/SceneLoader';
import type { PaintPalette } from '@/types/product';
const steps = [
  { title: 'POUR IT.', copy: 'Pick your favourite paints and let the colour flow. This is where your idea comes to life.', icon: Droplets, label: '01 / POUR · Colour begins to cover your blank bunny.', coverage: .35, swirl: .15 },
  { title: 'SWIRL IT.', copy: 'Watch your colours meet, mingle and make unexpected marble magic. Every pour has its own personality.', icon: Waves, label: '02 / SWIRL · Your colours weave into a marble pattern.', coverage: 1, swirl: 1 },
  { title: 'SHOW IT OFF.', copy: 'Follow your kit’s drying instructions, then find a spot for your one-of-a-kind masterpiece.', icon: Sparkles, label: '03 / SHOW · Your finished colour story, on display.', coverage: 1, swirl: 1 },
];
const paints: PaintPalette = ['#168fe8', '#88d8ff', '#f7fcff'];
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-step]') || []);
      const stageBottom = root.current?.querySelector('.how-visual')?.getBoundingClientRect().bottom || 0;
      const target = window.innerWidth <= 600 ? Math.min(window.innerHeight - 50, Math.max(window.innerHeight * .52, stageBottom + 90)) : window.innerHeight * .52;
      let nearest = 0, distance = Infinity;
      nodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect();
        const current = Math.abs(rect.top + rect.height / 2 - target);
        if (current < distance) { distance = current; nearest = i; }
      });
      setActive(previous => previous === nearest ? previous : nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  const jumpTo = (i: number) => {
    const node = root.current?.querySelector(`[data-step="${i}"]`);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const stageBottom = root.current?.querySelector('.how-visual')?.getBoundingClientRect().bottom || 0;
    const target = window.innerWidth <= 600 ? Math.min(window.innerHeight - 50, Math.max(window.innerHeight * .52, stageBottom + 90)) : window.innerHeight * .52;
    window.scrollTo({ top: window.scrollY + rect.top + rect.height / 2 - target, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section id="how-it-works" className="section how-section"><div className="section-heading" data-reveal><div><p className="eyebrow">03 / THE GOOD KIND OF MESS</p><h2>THREE STEPS.<br/><span className="serif-pop">ENDLESS POSSIBILITIES.</span></h2></div></div>
    <div className="how-layout" ref={root}><div className={`how-visual story-stage-${active}`}><span className="story-stage-label" aria-live="polite">STEP 0{active + 1} <strong>{steps[active].title}</strong></span>
      {active === 0 && <div className="story-pour-cup" aria-hidden="true"><span/></div>}
      <Scene paints={paints} coverage={steps[active].coverage} seed={2} swirl={steps[active].swirl} interactive={false} presentation={active === 2}/>
      <div className="story-controls">{steps.map((step, i) => <button key={step.title} aria-label={`Preview ${step.title}`} aria-pressed={active === i} onClick={() => jumpTo(i)} className={active === i ? 'active' : ''}><span>0{i + 1}</span>{step.title}</button>)}</div><p>{steps[active].label}</p></div>
      <div className="how-steps">{steps.map((step, index) => <article className={`how-step ${active === index ? 'current' : ''}`} data-step={index} key={step.title} aria-current={active === index ? 'step' : undefined}><span className="step-number">0{index + 1}</span><div><step.icon size={25}/><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
    </div>
  </section>;
}
