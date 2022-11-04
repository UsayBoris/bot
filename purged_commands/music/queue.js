const Discord = require("discord.js");
const {checkIfVoice} = require('./checkPermissions');

module.exports = {
    name: 'Queue',
    description: 'Checks the current server queue',
    usage: 'queue',
    execute: async function (message, client, args) {
        if (!checkIfVoice(message)) return;

        //TODO change this to markdown with colors

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new Discord.MessageEmbed()
            .addField("Queue", "Empty"));
        if (serverQueue.songs.length === 0) return message.channel.send(new Discord.MessageEmbed()
            .addField("Queue", "Empty"));
        let queue = serverQueue.songs.map(song => `**-** ${song.title}`).join('\n');
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
            .addField("Queue", "Empty"));

        let current = serverQueue.songs[0].title;
        return message.channel.send(new Discord.MessageEmbed()
            .addField("Song queue", queue)
            .addField('Now Playing', current));
    }
};