const Item = require('../../models/item');
const Guild = require('../../models/guild');
const Discord = require('discord.js');

module.exports = {
    name: 'Shop',
    description: 'Displays the full or specific shops (with argument displays the specific shop',
    usage: 'shop {optional: specific shop}',
    execute: async function (message, client, args) {

        if (!args[0]) {
            let embedMessage = new Discord.MessageEmbed()
                .setColor('0xD8BFD8')
                .setTitle('Shop')
                .setDescription('Perk Stop **+shop perk**')

            return message.channel.send({embeds: [embedMessage]});
        }


        let items = await Item.find({category: "perk"});
        let embedMessage = new Discord.MessageEmbed()
            .setColor('0xD8BFD8')
            .setTitle('Perk Shop')

        const prefix = await Guild.getPrefix(message.guild.id);

        let messageConcat = '';

        items.forEach(item => {
            messageConcat += '<' + (item.emote).toString() + '>' + (item.name).toString() + ': ' + (item.price).toString() + '<:boriscoin:798017751842291732> **' + prefix + 'buy ' + (item.name).toString() + '**\n';
        });

        embedMessage.setDescription(messageConcat);

        return message.channel.send({embeds: [embedMessage]});
    }
};