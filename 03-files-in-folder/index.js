const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;
const fsPromisese = require('fs/promises');

fs.readdir(
    path.join(__dirname, 'secret-folder'),
    {withFileTypes: true},
    (err, files) => {
        if (err) console.log(err.message);
        files.forEach(file => {
            if (file.isFile()) {
                const basename = path.basename(`${file.name}`, path.extname(`${file.name}`));
                const extname = path.extname(`${file.name}`).split('.').join('');
                const fileMem = getFileSize(basename)
                async function getFileSize(filePath) {
                    try {
                        const stats = await fsPromisese.stat(path.join(__dirname, 'secret-folder', `${file.name}`));
                        return stats.size;
                    } catch (err) {
                        console.log(err.message);
                    }
                }
                fileMem.then((size) => {
                    stdout.write(`${basename} - ${extname} - ${size}\n` );
                })

            }
        });
    },
)


