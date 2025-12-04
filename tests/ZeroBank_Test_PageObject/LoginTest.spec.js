import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

// Read test data from JSON
const objects = readFileSync(`./tests/ZeroBank_Test_PageObject/TestData/LoginAll.json`);
const users = JSON.parse(objects);

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
  });

  users.forEach((user, index) => {
    test(`Login scenario #${index + 1} - ${user.TestCaseID}`, async ({ page }) => {
      await homePage.clickOnSignIn();
      await loginPage.login(user.login, user.password);
      await page.waitForLoadState("networkidle");
      if (user.login === 'username' && user.password === 'password') {
      // ✅ Either switch to HTTPS
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForLoadState("networkidle");
        await homePage.logout();
        await page.waitForLoadState("networkidle");
        await homePage.VerifyURL('http://zero.webappsecurity.com/index.html');
      } else {
         await loginPage.assertErrorMessage();
      }
    });
  });
});
