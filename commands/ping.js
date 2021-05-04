const Discord = require('discord.js');

module.exports = {
    name: 'Ping',
    description: 'Returns the Latency from the server and API',
    usage: 'ping',
    execute: async function (message, client, args) {
        await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`));
    },
};