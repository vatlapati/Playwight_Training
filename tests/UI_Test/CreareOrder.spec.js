import { test, expect } from '@playwright/test';

test('Create Order and validate order', async ({ page }) => {

 //Login
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  //await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Default.aspx');
  await expect(page.locator('h2')).toContainText('List of All Orders');
 //Create Order
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill('10');
  await page.getByRole('textbox', { name: 'Discount:' }).fill('10');
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Street:*' }).fill('123, 1st Line');
  await page.getByRole('textbox', { name: 'City:*' }).fill('Bangalore');
  await page.getByRole('textbox', { name: 'State:' }).fill('Karnataka');
  await page.getByRole('textbox', { name: 'Zip:*' }).fill('560036');
  await page.getByRole('radio', { name: 'Visa' }).check();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).click();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill('373484737947');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('01/28');
  await page.getByRole('link', { name: 'Process' }).click();
  await expect(page.getByRole('strong')).toContainText('New order has been successfully added.');
   await page.getByRole('link', { name: 'Logout' }).click();
});