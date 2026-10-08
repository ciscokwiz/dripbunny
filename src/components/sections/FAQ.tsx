'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/config/brand';
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return <section id="faq" className="section faq-section"><div data-reveal><p className="eyebrow">08 / A FEW LITTLE ANSWERS</p><h2>CURIOUS?<br/><span className="serif-pop">GOOD.</span></h2><p className="faq-intro">A little know-how before<br/>you let your colours flow.</p><span className="faq-doodle" aria-hidden="true">? ✷</span></div><div className="faq-list">{faqs.map((faq, i) => <article className="faq-item" key={faq.question}><h3><button aria-expanded={open === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpen(open === i ? null : i)}>{faq.question}{open === i ? <Minus size={19}/> : <Plus size={19}/>}</button></h3><AnimatePresence initial={false}>{open === i && <motion.div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} initial={{ height: reduced ? 'auto' : 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: reduced ? 'auto' : 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .23 }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></article>)}</div></section>;
}
