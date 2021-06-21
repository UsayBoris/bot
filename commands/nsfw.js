const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'NSFW',
    description: 'Returns an nsfw image',
    usage: 'nsfw {search query}',
    execute: async function (message, client, args) {
        if (!message.channel.nsfw) return message.channel.send('This command can only be executed in a NSFW channel!');
        if (!args.length) return message.channel.send('Please provide a valid search word');

        let lo = new Discord.MessageEmbed()
            .setDescription('Loading...')
            .setTimestamp();

        message.channel.send(lo).then(m => {
            superagent.get('https://nekobot.xyz/api/image').timeout({
                response: 5000,
                deadline: 10000
            }).query({type: args[0]}).then(res => {
                m.edit(new Discord.MessageEmbed()
                    .setDescription(res.body.message)
                    .setTimestamp()
                    .setImage(res.body.message)
                    .setFooter(client.footer));
            }, error => {
                if (error.timeout)
                     m.edit('Could not load any image');
            });
        });
    }
};