const mongoose = require('./index');

const Guild = mongoose.model('Guild', {
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: '+'
    }
});

module.exports = Guild;