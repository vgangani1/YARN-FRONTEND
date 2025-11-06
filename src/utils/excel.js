import * as XLSX from 'xlsx';
export function exportJsonToExcel(rows, filename = 'Filtered_Omkar_Data.xlsx'){
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Filtered');
  XLSX.writeFile(wb, filename);
}
