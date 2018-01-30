function processArgs(args) {
    return new Promise((resolve, reject) => {
        const NB_ARGS = args.length;
        const CORE_OPTS = {};
        
        switch (NB_ARGS) {
            case 6:
                CORE_OPTS['inputsFile'] = process.argv[5];
            case 5:
                CORE_OPTS['outputFile'] = process.argv[4];
            case 3:
                CORE_OPTS['dataFile'] = process.argv[2];
                break;
            default:
                reject('Invalid args');
        }

        resolve(CORE_OPTS);
    });
}

module.exports = () => {
    return processArgs(process.argv);
};