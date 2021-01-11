const mongoose = require('mongoose');
const logger = require('../logger')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    const connection = mongoose.connection;
    connection.on('error', () => logger.error("Can't Connect to MongoDB"));
    connection.once('open', () => logger.info("Connected to MongoDB database"));
});
module.exports = mongoose;