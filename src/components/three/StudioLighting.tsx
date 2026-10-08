'use client';
import { Environment, Lightformer } from '@react-three/drei';
export function StudioLighting() {
  return <>
    <ambientLight intensity={.65} /><directionalLight position={[3, 6, 5]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-normalBias={.04} /><directionalLight position={[-4, 2, -1]} intensity={2} color="#fff1e4" />
    <Environment resolution={128}>
      <Lightformer intensity={4} position={[-3, 3, 4]} scale={[3, 6, 1]} />
      <Lightformer intensity={3} position={[4, 2, 2]} scale={[2, 4, 1]} />
      <Lightformer intensity={2} position={[0, 5, -3]} rotation={[Math.PI / 2, 0, 0]} scale={[6, 3, 1]} />
    </Environment>
  </>;
}
