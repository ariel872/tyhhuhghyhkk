const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `loopsong`,
  category: `🎶 Music`,
  aliases: [`repeatsong`, `ls`, `rs`, `repeattrack`, `looptrack`, `lt`, `rt`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
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
      //define the Embed
      const embed = new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> ${emoji.msg.repeat_mode} Changed Track loop to: ${player.trackRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      //if there is active queue loop, disable it + add embed information
      if (player.queueRepeat) {
        embed.setDescription(`And **Queue** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setQueueRepeat(false);
      }
      //set track repeat to revers of old track repeat
      player.setTrackRepeat(!player.trackRepeat);
      //send informational message
      return message.channel.send(embed);
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
