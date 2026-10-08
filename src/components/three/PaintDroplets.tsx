'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
const drops: [number, number, number, number][] = [[-1.5, 1.6, -.5, .13], [1.45, .55, .1, .17], [1.3, 2.4, -.6, .09], [-1.45, -.1, .15, .1], [.95, 3.1, -.6, .11]];
export function PaintDroplets({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => { if (group.current && !reduced) group.current.rotation.y = Math.sin(clock.elapsedTime * .3) * .15; });
  return <group ref={group}>{drops.map(([x, y, z, size], index) => <mesh key={index} position={[x, y, z]} scale={[size, size * 1.3, size]}><sphereGeometry args={[1, 16, 12]} /><meshPhysicalMaterial color={color} roughness={.2} clearcoat={1} /></mesh>)}</group>;
}
