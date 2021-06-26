const mongoose = require('./index');

const Dice = mongoose.model('Dice', {
    player_1: {
        type: Number,
        required: true
    },
    player_2: {
        type: Number,
        required: true,
    },
    bet: {
        type: Number,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

module.exports = Dice;