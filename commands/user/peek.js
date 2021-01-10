const {User} = require('../../models/user');
const Discord = require("discord.js");

module.exports = {
    name: 'Peek',
    description: 'Look at a user profile',
    usage: 'peek {user tag}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        let user = await User.findOne({id: member.user.id});
        if (user === null) {
            return message.reply("This user has no profile!");
        }
        const embed = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setTitle(`${member.user.username} Profile`)
            .addField("Stats", `**Level: ${user.level}**\nAzia: **${user.azia}**`)
            .setThumbnail(member.user.avatarURL());
        return message.channel.send(embed);
    }
};