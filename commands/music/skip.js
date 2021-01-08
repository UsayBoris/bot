module.exports = {
    name: 'skip',
    execute: async function (message, client, args) {
        const { channel } = message.member.voice;
        if (!channel) return message.reply('you need to be in a voice chat to do that');
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("I'm not playing anything");
        serverQueue.connection.dispatcher.end();
    },

    help: async function (message) {

    }
};