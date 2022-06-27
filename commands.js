const fs = require('fs');
const logger = require('./logger');

/**
 * The existing commands
 * @property {string} commands[command].name - The name of the command
 * @property {string} commands[command].description - The description of the command
 * @property {string} commands[command].usage - The usage of the command
 * @property {function} commands[command].execute - A function to execute the command
 */
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

/**
 * Function that executes the pecified command.
 * 
 * @param {Object} message - Contains the command
 * @param {class} client - The discord client
 * @param {string} prefix - The current server prefix
 */
async function commandHandler(message, client, prefix) {
    /**
     * The contents of the command splited by spaces
     * @type {Array <string>}
     */
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //splits message content by space

    // TODO fix the space after the prefix working, don't know why, but it does

    console.log(message.content, args);

    const command = args.shift().toLowerCase();                                   //finds the first value (group or default)

    if (Object.keys(commands).includes(command)) {
        try {
            await commands[command].execute(message, client, args, commands);
        } catch (e) {
            logger.error(e.message);
            message.reply(e.message);
        }
    } //else message.reply(`"${command}" is not a valid command!`);
}

module.exports = {commandHandler, commands};