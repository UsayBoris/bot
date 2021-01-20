const logger = require("../../logger");
const Dice = require("../../models/dice");
const Discord = require('discord.js');
const {User} = require("../../models/user");

module.exports = {
    name: 'Dice',
    description: 'Dice against a player',
    usage: 'dice {tag} {value}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) return message.channel.send('This is not a valid player');

        let existent = await Dice.findOne({
            player_1: message.author.id,
            player_2: member.id
        });

        if (existent !== null) return message.channel.send('You already have an active challenge with this user!');

        let user = await User.findOne({id: message.author.id});

        if (user.coins < args[1]) return message.channel.send('You dont have enough coins to make this challenge');

        await Dice.create({
            player_1: message.author.id,
            player_2: member.id,
            bet: args[1],
            roll: Math.floor(Math.random() * 100) + 1
        }).then(dice => {
            user.coins -= args[1];
            user.save();
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0xAF873D)
                .setTitle('Dice Challenge')
                .setDescription(`You have challenged ${member.displayName} with a roll of ${dice.roll}. Do "+accept {tag}" to proceed`)
            );
        })


    }
}