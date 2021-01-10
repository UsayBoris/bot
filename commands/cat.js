const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'cat',
    execute: async function (message, client, args) {
        fetch('https://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => message.channel.send(json.file));
    },
    help: async function (message) {
        const _name = 'Cat';
        const _description = 'Random Cat Picture';
        const _usage = `cat`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};