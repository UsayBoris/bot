const Dice = require("../../models/dice");
const {User} = require("../../models/user");
const Discord = require('discord.js');

module.exports = {
    name: 'Accept',
    description: 'Accept player dice',
    usage: 'accept {tag}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) return message.channel.send('This is not a valid player');

        let dice = await Dice.findOne({
            player_1: member.id,
            player_2: message.author.id
        });
        if (dice === null) return message.channel.send('You dont have any challenges from this player');

        let user = await User.findOne({id: message.author.id});

        if (user.coins < dice.bet) return message.channel.send('You dont have enough BorisCoins to accept this challenge');
        user.coins -= dice.bet;
        user.save()

        let roll = Math.floor(Math.random() * 100) + 1

        let embed = new Discord.MessageEmbed()
            .setColor(0xAF873D)
            .setTitle('Challenge Log')
            .addField(member.displayName, 'Rolled a ' + dice.roll, true)
            .addField(message.author.username, 'Rolled a ' + roll, true);

        if (dice.roll >= roll) {
            let user = await User.findOne({id: member.id});
            user.coins += dice.bet * 2;
            user.save()
            embed.setDescription(member.displayName + " has won the challenge!");
        } else {
            let user = await User.findOne({id: message.author.id});
            user.coins += dice.bet * 2;
            user.save()
            embed.setDescription(message.author.username + " has won the challenge!");
        }

        await Dice.deleteOne({
            player_1: member.id,
            player_2: message.author.id
        });

        return message.channel.send(embed);
    }
}