require('dotenv').config();
const ElBoris = require("./struct/Client");
const client = new ElBoris();
const {commandHandler} = require("./commands");
const {update_user} = require('./models/user');
const Guild = require('./models/guild');
const logger = require('./logger');
require('@pm2/io').init({
    transactions: true
});

//TODO pretty embed for everything that needs an embed

//Bot startup message
client.on('ready', () => {
    logger.info(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)
    client.user.setPresence({
        activity: {
            name: '+help',
            type: 'LISTENING'
        },
        status: 'online'
    }).then();
});

//When the bot is added to a new server
client.on('guildCreate', async guild => {
    logger.info(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    await Guild.create({name: guild.name, id: guild.id});
});

//When the bot is removed from a server
client.on("guildDelete", guild => {
    logger.info(`I have been removed from: ${guild.name} (id: ${guild.id})`)
});

//Command handler
client.on('message', async message => {
    if (message.author.bot) return;

    await update_user(message);

    const guild = await Guild.findOne({id: message.guild.id});  //the guild should be created when it joins, so no fail check here
    const prefix = guild['prefix'];

    if (!message.content.startsWith(prefix)) return;

    await commandHandler(message, client, prefix);              //very well made command handler :)

    logger.info(`User ${message.author.username} send a command to ${message.channel.name} in ${message.guild.name}`);
});

//new member added
client.on('guildMemberAdd', async member => {
    logger.info(`New User ${member.user.username} has joined ${member.guild.name}`);
    await member.guild.channels.find(c => c.name === "welcome").send(`${member.user.username} has joined this server`);
});

client.on('error', e => logger.error(e));
client.on('warn', e => logger.warn(e));
client.on('debug', e => logger.debug(e));

client.login(process.env.DISCORD_API).then();