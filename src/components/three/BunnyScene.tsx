'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { BunnyModel } from './BunnyModel';
import { StudioLighting } from './StudioLighting';
import { PaintDroplets } from './PaintDroplets';
import { SceneBoundary } from './SceneBoundary';
import { BunnyArt } from '@/components/ui/BunnyArt';
import type { PaintPalette } from '@/types/product';
interface Props { paints: PaintPalette; base?: string; coverage?: number; seed?: number; className?: string; label?: string; autoRotate?: boolean; swirl?: number; interactive?: boolean; presentation?: boolean | number }
function Ready({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => { if (!done.current) { done.current = true; requestAnimationFrame(onReady); } });
  return null;
}
export default function BunnyScene({ paints, base = '#fff9ee', coverage = 1, seed = 1, className = '', label = 'Interactive marble bunny. Drag to rotate.', autoRotate = false, swirl = 1, interactive = true, presentation = false }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const reduced = !!useReducedMotion();
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const ready = requestAnimationFrame(() => setSupported(!!context)); context?.getExtension('WEBGL_lose_context')?.loseContext();
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); if (entry.isIntersecting) setEntered(true); }, { rootMargin: '120px' });
    if (container.current) observer.observe(container.current);
    return () => { cancelAnimationFrame(ready); observer.disconnect(); };
  }, []);
  return <div ref={container} className={`bunny-scene ${className}`} role="img" aria-label={label}>
    {supported === true && entered ? <SceneBoundary fallback={<div className="scene-fallback"><BunnyArt paints={paints} seed={seed}/><span>Illustrated view · 3D unavailable</span></div>}><Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1.05, 6.9], fov: 40 }} frameloop={visible ? 'always' : 'demand'} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); setSupported(false); }, { once: true }); }}>
      <Suspense fallback={null}>
        <Ready onReady={() => setReady(true)} /><StudioLighting /><BunnyModel paints={paints} base={base} coverage={coverage} seed={seed} reduced={reduced} swirl={swirl} stationary={!interactive} presentation={presentation} />{interactive && <PaintDroplets color={paints[0]} reduced={reduced} />}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.03, 0]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial opacity={.13} /></mesh>
        <OrbitControls target={[0, 1, 0]} enablePan={false} enableZoom={false} enableRotate={interactive} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI * .64} autoRotate={autoRotate && !reduced} autoRotateSpeed={.8} />
      </Suspense>
    </Canvas>{!ready && <div className="scene-placeholder"><BunnyArt paints={coverage === 0 ? [base, base, base] : paints} seed={seed}/><span>Preparing your 3D bunny…</span></div>}</SceneBoundary> : <div className="scene-fallback"><BunnyArt paints={coverage === 0 ? [base, base, base] : paints} seed={seed} /><span>{supported !== false ? 'Opening the paint studio…' : 'Illustrated view · 3D unavailable'}</span></div>}
  </div>;
}
