const Discord = require("discord.js");

module.exports = {
    name: 'shop',
    execute: async function (message, client, args) {

        await message.channel.send("In Progress...");

    },
    help: async function (message, prefix) {
        const _name = 'Shop';
        const _description = 'Displays the full or specific shops';
        const _usage = `${prefix}shop {optional: specific shop}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};