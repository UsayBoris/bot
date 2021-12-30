const mongoose = require('./index');

const mineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    extra_items: {
        type: [Number],
    },
    value: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

const Mine = mongoose.model('Mine', mineSchema);

module.exports = Mine;