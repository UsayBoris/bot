const Discord = require("discord.js");
const {User} = require("../../models/user");
const Transaction = require("../../struct/Transaction");
const slotsRecently = new Set();

module.exports = {
    name: 'Specia Slots - 10 minutes cooldown',
    description: '**Win** - **Combination**\n60 - 3 Jokers 🎰 🎰 🎰\n40 - 3 Diamonds 💎 💎 💎\n20 - 3 Cherries 🍒 🍒 🍒\n10 - 3 of a kind 🍊 🍌 🍋\n3 - 2 Cherries 🍒 🍒\n1 - 1 Cherry 🍒',
    usage: 'specialslots <value>',
    execute: async function (message, client, args) {
        if (!args[0] || isNaN(args[0])) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('The value you inserted is invalid!')]});
        let bet_value = parseInt(args[0]);
        if (await User.getBalance(message.author.id) < bet_value) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('You dont have enough coins!')]});

        if (slotsRecently.has(message.author.id))
            return message.reply('This command has a 10 minutes cooldown.');
        slotsRecently.add(message.author.id);
        setTimeout(() => {
            slotsRecently.delete(message.author.id);
        }, (10 * 60 * 1000));

        let items1 = ['🎰', '💎', '💎', '💎', '🍒', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋'];
        let items2 = ['🎰', '💎', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋', '🍋'];
        let items3 = ['🎰', '💎', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋', '🍋'];

        let $ = items1[Math.floor(items1.length * Math.random())];
        let $$ = items2[Math.floor(items2.length * Math.random())];
        let $$$ = items3[Math.floor(items3.length * Math.random())];

        let spinner = await message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle("Slot Machine")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`• ❌  ❌  ❌ •`)
                .setColor(0xAF873D)]
        });
        setTimeout(() => {
            spinner.edit({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ❌  ❌ •`)
                    .setColor(0xAF873D)]
            });
        }, 600);
        setTimeout(() => {
            spinner.edit({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ❌ •`)
                    .setColor(0xAF873D)]
            });
        }, 1200);

        setTimeout(async () => {
            if ($ === $$ && $ === $$$) {
                if ($ === '🎰') {
                    // 3 Jokers -> 60
                    await new Transaction(message.author.id, bet_value * 60, 'Slots').process();
                    spinner.edit({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Slot Machine")
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                            .addField('Jackpot!', "Big win! You won " + bet_value * 60 + ".")
                            .setColor(0xAF873D)]
                    });
                } else if ($ === '💎') {
                    // 3 Diamonds -> 40
                    await new Transaction(message.author.id, bet_value * 40, 'Slots').process();
                    spinner.edit({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Slot Machine")
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                            .addField('3 Diamonds', "You won " + bet_value * 40 + ".")
                            .setColor(0xAF873D)]
                    });
                } else if ($ === '🍒') {
                    // 3 Cherries -> 20
                    await new Transaction(message.author.id, bet_value * 20, 'Slots').process();
                    spinner.edit({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Slot Machine")
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                            .addField('3 Cherries', "You won " + bet_value * 20 + ".")
                            .setColor(0xAF873D)]
                    });
                } else {
                    // 3 Other Fruits -> 10
                    await new Transaction(message.author.id, bet_value * 10, 'Slots').process();
                    spinner.edit({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Slot Machine")
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                            .addField('3 Of A Kind', "You won " + bet_value * 10 + ".")
                            .setColor(0xAF873D)]
                    });
                }
            } else if (($ === $$ || $ === $$$) && ($ === '🍒') || (($$ === $$$) && ($$ === '🍒'))) {
                // 2 Cherries -> 3
                await new Transaction(message.author.id, bet_value * 3, 'Slots').process();
                spinner.edit({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Slot Machine")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                        .addField('2 Cherries', "You won " + bet_value * 3 + ".")
                        .setColor(0xAF873D)]
                });
            } else if ($ === '🍒' || $$ === '🍒' || $$$ === '🍒') {
                // 1 Cherry - 1
                spinner.edit({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Slot Machine")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                        .addField('1 Cherry', "You won nothing.")
                        .setColor(0xAF873D)]
                });
            } else {
                await new Transaction(message.author.id, -bet_value, 'Slots').process();
                spinner.edit({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Slot Machine")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                        .addField('Lost...', "Better luck next time.")
                        .setColor(0xAF873D)]
                });
            }
        }, 1800);
    }
}