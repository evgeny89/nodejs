const fs = require("fs");

const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileNamesInDirectory = async (directory) => {
    return await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            if (directory !== "/") {
                data.unshift("..");
            }
            resolve(data);
        });
    });
}

const showFileContents = async (filepath) => {
    return new Promise((resolve) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                resolve("error");
            }
        });
    });
}

const errorHandler = (res, text) => {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write(`<p><a href="?path=${process.cwd()}">home</a></p>`)
    res.end(`${text} not found`);
}

module.exports = {
    isFile,
    getFileNamesInDirectory,
    showFileContents,
    errorHandler,
}
