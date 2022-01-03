const Discord = require("discord.js");
const {User} = require("../../models/user");

module.exports = {
    name: 'Upgrade',
    description: 'Upgrades a perk to the next tier',
    usage: 'upgrade {item name}',
    execute: async function (message, client, args) {

        // check if the user has an item with that name in inventory and quantity bellow max level (6)
        //

        let perks = await User.getPerks(message.author.id);

        if (args.length === 0) await message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0xAF873D)
                .setTitle('Upgrade')
                .setDescription(`Not a valid Item Name`)]
        });
        else {
            await message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setColor(0xAF873D)
                    .setTitle('Upgrade')
                    .setDescription(`Perks can't be upgraded just yet`)]
            })
        }
    }
}