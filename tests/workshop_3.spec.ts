import { test, expect } from '@playwright/test';

const test_url = 'https://www.qa-practice.com';

test.describe('Iframe and drag-n-drop tests', () => {
    test('Check correct page header', async ({ page }) => {
        await page.goto(test_url + '/elements/dragndrop/boxes');
        expect(page.getByRole('heading', { level: 1 })).toHaveText('Drag-n-drop');
    });

    test('Drag-n-drop', async ({ page }) => {
        await page.goto(test_url + '/elements/dragndrop/boxes');
        // 1)
        // await page.dragAndDrop('#rect-draggable', '#rect-droppable',);
        // 2)
        await page.locator('#rect-draggable').hover();
        await page.mouse.down({ button: 'left' });
        await page.locator('#rect-droppable').hover();
        await page.mouse.up();
        expect(page.locator('#text-droppable')).toContainText('Dropped!');
    });

    test('Handling iframe', async ({ page }) => {
        await page.goto(test_url + '/elements/iframe/iframe_page');
        const testFrame = page.frameLocator('.embed-responsive-item');
        await testFrame.locator('.navbar-toggler-icon').click();
        /*
        with this row:
        await page.mouse.move(2, 2);
        the main window will be scrolled
        in other case iframe will be scrolled
        */
        // 
        await page.mouse.wheel(0,100);
    });
});
