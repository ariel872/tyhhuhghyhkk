const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `bassboost`,
  category: `👀 Filter`,
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `bassboost <none/low/medium/high>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    ee = client.settings.get(message.guild.id, "embed")
    try {
      let level = `none`;
      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<:no:833101993668771842> Bass boost level must be one of the following: \`none\`, \`low\`, \`medium\`, \`high\`, \`earrape\``)
          .setDescription(`Usage: \`${prefix}bassboost <Level>\`\n\nExample: \`${prefix}bassboost low\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `none`:
          player.setEQ(client.bassboost.none);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
            timescale: {
                  "speed": 1.0,
                  "pitch": 1.0,
                  "rate": 1.0
              },
          });
          break;
        case `low`:
          player.setEQ(client.bassboost.low);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
        case `medium`:
          player.setEQ(client.bassboost.medium);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
        case `high`:
          player.setEQ(client.bassboost.high);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
        case `earrape`:
          player.setEQ(client.bassboost.high);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:yes:833101995723194437> Bassboost set the to \`${level}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
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
