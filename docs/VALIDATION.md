# Validation

Validated in the current cloud machine with Node 24.19.0, npm 11.9.0 and installed Chromium.

- Clean, frozen-lockfile installation with `npm ci --cache /workspace/.npm-cache`: passed.
- `npm run typecheck`: passed under strict TypeScript.
- `npm run lint`: passed with no errors or warnings.
- `npm test`: 6 unit tests passed, covering variant-separated bag contents, quantity limits/removal, unknown prices, integer subtotal calculations, palette selection and unavailable checkout.
- `npm run build`: passed; page, icon, robots and sitemap routes generated.
- `npm run test:e2e`: 7 browser tests passed against the production build. Checks include palette selection, Lab pour/remix/reset, persisted bag quantities, removals, explicit unavailable checkout, mobile menu and FAQ, layouts at 375/768/1440/1920px, headline clipping prevention, forced WebGL fallback, and visible rendered-pixel changes after palette selection/pouring.
- Tested browser paths reported no runtime/console errors in the checked reduced-motion layouts and rendered-paint test.
- Development server startup on port 3001: expected storefront HTTP response and working browser rendering. A reduced-motion development browser check reported no hydration or console errors after fixing SSR animation initials and allowing the exact loopback dev origin.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities reported at validation time.

The browser uses software-rendered WebGL. These checks do not establish physical iOS/Android GPU performance or replace screen-reader/device testing. Payment processing, real orders, shipping and actual packaging photography were not validated because those integrations/assets/business details were not supplied. See LAUNCH.md for requirements. Saved cloud install/start instructions are configuration drafts; publication and fresh-task restoration are separate product actions and have not been claimed as tested.

## Custom kit and storytelling revision

- 12 unit tests passed, including distinct custom configurations, palette-copy isolation, rejected malformed specifications, legacy/custom persistence, and configured per-blank/paint-set subtotal calculations.
- 11 production browser tests passed. New checks cover the dedicated /mix-your-own route, configured blank counts/colours/base/notes in the bag, persistence after reload, direct Lab-to-cart additions, and ordered forward/backward story navigation plus continuous monotonic scrolling on mobile and desktop.
- Strict TypeScript, ESLint and production build passed. The /mix-your-own route is generated and included in the sitemap when the canonical origin is configured.
- Fresh custom-page mobile render: document width 375px; footer ends at the document bottom, with no horizontal overflow.
- Actual product photos remain unavailable. Both collection sections and quick view are wired to the shared catalogue-backed ProductVisual component; the clearly disclosed sample illustrations have not been represented as real photos.

## Smooth story transitions

Story animation now uses continuous scroll progress with a hold at each step, rather than switching between three fixed animation targets. The material uses bunny-local coordinates so the finished marble pattern stays attached during the display turn. Stage headings have room above the model and are no longer clipped by the panel corners.

Validation covers forward/backward navigation at 375px and 1440px, intermediate progress with normal and reduced motion, and the actual WebGL paint render. Browser checks wait for rendered frames because software WebGL can delay animation frames; fixed millisecond delays are not reliable here. Physical mobile GPU performance remains untested.

## Cup illustrations for Pour and Swirl

Pour now shows pink, blue and green Drip Bunny bottles pouring into a transparent cup. Swirl shows the same colours marbled inside a transparent cup with a wooden mixing stick. These are local vector illustrations based on the supplied bottle reference; Show retains the finished blue 3D bunny. The three views crossfade with the existing scroll progress and respect reduced motion.

Production story checks verify the correct accessible artwork and full opacity at each step, forward/backward mobile and desktop navigation, and continuous progression with normal and reduced motion. Captured 375px visuals were inspected for clear cups, visible labels and the preserved finished bunny.
