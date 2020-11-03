const Discord = require("discord.js");
const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'queue',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        let queue = serverQueue.songs.map(song => `**-** ${song.title}`).join('\n');
        let current = serverQueue.songs[0].title;

        const embed = new Discord.MessageEmbed()
            .addField("Song queue", queue)
            .addField('Now Playing', current);

        return message.channel.send(embed);
    },
    help: async function (message, prefix) {

    }
};