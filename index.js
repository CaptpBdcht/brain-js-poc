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

/**
 * But
 * -> Entrainer un réseau
 * -> Tester la précision d'un réseau
 * -> Faire des prédictions avec un réseau
 * Entrée données
 * -> dataFilename
 */