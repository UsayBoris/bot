const mongoose = require('./index');
const logger = require('../logger');
const Discord = require('discord.js');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
      type: Number,
      required: true
    }
});

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    private: {
        type: Boolean,
        required: true,
        default: false
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
        type: [itemSchema]
    },
    perks: {
        type: [itemSchema]
    }
});

userSchema.statics.findById = function (id) {
    return this.findOne({id: id})
};

const User = mongoose.model('User', userSchema);

async function update_user(message) {
    await User.findOne({id: message.author.id}).then(async user => {

        if (user === null) {
            await User.create({name: message.author.username, id: message.author.id});
            return logger.warn('New User Created (first time talking in the presence of the bot)');
        }

        user.name = message.author.username;
        user.xp += 1;

        let req_xp = 69 * (user.level + 1) * (1 + (user.level + 1));

        if (user.xp >= req_xp) {
            user.level += 1;
            user.coins += user.level;
            if (!user.private) {
                await message.author.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("0xACA19D")
                        .setTitle('You Have leveled up')
                        .setThumbnail(message.author.avatarURL())
                        .setDescription(`Congratulation, you are now level ${user.level}! If you wish to disable these messages, type **+private on** in any discord server with this bot.`)]
                });
            }
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

async function check_balance(id) {
    let user = await User.findById(id);
    return user.coins;
}

module.exports = {User, update_user, find_all_users, check_balance};