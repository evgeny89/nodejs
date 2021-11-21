const http = require('http');
const url = require("url");
const path = require("path");
const fs = require("fs");

const {
    isFile,
    getFileNamesInDirectory,
    showFileContents,
    errorHandler
} = require("./func");

http.createServer(async (request, response) => {
    const queryParams = url.parse(request.url, true).query;
    const queryPath = queryParams.path ?? process.cwd();
    const queryTarget = queryParams.target ?? "";
    const navPath = path.join(queryPath, queryTarget);

    if (!fs.existsSync(queryPath)) {
        errorHandler(response, "path")
    }
    else if (fs.existsSync(queryPath) && !fs.existsSync(navPath)) {
        errorHandler(response, "file")
    }
    else {
        if (isFile(navPath)) {
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            await showFileContents(navPath, response)
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            const res = await getFileNamesInDirectory(navPath)
            res.forEach(item => {
                response.write(`<p><a href="?target=${item}&path=${navPath}">${item}</a></p>`)
            })
        }
        response.end()
    }
}).listen(3000, 'localhost');
