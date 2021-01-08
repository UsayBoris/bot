const { checkIfVoice } = require('./checkPermissions');
const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('No songs in queue');
        serverQueue.songs = [];
        console.log(serverQueue.connection.dispatcher);
        try{
            serverQueue.connection.dispatcher.end();
            await message.react('👌');
        } catch(error){
            await message.react('👎');
        }
    },
    help: async function (message) {

    }
};