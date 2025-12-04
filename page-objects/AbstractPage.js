//import { Page } from '@playwright/test'
  import { expect, Locator, page } from '@playwright/test';
  //const fs = require('fs');
  import { readFileSync } from 'fs';
  const xlsx = require('xlsx');
  import { parse } from 'csv-parse/sync';

export class AbstractPage {
   page= page

  constructor(page= page) {
    this.page = page
  }

  async wait() {
    //await this.page.waitForTimeout(process.env.settime)
    await this.page.waitForTimeout(3000)
  }
// This is related to JSON
  async readDataFromJSONFile(fileName) {
    // Reads the JSON file and returns the parsed data
    const data = fs.readFileSync(fileName)
    return JSON.parse(data);
  }

  // This is related to Excel
  async readDataFromExcelFile(fileName, sheetName) {
    // Reads the Excel file and returns the parsed data
    const workbook = xlsx.readFile(fileName);
    const sheetNameList = workbook.SheetNames;
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[sheetName]]);
  }

  // This is related to CSV
  async readDataFromCSVFile(fileName) {
    // Reads the CSV file and returns the parsed data
    const records = parse(readFileSync(fileName), {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  }



}


