import { useId } from 'react';
import type { PaintPalette } from '@/types/product';
interface Props { paints: PaintPalette; className?: string; label?: string; seed?: number }
/** Lightweight brand-created illustration; also the non-WebGL fallback. */
export function BunnyArt({ paints, className, label = 'Marble bunny sample artwork', seed = 1 }: Props) {
  const id = useId().replace(/:/g, '');
  return <svg className={className} viewBox="0 0 320 390" role="img" aria-label={label}>
    <defs>
      <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={paints[0]} /><stop offset=".35" stopColor={paints[1]} /><stop offset=".6" stopColor={paints[2]} /><stop offset="1" stopColor={paints[0]} /></linearGradient>
      <radialGradient id={`${id}-light`} cx=".32" cy=".18" r=".8"><stop stopColor="white" stopOpacity=".68" /><stop offset=".3" stopColor="white" stopOpacity="0" /><stop offset="1" stopColor="#290c20" stopOpacity=".24" /></radialGradient>
      <pattern id={`${id}-marble`} width="160" height="180" patternUnits="userSpaceOnUse" patternTransform={`rotate(${-24 + (seed - 1) * 21}) translate(${(seed - 1) * 17}, 0)`}><rect width="160" height="180" fill={`url(#${id}-paint)`} /><path d="M-30 10 C180 80 -30 60 150 140 S20 220 -30 180 M20 -40 C-40 30 200 40 120 100 S-60 90 70 200" fill="none" stroke={paints[2]} strokeWidth="9" /><path d="M-20 24 C170 90 -18 60 150 155 M35 -30 C-25 35 210 48 135 105 S-45 105 88 210" fill="none" stroke={paints[0]} strokeWidth="3" /></pattern>
      <filter id={`${id}-shadow`}><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor={paints[0]} floodOpacity=".2" /></filter>
    </defs>
    <ellipse cx="160" cy="364" rx="90" ry="15" fill={paints[0]} opacity=".13" />
    <g fill={`url(#${id}-marble)`} stroke={paints[0]} strokeOpacity=".25" filter={`url(#${id}-shadow)`}>
      <ellipse cx="118" cy="78" rx="29" ry="64" transform="rotate(-12 118 78)"/><ellipse cx="204" cy="78" rx="29" ry="64" transform="rotate(12 204 78)"/>
      <ellipse cx="102" cy="276" rx="23" ry="43" transform="rotate(20 102 276)"/><ellipse cx="220" cy="276" rx="23" ry="43" transform="rotate(-20 220 276)"/>
      <ellipse cx="160" cy="279" rx="61" ry="71"/><ellipse cx="126" cy="341" rx="33" ry="24"/><ellipse cx="194" cy="341" rx="33" ry="24"/><ellipse cx="160" cy="179" rx="86" ry="78"/>
    </g>
    <g fill={`url(#${id}-light)`}><ellipse cx="118" cy="78" rx="29" ry="64" transform="rotate(-12 118 78)"/><ellipse cx="204" cy="78" rx="29" ry="64" transform="rotate(12 204 78)"/><ellipse cx="160" cy="279" rx="61" ry="71"/><ellipse cx="160" cy="179" rx="86" ry="78"/></g>
    <path d="M108 154 Q120 124 147 125 M109 48 Q103 68 110 91" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" opacity=".8" />
  </svg>;
}
