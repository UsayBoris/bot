const Discord = require("discord.js");
const {User} = require('../../models/user');
const AsciiTable = require('ascii-table');
const Item = require("../../models/item");

module.exports = {
    name: 'Highscores',
    description: 'Check highscores',
    usage: 'highscores {sort query (azia, xp, coins)}',
    execute: async function (message, client, args) {
        // check if there is an arg, if there isn't, the default will be xp
        // get the top 10 users for the search query (Name and only the field that matters
        // Create the table for the specific query
        // add users
        // print the embed version of it (I guess)

        if (!['azia', 'xp', 'coins'].includes(args[0]) || args.length === 0) return message.reply('not a valid sorting query');
        let users = await User.find({}).sort([[args[0], "desc"]]).limit(10);
        let table = new AsciiTable();
        let rank = 1;

        switch (args[0]) {
            case 'azia':
                table.setHeading('', 'Name', 'Azia');
                for (const user of users) {
                    table.addRow(rank++, user.name, user.azia);
                }
                break;
            case 'xp':
                table.setHeading('', 'Name', 'Level', 'XP');
                for (const user of users) {
                    table.addRow(rank++, user.name, user.level, user.xp);
                }
                break;
            case 'coins':
                table.setHeading('', 'Name', 'BorisCoins');
                for (const user of users) {
                    table.addRow(rank++, user.name, user.coins);
                }
                break;
        }

        return message.channel.send("```\nHighscores\n" + table.toString() + "\n```");
    },
};