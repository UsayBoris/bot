const talkedRecently = new Set();
const {User} = require('../../models/user');
const {mining_cooldown} = require('../../config.json');

module.exports = {
    name: 'Mine',
    description: 'Mine for some coins (1 minute cooldown)',
    usage: 'mine',
    execute: async function (message, client, args) {
        if(talkedRecently.has(message.author.id)){
            message.reply('you are still mining!');
        }
        else {
            const bonus_coins = Math.floor(Math.random() * 5);
            message.channel.send('Mining has started!')
            talkedRecently.add(message.author.id);
            setTimeout(async () => {
                talkedRecently.delete(message.author.id);
                await User.findOne({id: message.author.id}).then(async user => {
                    user.coins += bonus_coins;
                    message.reply(`you have mined ${bonus_coins} coins, you now have ${user.coins} BorisCoins`);
                    await user.save();
                });
            }, mining_cooldown * 1000);
        }
    },
};