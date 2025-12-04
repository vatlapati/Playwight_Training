//Run "npm install xlsx" to install the xlsx file
import { test, expect } from '@playwright/test';
import { readFile, utils } from 'xlsx';

var workbook = readFile('./tests/Test_Data/AllScenarios.xlsx');
var sheet_name_list = workbook.SheetNames;
var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

test.describe('Read data from Excel file', () => {
  let page;
  //Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {
    //const browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  test('WebOrder App - Login', async () => {
    for (const record of records) {
    console.log(record.uname, record.pass);

   await page.locator('#ctl00_MainContent_username').fill(record.uname);
   await page.locator('#ctl00_MainContent_password').fill(record.pass);
   await page.locator('#ctl00_MainContent_login_button').click();
      //Check condition whether Valid or Invalid
      if ('List of All Orders' == record.Exp_Result) {

        await expect(page.locator("div[class='content'] h2")).toContainText(record.Exp_Result)
        await page.click('text=Logout');
        await page.waitForLoadState(); // The promise resolves after 'load' event.

      } 
      else
      {

      await expect(page.locator("span[id='ctl00_MainContent_status']")).toHaveText(record.Exp_Result)

      }

    }
  })

})