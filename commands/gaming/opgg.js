const {get_profile_stats} = require("./../../struct/Scrapper");
const Discord = require('discord.js');

module.exports = {
    name: 'OP.GG',
    description: 'Checks the current ranked stats for the player',
    usage: 'opgg <ingame username>',
    execute: async function (message, client, args) {

        let Discord_message = new Discord.MessageEmbed()
            .setColor(0xfaa5a8)
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(`Retrieving OP.GG Stats for ${args.join(' ')}`)

        let sent_message = await message.channel.send({
            embeds: [Discord_message]
        });


        get_profile_stats(args.join(' ')).then((stats) => {
            if (stats.summoner === null) return sent_message.edit({
                embeds: [Discord_message.setTitle(`This user does not exist in OP.GG.`)]
            });

            Discord_message.setTitle(`OP.GG for ${stats.summoner}`);

            if (stats.ranked_solo !== null) {
                Discord_message.addField(`Solo Rank: ${stats.ranked_solo} - ${stats.solo_lp} LP`, `${stats.solo_wins}W/${stats.solo_losses}L - ${stats.solo_win_rate}%WR`);
            }
            if (stats.ranked_flex !== null) {
                Discord_message.addField(`Flex Rank: ${stats.ranked_flex} - ${stats.flex_lp} LP`, `${stats.flex_wins}W/${stats.flex_losses}L - ${stats.flex_win_rate}%WR`);
            }

            Discord_message.addField('Most Played Champions', stats.most_played_champions.join(' '));

            sent_message.edit({
                embeds: [Discord_message]
            });
        })
    }
}