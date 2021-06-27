const {User} = require('../../models/user');
const Discord = require('discord.js');

module.exports = {
    name: 'Private',
    description: 'Switch Private Mentions',
    usage: 'private on/off',
    execute: async function (message, client, args) {
        await User.findOne({id: message.author.id}).then(async user => {
            if (args[0] === 'on') {
                user.private = false;
                await message.author.send(new Discord.MessageEmbed()
                    .setColor("0xACA19D")
                    .setTitle('You turned private messages on'));
            }
            if (args[0] === 'off') {
                user.private = true;
                await message.author.send(new Discord.MessageEmbed()
                    .setColor("0xACA19D")
                    .setTitle('You turned private messages off'));
            } else {
                await message.author.send(new Discord.MessageEmbed()
                    .setColor("0xACA19D")
                    .setTitle('Not a valid option'));
            }
            await user.save();
        });
    }
};