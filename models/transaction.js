const mongoose = require('./index');

const transactionSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;