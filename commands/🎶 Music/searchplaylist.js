const Discord = require(`discord.js`)
const {
    MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`)
const {
    createBar,
    format
} = require(`../../handlers/functions`);
module.exports = {
    name: `searchplaylist`,
    category: `🎶 Music`,
    aliases: [`searchpl`],
    description: `Searches a playlist from youtube`,
    usage: `searchplaylist <Name / URL>`,
    cooldown: 10,
    parameters: {"type":"music", "activeplayer": false, "previoussong": false},
    run: async (client, message, args, cmduser, text, prefix, player) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
      try{
            //search the song for YOUTUBE
            //playermanager(client, message, args, `searchplaylist:youtube`);
            message.channel.send(`THIS CMD IS NOT FINISHED YET!`)
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(`<:no:833101993668771842> An error occurred`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            );
        }
    }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
