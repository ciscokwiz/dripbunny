'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SphereGeometry, type Group } from 'three';
import { useBunnyMaterial } from './BunnyMaterial';
import type { PaintPalette } from '@/types/product';
interface Props { paints: PaintPalette; base: string; coverage: number; seed: number; reduced: boolean; swirl?: number; stationary?: boolean; presentation?: boolean | number }
const parts: { position: [number, number, number]; scale: [number, number, number]; rotation?: [number, number, number] }[] = [
  { position: [-.44, 2.29, 0], scale: [.28, .83, .29], rotation: [0, 0, .17] },
  { position: [.44, 2.29, 0], scale: [.28, .83, .29], rotation: [0, 0, -.17] },
  { position: [0, 1.25, 0], scale: [.96, .83, .77] },
  { position: [0, -.06, 0], scale: [.64, .79, .49] },
  { position: [-.67, -.05, .01], scale: [.22, .48, .24], rotation: [0, 0, -.26] },
  { position: [.67, -.05, .01], scale: [.22, .48, .24], rotation: [0, 0, .26] },
  { position: [-.35, -.72, .18], scale: [.35, .27, .47] },
  { position: [.35, -.72, .18], scale: [.35, .27, .47] },
  { position: [0, -.35, -.5], scale: [.26, .26, .26] },
];
export function BunnyModel(props: Props) {
  const material = useBunnyMaterial(props);
  const geometry = useMemo(() => new SphereGeometry(1, 40, 28), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    if (props.stationary) {
      const pose = typeof props.presentation === 'number' ? props.presentation : props.presentation ? 1 : 0;
      const target = -.16 + pose * .51;
      group.current.rotation.y += (target - group.current.rotation.y) * (props.reduced ? 1 : 1 - Math.exp(-delta * 3));
      group.current.position.y = 0; group.current.rotation.z = 0;
      group.current.updateWorldMatrix(true, false);
      material.userData.patternTransform.copy(group.current.matrixWorld).invert();
      return;
    }
    if (props.reduced) {
      group.current.updateWorldMatrix(true, false);
      material.userData.patternTransform.copy(group.current.matrixWorld).invert();
      return;
    }
    group.current.position.y = Math.sin(clock.elapsedTime * .85) * .065;
    group.current.rotation.y += (pointer.x * .14 - group.current.rotation.y) * Math.min(delta * 2, 1);
    group.current.rotation.z = Math.sin(clock.elapsedTime * .5) * .018;
    group.current.updateWorldMatrix(true, false);
    material.userData.patternTransform.copy(group.current.matrixWorld).invert();
  });
  return <group ref={group} rotation={[0, -.16, 0]}>
    {parts.map((part, index) => <mesh key={index} position={part.position} scale={part.scale} rotation={part.rotation} castShadow receiveShadow geometry={geometry} material={material} dispose={null}>

    </mesh>)}
  </group>;
}
