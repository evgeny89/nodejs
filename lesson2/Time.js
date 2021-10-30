class Time {
    constructor(timeString) {
        this.time = timeString;
    }

    timeToSeconds() {
        const [hour, day, month, year] = this.time.split('-');
        const date = new Date(year, month - 1, day, hour);
        return date.getTime();
    }
}

module.exports = Time;
