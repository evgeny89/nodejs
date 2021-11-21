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

const showFileContents = async (filepath, func) => {
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');

        stream.on('end', resolve);
        stream.pipe(func);
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