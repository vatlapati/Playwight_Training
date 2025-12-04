import { test, expect } from '@playwright/test';

test('LogonToHrmPage', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await expect(page).toHaveTitle('OrangeHRM');
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole('button', { name: 'Login'}).click()
    await expect(page.locator("//h6[text()='Dashboard']")).toHaveText('Dashboard')
    // await expect(page.getByRole('heading')).toContainText('Dashboard');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('banner')).toContainText('User Management');
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
    await page.getByRole('listbox').getByText('Admin').click();
    // await page.getByRole('textbox', { name: 'Type for hints...' }).click();
    // await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Ravi ');
    // await page.getByText('Ravi M B').click();
    await page.locator('[placeholder="Type for hints..."]').click();
    await page.locator('[placeholder="Type for hints..."]').fill('A');
    await page.waitForTimeout(3000)

//  Using index concept
//   await page.locator('div.oxd-autocomplete-option').nth(0).click();
// using keyboard operation
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await page.getByRole('textbox').nth(2).click();
    const dt =new Date;
    const time = dt.getUTCMinutes(); 
    const userName = 'Amit' + time; 
    await page.getByRole('textbox').nth(2).fill(userName);
    await page.getByRole('textbox').nth(3).click();
    await page.waitForTimeout(3000)
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill(userName);
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill(userName);
    await page.getByRole('button', { name: 'Save' }).click();
    //page.locator('div').filter({ hasText: userName }).first();
    await page.waitForSelector('div.oxd-table-body');
    await expect(page.locator('div.oxd-table-body')).toContainText(userName);

});