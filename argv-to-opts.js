module.exports = () => {
    return new Promise((resolve, reject) => {
        if (process.argv.length < 3)
            reject('Missing dataFilename');

        const CORE_OPTS = {
            'dataFile': process.argv[2]
        };

        resolve(CORE_OPTS);
    });
};