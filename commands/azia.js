const {User} = require('../models/user');

module.exports = {
    name: 'Azia',
    description: 'Azia alguém',
    usage: 'azia {user tag}',
    execute: async function (message, client, args) {
        let member = message.mentions.members.first();
        if (member === undefined) member = message.author;
        else member = member.user;

        let user = await User.findOne({id: member.id})
        if (user === null) {
            return message.reply("This user hasn't talked in this server yet.");
        }
        user.azia += 1;
        user.save();
        return message.channel.send(`O <@${(member.id).toString()}> já aziou ${user.azia} vezes.`);
    }
};