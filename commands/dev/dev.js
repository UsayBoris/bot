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
            case 'add_item':
                // await Item.create({name: "Speed Perk", description: "Accelerates the mining process", id: 1, price: 100, emote: '"perk_speed":"842116583676444672"', category: "perk"});
                // await Item.create({name: "Luck Perk", description: "Increased the chance of more coins from mining", id: 2, price: 100, emote: '"perk_luck":"842141817990152212"', category: "perk"});
                // await Item.create({name: "Link Shield", description: "The Hylian Shield is found in Turtle Rock in A Link Between Worlds.", id: 101, price: 2000, emote: ':link_shield:798312843438850049', category: "gear"});
                // await Item.create({name: "Sapphire", description: "Tier 1 Gem", id: 201, price: 100, emote: ':gem_1:926220295210164245', category: "crafting"});
                // await Item.create({name: "Aquamarine", description: "Tier 2 Gem", id: 202, price: 200, emote: ':gem_2:926220295516352512', category: "crafting"});
                // await Item.create({name: "Ruby", description: "Tier 3 Gem", id: 203, price: 400, emote: ':gem_3:926220295164014623', category: "crafting"});
                // await Item.create({name: "Emerald", description: "Tier 4 Gem", id: 204, price: 800, emote: ':gem_4:926220295440838756', category: "crafting"});
                // await Item.create({name: "Amethyst", description: "Tier 5 Gem", id: 205, price: 1600, emote: ':gem_5:926220295893835786', category: "crafting"});
                // await Item.create({name: "Dick", description: "Dick", id: 69, price: 999, emote: ':boris_dick:926953596828909568', category: "test"});
                break;
        }
    },
};