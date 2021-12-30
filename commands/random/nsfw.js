const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'NSFW',
    description: 'Returns an nsfw image',
    usage: 'nsfw',
    execute: async function (message, client, args) {
        if (!message.channel.nsfw) return message.channel.send('This command can only be executed in a NSFW channel!');

        let lo = new Discord.MessageEmbed()
            .setDescription('Loading...')
            .setTimestamp();

        let nsfw = ['4k', 'anal', 'ass', 'pussy', 'pgif']

        message.channel.send({embeds: [lo]}).then(m => {
            superagent.get('https://nekobot.xyz/api/image').timeout({
                response: 5000,
                deadline: 10000
            }).query({type: nsfw[Math.floor(Math.random() * nsfw.length)]}).then(res => {
                m.edit({
                    embeds:
                        [new Discord.MessageEmbed()
                            .setDescription(res.body.message)
                            .setTimestamp()
                            .setImage(res.body.message)]
                });
            }, error => {
                if (error.timeout)
                    m.edit('Could not load any image');
            });
        });
    }
};