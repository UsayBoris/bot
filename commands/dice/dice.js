const logger = require("../../logger");
const Dice = require("../../models/dice");
const Discord = require('discord.js')

module.exports = {
    name: 'Play',
    description: 'Plays a given song',
    usage: 'play {song name or url}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) return message.channel.send('This is not a valid player');

        let existent = await Dice.findOne({
            player_1: message.author.id,
            player_2: member.id
        });

        if (existent !== null) return message.channel.send('You already have an active challenge with this user!');

        await Dice.create({
            player_1: message.author.id,
            player_2: member.id,
            bet: args[0],
            guild: message.guild.id
        });

        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xAF873D)
            .setTitle('Dice Challenge')
            .setDescription(`You have challenged ${member.displayName}. Do "accept" to proceed`)
        );
    }
}