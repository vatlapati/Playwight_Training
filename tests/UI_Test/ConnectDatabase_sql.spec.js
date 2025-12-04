import { test, expect } from '@playwright/test';
//import db from './database';

const sql = "select * from login";

test('DataBase testing in Playwright', async ({ page }) => {
    const rows = await db.queryDatabase(sql);

    for (const row of rows) {
        await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
        await page.fill('input[name="ctl00\\$MainContent\\$username"]', row.uname);
        await page.fill('input[name="ctl00\\$MainContent\\$password"]', row.pass);
        await page.click('text=Login');
        await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
        await page.click('text=Logout');
        await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
    }
    db.connection.end();
});



//------------database.js

import { createConnection } from "mysql2";

// Create a connection to the database
const connection = createConnection({
    host: "localhost",
    Port: 3306,
    user: "root",
    password: "root",
    database: "weborder_db",
    insecureAuth: true
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Function to query the database
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export default { queryDatabase, connection };