const { test, expect } = require('@playwright/test');
const loginData = require('./data/loginData.json');

test.describe('OrangeHRM Login Validation', () => {

  loginData.forEach((data) => {

    test(`Login test → ${data.username} | ${data.expected}`, async ({ page }) => {

      // Navigate to Login using BaseURL from config
      await page.goto('/');

      await page.fill('input[name="username"]', data.username);
      await page.fill('input[name="password"]', data.password);
      await page.click('button[type="submit"]');

      let actualResult;

      // Capture result using IF-ELSE / SWITCH logic
      try {
        await page.waitForTimeout(1500);

        if (await page.locator('h6:has-text("Dashboard")').isVisible()) {
          actualResult = "success";
          console.log("✔ Logged in successfully");
        } else if (await page.locator('p:has-text("Invalid credentials")').isVisible()) {
          actualResult = "error";
          console.log("❌ Login failed: Invalid credentials");
        } else {
          actualResult = "unknown";
          console.log("⚠ Unexpected outcome");
        }
      } catch (e) {
        actualResult = "error";
      }

      // Assertion → Compare Expected vs Actual result
      expect(actualResult).toBe(data.expected);

      if (actualResult === "success") {
        await page.click('a.oxd-userdropdown-link'); // User dropdown
        await page.click('a:has-text("Logout")');
      }
    });

  });

});
