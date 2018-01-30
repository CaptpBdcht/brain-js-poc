const shuffle = require('./shuffle');

const samples = [
    [0, 0], [0, 1], [1, 0], [1, 1]
];

const labels = [
    [0], [1], [1], [0]
];

const pairsData = samples.map((sample, index) => {
    return {
        input: sample,
        output: labels[index]
    };
});

const shuffledData = shuffle(pairsData);

module.exports = shuffledData;
