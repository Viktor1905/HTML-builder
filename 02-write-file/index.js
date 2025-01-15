const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '', (err) => {
        if (err) throw err;
})

stdout.write('Hello \n Please write some text.\n');

stdin.on('data', (chunk) => {
    if(chunk.toString() === "exit\r\n" || chunk.toString() === ".exit\r\n"){
        stdout.write('Bye-Bye\n Check your file');
        process.exit()
    }
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            `${chunk}`,
            (err) => {
                    if (err) throw err;
            }
        )
});
process.on('SIGINT', (err) => {
        stdout.write('Bye-Bye\n Check your file');
        process.exit()
});


