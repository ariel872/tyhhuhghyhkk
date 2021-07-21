const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  autoplay
} = require(`../../handlers/functions`);
module.exports = {
  name: `voteskip`,
  category: `🎶 Music`,
  aliases: [`skip`, `vs`, `s`],
  description: `Skips the track, but if there is a DJ Setup u will have to vote first!`,
  usage: `voteskip`,
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
      //Check if there is a Dj Setup
      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {

        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;
        voteamount = Math.ceil(channelmembersize / 3);

        if (!player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, true);
          player.set(`votes`, String(Number(player.get(`votes`)) + 1));
          if (voteamount <= Number(player.get(`votes`))) {
            message.channel.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<a:yes:833101995723194437> Added your Vote!`)
              .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes\n\n> Amount reached! Skipping ⏭`)
            );
            if (player.queue.size == 0) {
              player.destroy();
            } else {
              player.stop();
            }
          } else {
            return message.channel.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<a:yes:833101995723194437> Added your Vote!`)
              .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
            );
          }
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> You have already Voted!!`)
            .setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else {
        //if ther is nothing more to skip then stop music and leave the Channel
        if (player.queue.size == 0) {
          //if its on autoplay mode, then do autoplay before leaving...
          if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
          //stop playing
          player.destroy();
          //send success message
          return message.channel.send(new MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> ${emoji.msg.stop} Stopped and left your Channel`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        }
        //skip the track
        player.stop();
        //send success message
        return message.channel.send(new MessageEmbed()
          .setTitle(`<a:yes:833101995723194437> ${emoji.msg.skip_track} Skipped to the next Song`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        );
      }
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
