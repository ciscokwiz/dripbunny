'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="error-page"><p className="eyebrow">A LITTLE PAINT SPILL.</p><h1>Let’s try that again.</h1><p>The studio couldn’t finish loading.</p><button className="button primary" onClick={reset}>Reopen the studio</button></main>; }
