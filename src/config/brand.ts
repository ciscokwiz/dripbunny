export const brand = {
  name: 'Drip Bunny', tagline: 'Pour. Paint. Play.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  supportEmail: null as string | null,
  socialLinks: [] as { label: string; url: string }[],
  dryingTime: null as string | null,
  delivery: null as string | null,
  supervision: null as string | null,
};
export const faqs = [
  { question: 'What’s inside the kit?', answer: 'Each kit includes 1 bunny figure, 3 premium pour paints, 2 mixing cups and 1 pair of gloves. Your imagination does the rest.' },
  { question: 'Is Drip Bunny suitable for children?', answer: 'The packaging recommends ages 8+. Follow the safety guidance included with your kit. Specific supervision instructions are awaiting confirmation.' },
  { question: 'Do I need painting experience?', answer: 'This is a DIY marble pour painting kit. Explore the virtual Marble Lab to try colour combinations, then follow your kit’s instructions for your real creation.' },
  { question: 'Will my bunny look like everyone else’s?', answer: 'Different colour combinations and pours create different marble patterns. That’s the fun of making something your own.' },
  { question: 'How do I use the pour paints?', answer: 'Follow the instructions supplied with the physical kit. The Marble Lab is a creative preview, not a substitute for product instructions.' },
  { question: 'Can I choose more than one kit?', answer: 'Absolutely. Add different colourways and adjust quantities in your bag. Pricing and payment checkout are awaiting business configuration.' },
  { question: 'How long does the paint take to dry?', answer: brand.dryingTime || 'Drying guidance is awaiting confirmation. Consult the instructions included with your kit.' },
  { question: 'Where do you deliver?', answer: brand.delivery || 'Delivery destinations, costs and timing are awaiting confirmation before checkout launches.' },
];
