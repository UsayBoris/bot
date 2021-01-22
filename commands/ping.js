const Discord = require('discord.js');

module.exports = {
    name: 'Ping',
    description: 'Returns the Latency from the server and API',
    usage: 'ping',
    execute: async function (message, client, args) {
        //TODO create embed and forget about the edit thing
        await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Pong! Latency is ${message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`));
    },
};