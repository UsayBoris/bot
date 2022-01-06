const GhpApiClient = require('giphy-js-sdk-core')

module.exports = {
    name: 'Giphy',
    description: 'Finds a random gif',
    usage: 'giphy <search query>',
    execute: async function (message, client, args) {
        if (!args.length) return message.reply('you need to provide a valid search query');
        GhpApiClient(process.env.GIPHY_API).search("gifs", {q: args.slice(0).join(' ')})
            .then(response => {
                let responseFinal = response.data[Math.floor(Math.random() * 10 + 1) % response.data.length];
                message.reply({files: [responseFinal.images.fixed_height.url]})
            });
    },
};