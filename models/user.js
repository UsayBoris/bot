const mongoose = require('./index');
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
    },
    perks: {
        type: [Number]
    }
});

async function update_user(message) {
    await User.findOne({id: message.author.id}).then(async user => {
        if (user === null) {
            await User.create({name: message.author.username, id: message.author.id});
            return logger.warn('New User Created');
        }

        user.name = message.author.username;
        user.xp += 1;

        let req_xp = 25 * (user.level + 1) * (1 + (user.level + 1));

        if (user.xp >= req_xp) {
            user.coins += user.level;
            user.level += 1;
        }
        user.save();
    });


}

async function find_all_users(sort_query) {
    if (!sort_query) sort_query = 'xp';
    let users = await User.find({}).sort([[sort_query, "desc"]]);
    let result = []
    for (let i = 0; i < 10; i++) {
        result[i] = users[i];
    }
    return result;
}

module.exports = {User, update_user, find_all_users};