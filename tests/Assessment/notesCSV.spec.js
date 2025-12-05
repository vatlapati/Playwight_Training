const { test, expect } = require('@playwright/test');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

// Read CSV file
const fileContent = fs.readFileSync('./data/notesData.csv', 'utf-8');
const notesData = parse(fileContent, { columns: true, skip_empty_lines: true });

test.describe('Notes App - Data Driven using CSV', () => {

  test('Create and verify notes for all categories', async ({ page }) => {

    // Login
    await page.goto('https://practice.expandtesting.com/notes/app/login');
    await page.fill('#email', 'practiceuser1@robotmail.com');
    await page.fill('#password', 'pass123');
    await page.click('#submit');
    await expect(page).toHaveURL('https://practice.expandtesting.com/notes/app');

    // Loop through CSV data
    for (const note of notesData) {

      await page.click('#add-note');
      await page.selectOption('#category', note.Category);
      await page.click('#completed');
      await page.fill('#title', note.Title);
      await page.fill('#description', note.Description);
      await page.click('#btn-create');

      // Assertions ensuring each note is created
      await expect(page.locator(`text=${note.Title}`)).toBeVisible();
      await expect(page.locator(`text=${note.Category}`)).toBeVisible();

      console.log(`✔ Note added for category: ${note.Category}`);
    }

    // Close Browser
    await page.close();
  });
});
