const Item = require('../../models/item');
const Guild = require('../../models/guild');
const Discord = require('discord.js');

module.exports = {
    name: 'Shop',
    description: 'Displays the full or specific shops (with argument displays the specific shop',
    usage: 'shop {optional: specific shop}',
    execute: async function (message, client, args) {

        const prefix = await Guild.getPrefix(message.guild.id);

        let itemCategories = await Item.find();
        const categories = [...new Set(itemCategories.map(item => item.category))];

        if (!args[0]) {
            let categoryMessage = '';

            categories.forEach(category => {
                let capCategory = category.charAt(0).toUpperCase() + category.slice(1);
                categoryMessage += capCategory + ' Shop' + " **" + prefix + "shop " + category + "**\n";
            });

            let embedMessage = new Discord.MessageEmbed()
                .setColor('0xD8BFD8')
                .setTitle('Shop')
                .setDescription(categoryMessage);

            return message.channel.send({embeds: [embedMessage]});
        }

        if (!categories.includes(args[0])) return;

        let items = await Item.find({category: args[0]});

        let capCategory = args[0].charAt(0).toUpperCase() + args[0].slice(1);

        let embedMessage = new Discord.MessageEmbed()
            .setColor('0xD8BFD8')
            .setTitle(capCategory + ' Shop');

        let messageConcat = '';

        items.forEach(item => {
            messageConcat += '<' + (item.emote).toString() + '>' + (item.name).toString() + ': ' + (item.price).toString() + '<:boriscoin:798017751842291732> **' + prefix + 'buy ' + (item.name).toString() + '**\n';
        });

        embedMessage.setDescription(messageConcat);

        return message.channel.send({embeds: [embedMessage]});
    }
};