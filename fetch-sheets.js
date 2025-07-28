// fetch-sheets.js
const fs = require('fs');
const https = require('https');

const baseUrl = 'https://script.google.com/macros/s/AKfycbwazzOvA-nK8cTTPOlKTqLMy1nkJfCdSlmtmAnasdEYhxK6jt6hp6KIqXDfRgOvFeh4YA/exec';
const outputDir = 'D:/MyProjects/cuidadamente-frontend/src/assets/data';

const sheets = [
  { name: 'Preguntas', file: 'questions.json' },
  { name: 'Horas', file: 'horas.json' },
  { name: 'Servicios', file: 'servicios.json' }
];

sheets.forEach(sheet => {
  const url = `${baseUrl}?sheet=${encodeURIComponent(sheet.name)}`;
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(`${outputDir}/${sheet.file}`, data);
      console.log(`✅ ${sheet.file} actualizado.`);
    });
  }).on('error', err => {
    console.error(`❌ Error al descargar ${sheet.name}:`, err);
  });
});
