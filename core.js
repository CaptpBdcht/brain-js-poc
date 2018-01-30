const brain = require('brain.js');
const fs = require('fs');

module.exports = (opts) => {
    return new Promise((resolve, reject) => {
        const DATAPATH = `${__dirname}/${opts.dataFile}`;
        const DATASTAT = fs.lstatSync(DATAPATH);
        
        if (!DATASTAT.isFile())
            reject(DATAPATH + ': Should be a file');
        
        const DATASTREAM = fs.readFileSync(DATAPATH);
        const DATASET = JSON.parse(DATASTREAM);

        const NN_OPTS = {
            activation: 'sigmoid',
            errorThresh: 0.01,
            hiddenLayers: [7],
            iterations: 2000,
        };

        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(DATASET);
        
        const TEST = { r: 1, g: 0.4, b: 0 };
        const GUESS = _NET.run(TEST);

        resolve({ test: TEST, guess: GUESS });
    });
};
