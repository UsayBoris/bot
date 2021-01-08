const {User} = require('../../models/user');
const Discord = require("discord.js");

module.exports = {
    name: 'profile',
    execute: async function (message, client, args) {
        let user = await User.findOne({ id: message.author.id });
        let embed = new Discord.MessageEmbed()
            .setColor('0x00AE86')
            .setTitle(`${message.author.username} Profile`)
            .addField("Stats", `**Level: ${user.level}**\nExperience: **${user.xp}**\nCoins: **${user.coins}**\nAzia: **${user.azia}**`)
            .addField("Inventory", "Empty");
        return message.channel.send(embed);

    },
    help: async function (message) {
        const _name = 'Profile';
        const _description = 'Looks at your user profile';
        const _usage = `profile`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};