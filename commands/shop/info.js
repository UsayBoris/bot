const Item = require("../../models/item");
const Discord = require("discord.js");
module.exports = {
    name: 'Info',
    description: 'Displays full info on an item',
    usage: 'info <item name>',
    execute: async function (message, client, args) {

        const itemString = args.join(' ');
        let item = await Item.findOne({name: itemString});
        if (!item) return message.channel.send('Not a valid Item');

        return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor('0xFFFE00')
                .setAuthor('Info on: ' + item.name)
                .setDescription(` <${item.emote}>\n **Description**: ${item.description}\n **Price**: ${item.price}\n **Category**: ${item.category}`)]
        });

    }
}