const {User} = require('../../models/user');
const Item = require('../../models/item');

module.exports = {
    execute: async function (message, client, args, commands) {
        if (message.author.id !== '90535285909118976') return message.channel.send('you are not a developer');
        switch (args[0]) {
            case 'emojis':
                let emojis = {};
                const emojiList = client.guilds.cache.get('773626087934001192').emojis.cache.map(e => e.toString());
                for (let i = 0; i < emojiList.length; i++) {
                    let emoji = emojiList[i].substring(2).slice(0, -1).split(':')
                    emojis[emoji[0]] = emoji[1];
                }
                await message.channel.send(JSON.stringify(emojis));
                break;
            case 'commands':
                await message.channel.send(Object.keys(commands).toString());
                break;
            case 'add_item':
                await Item.create({name: "Speed Perk", description: "Accelerates the mining process", id: 1, price: 100, emote: '"perk_speed":"842116583676444672"', category: "perk"});
                await Item.create({name: "Luck Perk", description: "Increased the chance of more coins from mining", id: 2, price: 100, emote: '"perk_luck":"842141817990152212"', category: "perk"});
                break;

        }
    },
};