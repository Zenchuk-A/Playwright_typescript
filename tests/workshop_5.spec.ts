import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test.describe('New page tests', () => {
    test('Check new page link', async ({ page, context }) => {
        await page.goto(test_url + '/elements/new_tab/link');
        const pagePromise = context.waitForEvent('page');
        await page.locator('#new-page-link').click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        expect(newPage.locator('#result-text')).toHaveText('I am a new page in a new tab');
    });
});

test.describe("Cookies", () => {
    test('Add cookie', async ({ page }) => {
        const current_url = 'https://127.0.0.1:5500/tests/workshop_5.html';
        await page.goto(current_url);
        await page.getByRole('button', { name: 'Записать cookie' }).click();
        const cookies = await page.context().cookies(current_url);
        const cookieValue = cookies.find(cookies => cookies.name === 'testCookie');
        expect(page.locator('#result')).toHaveText('Cookie записан');
        expect(cookieValue?.value).toEqual('PlaywrightTest');
    });

    test('Read cookie', async ({ page }) => {
        const current_url = 'https://127.0.0.1:5500/tests/workshop_5.html';
        await page.goto(current_url);
        await page.context().addCookies([{ name: 'testCookie', value: 'Playwright_Test', url: current_url }]);
        await page.getByRole('button', { name: 'Прочитать cookie' }).click();
        expect(page.locator('#result')).toHaveText('Playwright_Test');
    });
});