const {User} = require('../../models/user');
const {mining_cooldown} = require("../../config.json");
const aziaRecently = new Set();

module.exports = {
    name: 'Azia',
    description: 'Azia alguém',
    usage: 'azia {user tag}',
    execute: async function (message, client, args) {
        if (aziaRecently.has(message.author.id))
            return message.reply('é estar calado e parar com o spam');

        let member = message.mentions.members.first();
        if (member === undefined) member = message.author;
        else member = member.user;

        aziaRecently.add(message.author.id);
        setTimeout(() => {
            aziaRecently.delete(message.author.id);
        }, (10 * 60 * 1000));

        await User.findOne({id: member.id}).then(async user => {
            if (user === null) {
                return message.reply("This user hasn't talked in this server yet.");
            }
            user.azia += 1;
            await user.save();
            return message.channel.send(`O <@${(member.id).toString()}> já aziou ${user.azia} vezes.`);
        })

    }
};