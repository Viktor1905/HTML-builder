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

