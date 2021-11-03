const fs = require("fs");
const config = require("./config");
const {Transform} = require("stream");
const {EOL} = require("os");

const piper = (ip, stream) => {
    const fileWrite = new fs.WriteStream(`${__dirname}/${ip}${config.suffix}`, {flags: 'a', encoding: 'utf-8'})

    const search = new RegExp(`(${ip}.*)`, 'g');

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformedChunk = chunk.toString().match(search);

            if (transformedChunk.length) {
                transformedChunk.forEach(line => this.push(line + EOL))
            }

            callback();
        }
    });

    stream.pipe(transformStream).pipe(fileWrite);
}

module.exports = piper;
