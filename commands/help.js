const Discord = require('discord.js');

module.exports = {
    name: 'highscores',
    execute: async function (message, client, args, commands) {
        if (args[0] === ''){
            return message.channel.send('help command');
        } else if (Object.keys(commands).includes(args[0])){
            await commands[args[0]].help(message);
        } else return message.reply('This command is not in the command list');
    },
    help: async function (message) {
        const _name = 'help';
        const _description = 'Help for the other commands';
        const _usage = "highscores {sort query}";

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};