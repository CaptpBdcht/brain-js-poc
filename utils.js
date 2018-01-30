const ACTIONS = Object.freeze({
    "TEST": 1,
    "TRAIN": 2,
    "PREDICT": 3
});

function roundHalf(number) {
    return Math.round((number + 1) / 2);
}

function showResults(result) {
    console.log('[Results]');
    console.log('Test :', result.test);
    console.log('Guess:', result.guess);
}

module.exports = {
    "actions": ACTIONS,
    "round": roundHalf,
    "showResults": showResults
};