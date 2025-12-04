//Run "npm install csv" to install the full csv module or run npm install csv-parse 
//if you are only interested by the CSV parser.
import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';

const records = parse(readFileSync('./tests/Test_Data/CreateOrderAll.csv'), {
  columns: true,
  skip_empty_lines: true
});

// const records = parse(readFileSync(join('./tests/TestData', 'WebOrder_Login_All_Scenario.csv')), {
//   columns: true,
//   skip_empty_lines: true
// });

test.describe('WebOrder All Test Scenario', () => {
  let page
  //Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {
    //const browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })
  for (const record of records) {
  test('WebOrder App - ' + record.test_case, async () => {
  
      await page.locator('input[name="ctl00\\$MainContent\\$username"]').clear();
      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);
      await page.locator('input[name="ctl00\\$MainContent\\$password"]').clear();
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);

      // Click text=Login
      await page.click('text=Login');
      if ('List of All Orders' == record.Exp_Result) {

        await expect(page.locator("div[class='content'] h2")).toContainText(record.Exp_Result)
        await page.click('text=Logout');
        await page.waitForLoadState(); // The promise resolves after 'load' event.

      } 
      else
         {
        // Check that the locator has the expected text
        await expect(page.locator("span[id='ctl00_MainContent_status']")).toHaveText(record.Exp_Result)


      }

  
  })
  }
  })
