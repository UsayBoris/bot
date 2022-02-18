const Discord = require("discord.js");

module.exports = {
    name: 'Vote Kick',
    description: 'Asks for a vote to kick a member in a voice chat',
    usage: 'votekick <tag>',
    execute: async function (message, client, args) {
        // TODO replace with embed

        let member_tag = message.mentions.members.first();
        if (!member_tag)
            return message.reply("please mention a valid member of this server");

        // Find the voice channel the user is on
        let channel = message.member.voice.channel;
        if (!channel) return console.log('user not in voice');

        let members = channel.members;

        // static, at least *two* members need to vote to kick beside the one that calls the vote
        let members_id = [];
        members.forEach(member => {
            members_id.push(member.id);
        });

        if (members_id.includes(member_tag.id)){
            // the member is in the voice channel
            // create embed message and wait for reactions (from the ids that are on the channel)



            // await member_tag.voice.disconnect();
        }

    },
};