require('dotenv').config();
const ElBoris = require("./struct/Client");
const client = new ElBoris();
const {commandHandler} = require("./commands");
const {newMessageUser} = require('./models/user');
const Guild = require('./models/guild');
const logger = require('./logger');

/**
 * Bot startup
 * 
 * @event Client#ready
 * @description Displays a startup message as the bot is booted and sets the activities and status.
 */
client.on('ready', async () => {
    logger.info(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)
    await client.user.setPresence({
        activities: [{
            name: '+help',
            type: 'LISTENING'
        }],
        status: 'online'
    });
});

/**
 * Add bot to a new server
 * 
 * @event Client#guildCreate
 * @description Logs a "new server joined" type message and saves the server name and id in a database.
 */
client.on('guildCreate', async guild => {
    logger.info(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    await Guild.create({name: guild.name, id: guild.id});
});

/**
 * Remove the bot from a server
 * 
 * @event Client#guildDelete
 * @description Logs a message about the bot quiting a server.
 */
client.on("guildDelete", guild => {
    logger.info(`I have been removed from: ${guild.name} (id: ${guild.id})`)
});

/**
 * Interpret a message
 * 
 * @event Client#messageCreate
 * @description Interprets a message from a discord server and its details.
 */
client.on('messageCreate', async message => {
    // If the author is a bot, do nothing
    if (message.author.bot) return;

    // If the client devMode is set to True and the author is not the admin, do nothing
    if (client.devMode && message.author.id !== '90535285909118976') return;

    // if (message.author.id === '398231924151418880' || message.author.id === '755848086823239700') return message.reply('"fdp"');

    // if the message contains @everyone, ping everyone once again.
    if (message.content === '@everyone') {
        return message.reply('@everyone ping ping @everyone');
    }

    await newMessageUser(message);

    /**
     * Prefix
     * 
     * @description Gets the prefix used on the current Server.
     * @type {string}
     */
    const prefix = await Guild.getPrefix(message.guild.id);

    // Check if the prefix is used on the message
    if (!message.content.startsWith(prefix)) return;

    await commandHandler(message, client, prefix);              //very well made command handler :)

    logger.command(`User ${message.author.username} send a command to ${message.channel.name} in ${message.guild.name}`);
});

/**
 * New user joined the server
 * 
 * @event Client#guildMemberAdd
 * @description Sends a welcoming message for a new user.
 */
client.on('guildMemberAdd', async member => {
    logger.info(`New User ${member.user.username} has joined ${member.guild.name}`);
    await member.guild.channels.cache.findOne(c => c.name === "welcome").send(`${member.user.username} has joined this server`);
});

client.on('error', e => logger.error(e));
client.on('warn', e => logger.warn(e));
client.on('debug', e => logger.debug(e));

client.login(process.env.DISCORD_API).then();