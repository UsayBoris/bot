const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'loop',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Can't loop an empty queue");
        serverQueue.loop = !serverQueue.loop;
        if (serverQueue.loop) return message.channel.send("Now looping the queue");
        return message.channel.send("Now (un)looping the queue");
    },
    help: async function (message) {

    }
};