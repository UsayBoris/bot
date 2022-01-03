const {checkIfVoice} = require('./checkPermissions');
const logger = require("../../logger");

module.exports = {
    name: 'Clear',
    description: 'Clears the server playlist',
    usage: 'clear',
    execute: async function (message, client, args) {
        if (!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('No songs in queue');
        serverQueue.songs = [];
        console.log(serverQueue.connection.dispatcher);
        try {
            serverQueue.connection.dispatcher.end();
            await message.react('👌');
        } catch (error) {
            logger.error(error.message);
            await message.react('👎');
        }
    }
};