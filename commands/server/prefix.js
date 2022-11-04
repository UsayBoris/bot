const Guild = require('../../models/guild');

module.exports = {
    name: 'Prefix',
    description: 'Change the prefix for the bot in this server',
    usage: 'prefix <new prefix>',
    execute: async function (message, client, args) {
        if (!message.member.permissions.has('KICK_MEMBERS'))
            return message.reply("you don't have permissions to use this!");

        if (!args.length)
            return message.reply('you need to provide a valid new prefix')

        let new_prefix = args[0];

        await Guild.findOneAndUpdate({id: message.guild.id}, {prefix: new_prefix}, {useFindAndModify: false})
            .then(() => {
                message.channel.send(`Prefix changed to ${new_prefix}`)
            });
    }
};