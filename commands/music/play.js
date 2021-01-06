const {checkPermissions, checkIfVoice} = require('./checkPermissions');
let Youtube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const logger = require("../../logger");
const search = new Youtube(process.env.YOUTUBE_API);

module.exports = {
    name: 'play',
    execute: async function (message, client, args) {
        if (!checkPermissions(message, client) || !checkIfVoice(message)) return;

        let channel = message.member.voice.channel;

        const songInfo = await search.searchVideos(args.join(' '));
        if (songInfo === null) return message.reply('song not found');

        let song = {
            id: songInfo.id,
            title: songInfo.title,
            url: songInfo.url
        };

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: message.member.voice.channel,
                connection: null,
                songs: [],
                volume: 1,
                playing: true,
                loop: false,
                timeout: 3
            }

            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                queueConstruct.connection = await channel.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                await this.play(message, queueConstruct.songs[0]);
            } catch (err) {
                logger.error(err.message);
                message.client.queue.delete(message.guild.id);
                queueConstruct.connection = null;
                await channel.leave();
                return message.channel.send(err.message);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`✅ **${song.title}** has been added to the queue!`).catch(logger.error);
        }
    },
    help: async function (message, prefix) {

    },
    play: function (message, song) {
        const queue = message.client.queue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);

        let timeout = null;

        if (!song) {
            timeout = setTimeout((song) => {
                if (!song){
                    serverQueue.dispatcher.emit('end');
                }
            }, 3 * 60 * 1000, song);
        }

        clearTimeout(timeout);

        const stream = ytdl(song.url, {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        });

        const dispatcher = serverQueue.connection
            .play(stream)
            .on('finish', () => {
                let currentSong = serverQueue.songs.shift();
                if (serverQueue.loop) serverQueue.songs.push(currentSong);
                this.play(message, serverQueue.songs[0]);
            })
            .on('end', () => {

            })
            .on('error', error => logger.error(error.message))
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    }
};
