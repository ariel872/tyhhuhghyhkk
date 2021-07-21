const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const canvacord = require("canvacord");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "sepia",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "sepia",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try {
      let tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")
      );
      //find the USER
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        let tmp = await client.users.fetch(args[0])
        if(tmp) user = tmp;
        if(!tmp) return message.reply("<:no:833101993668771842> I failed finding that User...")
      }
      else if(!user && args[0]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
        user = alluser.find(user => user.includes(args[0].toLowerCase()))
        user = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == user).user
        if(!user || user == null || !user.id) return message.reply("<:no:833101993668771842> I failed finding that User...")
      }
      else {
        user = message.mentions.users.first() || message.author;
      }
      let avatar = user.displayAvatarURL({
        dynamic: false,
        format: "png"
      });
      let image = await canvacord.Canvas.sepia(avatar);
      let attachment = await new MessageAttachment(image, "sepia.png");

      message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setImage("attachment://sepia.png")
          .attachFiles(attachment)
        ).catch((e) => console.log(String(e.stack).red))
        .then(msg => tempmsg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray)))
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
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
