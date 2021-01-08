const Discord = require("discord.js");

module.exports = {
    name: 'buy',
    execute: async function (message, client, args) {
        return message.channel.send('In Progress...');
    },
    help: async function (message) {
        const _name = 'Buy';
        const _description = 'Buys a specific item from the shop';
        const _usage = `buy {item name or id}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};