const minedRecently = new Set();
const Transaction = require('../../struct/Transaction');
const {mining_cooldown} = require('../../config.json');
const Discord = require('discord.js');
const {User} = require('../../models/user');

module.exports = {
    name: 'Mine',
    description: 'Mine for some coins',
    usage: 'mine',
    execute: async function (message, client, args) {
        if (minedRecently.has(message.author.id))
            return message.reply('you are still mining!');
        minedRecently.add(message.author.id);

        let perks = await User.getPerks(message.author.id);

        let speedPerk = perks.find(o => o.name === 'Speed Perk');
        let luckPerk = perks.find(o => o.name === 'Luck Perk');

        let speedValue = ((!speedPerk) ? 0 : speedPerk.quantity);
        let luckValue = ((!luckPerk) ? 0 : luckPerk.quantity);

        let embedMessage = new Discord.MessageEmbed()
            .setColor(0xAF873D)
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle('Mining...')
            .setDescription(`The mining process has started. It will take **${(mining_cooldown) - (5 * speedValue)}** seconds.\n You will receive <:boriscoin:798017751842291732> **${luckValue}** extra.`);
        let msg = await message.channel.send({embeds: [embedMessage]});

        setTimeout(async () => {
            minedRecently.delete(message.author.id);
            let value = await new Transaction(message.author.id, Math.floor(Math.random() * 5) + 1 + luckValue, "Mining").process();
            let newMessage = new Discord.MessageEmbed()
                .setColor(0xAF873D)
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTitle('Mined!')
                .setDescription(`you have mined <:boriscoin:798017751842291732> **${value}**`);
            await msg.edit({embeds: [newMessage]})
        }, (mining_cooldown * 1000) - (5000 * speedValue));
    }
};