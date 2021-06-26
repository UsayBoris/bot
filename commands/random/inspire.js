const fetch = require('node-fetch')

module.exports = {
    name: 'Inspire',
    description: 'If in need of some Inspiration',
    usage: 'inspire',
    execute: async function (message, client, args) {
        fetch('https://zenquotes.io/api/random')
            .then(res => res.json())
            .then(json => message.channel.send(json[0].q + ' **' + json[0].a + '**'));
    },
};