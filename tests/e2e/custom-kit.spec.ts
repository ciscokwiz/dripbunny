import { test, expect } from '@playwright/test';
test('dedicated custom kit builder saves the exact specifications and persists them', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('#shop').scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Mix your own paint', exact: true }).click();
  await expect(page).toHaveURL(/\/mix-your-own$/);
  await expect(page.getByRole('heading', { name: /YOUR PAINT/ })).toBeVisible();
  await page.getByRole('button', { name: 'Midnight base' }).click();
  await page.getByLabel('Paint colour 1').fill('#008a49');
  await page.getByLabel('Paint colour 2').fill('#ffaabb');
  await page.getByLabel('Blank bunnies per custom kit').selectOption('3');
  await page.getByLabel('Your paint and blank specifications').fill('Match emerald and rose shades.');
  await page.getByRole('button', { name: 'Pour the paint' }).click();
  await page.getByRole('button', { name: 'Add this colour combination to bag' }).click();
  const bag = page.getByRole('dialog', { name: 'Your bag (1)' });
  await expect(bag).toBeVisible();
  await expect(bag.getByText('3 blank bunnies + 3 selected paints')).toBeVisible();
  await expect(bag.getByText('#008a49', { exact: true })).toBeVisible();
  await expect(bag.getByText('#ffaabb', { exact: true })).toBeVisible();
  await expect(bag.getByText('#3c2547', { exact: true })).toBeVisible();
  await expect(bag.getByText('Match emerald and rose shades.')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.reload();
  await page.getByRole('button', { name: 'Open bag, 1 items' }).click();
  await expect(page.getByRole('dialog').getByText('Match emerald and rose shades.')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Back to the collection' }).click();
  await expect(page).toHaveURL(/\/#shop$/);
  expect(errors).toEqual([]);
});
test('Marble Lab can add its selected colour combination directly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#marble-lab').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Add this colour combination to bag' })).toHaveCount(0);
  await page.getByLabel('Paint colour 1').fill('#12ab34');
  await page.getByRole('button', { name: 'Pour the paint' }).click();
  await page.getByRole('button', { name: 'Add this colour combination to bag' }).click();
  await expect(page.getByRole('dialog').getByText('#12ab34', { exact: true })).toBeVisible();
});
for (const width of [375, 1440]) {
  test(`story navigation scrolls through exactly one ordered stage at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#how-it-works').scrollIntoViewIfNeeded();
    const titles = ['POUR IT.', 'SWIRL IT.', 'SHOW IT OFF.'];
    for (const i of [0, 1, 2, 1, 0]) {
      await page.getByRole('button', { name: `Preview ${titles[i]}` }).click();
      await expect(page.locator('.how-step.current')).toHaveCount(1);
      await expect(page.locator(`[data-step="${i}"]`)).toHaveAttribute('aria-current', 'step');
      await expect(page.locator('.story-stage-label')).toContainText(`STEP 0${i + 1}`);
    }
    const sequence: number[] = [];
    for (let n = 0; n < 10; n++) {
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(70);
      const stage = await page.locator('.how-step.current').getAttribute('data-step');
      sequence.push(Number(stage));
    }
    expect(sequence).toEqual([...sequence].sort((a, b) => a - b));
    expect(sequence).toContain(1);
    expect(sequence).toContain(2);
  });
}
