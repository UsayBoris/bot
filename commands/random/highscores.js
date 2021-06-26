const Discord = require("discord.js");
const {find_all_users} = require('../../models/user');
const AsciiTable = require('ascii-table');

module.exports = {
    name: 'Highscores',
    description: 'Check highscores' ,
    usage: 'highscores {sort query}',
    execute: async function (message, client, args) {
        if (!['azia', 'xp', null].includes(args[0])) return message.reply('not a valid sorting query');
        let result = await find_all_users(args[0]);
        let table = new AsciiTable().setHeading('', 'Name', 'Level', 'Azia');
        let rank = 1
        result.forEach(user => {
            table.addRow(rank++, user.name, user.level, user.azia);
        });
        //TODO needs to be embed, or just keep the pretty markdown
        await message.channel.send("```\nHighscores\n" + table.toString() + "\n```");
    },
};