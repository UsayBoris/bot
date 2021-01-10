const mongoose = require('./index');

const Dice = mongoose.model('Dice', {
    player_1: {
        id: Number,
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
    guild: {
        id: Number,
        required: true
    }
});

module.exports = Dice;