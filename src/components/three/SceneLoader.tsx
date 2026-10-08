'use client';
import dynamic from 'next/dynamic';
export const Scene = dynamic(() => import('./BunnyScene'), { ssr: false, loading: () => <div className="scene-loading"><span className="loader-dot" />Opening the paint studio…</div> });
