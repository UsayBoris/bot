const fs = require('fs');
const logger = require('./logger');

const commands = {};
const defaultCommands = fs.readdirSync('./commands')
for (const outer of defaultCommands) {
    if (outer.endsWith('.js')) {
        const command = outer.split('.').slice(0, -1).join('.');
        commands[command] = require(`./commands/${outer}`);
    } else {
        const groupCommands = fs.readdirSync(`./commands/${outer}`);
        for (const inner of groupCommands) {
            commands[inner.split('.').slice(0, -1).join('.')] = require(`./commands/${outer}/${inner}`);
        }
    }
}
logger.info(`Loaded ${Object.keys(commands).length} Commands`);


async function commandHandler(message, client, prefix) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //splits message content by space
    const command = args.shift().toLowerCase();                                   //finds the first value (group or default)

    //TODO need to change this (it is working?)
    //TODO help command needs to be different
    if (Object.keys(commands).includes(command)) {
        try {
            await commands[command].execute(message, client, args);
        } catch (e) {
            logger.error(e.message);
            message.reply(e.message);
        }
    } else if (command === 'help'){
        await commands[args[0]].help(message);
    }
    else message.reply(`"${command}" is not a valid command!`);
}

module.exports = {commandHandler, commands};