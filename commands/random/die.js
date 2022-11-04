module.exports = {
    name: 'Die',
    description: 'You die',
    usage: 'die',
    execute: async function (message, client, args) {
        return message.channel.send('https://imgur.com/a/UJFdQCm');
    }
};