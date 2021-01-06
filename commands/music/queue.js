const Discord = require("discord.js");
const {checkIfVoice} = require('./checkPermissions');

module.exports = {
    name: 'queue',
    execute: async function (message, client, args) {
        if (!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        let queue = serverQueue.songs.map(song => `**-** ${song.title}`).join('\n');
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
            .addField("The Queue is empty", " ", true));

        let current = serverQueue.songs[0].title;
        return message.channel.send(new Discord.MessageEmbed()
            .addField("Song queue", queue)
            .addField('Now Playing', current));
    },
    help: async function (message, prefix) {

    }
};