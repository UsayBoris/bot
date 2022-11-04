const mongoose = require('mongoose');
const logger = require('../logger')

mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open');
});

mongoose.connection.on('error', function (err) {
    logger.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

mongoose.connect(process.env.MONGODB_URI).then();

module.exports = mongoose;