const mongoose = require('./index');
const {level_table} = require('../config.json');
const logger = require('../logger');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    azia: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 1
    },
    coins: {
        type: Number,
        default: 0
    },
    inventory: {
        type: [Number]
    }
});

async function update_user(message) {
    let user = await User.findOne({id: message.author.id});
    if (user === null) {
        await User.create({name: message.author.username, id: message.author.id});
        return logger.warn('New User Created');
    }
    user.xp += 1;
    //TODO change this
    if (user.xp >= level_table[`${user.level + 1}`]) {
        user.coins += user.level;
        user.level += 1;
    }
    user.save();
}

module.exports = {User, update_user};