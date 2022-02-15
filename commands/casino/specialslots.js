const Discord = require("discord.js");
const {User} = require("../../models/user");
const Transaction = require("../../struct/Transaction");
const shuffle = require("shuffle-array")
const slotsRecently = new Set();

module.exports = {
    name: 'Specia Slots - 5 minutes cooldown',
    description: '**Win** - **Combination**\n60 - 3 Jokers 🎰 🎰 🎰\n40 - 3 Diamonds 💎 💎 💎\n20 - 3 Cherries 🍒 🍒 🍒\n10 - 3 of a kind 🍊 🍌 🍋\n3 - 2 Cherries 🍒 🍒\n1 - 1 Cherry 🍒',
    usage: 'specialslots <value>',
    execute: async function (message, client, args) {
        let bet_value;
        if (args[0] === 'allin') {
            bet_value = await User.getBalance(message.author.id);
            if (bet_value === 0) {
                return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription("Can't all in 0.")]});
            }
        } else if (!args[0] || isNaN(args[0]) || parseInt(args[0]) === 0) {
            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('The value you inserted is invalid!')]});
        } else if (await User.getBalance(message.author.id) < parseInt(args[0])) {
            return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('You dont have enough coins!')]});
        } else {
            bet_value = parseInt(args[0]);
        }

        if (slotsRecently.has(message.author.id))
            return message.reply('This command has a 10 minutes cooldown.');
        slotsRecently.add(message.author.id);
        setTimeout(() => {
            slotsRecently.delete(message.author.id);
        }, (5 * 60 * 1000));

        let items1 = shuffle(['🎰', '💎', '💎', '💎', '🍒', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋']);
        let items2 = shuffle(['🎰', '💎', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋', '🍋']);
        let items3 = shuffle(['🎰', '💎', '🍒', '🍒', '🍒', '🍊', '🍊', '🍊', '🍊', '🍊', '🍊', '🍌', '🍌', '🍌', '🍌', '🍌', '🍌', '🍋', '🍋', '🍋', '🍋', '🍋', '🍋']);

        let $ = items1[Math.floor(items1.length * Math.random())];
        let $$ = items2[Math.floor(items2.length * Math.random())];
        let $$$ = items3[Math.floor(items3.length * Math.random())];

        let spinner = await message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle("Special Slot Machine")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`••••••••••••••••••••••••\n•••••• ❌ ❌ ❌ ••••••\n••••••••••••••••••••••••`)
                .setColor(0xAF873D)]
        });
        setTimeout(() => {
            spinner.edit({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Special Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`••••••••••••••••••••••••\n•••••• ${$} ❌ ❌ ••••••\n••••••••••••••••••••••••`)
                    .setColor(0xAF873D)]
            });
        }, 600);
        setTimeout(() => {
            spinner.edit({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Special Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`••••••••••••••••••••••••\n•••••• ${$} ${$$} ❌ ••••••\n••••••••••••••••••••••••`)
                    .setColor(0xAF873D)]
            });
        }, 1200);

        setTimeout(async () => {
            // create the embed
            // process the thing, add the field
            // print at the end
            let win_screen = new Discord.MessageEmbed()
                .setTitle("Special Slot Machine")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`••••••••••••••••••••••••\n•••••• ${$} ${$$} ${$$$} ••••••\n••••••••••••••••••••••••`)
                .setColor(0xAF873D);

            if ($ === $$ && $ === $$$) {
                if ($ === '🎰') {
                    // 3 Jokers -> 60
                    await new Transaction(message.author.id, bet_value * 59, 'Slots').process();
                    win_screen.addField('Jackpot!', "Big win! You won " + bet_value * 60 + ".");
                } else if ($ === '💎') {
                    // 3 Diamonds -> 40
                    await new Transaction(message.author.id, bet_value * 39, 'Slots').process();
                    win_screen.addField('3 Diamonds', "You won " + bet_value * 40 + ".")
                } else if ($ === '🍒') {
                    // 3 Cherries -> 20
                    await new Transaction(message.author.id, bet_value * 19, 'Slots').process();
                    win_screen.addField('3 Cherries', "You won " + bet_value * 20 + ".")
                } else {
                    // 3 Other Fruits -> 10
                    await new Transaction(message.author.id, bet_value * 9, 'Slots').process();
                    win_screen.addField('3 Of A Kind', "You won " + bet_value * 10 + ".")
                }
            } else if (($ === $$ || $ === $$$) && ($ === '🍒') || (($$ === $$$) && ($$ === '🍒'))) {
                // 2 Cherries -> 3
                await new Transaction(message.author.id, bet_value * 2, 'Slots').process();
                win_screen.addField('2 Cherries', "You won " + bet_value * 3 + ".")
            } else if ($ === '🍒' || $$ === '🍒' || $$$ === '🍒') {
                // 1 Cherry - 1
                win_screen.addField('1 Cherry', "You break even.")
            } else {
                await new Transaction(message.author.id, -bet_value, 'Slots').process();
                win_screen.addField('Lost...', "Better luck next time.")
            }
            spinner.edit({embeds: [win_screen]});
        }, 1800);
    }
}