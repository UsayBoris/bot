const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    execute: async function (message, client, args) {
        //TODO create embed and forget about the edit thing
        const m = await message.channel.send("Ping?");
        await m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    },
    help: async function (message) {
        const _name = 'Ping';
        const _description = 'Returns the Latency from the server and API';
        const _usage = "ping";

        const embed = new Discord.MessageEmbed()
            .setColor("0xFFFE00")
            .setTitle(`Help Command`)
            .setThumbnail("https://image.flaticon.com/icons/png/512/36/36601.png")
            .addField(_name, `**Description:** ${_description}\n**Usage:** ${_usage}`);

        return message.channel.send(embed);
    }
};