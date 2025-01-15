const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.readdir(
    path.join(__dirname, 'secret-folder'),
    {withFileTypes: true},
    (err, files) => {
        if (err) console.log(err.message);
        files.forEach(file => {
            if (file.isFile()) {
                const basename = path.basename(`${file.name}`, path.extname(`${file.name}`));
                const extname = path.extname(`${file.name}`).split('.').join('');
                const fileMem = fs.statSync(path.join(__dirname, 'secret-folder', `${file.name}`)).size;

                stdout.write(`${basename} - ${extname} - ${fileMem}\n` );
            }
        });
    },
)


