import type { Metadata } from 'next';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/fredoka/latin-700.css';
import '@fontsource/nunito-sans/latin-400.css';
import '@fontsource/nunito-sans/latin-600.css';
import '@fontsource/nunito-sans/latin-700.css';
import './globals.css';
import { brand } from '@/config/brand';
export const metadata: Metadata = {
  title: 'Drip Bunny — Pour. Paint. Play.', description: 'A little paint. A lot of possibility. Explore four colourful marble pour kits and create your own masterpiece in the Drip Bunny Marble Lab.',
  ...(brand.siteUrl ? { metadataBase: new URL(brand.siteUrl), alternates: { canonical: '/' } } : {}),
  openGraph: { title: 'Drip Bunny — Make it yours.', description: 'Discover a colourful world of DIY marble pour painting. Pick your drip and play in the Marble Lab.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
