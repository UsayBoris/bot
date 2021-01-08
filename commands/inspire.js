const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'azia',
    execute: async function (message, client, args) {
        https.get('https://zenquotes.io/api/random', resp =>{
            let data = '';
            resp.on('data', chunk => {
                data += chunk;
            });
            resp.on('end', () => {
                data = JSON.parse(data);
                return message.channel.send(data[0].q + ' **' + data[0].a + '**');
            })
        })
    },
    help: async function (message) {
        const _name = 'Inspire';
        const _description = 'If in need of some Inspiration';
        const _usage = "inspire";

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};