//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { Login_LogoutPage } from './BaseTest';
test('Create Order Unique Order- Verify Order @smoke', async ({ page }) => {
        let loginPage = new Login_LogoutPage(page);
        await loginPage.gotoURL();
        await loginPage.LoginToApp("Tester", "test");
        await page.waitForLoadState();
        await loginPage.verifyURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
        

  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx')
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.waitForLoadState();
  await expect(page.locator("//h2[normalize-space()='Order']")).toBeVisible();
    //Verify that user has clicked on Order Link
  await page.url().includes('/Process.aspx')
  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
  //await page.getByLabel('Quantity:*').click();
  //await page.getByText('Quantity:*').click();
  await page.getByLabel('Quantity:*').fill('5');
  //await page.getByLabel('Customer name:*').click();
  
  const d = new Date();
  let ms = d.getMilliseconds();
  // Local variable declaration
  const ExpUserName = 'Dixit' + ms;

  //Dixit6546567

  await page.getByLabel('Customer name:*').fill(ExpUserName);
  //await page.pause()
  await page.getByLabel('Street:*').fill('BTM')
  //await page.waitForTimeout(1000);
  //await page.waitForLoadState();
  //await page.getByLabel('Street:*').isEditable().fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').click();
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').click();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();
 
  const neworder = await page.locator("//strong[normalize-space()='New order has been successfully added.']")
  await expect(neworder).toContainText('New order has been successfully added.')

  await page.getByRole('link', { name: 'View all orders' }).click();
  // Verify that user got created
  await expect(page.locator("//td[text()='"+ExpUserName+"']")).toHaveText(ExpUserName)
  
  await loginPage.LogoutFromApp();
    await page.waitForLoadState();
  await loginPage.verifyURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');

});