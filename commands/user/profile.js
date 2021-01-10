const {User} = require('../../models/user');
const Discord = require("discord.js");

module.exports = {
    name: 'Profile',
    description: 'Looks at your user profile',
    usage: 'profile',
    execute: async function (message, client, args) {
        let user = await User.findOne({ id: message.author.id });

        let embed = new Discord.MessageEmbed()
            .setColor('0x00AE86')
            .setTitle(`${message.author.username} Profile`)
            .addField("Stats", `**Level: ${user.level}**\nExperience: **${user.xp}**\nCoins: **${user.coins}**\nAzia: **${user.azia}**`)
            .addField("Inventory", "Empty")
            .setThumbnail(message.author.avatarURL());

        return message.channel.send(embed);

    }
};