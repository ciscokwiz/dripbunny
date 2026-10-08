'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
export function Modal({ open, close, title, children, drawer = false }: { open: boolean; close: () => void; title: string; children: ReactNode; drawer?: boolean }) {
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const nodes = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, [tabindex="0"]');
      if (!nodes?.length) { event.preventDefault(); return; }
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', handleKey); previous?.focus(); };
  }, [open, close]);
  if (!open) return null;
  return createPortal(<div className={`modal-root ${drawer ? 'drawer-root' : ''}`} data-lenis-prevent>
    <div className="modal-backdrop" onClick={close} aria-hidden="true" />
    <div ref={dialog} className={`modal ${drawer ? 'drawer' : ''}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
      <div className="modal-heading"><h2>{title}</h2><button className="icon-button" onClick={close} aria-label={`Close ${title}`}><X size={22} /></button></div>
      {children}
    </div>
  </div>, document.body);
}
