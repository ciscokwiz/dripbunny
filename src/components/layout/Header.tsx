'use client';
import { useCallback, useState } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { itemCount } from '@/lib/cart';
import { Wordmark } from '@/components/ui/Wordmark';
import { Modal } from '@/components/ui/Modal';
const links = [['Shop', '#shop'], ['How it works', '#how-it-works'], ['Marble Lab', '#marble-lab'], ['Gallery', '#gallery'], ['FAQ', '#faq']] as const;
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useStore(s => s.items), setCartOpen = useStore(s => s.setCartOpen);
  const count = itemCount(items);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  return <>
    <div className="announcement">A blank bunny. A wild imagination. <span>Let’s make something yours. <span aria-hidden="true">↗</span></span></div>
    <header className="site-header"><a href="#home" aria-label="Drip Bunny home"><Wordmark small /></a>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav>
      <div className="header-actions"><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${count} items`}><ShoppingBag size={20}/><span className="bag-label">Your bag</span><motion.span key={count} initial={false} animate={{ scale: 1 }} className="bag-count">{count}</motion.span></button><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu /></button></div>
    </header>
    <Modal open={menuOpen} close={closeMenu} title="Explore Drip Bunny"> <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([name, href]) => <a key={href} href={href} onClick={closeMenu}>{name}<span>↗</span></a>)}</nav></Modal>
  </>;
}
