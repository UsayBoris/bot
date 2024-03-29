const Discord = require('discord.js');
const {invite} = require('../../config.json');

module.exports = {
    name: 'Discord',
    description: 'Get the invite for the official bot server',
    usage: 'discord',
    execute: async function (message, client, args, commands) {
        let embed = new Discord.MessageEmbed()
            .setColor("0xACA19D")
            .setTitle('Discord server invite')
            .setThumbnail(client.user.avatarURL())
            .addField('Link', invite);

        return message.channel.send({embeds: [embed]});
    }
};