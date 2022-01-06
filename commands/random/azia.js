const {User} = require('../../models/user');
const aziaRecently = new Set();

module.exports = {
    name: 'Azia',
    description: 'Azia alguém',
    usage: 'azia <optional: user tag>',
    execute: async function (message, client, args) {
        if (aziaRecently.has(message.author.id))
            return message.reply('Command under cooldown.');

        let member = message.mentions.members.first();
        if (member === undefined) member = message.author;
        else member = member.user;

        aziaRecently.add(message.author.id);
        setTimeout(() => {
            aziaRecently.delete(message.author.id);
        }, (60 * 1000));

        User.findOneAndUpdate({id: member.id}, {$inc: {azia: 1}}).then(user => {
            if (user === null) {
                return message.reply("This user hasn't talked in this server yet.");
            }
            return message.channel.send(`O <@${(member.id).toString()}> já aziou ${user.azia + 1} vezes.`);
        });
    }
};