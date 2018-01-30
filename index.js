/**
 * ARGV
 * [fichier dataset entrainement]
 * optional 
 *      -t, --train [fichier de sortie]
 *      -p, --predict [fichier dataset inputs] [fichier de sortie]
 * }
 * 
 * Par défaut, avec un seul argument, test de la précision d'un
 * réseau (par division du dataset en 2).
 * Avec -t ou --train, entrainement d'un brain.NeuralNetwork et
 * enregistrement au format JSON.
 * Avec -p ou --predict, entrainement d'un NN, test des inputs 
 * et enregistrement des sorties au format JSON.
 * 
 * DATASET
 * [ ... { input: Object || Array, output: Object || Array } ]
 */

const core = require('./core');
const argvToOpts = require('./argv-to-opts');
const showResults = require('./utils').showResults;

argvToOpts()
.then(options => core(options))
.then(result => showResults(result))
.catch(console.error);

// const rateToPercentage = (number) => {
//     return (number * 100).toFixed(2);
// };
//
// // Test
// const netAccuracy = accuracy(net, DATA);
// console.log('Accuracy:', rateToPercentage(netAccuracy), '%');