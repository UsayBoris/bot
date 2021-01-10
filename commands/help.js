const Discord = require('discord.js');

module.exports = {
    name: 'Help',
    description: 'Help for the other commands',
    usage: 'help {command}',
    execute: async function (message, client, args, commands) {
        if (!args.length) {
            await this.execute(message, client, ['help'], commands);
        } else if (Object.keys(commands).includes(args[0])) {
            let {name, description, usage} = commands[args[0]];
            return message.channel.send(new Discord.MessageEmbed()
                .setColor("0xFFFE00")
                .setTitle(`Help Command`)
                .addField(name, `**Description:** ${description}\n**Usage:** ${usage}`))
        } else return message.reply('This command is not in the command list');
    }
};