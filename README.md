# Drip Bunny — Pour. Paint. Play.

A working Next.js App Router storefront and procedural 3D marble-paint playground, inspired by the supplied four-colour Drip Bunny packaging.

## Run locally

Use Node.js **24.19.0** (the validated runtime) and npm 11.9.0. Other runtime versions have not been validated here.

```sh
npm ci --cache /workspace/.npm-cache  # in this cloud workspace
npm run dev
```

For a normal local machine, `npm ci` is sufficient. Open the development server on port 3000. The cloud environment already isolates tasks: use the existing `/workspace/dripbunny` checkout; do not create a worktree unless explicitly requested.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run start
npm run test:e2e
```

Playwright uses the cloud machine's `/usr/bin/chromium`. Elsewhere, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to your installed Chromium executable, or install Playwright Chromium and update that path. The test runner starts a production server automatically if port 3000 is free. Browser tests require `npm run build` first.

## Features

- All ten briefed sections: hero, colourways, Marble Lab, scroll storytelling, collection, interactive kit breakdown, sample gallery, creative-use cards, FAQ and final CTA.
- Four typed variants; palette selection changes the hero material, backdrop and controls.
- Custom primitive-composed bunny matching the reference's large round head, tall ears and compact limbs. It is a stylised interpretation, not an exact product replica.
- Object-space, domain-warped procedural marble injected into a Three.js physical material, with glossy clearcoat, local studio reflections, shadows, floating droplets and drag rotation.
- Marble Lab: base colour, three colour inputs, presets, visible animated pouring, remix, reset and auto rotation. An artistic approximation, not physical fluid simulation. Image export is not implemented.
- Typed Zustand bag: independent variant quantities, add/remove, bounds, subtotal calculations, empty state and validated local-storage persistence. Unknown prices remain unknown; they are never treated as free.
- Focus-trapped dialogs with Escape/return-focus support; accessible mobile menu and FAQ; semantic landmarks and focus indicators.
- Lenis smooth scrolling, GSAP ScrollTrigger reveals/story stages and Motion entrances; reduced-motion support.
- Viewport-deferred 3D mounting, offscreen rendering pause, shared model geometry/material, capped pixel ratio and graceful illustrated fallback for WebGL errors/unavailability.
- Strict TypeScript, ESLint, unit tests and production-browser tests at 375, 768, 1440 and 1920px.
- Self-hosted fonts, metadata, favicon and configurable sitemap/robots. No unverified Product offers, ratings or availability schema is emitted.

## Change product and business information

`src/config/products.ts` is the single catalogue. Proposed variant labels are not official product names. Set `priceMinor` to a confirmed non-negative integer amount in the configured currency's minor units; default `null` means pricing is unconfirmed. The current configurable currency is USD, with two fractional digits. Confirm the currency and adapt integer-unit formatting if choosing a currency with a different exponent.

Set `image` to a real local product photo path (e.g. `/images/ruby-rush.webp`). Cards use Next Image automatically when supplied. **The uploaded reference was visible in the chat but not supplied as a downloadable image file**, so the repo contains explicitly labelled brand-created sample illustrations instead of packaging photos. Do not present these as product photography.

`src/config/brand.ts` contains editable contact, social, drying, delivery and supervision information. Unconfirmed values are `null` and are neither invented nor linked to fake destinations. Supply accurate information before launch. Add approved customer gallery images/credits by replacing the labelled studio samples in `Gallery.tsx`.

## Connect payments

`src/lib/checkout.ts` defines the checkout integration boundary. It currently returns an explicit unavailable result, saves no order and takes no payment. The bag button explains that status rather than pretending payment works.

To launch checkout:

1. Confirm product names, prices, currency, stock policy and fulfilment details.
2. Implement an App Router server route that accepts product IDs and quantities, validates them, and calculates authoritative prices from a server catalogue.
3. Create a checkout session with your payment provider using server-only credentials. Return its trusted redirect URL through `CheckoutResult`.
4. Verify signed provider webhooks server-side; fulfil only confirmed payments and make webhook processing idempotent.
5. Publish truthful delivery, returns, privacy, contact and safety information.

Never expose payment secrets in `NEXT_PUBLIC_*` variables or trust client totals/local storage. Do not launch payment or claim orders are available until the integration is tested.

## Asset pipeline

See `public/images/README.md`, `public/models/README.md` and `docs/DESIGN.md`. No external HDR downloads are needed: the 3D stage generates a local studio environment. An accurate licensed `.glb` can replace the composed meshes in `BunnyModel.tsx` while retaining the material/scene interface. Match scale, pivot, shadows and material assignments; the current shader deliberately uses object/world-space coordinates rather than asset UVs.

## Deploy

Deploy on a Node-compatible Next.js host or Vercel. Use `npm ci`, then `npm run build`; on a Node server run `npm run start`. Copy `.env.example` to the host's secure environment settings, set the real `NEXT_PUBLIC_SITE_URL` to an HTTPS origin, then rebuild. Sitemap and canonical metadata only populate after a real origin is configured. Fonts and procedural 3D have no external runtime fetch dependency.

The storefront can be deployed for exploration now. A commerce launch still needs real packaging/product photography, confirmed product/business details, permitted customer assets where desired, payment backend, policy pages, and provider testing. There are no real customer testimonials or fabricated prices in this implementation.
