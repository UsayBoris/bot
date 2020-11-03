const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'shuffle',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);

        for (let i = serverQueue.songs.length - 1; i > 1; i--){
            let j = 1+ Math.floor(Math.random() * i);
            [serverQueue.songs[i], serverQueue.songs[j]] = [serverQueue.songs[j], serverQueue.songs[i]]
        }

        message.client.queue.set(message.guild.id, serverQueue)
    },
    help: async function (message, prefix) {

    }
};