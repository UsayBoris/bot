const Item = require('../../models/item');
const {User} = require('../../models/user');

module.exports = {
    name: 'Buy',
    description: 'Buys a specific item from the shop',
    usage: 'buy {item name or id}',
    execute: async function (message, client, args) {

        return;

        const itemString = args.join(' ');
        let item = await Item.findOne({name: itemString});
        if (!item) return console.log('Not a valid Item');

        User.findOne({id: message.author.id}).then(async user => {
            console.log(item.category);

            if (item.category === 'perk') {
                user.perks.push({
                    name: item.name,
                    id: item.id,
                    quantity: 1
                })
            }

            user.save();
        });
    }
};