'use client';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, MeshPhysicalMaterial } from 'three';
import type { PaintPalette } from '@/types/product';
import { marbleNoise } from '@/lib/shaders/marble';
interface Props { paints: PaintPalette; base: string; coverage: number; seed: number; reduced: boolean; swirl?: number }
export function useBunnyMaterial({ paints, base, coverage, seed, reduced, swirl = 1 }: Props) {
  const uniforms = useMemo(() => ({ uA: { value: new Color('#f34868') }, uB: { value: new Color('#ff8ba3') }, uC: { value: new Color('#fff5e9') }, uBase: { value: new Color('#fff9ee') }, uCoverage: { value: 0 }, uSeed: { value: 1 }, uTime: { value: 0 }, uSwirl: { value: 1 } }), []);
  const uniformRef = useRef(uniforms);
  const targets = useMemo(() => paints.map(c => new Color(c)), [paints]);
  const baseTarget = useMemo(() => new Color(base), [base]);
  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({ roughness: .21, metalness: .04, clearcoat: 1, clearcoatRoughness: .12, envMapIntensity: 1.3 });
    mat.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = `varying vec3 vMarblePosition;\n` + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvMarblePosition = (modelMatrix * vec4(position, 1.0)).xyz;');
      shader.fragmentShader = `varying vec3 vMarblePosition; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uBase; uniform float uCoverage; uniform float uSeed; uniform float uTime; uniform float uSwirl;\n${marbleNoise}\n` + shader.fragmentShader.replace('#include <color_fragment>', `
        #include <color_fragment>
        vec3 p = vMarblePosition * 1.7 + vec3(uSeed * 1.7, uTime * .018, uSeed * .7);
        float warp = fbm(p * 1.5);
        float flow = fbm(p + vec3(warp * (0.4 + uSwirl * 3.1), warp * (0.4 + uSwirl * 2.1), warp * uSwirl));
        float vein = sin(p.y * 6.0 + flow * (6.0 + uSwirl * 16.0) + sin(p.x * 2.0) * 2.0);
        vec3 marble = mix(uA, uB, smoothstep(-.9, .5, vein));
        marble = mix(marble, uC, smoothstep(.48, .8, vein));
        float poured = smoothstep(1.0 - uCoverage - .1, 1.0 - uCoverage + .1, flow);
        diffuseColor.rgb *= mix(uBase, marble, poured);
      `);
    };
    mat.customProgramCacheKey = () => 'drip-bunny-marble-v1';
    return mat;
  }, [uniforms]);
  useEffect(() => () => material.dispose(), [material]);
  useFrame((_, delta) => {
    const live = uniformRef.current;
    const ease = reduced ? 1 : 1 - Math.exp(-delta * 5);
    live.uA.value.lerp(targets[0], ease); live.uB.value.lerp(targets[1], ease); live.uC.value.lerp(targets[2], ease);
    live.uBase.value.lerp(baseTarget, ease);
    live.uCoverage.value += (coverage - live.uCoverage.value) * ease;
    live.uSwirl.value += (swirl - live.uSwirl.value) * ease;
    live.uSeed.value += (seed - live.uSeed.value) * ease;
    if (!reduced && coverage > 0 && live.uCoverage.value < coverage - .01) live.uTime.value += delta;
  });
  return material;
}
