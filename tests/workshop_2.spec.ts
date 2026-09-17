import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test.describe('Email tests', () => {
    test('Check correct email field', async ({ page }) => {
        const email = 'test@hmail.con';
        await page.goto(test_url + '/elements/input/email');
        await page.getByPlaceholder('Submit me').fill(email);
        await page.getByPlaceholder('Submit me').press('Enter');
        await expect(page.locator('#result-text')).toHaveText(email);
    });

    test('Check incorrect email field', async ({ page }) => {
        const email = 'test_hmail.con';
        await page.goto(test_url + '/elements/input/email');
        await page.getByPlaceholder('Submit me').fill(email);
        await page.getByPlaceholder('Submit me').press('Enter');
        await expect(page.locator('#error_1_id_email')).toHaveText('Enter a valid email address.');
    });
});
