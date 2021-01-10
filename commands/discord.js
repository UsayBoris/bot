const Discord = require('discord.js');
const {invite} = require('../config.json');

module.exports = {
    name: 'discord',
    execute: async function (message, client, args, commands) {
        const embed = new Discord.MessageEmbed()
            .setColor("0xACA19D")
            .setTitle('Discord server invite')
            .setThumbnail(client.user.avatarURL())
            .addField('Link', invite);

        return message.channel.send(embed);
    },
    help: async function (message) {
        const _name = 'discord';
        const _description = 'Get the invite for the official bot server';
        const _usage = "discord";

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};