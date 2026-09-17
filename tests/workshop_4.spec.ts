import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test.describe('Alerts and pop-up tests', () => {
    test('Check alert', async ({ page }) => {
        await page.goto(test_url + '/elements/alert/alert');
        page.on("dialog", async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am an alert!');
            await dialog.accept();
        });

        await page.getByRole('link', { name: 'Click' }).click();
    });

    test('Check confirm alert', async ({ page }) => {
        await page.goto(test_url + '/elements/alert/confirm');
        page.on("dialog", async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('Select Ok or Cancel');
            await dialog.dismiss();
        });

        await page.getByRole('link', { name: 'Click' }).click();
        expect(page.locator('#result-text')).toHaveText('Cancel');
    });

    test('Check pop-up', async ({ page }) => {
        await page.goto(test_url + '/elements/popup/modal');
        await page.getByRole('button', { name: 'Launch Pop-Up' }).click();
        await page.waitForTimeout(500);
        expect(page.locator('#exampleModal')).toBeVisible();
        await page.locator('#id_checkbox_0').check();
        await page.getByRole('button', {name: 'Send'}).click();
        await page.waitForTimeout(500);
        expect(page.locator('#result-text')).toHaveText('select me or not');
    });

});