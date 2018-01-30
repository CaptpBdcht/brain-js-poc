const brain = require('brain.js');
const fs = require('fs');

const accuracy = require('./accuracy');
const utils = require('./utils');
const ACTIONS = utils.actions;
const ROUND = utils.round;
const percent = utils.percent;

const NN_OPTS = {
    activation: 'sigmoid',
    errorThresh: 0.01,
    hiddenLayers: [7],
    iterations: 2000,
};

function trainNN(options) {
    return new Promise((resolve, reject) => {
        const DATA_PATH = `${__dirname}/${options.dataFile}`;
        const DATA_STAT = fs.lstatSync(DATA_PATH);
        
        if (!DATA_STAT.isFile())
            reject(DATA_PATH, '- Should be a file');
        
        const DATA_STREAM = fs.readFileSync(DATA_PATH);
        const DATA_SET = JSON.parse(DATA_STREAM);
    
        const TRAIN_SET = DATA_SET.slice(0, (DATA_SET.length + 1) / 2);
        const TEST_SET = DATA_SET.slice((DATA_SET.length + 1) / 2);
    
        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(TRAIN_SET);
        
        const ACCURACY = accuracy(_NET, TEST_SET);
        console.log('Accuracy:', percent(ACCURACY), '%');
    
        resolve();
    });
}

function testNN(options) {
    return new Promise((resolve, reject) => {
        reject('Not implemented yet');
    });
}

function predictNN(options) {
    return new Promise((resolve, reject) => {
        const DATA_PATH = `${__dirname}/${options.dataFile}`;
        const INPUTS_PATH = `${__dirname}/${options.inputsFile}`;

        const DATA_STAT = fs.lstatSync(DATA_PATH);
        const INPUTS_STAT = fs.lstatSync(INPUTS_PATH);
        
        if (!DATA_STAT.isFile())
            reject(DATA_PATH + ': Should be a file');
        else if (!INPUTS_STAT.isFile())
            reject(INPUTS_PATH + ': Should be a file');
        
        const DATA_STREAM = fs.readFileSync(DATA_PATH);
        const INPUTS_STREAM = fs.readFileSync(INPUTS_PATH);

        const DATA_SET = JSON.parse(DATA_STREAM);
        const INPUTS_SET = JSON.parse(INPUTS_STREAM);
        
        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(DATA_SET);
        
        const results = INPUTS_SET.reduce((acc, test) => {
            let guess = _NET.run(test.input);
            acc.push(guess);
            return acc;
        }, []);
        
        const OUTPUT_PATH = `${__dirname}/${options.outputFile}`;
        const writing = fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results));
    
        resolve('Success');
    });
}

module.exports = (config) => {
    const OPTIONS = config.options;
    const ACTION = config.action;

    console.log(OPTIONS);
    console.log(ACTION);

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
                return predictNN(OPTIONS)
                .then(result => resolve(result))
                .catch(error => reject(error));
            default:
                reject('Unknown action');
        }
    });
};
