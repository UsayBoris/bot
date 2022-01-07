const Discord = require("discord.js");
const {User} = require("../../models/user");
const Transaction = require("../../struct/Transaction");
const slotsRecently = new Set();

module.exports = {
    name: '7 Slots - 15 seconds cooldown',
    description: '**Win** - **Combination**\n30 - 3 Jokers 🎰 🎰 🎰\n10 - Any 3 Fruit 🍎 🍇 🍋 🍌 🍒\n4 - Any 2 Jokers 🎰 🎰\n1 - Any 1 Joker 🎰',
    usage: 'slots <value>',
    execute: async function (message, client, args) {
        if (!args[0] || isNaN(args[0]) || parseInt(args[0]) === 0) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('The value you inserted is invalid!')]});
        let bet_value = parseInt(args[0]);
        if (await User.getBalance(message.author.id) < bet_value) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('You dont have enough coins!')]});

        if (slotsRecently.has(message.author.id))
            return message.reply('command has a 15 second cooldown.');
        slotsRecently.add(message.author.id);
        setTimeout(() => {
            slotsRecently.delete(message.author.id);
        }, (15 * 1000));

        let items = ['🎰', '🍎', '🍇', '🍋', '🍌', '🍒'];

        let $ = items[Math.floor(items.length * Math.random())];
        let $$ = items[Math.floor(items.length * Math.random())];
        let $$$ = items[Math.floor(items.length * Math.random())];

        // 3 Jokers -> win 30
        // 3 Fruit -> win 10
        // 2 Jokers -> win 4
        // 1 Joker -> win 1

        if ($ === $$ && $ === $$$) {
            if ($ === '🎰') {
                await new Transaction(message.author.id, bet_value * 30, 'Slots').process();
                return message.channel.send({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Slot Machine")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                        .addField('Jackpot!', "Big win! You won " + bet_value * 30 + ".")
                        .setColor(0xAF873D)]
                });
            } else {
                await new Transaction(message.author.id, bet_value * 10, 'Slots').process();
                return message.channel.send({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Slot Machine")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                        .addField('3 of a kind!', "You won " + bet_value * 10 + ".")
                        .setColor(0xAF873D)]
                });
            }
        } else if (($ === $$ || $ === $$$) && ($ === '🎰') || (($$ === $$$) && ($$ === '🎰'))) {
            await new Transaction(message.author.id, bet_value * 4, 'Slots').process();
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                    .addField('2 Jokers!', "You won " + bet_value * 4 + ".")
                    .setColor(0xAF873D)]
            });
        } else if ($ === '🎰' || $$ === '🎰' || $$$ === '🎰') {
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                    .addField('1 Joker!', "You break even!")
                    .setColor(0xAF873D)]
            });
        } else {
            await new Transaction(message.author.id, -bet_value, 'Slots').process();
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                    .addField('Lost...', "Better luck next time.")
                    .setColor(0xAF873D)]
            });
        }
    }
}