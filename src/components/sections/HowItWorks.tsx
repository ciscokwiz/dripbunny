'use client';
import { useState, useEffect, useRef } from 'react';
import { Droplets, Waves, Sparkles } from 'lucide-react';
import { Scene } from '@/components/three/SceneLoader';
import { PaintCupArt } from '@/components/ui/PaintCupArt';
import type { PaintPalette } from '@/types/product';
const steps = [
  { title: 'POUR IT.', copy: 'Pick your favourite paints and let the colour flow. This is where your idea comes to life.', icon: Droplets, label: '01 / POUR · Pour your chosen paints into a clear mixing cup.' },
  { title: 'SWIRL IT.', copy: 'Watch your colours meet, mingle and make unexpected marble magic. Every pour has its own personality.', icon: Waves, label: '02 / SWIRL · Gently swirl the colours with your mixing stick.' },
  { title: 'SHOW IT OFF.', copy: 'Follow your kit’s drying instructions, then find a spot for your one-of-a-kind masterpiece.', icon: Sparkles, label: '03 / SHOW · Your finished colour story, on display.' },
];
const paints: PaintPalette = ['#168fe8', '#88d8ff', '#f7fcff'];
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-step]') || []);
      const stageBottom = root.current?.querySelector('.how-visual')?.getBoundingClientRect().bottom || 0;
      const target = window.innerWidth <= 600 ? Math.min(window.innerHeight - 50, Math.max(window.innerHeight * .52, stageBottom + 90)) : window.innerHeight * .52;
      let nearest = 0, distance = Infinity;
      const centres: number[] = [];
      nodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        centres.push(centre);
        const current = Math.abs(centre - target);
        if (current < distance) { distance = current; nearest = i; }
      });
      setActive(previous => previous === nearest ? previous : nearest);
      let phase = 0;
      for (let i = 0; i < centres.length - 1; i++) {
        const fraction = Math.max(0, Math.min(1, (target - centres[i]) / (centres[i + 1] - centres[i])));
        // Hold each pose briefly; blend only through the middle of the next step.
        const blend = Math.max(0, Math.min(1, (fraction - .2) / .6));
        phase += blend * blend * (3 - 2 * blend);
      }
      setProgress(phase);
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
    <div className="how-layout" ref={root}><div className={`how-visual story-stage-${active}`} data-story-progress={progress.toFixed(4)}><span className="story-stage-label" aria-live="polite">STEP 0{active + 1} <strong>{steps[active].title}</strong></span>
      <div className="story-artwork">
        <div className="story-art-layer" data-story-art="pour" style={{ opacity: Math.max(0, 1 - progress) }} aria-hidden={active !== 0}><PaintCupArt/></div>
        <div className="story-art-layer" data-story-art="swirl" style={{ opacity: 1 - Math.abs(progress - 1) }} aria-hidden={active !== 1}><PaintCupArt mixing/></div>
        <div className="story-art-layer story-bunny-layer" data-story-art="show" style={{ opacity: Math.max(0, progress - 1) }} aria-hidden={active !== 2}><Scene paints={paints} coverage={1} seed={2} swirl={1} interactive={false} presentation label="Finished blue marble bunny on display."/></div>
      </div>
      <div className="story-controls">{steps.map((step, i) => <button key={step.title} aria-label={`Preview ${step.title}`} aria-pressed={active === i} onClick={() => jumpTo(i)} className={active === i ? 'active' : ''}><span>0{i + 1}</span>{step.title}</button>)}</div><p>{steps[active].label}</p></div>
      <div className="how-steps">{steps.map((step, index) => <article className={`how-step ${active === index ? 'current' : ''}`} data-step={index} key={step.title} aria-current={active === index ? 'step' : undefined}><span className="step-number">0{index + 1}</span><div><step.icon size={25}/><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
    </div>
  </section>;
}
