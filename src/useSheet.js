import Papa from 'papaparse';
// Auto-load from your Google Sheet (first tab, gid=0)
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/13KI1K-WJXEYYtNz3BZ2qS82zhGPrpTZKyn8e9iJEa4o/export?format=csv&id=13KI1K-WJXEYYtNz3BZ2qS82zhGPrpTZKyn8e9iJEa4o&gid=0';

export async function fetchSheetData(){
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: false,
      complete: (results) => resolve(results.data || []),
      error: (err) => reject(err),
    });
  });
}
