const Suggestions = require('../../models/suggestions');
const Discord = require('discord.js');

module.exports = {
    name: 'Suggestion',
    description: 'Makes a suggestion to the developer',
    usage: 'suggestion {sentence}',
    execute: async function (message, client, args) {
        const sayMessage = args.join(' ');
        await Suggestions.create({name: message.author.username, id: message.author.id, suggestion: sayMessage});

        message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0xAAFF00)
                .setTitle('Suggestion')
                .setDescription(`your suggestion has been recorded!`)]
        });
    }
};