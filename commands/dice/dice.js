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

        await User.findOne({
            id: message.author.id
        }).then(async user1 => {

            //if (!Number.isInteger(args[1])) return message.channel.send('The value you inserted is invalid!');
            if (user1.coins < args[1]) return message.channel.send('You dont have enough coins to make this challenge');

            let roll_1 = Math.floor(Math.random() * 100) + 1;

            let embedMessage = new Discord.MessageEmbed()
                .setColor(0xAF873D)
                .setTitle('Dice Challenge')
                .setDescription(`You have challenged ${member.displayName} with a roll of ${roll_1}. Total value in the bet: ${args[1]} <:boriscoin:798017751842291732>`);

            const filter = (reaction, user) => {
                return ['✔', '❌'].includes(reaction.emoji.name) && user.id === member.id;
            }

            message.channel.send(embedMessage).then(async dice => {
                await dice.react('✔');
                await dice.react('❌');

                dice.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
                    .then(async collected => {
                        const reaction = collected.first();
                        switch (reaction.emoji.name) {
                            case '✔':
                                await User.findOne({id: member.id}).then(async user2 => {
                                    if (user2.coins < args[1]) {
                                        dice.edit.setDescription('You dont have enough coins to accept this challenge. Cancelled!');
                                        await dice.reactions.removeAll();
                                    }

                                    let roll_2 = Math.floor(Math.random() * 100) + 1;

                                    if (roll_2 > roll_1) {
                                        user1.coins -= args[1];
                                        await user1.save();
                                        user2.coins += args[1];
                                        await user2.save();

                                        dice.edit.setDescription(`${member.displayName} won the dice with a roll of ${roll_2} vs ${roll_1}, and received ${args[1]} <:boriscoin:798017751842291732>`);
                                        await dice.reactions.removeAll();
                                    } else if (roll_1 >= roll_2) {
                                        user1.coins += args[1];
                                        await user1.save();
                                        user2.coins -= args[1];
                                        await user2.save();

                                        dice.edit.setDescription(`${member.displayName} lost the dice with a roll of ${roll_2} vs ${roll_1}, he loses ${args[1]} <:boriscoin:798017751842291732>`);
                                        await dice.reactions.removeAll();
                                    }

                                })
                                break;
                            case '❌':
                                dice.edit.setDescription(`${member.displayName} declined the dice, better friends next time!`);
                                await dice.reactions.removeAll();
                                break;
                        }
                    });
            });


        });
    }
}