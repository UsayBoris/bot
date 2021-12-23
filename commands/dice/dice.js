const Discord = require('discord.js');
const {check_balance} = require("../../models/user");
const Transaction = require('../../struct/Transaction');

module.exports = {
    name: 'Test Module',
    description: 'Currently working on the dice command',
    usage: '',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined || member.id === message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('Not a valid player')]});
        if (!args[1] || isNaN(args[1])) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('The value you inserted is invalid!')]});

        let bet_value = parseInt(args[1]);
        if (await check_balance(message.author.id) < bet_value) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('You dont have enough coins to make this challenge')]});

        let roll_1 = Math.floor(Math.random() * 100) + 1;
        let roll_2 = Math.floor(Math.random() * 100) + 1;

        const filter = (reaction, user) => {
            return ['✔', '❌'].includes(reaction.emoji.name) && user.id === member.id;
        }

        let embedMessage = new Discord.MessageEmbed()
            .setColor(0xAF873D)
            .setTitle('Dice Challenge')
            .setDescription(`You have challenged **${member.displayName}**. Total value in the bet: **${bet_value}** <:boriscoin:798017751842291732>`)

        message.channel.send({embeds: [embedMessage]}).then(async dice_message => {
            await dice_message.react('✔');
            await dice_message.react('❌');

            dice_message.awaitReactions({filter, max: 1, time: 60000, errors: ['time']})
                .then(async collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '✔') {
                        if (await check_balance(member.id) < bet_value) {
                            await dice_message.edit({
                                embeds: [new Discord.MessageEmbed()
                                    .setColor(0xAF873D)
                                    .setTitle('Dice Challenge')
                                    .setDescription(`You dont have enough coins to accept this challenge. Cancelled!`)]
                            });
                            return dice_message.reactions.removeAll();
                        }
                        if (roll_2 > roll_1) {
                            await new Transaction(message.author.id, -bet_value).process();
                            await new Transaction(member.id, bet_value).process();
                            await dice_message.edit({
                                embeds: [new Discord.MessageEmbed()
                                    .setColor(0xAF873D)
                                    .setTitle('Dice Challenge')
                                    .setDescription(`**${member.displayName}** won the dice with a roll of **${roll_2}** vs **${roll_1}**, and received **${bet_value}** <:boriscoin:798017751842291732>`)]
                            });
                        } else {
                            await new Transaction(message.author.id, bet_value).process();
                            await new Transaction(member.id, -bet_value).process();
                            await dice_message.edit({
                                embeds: [new Discord.MessageEmbed()
                                    .setColor(0xAF873D)
                                    .setTitle('Dice Challenge')
                                    .setDescription(`**${message.author.username}** won the dice with a roll of **${roll_1}** vs **${roll_2}**, and received **${bet_value}** <:boriscoin:798017751842291732>`)]
                            });
                        }
                    } else {
                        await dice_message.edit({
                            embeds: [new Discord.MessageEmbed()
                                .setColor(0xAF873D)
                                .setTitle('Dice Challenge')
                                .setDescription(`**${member.displayName}** declined the dice, better friends next time!`)]
                        });
                    }
                    await dice_message.reactions.removeAll();
                })
                .catch(async err => {
                    console.log(err);
                    await dice_message.edit({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(0xAF873D)
                            .setTitle('Dice Challenge')
                            .setDescription(`The Challenge has expired!`)]
                    });
                    await dice_message.reactions.removeAll();
                });
        });
    }
};