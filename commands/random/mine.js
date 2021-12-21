const minedRecently = new Set();
const {User} = require('../../models/user');
const {mining_cooldown} = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'Mine',
    description: 'Mine for some coins (1 minute cooldown)',
    usage: 'mine',
    execute: async function (message, client, args) {
        if (minedRecently.has(message.author.id))
            return message.reply('you are still mining!');

        let embedMessage = new Discord.MessageEmbed()
            .setColor(0xAF873D)
            .setTitle('Mining...')
            .setDescription(`The mining process has started`);
        let msg = await message.channel.send({embeds: [embedMessage]});

        minedRecently.add(message.author.id);
        setTimeout(async () => {
            minedRecently.delete(message.author.id);
            await User.findOne({id: message.author.id}).then(async user => {
                const bonus_coins = Math.floor(Math.random() * 5);

                user.coins += bonus_coins;
                let newMessage = new Discord.MessageEmbed()
                    .setColor(0xAF873D)
                    .setTitle('Mining')
                    .setDescription(`you have mined ${bonus_coins} coins, you now have ${user.coins} BorisCoins`);
                await msg.edit({embeds: [newMessage]})
                await user.save();
            });
        }, mining_cooldown * 1000);
    }
};