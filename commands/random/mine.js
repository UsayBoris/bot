const minedRecently = new Set();
const Transaction = require('../../struct/Transaction');
const {mining_cooldown} = require('../../config.json');
const Discord = require('discord.js');

const luck_bases = [
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
]

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
            let value = await new Transaction(message.author.id, Math.floor(Math.random() * 5), "Mining").process();

            let newMessage = new Discord.MessageEmbed()
                .setColor(0xAF873D)
                .setTitle('Mining')
                .setDescription(`you have mined ${value} BorisCoins`);
            await msg.edit({embeds: [newMessage]})
        }, mining_cooldown * 1000);
    }
};