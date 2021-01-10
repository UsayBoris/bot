module.exports = {
    name: 'Ping',
    description: 'Returns the Latency from the server and API',
    usage: 'ping',
    execute: async function (message, client, args) {
        //TODO create embed and forget about the edit thing
        const m = await message.channel.send("Ping?");
        await m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    },
};