import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test.describe('Form filling test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(test_url + '/forms/practice-form');
    });

    test('Register with valid data', async ({ page }) => {
        await page.locator('[placeholder="First Name"]').fill('John');
        await page.locator('[placeholder="Last Name"]').fill('Doe');
        await page.locator('#userEmail').fill('john.doe@example.org');
        await page.getByRole('textbox', { name: 'mobile' }).fill('0123456789');
        await page.getByRole('radio', { name: 'Male', exact: true }).check();
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForLoadState('networkidle');
        expect(page.locator('#resultsModalLabel')).toBeEnabled();
        expect(await page.locator('#resultsModalLabel').textContent()).toContain('Thanks for submitting the form');
    });

    test('Register with invalid data', async ({ page }) => {
        const firstName = page.getByPlaceholder('First Name');
        await page.getByRole('button', { name: 'Submit' }).click();
        const isRequired = await firstName.evaluate((element: HTMLInputElement) => element.required);
        expect(isRequired).toBe(true);
        const isValueMissing = await firstName.evaluate((element: HTMLInputElement) => element.validity.valueMissing);
        expect(isValueMissing).toBe(true);
        const isValid = await firstName.evaluate((element: HTMLInputElement) => element.validity.valid);
        expect(isValid).toBe(false);
    });
});