module.exports = {
    name: 'Buy',
    description: 'Buys a specific item from the shop',
    usage: 'buy {item name or id}',
    execute: async function (message, client, args) {
        return message.channel.send('In Progress...');
    }
};