const Discord = require("discord.js");
const {User} = require("../../models/user");
const Transaction = require("../../struct/Transaction");
const slotsRecently = new Set();

module.exports = {
    name: 'Slots',
    description: 'Slot Machine: same 3: 100x, same first 2: 20x',
    usage: 'slots <value>',
    execute: async function (message, client, args) {
        if (slotsRecently.has(message.author.id))
            return message.reply('Command under cooldown.');
        slotsRecently.add(message.author.id);
        setTimeout(() => {
            slotsRecently.delete(message.author.id);
        }, (30 * 1000));

        if (!args[0] || isNaN(args[0])) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('The value you inserted is invalid!')]});

        let bet_value = parseInt(args[0]);
        if (await User.getBalance(message.author.id) < bet_value) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription('You dont have enough coins!')]});

        let items = ['💰', '💎', '💸', '💯', '💍', '🔥', '🍎'];

        let $ = items[Math.floor(items.length * Math.random())];
        let $$ = items[Math.floor(items.length * Math.random())];
        let $$$ = items[Math.floor(items.length * Math.random())];

        if ($ === $$ && $ === $$$) {
            await new Transaction(message.author.id, bet_value * 100, 'Slots').process();
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                    .addField('Won!', "Big win! You won " + bet_value * 100 + ".")
                    .setColor(0xAF873D)]
            });
        } else if ($ === $$) {
            await new Transaction(message.author.id, bet_value * 20, 'Slots').process();
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Slot Machine")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`• ${$}  ${$$}  ${$$$} •`)
                    .addField('Won!', "Boring, but still a win! Won " + bet_value * 20 + ".")
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