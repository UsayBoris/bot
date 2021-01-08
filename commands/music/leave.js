const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'leave',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("I'm not in a voice chat!");

        await serverQueue.connection.disconnect();
    },
    help: async function (message) {

    }
};