import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
import { brand } from '@/config/brand';
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/#home" aria-label="Back to Drip Bunny home"><Wordmark/></Link><p>Big colours. Little bunny.<br/>Endless ways to make it yours.</p></div><div className="footer-links"><div><span>EXPLORE</span><Link href="/#shop">Shop the kits</Link><Link href="/#marble-lab">Marble Lab</Link><Link href="/#gallery">Studio gallery</Link></div><div><span>GOOD TO KNOW</span><Link href="/#how-it-works">How it works</Link><Link href="/#inside-box">What’s in the box</Link><Link href="/#faq">FAQs</Link></div>{(brand.supportEmail || brand.socialLinks.length > 0) && <div><span>SAY HELLO</span>{brand.supportEmail && <a href={`mailto:${brand.supportEmail}`}>Get in touch <ArrowUpRight size={13}/></a>}{brand.socialLinks.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={13}/></a>)}</div>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DRIP BUNNY</span><span>POUR. PAINT. PLAY.</span><span>A LITTLE CREATIVITY GOES A LONG WAY. ✷</span></div></footer>;
}
