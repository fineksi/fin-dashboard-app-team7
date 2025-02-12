const Moment = require('moment');

exports.now = (format = 'YYYY-MM-DD HH:mm:ss') => new Moment(new Date()).format(format);
exports.format = (date, format = 'YYYY-MM-DD HH:mm:ss') => new Moment(date || new Date()).format(format);
exports.formatAgo = (date, ago = false) => new Moment(date || new Date()).fromNow(ago);
exports.timeAdd = (date, interval = 0, measurement = 'hours', format = 'YYYY-MM-DD HH:mm:ss') => Moment(date || new Date()).add(interval, measurement).format(format);
exports.dateAdd = (date, interval = 0, measurement = 'days', format = 'YYYY-MM-DD') => Moment(date || new Date()).add(interval, measurement).format(format);
exports.timeAgo = (totalSecondsAgo) => {
    const hours = Math.floor(totalSecondsAgo / 3600);
    const minutes = Math.floor((totalSecondsAgo % 3600) / 60);
    const seconds = Math.floor(totalSecondsAgo % 60);

    if (hours === 0 && minutes === 0 && seconds === 0) {
        return 'just now';
    }

    const timeAgoParts = [];
    if (hours > 0) {
        timeAgoParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }

    if (minutes > 0) {
        timeAgoParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }

    if (seconds > 0) {
        timeAgoParts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
    }

    return `${timeAgoParts.join(' ')} ago`;
};

module.exports = exports;
