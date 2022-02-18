require('dotenv').config();
const ElBoris = require("./struct/Client");
const client = new ElBoris();
const {commandHandler} = require("./commands");
const {newMessageUser} = require('./models/user');
const Guild = require('./models/guild');
const logger = require('./logger');

//Bot startup message
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
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.author.id === '398231924151418880' || message.author.id === '755848086823239700') return message.reply('"fdp"');
    if (message.author.id !== '90535285909118976') return; // Bot lock to dev

    if (message.content === '@everyone') {
        return message.reply('@everyone ping ping @everyone');
    }

    await newMessageUser(message);

    const prefix = await Guild.getPrefix(message.guild.id);

    if (!message.content.startsWith(prefix)) return;

    await commandHandler(message, client, prefix);              //very well made command handler :)

    logger.command(`User ${message.author.username} send a command to ${message.channel.name} in ${message.guild.name}`);
});

//new member added
client.on('guildMemberAdd', async member => {
    logger.info(`New User ${member.user.username} has joined ${member.guild.name}`);
    await member.guild.channels.cache.findOne(c => c.name === "welcome").send(`${member.user.username} has joined this server`);
});

client.on('error', e => logger.error(e));
client.on('warn', e => logger.warn(e));
client.on('debug', e => logger.debug(e));

client.login(process.env.DISCORD_API).then();