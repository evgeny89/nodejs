const EventEmitter = require("events");
const Time = require("./Time");
const Handler = require("./Handler");

const lesson2 = () => {
    class TimeEmitter extends EventEmitter {}
    const emitter = new TimeEmitter();

    setInterval(() => emitter.emit('getTimers'), 1000);

    const args = process.argv.slice(3);

    setTimeout(() => {
        args.forEach(item => {
            Handler.setTimer(new Time(item));
        })
    }, 1500)

    emitter.on('getTimers', Handler.handler.bind(Handler));

    setTimeout(() => {
        Handler.setTimer(new Time(process.argv[2]));
    },5500);
}

module.exports = lesson2;
