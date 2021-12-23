const Discord = require('discord.js');

module.exports = {
    name: 'Test Module',
    description: 'Currently working...',
    usage: '',
    execute: async function (message, client, args) {

        message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle('Test')
                .setDescription('Test Command')
                .setFooter(`API Latency is ${Date.now() - message.createdTimestamp}ms`)]});
    }
};