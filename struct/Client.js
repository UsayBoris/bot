const {Client, Intents} = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super({
            disableMentions: 'everyone',
            intents: [Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
        });

        this.queue = new Map();

        this.config = config;
    }
}