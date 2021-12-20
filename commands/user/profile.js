const {User} = require('../../models/user');
const Discord = require("discord.js");

module.exports = {
    name: 'Profile',
    description: 'Looks at your user profile',
    usage: 'profile',
    execute: async function (message, client, args) {
        let user = await User.findOne({id: message.author.id});

        let embed = new Discord.MessageEmbed()
            .setColor('0x00AE86')
            .setTitle(`${message.author.username}'s Profile`)
            .addField("Stats", `**Level: ${user.level}**\n<:xp:801554148994056202> Experience: **${user.xp}**\n<:boriscoin:798017751842291732> BorisCoins: **${user.coins}**\nAzia: **${user.azia}**`)
            .addField("Inventory", "Empty")
            .setThumbnail(message.author.avatarURL());

        return message.channel.send({embeds: [embed]});
    }
};