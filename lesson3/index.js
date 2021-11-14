const fs = require('fs');
const piper = require("./piper");
const config = require("./config");

const lesson3 = () => {
    const readStream = new fs.ReadStream(`${__dirname}/${config.file}`, 'utf8');

    config.ips.forEach(ip => piper(ip, readStream));
}

module.exports = lesson3;
