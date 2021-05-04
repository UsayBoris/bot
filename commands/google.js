const google = require('google');
const Discord = require("discord.js");

module.exports = {
    name: 'Google',
    description: 'Google something' ,
    usage: 'google {search}',
    execute: async function (message, client, args) {
        google.resultsPerPage = 5;
        google(args.join(' '), function (err, res){
            if(err){
                return message.channel.send(err);
            }
            for (let i = 0; i < res.links.length; i++){
                let link = res.links[i];
                if (!link.href){
                    res.next;
                } else {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor(`#ffffff`)
                        .setAuthor(`Result for "${args.join()}"`)
                        .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                        .setTimestamp());
                }
            } return message.react("👌");
        })
    },
};