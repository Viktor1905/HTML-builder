const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
let result = '';

readableStream.on('data', (chunk) => {(result += chunk)});
readableStream.on('end', () => {
    process.stdout.write(result)
});


