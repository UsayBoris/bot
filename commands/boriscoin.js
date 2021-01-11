module.exports = {
    name: 'Boris Coin',
    description: 'What is BorisCoin',
    usage: 'boriscoin',
    execute: async function (message, client, args) {
        await message.channel.send("<:boriscoin:798017751842291732>")
    }
};