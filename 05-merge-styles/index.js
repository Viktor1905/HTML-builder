const path = require('path');
const fs = require('fs');



fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) console.log(err.message);
    const output = [];
    files.forEach((file) => {
        if(path.extname(file) === '.css') {
            fs.readFile(path.join(__dirname, 'styles', path.basename(file)), (err, data) => {
                if (err) console.log(err.message);
                const readableStream = fs.createReadStream(
                    path.join(__dirname, 'styles', path.basename(file)), 'utf-8',
                    err => {
                        if (err) console.log(err.message);
                    });
                const writeStream = fs.createWriteStream(path.join(__dirname, 'bundle.css'));
                readableStream.on('data', (chunk) => {
                    output.push(chunk);
                })
                readableStream.on('end', () => {
                    writeStream.write(output.join('\n'));
                })
            })
        }
    })

})
