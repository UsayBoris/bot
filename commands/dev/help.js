const Discord = require('discord.js');
const Guild = require("../../models/guild");

module.exports = {
    name: 'Help',
    description: 'Help for the other commands',
    usage: "help <command>",
    execute: async function (message, client, args, commands) {
        if (!args.length) {
            // TODO replace this with all the commands printed on screen (How? No idea)
            let commandKeys = Object.keys(commands);

            let messageEmbed = '';
            for (let command of commandKeys) {
                messageEmbed += '`' + command + '`, ';
            }

            const prefix = await Guild.getPrefix(message.guild.id);
            let embed = new Discord.MessageEmbed()
                .setColor("0xFFFE00")
                .setAuthor(`Help command`, client.user.displayAvatarURL())
                .addField("All available commands", messageEmbed)
                .setFooter("Type \'" + prefix + "help <CommandName>\' for details on a command")
            return message.channel.send({embeds: [embed]});

        } else if (Object.keys(commands).includes(args[0])) {
            let {name, description, usage} = commands[args[0]];
            const prefix = await Guild.getPrefix(message.guild.id);
            let embed = new Discord.MessageEmbed()
                .setColor("0xFFFE00")
                .setAuthor(`Help command: ${name}`, client.user.displayAvatarURL())
                .addField(prefix + usage, `${description}`);
            return message.channel.send({embeds: [embed]});
        } else return message.reply('This command is not in the command list');
    }
};