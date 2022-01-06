const Discord = require("discord.js");
const {User} = require("../../models/user");
const Item = require("../../models/item");

module.exports = {
    name: 'Upgrade',
    description: 'Upgrades a perk to the next tier',
    usage: 'upgrade <item name>',
    execute: async function (message, client, args) {

        let materialID = [201, 202, 203, 204, 205];

        // check if the user has an item with that name in inventory and quantity bellow max level (6)
        // check what is the quantity (tier) and calculate the value to upgrade
        // reaction message to upgrade
        // check the tier of upgrade items needed for it and if it has them in inventory
        // calculate success percentage on upgrade
        // on success update the user with the new item quantity and remove crafting component
        // on fail, keep quantity but remove the crafting component

        if (args.length === 0) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0x8802A4)
                .setTitle('Upgrade')
                .setDescription(`You need to insert the name of the perk you wish to upgrade!`)]
        });

        const perkName = args.join(' ');
        let perks = await User.getPerks(message.author.id);
        let upgradablePerk = perks.find(o => o.name === perkName);

        if (!upgradablePerk) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0x8802A4)
                .setTitle('Upgrade')
                .setDescription(`You don't have this perk!`)]
        });

        if (upgradablePerk.quantity >= 6) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0x8802A4)
                .setTitle('Upgrade')
                .setDescription(`This perk is already max level!`)]
        });

        let material = await User.checkInventory(message.author.id, materialID[(upgradablePerk.quantity - 1)])
        let reqMaterial = await Item.findById(materialID[(upgradablePerk.quantity - 1)]);

        if (!material) {
            return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setColor(0x8802A4)
                    .setTitle('Upgrade')
                    .setDescription("You don't have the required material to upgrade this Perk\n You need 1 <" + reqMaterial.emote + "> **" + reqMaterial.name + "**.")]
            });
        }

        let successRate = 40 - (upgradablePerk.quantity * 5);

        let perk = await Item.findById(upgradablePerk.id);

        const filter = (reaction, user) => {
            return ['✔', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(0x8802A4)
                .setTitle('Upgrade')
                .setDescription("You are attempting to upgrade <" + perk.emote + "> **" + perk.name + "** to **Tier " + (upgradablePerk.quantity + 1) + "**.\n It will consume **1** <" + reqMaterial.emote + "> **" + material.name + "** and it has a **" + successRate + "%** success rate.\n Continue?")]
        })
            .then(async upgrade_message => {
                await upgrade_message.react('✔');
                await upgrade_message.react('❌');

                upgrade_message.awaitReactions({filter, max: 1, time: 30000, errors: ['time']})
                    .then(async collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '✔') {
                            // the upgrade success depends on the item quantity, it needs to be calculated previously
                            // if success, update perk quantity, remove the crafting item
                            // if not success, do nothing to perk, remove the crafting item (seems legit)
                            User.findOne({id: message.author.id}).then(async user => {
                                let upgradeRoll = Math.floor(Math.random() * 100);
                                // delete or reduce the quantity of the material by one
                                material = user.inventory.find(x => x.name === material.name);
                                if (material.quantity === 1) {
                                    let index = user.inventory.indexOf(material);
                                    user.inventory.splice(index, 1);
                                } else {
                                    let index = user.inventory.indexOf(material);
                                    user.inventory[index] = {
                                        name: material.name,
                                        id: material.id,
                                        quantity: material.quantity - 1
                                    };
                                }
                                if (upgradeRoll <= successRate) {
                                    // if the roll is lower than the rate, the upgrade is successful
                                    upgradablePerk = user.inventory.find(x => x.name === upgradablePerk.name);
                                    let index = user.inventory.indexOf(upgradablePerk);
                                    user.inventory[index] = {
                                        name: upgradablePerk.name,
                                        id: upgradablePerk.id,
                                        quantity: upgradablePerk.quantity + 1
                                    };
                                    await upgrade_message.edit({
                                        embeds: [new Discord.MessageEmbed()
                                            .setColor(0x8802A4)
                                            .setTitle('Upgrade')
                                            .setDescription("You successfully upgraded <" + perk.emote + "> **" + perk.name + "** to **Tier " + (upgradablePerk.quantity + 1).toString() + "**.")]
                                    });
                                } else {
                                    await upgrade_message.edit({
                                        embeds: [new Discord.MessageEmbed()
                                            .setColor(0x8802A4)
                                            .setTitle('Upgrade')
                                            .setDescription("You failed to upgrade <" + perk.emote + "> **" + perk.name + "** to **Tier " + (upgradablePerk.quantity + 1).toString() + "**.\n Better luck next time!")]
                                    });
                                }
                                user.save();
                            });
                        } else {
                            await upgrade_message.edit({
                                embeds: [new Discord.MessageEmbed()
                                    .setColor(0x8802A4)
                                    .setTitle('Upgrade')
                                    .setDescription(`You declined the upgrade.`)]
                            });
                        }
                        return upgrade_message.reactions.removeAll();
                    })
                    .catch(async err => {
                        await upgrade_message.edit({
                            embeds: [new Discord.MessageEmbed()
                                .setColor(0x8802A4)
                                .setTitle('Upgrade')
                                .setDescription(`Upgrade time has expired.`)]
                        });
                        return upgrade_message.reactions.removeAll();
                    });
            });
    }
}