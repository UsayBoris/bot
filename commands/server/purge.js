const Discord = require("discord.js");

module.exports = {
    name: 'purge',
    execute: async function (message, client, args) {
        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        message.channel.bulkDelete(deleteCount)
            .then(messages => message.reply(`bulk deleted ${messages.size} messages`))
            .catch(error => message.reply(`Couldn't delete messages because of: ${error.message}`))
    },
    help: async function (message, prefix) {
        const _name = 'Purge';
        const _description = 'Deletes a number of given messages';
        const _usage = `${prefix}purge {number of messages}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};