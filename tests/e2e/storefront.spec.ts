import { test, expect } from '@playwright/test';
test('colour selection, paint lab, persistent bag and checkout boundary', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('POUR.');
  await page.getByRole('button', { name: 'Preview Blue Splash', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Preview Blue Splash', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#marble-lab').scrollIntoViewIfNeeded();
  await page.getByLabel('Paint colour 1').fill('#00ff88');
  await page.getByRole('button', { name: 'Pour the paint' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Paint poured!' })).toBeVisible();
  await page.getByRole('button', { name: 'Remix', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'A fresh swirl.' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Back to a blank canvas.' })).toBeVisible();
  await page.locator('#shop').scrollIntoViewIfNeeded();
  await page.locator('.product-card').first().getByRole('button', { name: 'Add to bag' }).click();
  await expect(page.getByRole('dialog', { name: 'Your bag (1)' })).toBeVisible();
  await page.getByRole('button', { name: 'Increase Ruby Rush quantity' }).click();
  await expect(page.getByRole('dialog', { name: 'Your bag (2)' })).toBeVisible();
  await page.getByRole('button', { name: 'Close Your bag (2)' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Open bag, 2 items' }).click();
  await expect(page.getByRole('dialog', { name: 'Your bag (2)' })).toBeVisible();
  await page.getByRole('button', { name: 'Check checkout status' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'no order has been placed' })).toBeVisible();
  await page.getByRole('button', { name: 'Remove Ruby Rush' }).click();
  await expect(page.getByText('A little empty.')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});
for (const width of [375, 768, 1440, 1920]) {
  test(`layout and navigation at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.locator('h1').evaluate(heading => { const range = document.createRange(); range.selectNodeContents(heading); return Array.from(range.getClientRects()).every(rect => rect.left >= 0 && rect.right <= window.innerWidth); })).toBe(true);
    await expect(page.getByRole('heading', { name: /PICK A COLOUR/ })).toBeVisible();
    if (width < 850) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ' }).click();
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Where do you deliver?' }).click();
    await expect(page.getByText(/Delivery destinations, costs and timing/)).toBeVisible();
    await page.screenshot({ path: `test-results/layout-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
test('illustrated fallback when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.apply(this, [type, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.getByText('Illustrated view · 3D unavailable').first()).toBeVisible();
  await page.getByRole('button', { name: 'Preview Golden Drip', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Preview Golden Drip', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
test('WebGL renders a visible bunny and pouring changes its pixels', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hero = page.locator('.hero-bunny canvas');
  await expect(hero).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.hero-bunny .scene-placeholder')).toHaveCount(0, { timeout: 30000 });
  const original = await page.screenshot({ clip: (await hero.boundingBox())! });
  expect(original.length).toBeGreaterThan(8000);
  await page.getByRole('button', { name: 'Preview Blue Splash', exact: true }).click();
  await expect.poll(async () => (await page.screenshot({ clip: (await hero.boundingBox())! })).equals(original), { timeout: 20000 }).toBe(false);
  await page.locator('#marble-lab').scrollIntoViewIfNeeded();
  const lab = page.locator('.lab-stage canvas');
  await expect(lab).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.lab-stage .scene-placeholder')).toHaveCount(0, { timeout: 30000 });
  const blank = await page.screenshot({ clip: (await lab.boundingBox())! });
  await page.getByLabel('Paint colour 1').fill('#008a49');
  await page.getByLabel('Paint colour 2').fill('#86e1b3');
  await page.getByRole('button', { name: 'Pour the paint' }).click();
  await expect.poll(async () => (await page.screenshot({ clip: (await lab.boundingBox())! })).equals(blank), { timeout: 20000 }).toBe(false);
  await page.getByRole('button', { name: 'Remix', exact: true }).click();
  const poured = await page.screenshot({ clip: (await lab.boundingBox())! });
  expect(poured.length).toBeGreaterThan(8000);
  await page.screenshot({ path: 'test-results/lab-painted.png' });
  expect(errors).toEqual([]);
});
