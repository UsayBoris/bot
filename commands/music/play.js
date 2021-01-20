const {checkPermissions, checkIfVoice} = require('./checkPermissions');
let Youtube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const logger = require("../../logger");
const search = new Youtube(process.env.YOUTUBE_API);
const Discord = require('discord.js');

module.exports = {
    name: 'Play',
    description: 'Plays a given song',
    usage: 'play {song name or url}',
    execute: async function (message, client, args) {
        if (!checkPermissions(message, client) || !checkIfVoice(message)) return;

        if (!args.length) {
            const serverQueue = message.client.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send(new Discord.MessageEmbed().setTitle('No songs to play'));
        }

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
                volume: 2,
                playing: true,
                loop: false,
                timeout: 3,
                timeoutHandler: null
            }

            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                queueConstruct.connection = await channel.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                this.play(message, queueConstruct.songs[0]);
            } catch (err) {
                logger.error(err.message);
                message.client.queue.delete(message.guild.id);
                queueConstruct.connection = null;
                await channel.leave();
                return message.channel.send(err.message);
            }
        } else {
            serverQueue.songs.push(song);
            //if (serverQueue.playing === false) this.play(message, serverQueue.songs[0]);
            return message.channel.send(`✅ **${song.title}** has been added to the queue!`).catch(logger.error);
        }
    },
    play: function (message, song) {
        const queue = message.client.queue;
        const serverQueue = queue.get(message.guild.id);

        //TODO make it so that it doesn't shift, using a index maybe

        clearTimeout(serverQueue.timeoutHandler);

        const stream = ytdl(song.url, {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        });

        const dispatcher = serverQueue.connection
            .play(stream)
            .on('finish', () => {
                let currentSong = serverQueue.songs.shift();
                if (serverQueue.loop) serverQueue.songs.push(currentSong);
                if (!serverQueue.songs[0]) {
                    serverQueue.playing = false;
                    serverQueue.timeoutHandler = setTimeout((song) => {
                        if (!song) {
                            message.channel.send('Connection timed out (Bot was idle with no music paying)');
                            serverQueue.connection.disconnect();
                            message.client.queue.delete(message.guild.id);
                        }
                    }, serverQueue.timeout * 60 * 1000, serverQueue.songs[0]);
                } else
                    this.play(message, serverQueue.songs[0]);
            })
            .on('error', error => logger.error(error.message));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    }
};
