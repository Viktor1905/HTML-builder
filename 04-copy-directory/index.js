const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'files-copy'), (err, data) => {
    if (err) console.log(err.message);
    if(data){
        data.forEach(file => {
            const basename = path.basename(file);
            fs.unlink(path.join(__dirname, 'files-copy', basename), err => {
                if (err) throw err;
            });
        });
    }
})



fs.mkdir(path.join(__dirname, 'files-copy'), err => {
    if(err){console.log(err.message)}
});
fs.readdir(
    path.join(__dirname, 'files'),
    (err, files) => {
        files.forEach(file => {
            const basename = path.basename(file);
            fs.copyFile(path.join(__dirname, 'files', basename), path.join(__dirname, 'files-copy', basename), 0, err => {
                if (err) throw err;
            });
        })
    }
)
