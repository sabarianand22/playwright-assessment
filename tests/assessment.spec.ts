import { test, expect } from '@playwright/test';

test.describe('Playwright Assessment', () => {
    test('Test Scenario 1: Simple Form Demo', async ({ page }) => {
        await page.goto('/selenium-playground');
        // Expect a title "to contain" a substring.
        await expect(page).toHaveURL(/selenium-playground/);
        await page.getByText('Simple Form Demo').click();
        await expect(page.locator('div h1')).toHaveText('Simple Form Demo');
        await expect(page).toHaveURL(/simple-form-demo/);
        const inputData = "Welcome to LambdaTest";
        await page.locator('[placeholder="Please enter your Message"]').fill(inputData);
        await page.locator('#showInput').click();
        await expect(page.locator('#message')).toHaveText(inputData);
    });
    test('Test Scenario 2: Drag & Drop Sliders', async ({ page }) => {
        await page.goto('/selenium-playground');
        // Expect a title "to contain" a substring.
        await expect(page).toHaveURL(/selenium-playground/);
        await page.getByText('Drag & Drop Sliders').click();
        await expect(page.locator('div h1')).toHaveText('Slider Demo');

        const slider = page.locator('//*[text()=" Default value 15"]/following-sibling::div/input');
        const box = await slider.boundingBox();

        if (box) {
            const { min, max, step } = await slider.evaluate((el: HTMLInputElement) => ({
                min: parseFloat(el.min) || 0,
                max: parseFloat(el.max) || 100,
                step: parseFloat(el.step) || 1
            }));

            const steps = (max - min) / step;
            console.log(steps);
            const stepWidth = box.width / steps;
            const targetSteps = (93 - min) / step;
            const targetX = box.x + targetSteps * stepWidth;

            const startX = box.x + 1;
            const centerY = box.y + box.height / 2;

            await page.mouse.move(startX, centerY);
            await page.mouse.down();
            await page.mouse.move(targetX, centerY, { steps: 10 });
            await page.mouse.up();
        }
        // await page.locator('//*[text()=" Default value 15"]/following-sibling::div/input')
        //     .evaluate((el: HTMLInputElement) => {
        //         el.value = '95';
        //         el.dispatchEvent(new Event('input', { bubbles: true }));
        //         el.dispatchEvent(new Event('change', { bubbles: true }));
        //     });
        // await page.waitForTimeout(10000);

        // Assertion to verify the dragged value is 95
        await expect(page.locator('//*[text()=" Default value 15"]/following-sibling::div/output')).toHaveText('95');
    });
    test('Test Scenario 3: Input Form Submit', async ({ page }) => {
        await page.goto('/selenium-playground');
        // Expect a title "to contain" a substring.
        await expect(page).toHaveURL(/selenium-playground/);
        await page.getByText('Input Form Submit').click();
        await page.getByRole('button', { name: 'Submit' }).click();

        const name = page.locator('#name'); // adjust selector as needed

        const validationMessage = await name.evaluate((el: HTMLInputElement) => el.validationMessage);

        expect(validationMessage).toContain('Please fill out this field.');

        // Enter all the fields and click submit
        await page.locator('#name').fill('sabari');

        await page.locator('.wrapper [type="email"]').fill('sabari@gmail.com');
        await page.locator('.wrapper [type="password"]').fill('test123-pass');
        await page.locator('#company').fill('test-company');
        await page.locator('#websitename').fill('website name');
        await page.locator('#inputCity').fill('Salem');
        await page.locator('#inputAddress1').fill('test address1');
        await page.locator('#inputAddress2').fill('address 2');
        await page.locator('#inputState').fill('TN');
        await page.locator('#inputZip').fill('123456');
        await page.selectOption('[name="country"]', 'IN');

        // Submit and verify the success message
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('.success-msg')).toContainText('Thanks for contacting us, we will get back to you shortly');
    });
});
