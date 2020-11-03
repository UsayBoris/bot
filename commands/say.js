const Discord = require("discord.js");

module.exports = {
    name: 'say',
    execute: async function (message, client, args) {
        console.log(message.member.id);
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply("te fuder, não mandas no bot!");
        const sayMessage = args.join(' ');
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    },
    help: async function (message, prefix) {
        const _name = 'Say';
        const _description = 'Makes the bot say a sentence';
        const _usage = `${prefix}say {sentence}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};