import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test('Basic Navigation', async ({ page }) => {
    await page.goto(test_url);
    await page.waitForTimeout(3000);
    await page.reload();
    await expect(page).toHaveTitle('Home Page | QA Practice');
});

test('Click the button', async ({ page }) => {
    await page.goto(test_url + "/elements/button/simple");
    await page.click('#submit-id-submit');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#result-text')).toBeVisible();
});

test('Fill in the field and submit it.',async({page})=>{
    const test_phrase='Test_phrase';
    await page.goto(test_url);
    await page.locator('#content').getByRole('link', { name: 'Text input' }).click();
    await page.getByLabel('Text string').fill(test_phrase);
    await page.getByLabel('Text string').press("Enter");
    await expect(page.locator('#result-text')).toHaveText(test_phrase);
});