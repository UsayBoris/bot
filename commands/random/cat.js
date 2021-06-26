const fetch = require('node-fetch')

module.exports = {
    name: 'Cat',
    description: 'Random Cat Picture',
    usage: 'cat',
    execute: async function (message, client, args) {
        fetch('https://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => message.channel.send(json.file));
    }
};