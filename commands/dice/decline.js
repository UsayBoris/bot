const Dice = require("../../models/dice");
const {User} = require("../../models/user");
const Discord = require('discord.js');

module.exports = {
    name: 'Decline',
    description: 'Declines a player dice',
    usage: 'decline {tag}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) return message.channel.send('This is not a valid player');

        let dice = await Dice.findOne({
            player_1: member.id,
            player_2: message.author.id
        });
        if (dice === null) return message.channel.send('You dont have any challenges from this player');
    }
}
