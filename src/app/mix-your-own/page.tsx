import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { brand } from '@/config/brand';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { MarbleLab } from '@/components/sections/MarbleLab';
export const metadata: Metadata = { ...(brand.siteUrl ? { alternates: { canonical: '/mix-your-own' } } : {}), title: 'Mix Your Own Paint Kit — Drip Bunny', description: 'Choose blank bunny quantities, three paint colours and your own specifications. Preview your palette and save your custom kit to your bag.' };
export default function MixYourOwnPage() {
  return <><Header/><main id="main" className="custom-kit-page"><Link href="/#shop" className="custom-back"><ArrowLeft size={16}/> Back to the collection</Link><MarbleLab dedicated/></main><Footer/><CartDrawer/><MotionProvider/></>;
}
