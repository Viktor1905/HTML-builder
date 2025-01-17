const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'project-dist'), (err, files) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
                if(err) console.log(`Can't  create a project directory: ${err.message}`);
            })
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
                if(err) console.log(`Can't  create a project directory: ${err.message}`);
            })
        }
    }else {
    }
});
function enumer (pather) { //Function which made recursive traversal and copy files in assets
    fs.readdir(pather, (err, files) => {
        if (err) console.log(`Can't  read a project directory: ${err.message}`);
        files.forEach(file => {
            const baseName = path.basename(file);
            const extname = path.extname(file);
            const newDir = pather.replace(/\\assets\\?/, '\\project-dist\\assets\\')
            if(!extname) {
                enumer(path.join(pather, baseName));
                fs.mkdir(path.join(newDir, baseName), (err) => {
                    if(err) {
                        if (err.code !== 'EEXIST') {
                            console.log(`Can't  create a project directory: ${err.code}`);
                        }
                    }
                })
            } else {
                const newDir = pather.replace(/\\assets\\/, '\\project-dist\\assets\\')
                fs.copyFile(path.join(pather, baseName), path.join(newDir, baseName), 0, err => {
                    if (err) console.log(err.message);
                });
            }

        })
    })
}
enumer(path.join(__dirname, 'assets'))


fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' }, (err, data) => { // Compilation html files
    if (err) console.log(`Can't  read template.html: ${err.message}`);
    let resultData = data;
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
        if (err) console.log(`Can't  read a components directory: ${err.message}`);
        files.forEach(file => {
            const baseName = path.basename(file);
            const extname = path.extname(file);
            const regexp = new RegExp(String.raw`{{${path.basename(baseName, extname)}}}`, 'gi');
            if(extname === '.html') {
                fs.readFile(path.join(__dirname, 'components', baseName),{ encoding: 'utf8' }, (err, data) => {
                    if (err) console.log(`Can't  read a component ${baseName}: ${err.message}`);
                    resultData = resultData.replace(regexp, `\n${data}`);
                    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), resultData, err => {
                        if(err) console.log(`Can't create index.html: ${err.message}`);
                    });
                })
            }
        })
    })
})

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) console.log(`Can't  read styles:${err.message}`);
    let resultData = [];
    files.forEach(file => {
        const baseName = path.basename(file);
        const extname = path.extname(file);
        if(extname === '.css') {
            fs.readFile(path.join(__dirname, 'styles', baseName), { encoding: 'utf8' }, (err, data) => {
                if (err) console.log(`Can't  read styles:${err.message}`);
                const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
                const readableStream = fs.createReadStream(path.join(__dirname, 'styles', baseName), {encoding: 'utf8'}, (err) => {
                    if(err) console.log(`Can't  read styles: ${err.message}`);
                })
                readableStream.on('data', (chunk) => {
                    resultData.push(chunk)
                })
                readableStream.on('end', () => {
                    writableStream.write(resultData.join('\n'));
                })

            })
        }
    })
})




