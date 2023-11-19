const mongoose = require('mongoose')
const os = require('os');

const TIMECHECK = 5000


//check count connections
const countConnect = () => {
    const connectQuantity = mongoose.connections.length

    console.log(`Quantity of connections: ${connectQuantity}`);
    return connectQuantity;
}

//check overloaded
const overloadedConnect = () => {
    const numCore = os.cpus().length
    const numConnectionAllow = numCore * 5

    setInterval(() => {
        let numConnections = countConnect();
        let memoryUsage = process.memoryUsage().rss

        console.log(`Active connections: ${numConnections}`);
        console.log(`Max connections allowed: ${numConnectionAllow}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnections > numConnectionAllow) {
            console.log('Overloaded detected!');
        }

    }, TIMECHECK);
}

module.exports = {
    countConnect,
    overloadedConnect
}