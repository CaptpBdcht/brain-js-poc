const brain = require('brain.js');
const fs = require('fs');

const accuracy = require('./accuracy');

const SAMPLES_FILENAME = 'samples.json';
const LABELS_FILENAME = 'labels.json';

const PROJECT_PATH = __dirname + '/';
const SAMPLES_PATH = PROJECT_PATH + SAMPLES_FILENAME;
const LABELS_PATH = PROJECT_PATH + LABELS_FILENAME;

const SAMPLES_STAT = fs.lstatSync(SAMPLES_PATH);
const LABELS_STAT = fs.lstatSync(LABELS_PATH);

console.log(SAMPLES_STAT.isFile());
console.log(LABELS_STAT.isFile());

const SAMPLES = fs.readFileSync(SAMPLES_PATH);
console.log(JSON.parse(SAMPLES));
const LABELS = fs.readFileSync(LABELS_PATH);
console.log(JSON.parse(LABELS));

// console.log(process.argv);
//
// const rateToPercentage = (number) => {
//     return (number * 100).toFixed(2);
// };
//
// // Prepare dataset
// const DATA = require('./dataset');
//
// // NN options
// const options = {
//     activation: 'sigmoid',
//     errorThresh: 0.01,
//     hiddenLayers: [4],
//     iterations: 2000,
//     learningRate: 0.3
// };
//
// // Training
// const net = new brain.NeuralNetwork(options);
// net.train(DATA);
//
// // Test
// const netAccuracy = accuracy(net, DATA);
// console.log('Accuracy:', rateToPercentage(netAccuracy), '%');
