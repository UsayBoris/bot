const {Client} = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super({
            disableMentions: 'everyone'
        });

        this.queue = new Map();

        this.config = config;
    }
}