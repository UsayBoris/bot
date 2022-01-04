const Item = require('../../models/item');
const {User, check_balance} = require('../../models/user');
const Transaction = require("../../struct/Transaction");
const Discord = require("discord.js");

module.exports = {
    name: 'Buy',
    description: 'Buys a specific item from the shop',
    usage: 'buy {item name}',
    execute: async function (message, client, args) {

        const itemString = args.join(' ');
        let item = await Item.findOne({name: itemString});
        if (!item) return message.channel.send('Not a valid Item');

        if (await User.getBalance(message.author.id) < item.price) return message.channel.send('Not enough money!');

        // check if there is an item in inventory that matches the one that he wants to buy
        // check if that item is a perk
        // if perk -> skip the update, send user a message that it needs to be upgraded
        // else -> update item in inventory for the new quantity (transaction made)
        // if the item does not exist, add it to the inventory (transaction made)

        User.findOne({id: message.author.id}).then(async user => {
            let obj = user.inventory.find(x => x.name === item.name);
            if (!obj) {
                user.inventory.push({
                    name: item.name,
                    id: item.id,
                    quantity: 1
                });
                user.save();
            } else {
                if (item.category === 'perk') {
                    return message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor('0xD8BFD8')
                            .setTitle('Buy')
                            .setDescription(`You already have this perk, try upgrading it **+upgrade ${item.name}**`)]
                    });
                } else {
                    let index = user.inventory.indexOf(obj);
                    user.inventory[index] = {name: obj.name, id: obj.id, quantity: obj.quantity + 1};
                    user.save();
                }
            }
            await new Transaction(message.author.id, -item.price, 'Buy').process();
            await message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setColor('0xD8BFD8')
                    .setTitle('Buy')
                    .setDescription("You bought <" + item.emote + "> " + item.name + " for <:boriscoin:798017751842291732> " + item.price + ".")]
            });
        });
    }
};