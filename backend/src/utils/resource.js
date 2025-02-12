const handlers = [];

const addCleanupHandler = (handler) => {
    if (!handler) return;
    if (typeof handler !== 'function') return;
    if (handler?.constructor?.name !== 'AsyncFunction') return;
    handlers.push(handler);
};

process.once('SIGINT', async () => {
    try {
        const promises = handlers.map((fn) => fn());
        await Promise.all(promises);
        process.exit(1);
    } catch (err) {
        console.log('SIGNINT has failed', err.message);
        process.exit(1);
    }
});

exports.addCleanupHandler = addCleanupHandler;
module.exports = exports;
