const fs = require('fs');
const path = require('path');

console.log(__dirname);
if(!fs.existsSync(path.join(__dirname, '../config/azureProvided.json'))) {
  console.log('No azureProvided.json found in /app/config');
  process.exit(1);
}

const config = require(path.join(__dirname, '../config/azureProvided.json'));

const env = Object.entries(config).map(
  ([key, value]) => `${key}="${value}"`
).join('\n');

fs.writeFileSync(path.join(__dirname, "../.env"), env);