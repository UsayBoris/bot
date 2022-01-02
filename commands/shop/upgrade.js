const Discord = require("discord.js");
const {mining_cooldown} = require("../../config.json");
module.exports = {
    name: 'Upgrade',
    description: 'Upgrades a perk to the next tier',
    usage: 'upgrade {item name}',
    execute: async function (message, client, args) {
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