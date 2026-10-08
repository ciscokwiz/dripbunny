'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
export function MotionProvider() {
  useEffect(() => {
    void useStore.persist.rehydrate();
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ anchors: true, duration: 1.05, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap.fromTo(['.hero-copy .eyebrow', '.hero-copy h1', '.hero-copy > div', '.hero-stage'], { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .8, ease: 'power3.out' });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.fromTo(element, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('.how-step').forEach(element => {
          ScrollTrigger.create({ trigger: element, start: 'top 65%', end: 'bottom 35%', toggleClass: 'step-active' });
        });
      });
      return () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => media.revert();
  }, []);
  return null;
}
