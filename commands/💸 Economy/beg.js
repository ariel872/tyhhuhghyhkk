const { MessageEmbed } = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "beg",
  category: "💸 Economy",
  description: "earn your beg cash",
  usage: "beg",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!client.settings.get(message.guild.id, "ECONOMY")) {
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:Deny:863000078690811905> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
      //command
      var user = message.author
      if (user.bot) return message.reply("<a:Deny:863000078690811905> **A Discord Bot Can Not Have Economy!**")
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      console.log(data.black_market.boost.multiplier)
      //get the delays
      let timeout = 180000;

      if (data.beg !== 0 && timeout - (Date.now() - data.beg) > 0) {
        let time = duration(timeout - (Date.now() - data.beg));
        return message.reply({
          embed: new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`<a:Deny:863000078690811905> You've already collected your beg reward!`)
            .setDescription(`🕐 **Try again in ${time.map(i => `\`${i}\``).join(", ")}**\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        });
      }
      //YEA
      else {
        let amountarray = [10, 50, 100, 30, 60, 50, 55, 45, 65, 50, 40, 60, 25, 75, 12.5, 87.5];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "beg")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`<a:yes:863000006609076245> You've Collected Your Beg Reward Of \`${amount} 💸\``)
          .setDescription(`👛 You Now Have \`${nFormatter(Math.floor(data.balance))} 💸\` In Your Pocket`)
        );
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:Deny:863000078690811905> An error occurred`)
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
