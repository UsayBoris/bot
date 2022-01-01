const {User} = require('../../models/user');
const Item = require('../../models/item');
const Discord = require("discord.js");

module.exports = {
    name: 'Inventory',
    description: 'Lists all items in the user inventory',
    usage: 'inventory',
    execute: async function (message, client, args) {
        let user = await User.findById(message.author.id);
        let inventory = user.inventory;

        let messageConcat = '';

        for (const item of inventory) {
            messageConcat += await Item.getItemString(item.id, item.quantity)
        }

        message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor('0x00AE86')
                .setTitle('Inventory')
                .setDescription(messageConcat)]
        });
    }
}