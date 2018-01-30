const getAccuracy = (net, testData) => {
    let hits = 0;
    testData.forEach((dataSource) => {
        const output = net.run(dataSource.input);

        if (Math.round(output[0]) === dataSource.output[0])
            hits += 1;
    });
    return hits / testData.length;
};

module.exports = getAccuracy;
