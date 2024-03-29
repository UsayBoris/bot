const {Client, Intents} = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super({
            intents: [Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
        });

        // project wise variables
        this.activeDice = new Set();
        this.pokedRecently = new Set();
        this.minedRecently = new Set();
        this.chestRecently = new Set();

        // dev mode global flag
        this.devMode = false;

        // bot configs
        this.config = config;
    }
}