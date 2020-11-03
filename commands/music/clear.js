const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'clear',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('No songs in queue');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();

    },
    help: async function (message, prefix) {

    }
};