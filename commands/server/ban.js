const Discord = require("discord.js");

module.exports = {
    name: 'ban',
    execute: async function (message, client, args) {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply("You don't have permissions to use this!");

        let member = message.mentions.members.first();

        if (!member)
            return message.reply("Please mention a valid member of this server");

        if (!member.kickable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have kick permissions?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .then(() => message.reply(`${member.user.tag} has been banned by ${message.author.tag} because : ${reason}`))
            .catch(e => message.reply(`I couldn't ban because of : ${e}`));
    },
    help: async function (message) {
        const _name = 'Ban';
        const _description = 'Bans someone for the given reason';
        const _usage = `ban {user tag} {'Reason'}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};