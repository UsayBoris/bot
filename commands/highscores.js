const Discord = require("discord.js");
const {find_all_users} = require('../models/user');
const AsciiTable = require('ascii-table');

module.exports = {
    name: 'highscores',
    execute: async function (message, client, args) {
        if (!['azia', 'xp', null].includes(args[0])) return message.reply('not a valid sorting query');
        let result = await find_all_users(args[0]);
        let table = new AsciiTable().setHeading('', 'Name', 'Level', 'Azia');
        let rank = 1
        result.forEach(user => {
            table.addRow(rank++, user.name, user.level, user.azia);
        });
        const Embed = new Discord.MessageEmbed()
            .addField( 'Highscores',table.toString())
            .setDescription(table.toString());
        await message.channel.send("```\nHighscores\n" + table.toString() + "\n```");

    },
    help: async function (message) {
        const _name = 'Highscores';
        const _description = 'Check highscores';
        const _usage = "highscores {sort query}";

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};