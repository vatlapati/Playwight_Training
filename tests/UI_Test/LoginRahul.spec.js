import {test,expect} from '@playwright/test';
test('Login to Rahulsetty Academy page', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.getByRole('textbox',{name:'Username:'}).fill('rahulsdfdfdfdfhettyacademy');
    await page.locator('[name="password"]').fill('learning');
    await page.getByRole('combobox').selectOption('Teacher');
    await page.getByRole('checkbox').check();
    await page.locator('#signInBtn').click();
    //await page.pause();
    console.log(await page.getByText('Incorrect username/password.'));
   // await page.getByRole('combobox').selectText
   
    
})