'use client';
import { useId } from 'react';

/** Original vector illustration of the supplied pink, blue and green paint bottles. */
export function PaintCupArt({ mixing = false }: { mixing?: boolean }) {
  const id = useId().replaceAll(':', '');
  return <svg viewBox="0 0 600 440" className="paint-cup-art" role="img" aria-label={mixing ? 'Transparent cup with pink, blue and green paint swirled together using a wooden mixing stick.' : 'Drip Bunny pink, blue and green paint bottles pouring into a transparent mixing cup.'}>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" x2="1"><stop stopColor="#fff" stopOpacity=".65"/><stop offset=".3" stopColor="#fff" stopOpacity=".06"/><stop offset=".75" stopColor="#c3e6f1" stopOpacity=".15"/><stop offset="1" stopColor="#fff" stopOpacity=".65"/></linearGradient>
      <linearGradient id={`${id}-cap`}><stop stopColor="#d5d7da"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#d5d7da"/></linearGradient>
      <linearGradient id={`${id}-shine`}><stop stopColor="#fff" stopOpacity=".5"/><stop offset=".22" stopColor="#fff" stopOpacity="0"/><stop offset=".8" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".13"/></linearGradient>
      <clipPath id={`${id}-inside`}><path d="M192 246 Q300 214 408 246 L386 363 Q300 395 214 363Z"/></clipPath>
    </defs>
    <ellipse cx="300" cy="390" rx="128" ry="15" fill="#462132" opacity=".08"/>
    {!mixing && <>
      {(['#f34370', '#198fe3', '#23a46a'] as const).map((colour, i) => <g key={colour} transform={`translate(${105 + i * 155} 30) rotate(${i === 0 ? -165 : i === 2 ? 165 : 180} 44 90)`}>
        <rect x="5" y="28" width="78" height="128" rx="21" fill={colour}/>
        <rect x="5" y="28" width="78" height="128" rx="21" fill={`url(#${id}-shine)`}/>
        <rect x="23" y="8" width="42" height="25" rx="5" fill={`url(#${id}-cap)`}/><ellipse cx="44" cy="8" rx="20" ry="4" fill={colour}/>
        <text x="44" y="85" textAnchor="middle" fill="white" fontWeight="900" fontSize="16"><tspan x="44">DRIP</tspan><tspan x="44" dy="17">BUNNY</tspan></text>
        
      </g>)}
      <g fill="none" strokeWidth="9" strokeLinecap="round" opacity=".88">
        <path d="M125 207 Q160 247 237 268" stroke="#f34370"/>
        <path d="M304 210 L301 267" stroke="#198fe3"/>
        <path d="M482 207 Q440 244 368 268" stroke="#23a46a"/>
      </g>
    </>}
    <path d="M184 233 L210 365 Q300 407 390 365 L416 233" fill={`url(#${id}-glass)`} stroke="#91b5c0" strokeWidth="3"/>
    <g clipPath={`url(#${id}-inside)`}>
      <path d="M190 251 Q300 224 411 251 L392 374 Q300 410 207 374Z" fill="#198fe3"/>
      {mixing ? <>
        <path d="M195 273 C250 231 417 263 373 300 C328 333 214 283 241 326 C267 364 398 326 386 373 L222 390" fill="none" stroke="#f34370" strokeWidth="27"/>
        <path d="M207 260 C285 304 393 234 382 278 C370 324 236 326 261 353 C288 379 366 342 395 370" fill="none" stroke="#23a46a" strokeWidth="24"/>
        <path d="M201 271 C289 316 382 252 369 279 C349 313 239 293 240 326 C241 363 348 366 387 349" fill="none" stroke="#fff6e8" strokeWidth="6"/>
      </> : <>
        <path d="M191 246 Q236 233 267 256 L266 390 L212 373Z" fill="#f34370"/>
        <path d="M337 255 Q380 231 412 248 L389 374 L335 390Z" fill="#23a46a"/>
        <path d="M268 248 Q300 244 335 249" fill="none" stroke="#a6deff" strokeWidth="6"/>
      </>}
    </g>
    {mixing && <g transform="rotate(23 310 275)">
      <rect x="301" y="99" width="18" height="220" rx="8" fill="#c69662" stroke="#987044" strokeWidth="2"/>
      <path d="M307 112 L307 275" stroke="#f5d7af" strokeWidth="4" strokeLinecap="round"/>
      <path d="M302 276 L302 313 Q310 325 318 313 L318 276" fill="#f34370" opacity=".8"/>
    </g>}
    <path d="M184 233 L210 365 Q300 407 390 365 L416 233" fill={`url(#${id}-glass)`} stroke="#91b5c0" strokeWidth="3"/>
    <ellipse cx="300" cy="233" rx="116" ry="26" fill="#fff" fillOpacity=".1" stroke="#91b5c0" strokeWidth="3"/>
    <path d="M204 250 L223 350" stroke="white" strokeOpacity=".85" strokeWidth="7" strokeLinecap="round"/>
    <path d="M395 251 L376 351" stroke="white" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round"/>
    {mixing && <path d="M251 193 C222 171 242 152 266 160 M244 174 L241 159 L227 164" fill="none" stroke="#0759b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
  </svg>;
}
