const {User} = require('../../models/user');
const Discord = require("discord.js");

module.exports = {
    name: 'peek',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        let user = await User.findOne({ id: member.user.id });
        if (user === null) {
            return message.reply("This user has no profile!");
        }
        const embed= new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setTitle(`${member.user.username} Profile`)
            .addField("Stats",`**Level: ${user.level}**\nAzia: **${user.azia}**`)
        return message.channel.send(embed);
    },
    help: async function (message, prefix) {
        const _name = 'Look At';
        const _description = 'Look at a user profile';
        const _usage = `${prefix}look_at {user tag}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};