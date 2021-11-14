const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const {
    isFile,
    getFileNamesInDirectory,
    showFileContents,
    errorHandler
} = require("./func");

const app = http.createServer(async (request, response) => {

    const base = url.parse(request.url).pathname;

    if (request.method === 'GET' && base === "/explorer") {
        const queryParams = url.parse(request.url, true).query;
        const queryPath = queryParams.path ?? process.cwd();
        const queryTarget = queryParams.target ?? "";
        const navPath = path.join(queryPath, queryTarget);

        if (!fs.existsSync(queryPath)) {
            errorHandler(response, "path")
        } else if (fs.existsSync(queryPath) && !fs.existsSync(navPath)) {
            errorHandler(response, "file")
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let res = null
            if (isFile(navPath)) {
                res = await showFileContents(navPath)
            } else {
                res = await getFileNamesInDirectory(navPath)
            }
            fs.readFile(path.join(__dirname, "explorer.html"), 'utf-8', (err, data) => {
                if (!err) {
                    response.end(data.replace("{{data}}", JSON.stringify({files: res, path: navPath})));
                } else {
                    response.end("error");
                }
            });
        }
    } else if (request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        const filePath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } else if (request.method === 'POST') {

        let data = '';

        request.on('data', chunk => {
            data += chunk;
        });

        request.on('end', () => {
            const parsedData = JSON.parse(data);

            response.writeHead(200, {'Content-Type': 'json'});
            response.end(parsedData);
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

module.exports = app;
