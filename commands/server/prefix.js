const Guild = require('../../models/guild');
const Discord = require("discord.js");

module.exports = {
    name: 'prefix',
    execute: async function (message, client, args) {
        let new_prefix = args[0];

        if (new_prefix === null)
            return message.reply("you need to provide a valid prefix");

        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply("you don't have permissions to use this!");

        await Guild.findOneAndUpdate({ id: message.guild.id }, { prefix: new_prefix }, { useFindAndModify: false })
            .then(() => { message.channel.send(`Prefix changed to ${new_prefix}`) });

    },
    help: async function (message, prefix) {
        const _name = 'Prefix';
        const _description = 'Change the prefix for the bot';
        const _usage = `${prefix}prefix {new prefix}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};