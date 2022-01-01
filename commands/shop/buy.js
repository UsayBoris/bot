const Item = require('../../models/item');
const {User, check_balance} = require('../../models/user');
const Transaction = require("../../struct/Transaction");
const Discord = require("discord.js");

module.exports = {
    name: 'Buy',
    description: 'Buys a specific item from the shop',
    usage: 'buy {item name or id}',
    execute: async function (message, client, args) {

        const itemString = args.join(' ');
        let item = await Item.findOne({name: itemString});
        if (!item) return message.channel.send('Not a valid Item');

        if (await check_balance(message.author.id) < item.price) return message.channel.send('Not enough money!');

        await new Transaction(message.author.id, -item.price, 'Buy').process();

        User.findOne({id: message.author.id}).then(async user => {

            let obj = user.inventory.find((o, i) => {
                if (o.name === item.name) {
                    user.inventory[i] = {name: o.name, id: o.id, quantity: o.quantity + 1};
                    return true; // stop searching
                }
            });

            if (!obj) {
                user.inventory.push({
                    name: item.name,
                    id: item.id,
                    quantity: 1
                });
            }

            user.save();
        });

        return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor('0xD8BFD8')
                .setTitle('Buy')
                .setDescription("You bought <" + item.emote + "> "+item.name+" for <:boriscoin:798017751842291732> " + item.price + ".")]
        });
    }
};