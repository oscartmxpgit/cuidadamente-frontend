function doGet(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = e.parameter.sheet;
  const sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: `Sheet "${sheetName}" not found.` }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const result = [];

  for (let i = 1; i < data.length; i++) {
    if (!data[i].some(cell => cell !== "" && cell !== null)) continue;

    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j].toString().trim();
      let value = data[i][j];

      if (key === 'options') {
        value = typeof value === 'string' && value.trim() !== ''
          ? value.split(/;\s*|,\s*/).map(opt => opt.trim())
          : [];
      }

      if (key === 'multiple') {
        value = value === true || value === 'true' || value === 'TRUE';
      }

      rowObject[key] = value;
    }

    result.push(rowObject);
  }

  return ContentService
    .createTextOutput(JSON.stringify(result, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}
