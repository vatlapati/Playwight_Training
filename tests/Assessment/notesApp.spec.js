const { test, expect } = require('@playwright/test');

// Test data (parametrization inside same file)
const categories = [
  { category: "Personal", title: "Gym Schedule", description: "Morning Workout Plan" },
  { category: "Work", title: "Project Update", description: "Client meeting notes" },
  { category: "Home", title: "Grocery List", description: "Milk, Fruits, Bread" }
];

test.describe('Notes App Automation', () => {

  // Runs once before all tests (Login)
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    global.page = await context.newPage();

    await page.goto('https://practice.expandtesting.com/notes/app/login');

    await page.fill('#email', 'practiceuser1@robotmail.com'); // <-- valid test username
    await page.fill('#password', 'pass123'); // <-- valid test password

    await page.click('#submit');

    await expect(page).toHaveURL('https://practice.expandtesting.com/notes/app');
  });

  // Runs after each test (Logout)
  test.afterEach(async () => {
    await page.click('#logout');   // Logout button
    await expect(page).toHaveURL('https://practice.expandtesting.com/notes/app/login');

    // Login back for next category test
    await page.fill('#email', 'practiceuser1@robotmail.com');
    await page.fill('#password', 'pass123');
    await page.click('#submit');
  });

  // Parametrized test for every category
  categories.forEach(data => {

    test(`Create and verify note for category: ${data.category}`, async () => {

      // Click Add Note
      await page.click('#add-note');

      // Select category
      await page.selectOption('#category', data.category);

      // Check "Complete" toggle
      await page.click('#completed');

      // Enter title and description
      await page.fill('#title', data.title);
      await page.fill('#description', data.description);

      // Create note
      await page.click('#btn-create');

      // Assertion → verify created note appears
      const createdTitle = page.locator(`text=${data.title}`);
      await expect(createdTitle).toBeVisible();

      const createdCategory = page.locator(`text=${data.category}`);
      await expect(createdCategory).toBeVisible();

      console.log(`✔ Verified ${data.category} note created successfully`);
    });

  });

});
