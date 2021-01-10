module.exports = {
    name: 'Shop',
    description: 'Displays the full or specific shops (with argument displays the specific shop',
    usage: 'shop {optional: specific shop}',
    execute: async function (message, client, args) {
        await message.channel.send("In Progress...");
    }
};