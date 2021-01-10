const talkedRecently = new Set();
const {User} = require('../models/user');

module.exports = {
    name: 'Mine',
    description: 'Mine for some coins (1 minute cooldown)',
    usage: 'mine',
    execute: async function (message, client, args) {
        if(talkedRecently.has(message.author.id)){
            message.reply('this command is still on cooldown for you');
        }
        else {
            const bonus_coins = Math.floor(Math.random() * 5);
            let user = await User.findOne({id: message.author.id});
            user.coins += bonus_coins;
            user.save();
            message.reply(`you have mined ${bonus_coins}`);
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 60000);
        }
    },
};