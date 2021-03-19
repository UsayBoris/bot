module.exports = {
    name: 'Fist Bump',
    description: 'Fist bumps someone',
    usage: 'fistbump',
    execute: async function (message, client, args) {
        return message.channel.send('https://i.imgur.com/oL0XUD8.png');
    }
};