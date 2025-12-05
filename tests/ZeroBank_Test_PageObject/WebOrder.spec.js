import { test, expect } from '@playwright/test';

test('Login and create unique order (Playwright)', async ({ page }) => {
  // Load credentials from TestData/login.json
  const fs = require('fs');
  const path = require('path');
  const loginPath = path.join(process.cwd(), 'tests', 'AI_Test', 'TestData', 'login.json');
  const loginRaw = fs.readFileSync(loginPath, 'utf8');
  const login = JSON.parse(loginRaw);
  const username = login.username;
  const password = login.password;

  // Navigate to login page
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Login
  await page.fill("input[name='ctl00$MainContent$username']", username);
  await page.fill("input[name='ctl00$MainContent$password']", password);
  await page.click("input[name='ctl00$MainContent$login_button']");

  // Verify logout link visible
  await expect(page.locator('text=Logout')).toBeVisible();

  // Verify heading text
  await expect(page.locator("xpath=//h2[normalize-space()='List of All Orders']")).toHaveText('List of All Orders');

  // Verify title and URL
  await expect(page).toHaveTitle('Web Orders');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

  // Create a new order
  await page.click('text=Order');

  // Select product and quantity
  await page.selectOption("select[name='ctl00$MainContent$fmwOrder$ddlProduct']", { label: 'FamilyAlbum' });
  await page.fill("input[name='ctl00$MainContent$fmwOrder$txtQuantity']", '5');

  // Generate unique user name
  const randomInt = Math.floor(Math.random() * 100000000);
  const UserName = `Dixit${randomInt}`;

  // Fill address and payment details
  await page.fill("input[name='ctl00$MainContent$fmwOrder$txtName']", UserName);
  await page.fill("input[name='ctl00$MainContent$fmwOrder$TextBox2']", 'ABC');
  await page.fill("input[name='ctl00$MainContent$fmwOrder$TextBox3']", 'Redwood');
  await page.fill("input[name='ctl00$MainContent$fmwOrder$TextBox5']", '5');
  await page.click('#ctl00_MainContent_fmwOrder_cardList_1');
  await page.fill("input[name='ctl00$MainContent$fmwOrder$TextBox6']", '123456789');
  await page.fill("input[name='ctl00$MainContent$fmwOrder$TextBox1']", '12/23');

  // Submit order
  await page.click('#ctl00_MainContent_fmwOrder_InsertButton');

  // Verify success message
  await expect(page.locator("xpath=//strong[normalize-space()='New order has been successfully added.']")).toHaveText('New order has been successfully added.');

  // Verify user present in View all orders
  await page.click('text=View all orders');
  const userLocator = page.locator(`xpath=//td[text()="${UserName}"]`);
  await expect(userLocator).toHaveText(UserName);

  // Logout
  await page.click('text=Logout');
});
