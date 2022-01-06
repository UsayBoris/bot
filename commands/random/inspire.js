const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Discord = require('discord.js');

module.exports = {
    name: 'Inspire',
    description: 'If in need of some Inspiration',
    usage: 'inspire',
    execute: async function (message, client, args) {
        fetch('https://zenquotes.io/api/random')
            .then(res => res.json())
            .then(json => message.channel.send({embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setTitle(json[0].a)
                    .setDescription(json[0].q)]}));
    },
};