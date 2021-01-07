const {User} = require('../models/user');
const Discord = require('discord.js');

module.exports = {
    name: 'azia',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) member = message.author;
        else member = member.user;

        let user = await User.findOne({id: member.id})
        if (user === null) {
            return message.reply("This user hasn't talked in this server yet.");
        }
        user.azia += 1;
        user.save();
        return message.channel.send(`O <@${(member.id).toString()}> já aziou ${user.azia} vezes.`);

    },
    help: async function (message, prefix) {
        const _name = 'Azia';
        const _description = 'Azia alguém';
        const _usage = `${prefix}azia {user tag}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};