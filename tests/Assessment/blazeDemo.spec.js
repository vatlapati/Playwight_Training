const { test, expect } = require('@playwright/test');
const paymentData = require('./paymentData.json');

paymentData.forEach((data) => {

  test(`Purchase flight with ${data.cardType}`, async ({ page }) => {

    // Navigate to BlazeDemo
    await page.goto('https://blazedemo.com/index.php');

    // Select departure city
    await page.selectOption('select[name="fromPort"]', 'Boston');

    // Select destination city
    await page.selectOption('select[name="toPort"]', 'Berlin');

    // Click Find Flights button
    await page.click('input.btn.btn-primary');

    // Choose Lufthansa flight
    const lufthansaRow = page.locator('text=Lufthansa').first();
    await lufthansaRow.locator('xpath=following-sibling::td/input').click();

    // Fill form with JSON Data
    await page.fill('#inputName', data.name);
    await page.fill('#address', data.address);
    await page.fill('#city', data.city);
    await page.fill('#state', data.state);
    await page.fill('#zipCode', data.zip);

    await page.selectOption('#cardType', data.cardType);
    await page.fill('#creditCardNumber', data.cardNumber);
    await page.fill('#creditCardMonth', '12');
    await page.fill('#creditCardYear', '2026');
    await page.fill('#nameOnCard', data.nameOnCard);

    // Click Purchase Flight
    await page.click('input.btn.btn-primary');

    // Verification
    const confirmationMessage = await page.textContent('h1');
    expect(confirmationMessage).toContain('Thank you for your purchase today!');

    console.log(`✔ Successfully purchased using ${data.cardType}`);
  });

});
