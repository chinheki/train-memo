import { converter } from 'json-2-csv';
import csvtojson from 'csvtojson';

export async function csv2Json(csvFilePaths) {
  
        const jsonObj = await csvtojson({ ignoreEmpty: true }).fromFile(
          csvFilePaths
  );
  return jsonObj
}

export async function jsonToCsv(data) {
  const csv = await converter.json2csv(data, {
  "field": "string", // required
  "title": "string", // optional
  "wildcardMatch": false, // optional - default: false
  });
  return csv
}