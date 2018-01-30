const brain = require('brain.js');
const fs = require('fs');

const accuracy = require('./accuracy');
const utils = require('./utils');
const ACTIONS = utils.actions;
const ROUND = utils.round;
const percent = utils.percent;

function testNN(options) {
    return new Promise((resolve, reject) => {
        const DATAPATH = `${__dirname}/${options.dataFile}`;
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
}

function trainNN(options) {
    return new Promise((resolve, reject) => {
        const DATAPATH = `${__dirname}/${options.dataFile}`;
        const DATASTAT = fs.lstatSync(DATAPATH);
        
        if (!DATASTAT.isFile())
            reject(DATAPATH + ': Should be a file');
        
        const DATASTREAM = fs.readFileSync(DATAPATH);
        const DATASET = JSON.parse(DATASTREAM);
    
        const TRAINSET = DATASET.slice(0, (DATASET.length + 1) / 2);
        const TESTSET = DATASET.slice((DATASET.length + 1) / 2);

        const NN_OPTS = {
            activation: 'sigmoid',
            errorThresh: 0.01,
            hiddenLayers: [7],
            iterations: 2000,
        };
    
        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(TRAINSET);
        
        const netAccuracy = accuracy(_NET, TESTSET);
        console.log('Accuracy:', percent(netAccuracy), '%');
    
        resolve('Success');
    });
}

module.exports = (config) => {
    const OPTIONS = config.options;
    const ACTION = config.action;

    return new Promise((resolve, reject) => {
        switch (ACTION) {
            case ACTIONS.TRAIN:
                return trainNN(OPTIONS)
                .then(result => resolve(result))
                .catch(error => reject(error));
            case ACTIONS.TEST:
                return testNN(OPTIONS)
                .then(result => resolve(result))
                .catch(error => reject(error));
            case ACTIONS.PREDICT:
            default:
                reject('Unknown action');
        }
    });
};
