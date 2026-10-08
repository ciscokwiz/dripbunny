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
