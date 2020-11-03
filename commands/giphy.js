const GhpApiClient = require('giphy-js-sdk-core')
const token = require('../config.json')['giphy']
const Discord = require("discord.js");

module.exports = {
    name: 'giphy',
    execute: async function (message, client, args) {
        const giphy = GhpApiClient(process.env.GIPHY_API);
        let query = args.slice(0).join(' ');

        if (query === '') {
            message.reply('you need to provide a valid search query');
            return;
        }

        giphy.search("gifs", { q: query })
            .then(response => {
                let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
                message.reply({ files: [responseFinal.images.fixed_height.url] })
            })
    },
    help: async function (message, prefix) {
        const _name = 'Giphy Search';
        const _description = 'Finds a random gif';
        const _usage = `${prefix}giphy {search query}`;

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};