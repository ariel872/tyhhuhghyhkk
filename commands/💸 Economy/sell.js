const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "sell",
  category: "💸 Economy",
  aliases: ["ecosell"],
  description: "Allows you to sell an item with 10% Zins.",
  usage: "sell [Item]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user = message.author;
      
    if(user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
      
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, user.id)
    //get the economy data 
    var data = client.economy.get(`${message.guild.id}-${user.id}`)
    var items = 0;
    var itemsvalue = 0;
    var theitems = [];
    for (const itemarray in data.items){
      items += data.items[`${itemarray}`];
      var prize = 0;
      switch(itemarray.toLowerCase()){
        case "yacht": prize = 75000; break;
        case "lamborghini": prize = 50000; break;
        case "car": prize = 6400; break;
        case "motorbike": prize = 1500; break;
        case "bicycle": prize = 500; break;
    
        case "nike": prize = 300; break;
        case "tshirt": prize = 60; break;
    
        case "mansion": prize = 45000; break;
        case "house": prize = 8000; break;
        case "dirthut": prize = 150; break;
    
        case "pensil": prize = 20; break;
        case "pen": prize = 10; break;
        case "condom": prize = 30; break;
        case "bottle": prize = 50; break;
    
        case "fish": prize = 1000; break;
        case "hamster": prize = 1500; break;
        case "dog": prize = 2000; break;
        case "cat": prize = 2000; break;
      }
      itemsvalue += Number(prize) * Number(data.items[`${itemarray}`]);
    }
    for (const itemarray in data.items){
      if(data.items[`${itemarray}`] == 0) continue
      switch(itemarray.toLowerCase()){
        case "yacht": theitems.push(`🛥️ ${data.items[`${itemarray}`]} Yacht${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(75000*data.items[`${itemarray}`])} 💸\``); break;
        case "lamborghini": theitems.push(`🏎️ ${data.items[`${itemarray}`]} Lamborghini${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(50000*data.items[`${itemarray}`])} 💸\``); break;
        case "car": theitems.push(`🚗 ${data.items[`${itemarray}`]} Car${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(6400*data.items[`${itemarray}`])} 💸\``); break;
        case "motorbike": theitems.push(`🏍️ ${data.items[`${itemarray}`]} Motorbike${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(1500*data.items[`${itemarray}`])} 💸\``); break;
        case "bicycle": theitems.push(`🚲 ${data.items[`${itemarray}`]} Bicycle${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(500*data.items[`${itemarray}`])} 💸\``); break;
    
        case "nike": theitems.push(`👟 ${data.items[`${itemarray}`]} Nike${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(300*data.items[`${itemarray}`])} 💸\``); break;
        case "tshirt": theitems.push(`👕 ${data.items[`${itemarray}`]} T-Shirt${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(60*data.items[`${itemarray}`])} 💸\``); break;
    
        case "mansion": theitems.push(`🏘️ ${data.items[`${itemarray}`]} Mansion${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(45000*data.items[`${itemarray}`])} 💸\``); break;
        case "house": theitems.push(`🏠 ${data.items[`${itemarray}`]} House${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(8000*data.items[`${itemarray}`])} 💸\``); break;
        case "dirthut": theitems.push(`🟫 ${data.items[`${itemarray}`]} Dirthut${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(150*data.items[`${itemarray}`])} 💸\``); break;
    
        case "pensil": theitems.push(`✏️ ${data.items[`${itemarray}`]} Pensil${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(20*data.items[`${itemarray}`])} 💸\``); break;
        case "pen": theitems.push(`🖊️ ${data.items[`${itemarray}`]} Pen${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(10*data.items[`${itemarray}`])} 💸\``); break;
        case "condom": theitems.push(`🟪 ${data.items[`${itemarray}`]} Condom${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(30*data.items[`${itemarray}`])} 💸\``); break;
        case "bottle": theitems.push(`🍼 ${data.items[`${itemarray}`]} Bottle${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(50*data.items[`${itemarray}`])} 💸\``); break;
    
        case "fish": theitems.push(`🐟 ${data.items[`${itemarray}`]} Fish${data.items[`${itemarray}`] > 1 ? "es":""} | \`${nFormatter(1000*data.items[`${itemarray}`])} 💸\``); break;
        case "hamster": theitems.push(`🐹 ${data.items[`${itemarray}`]} Hamster${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(1500*data.items[`${itemarray}`])} 💸\``); break;
        case "dog": theitems.push(`🐕 ${data.items[`${itemarray}`]} Dog${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(2000*data.items[`${itemarray}`])} 💸\``); break;
        case "cat": theitems.push(`😺 ${data.items[`${itemarray}`]} Cat${data.items[`${itemarray}`] > 1 ? "s":""} | \`${nFormatter(2000*data.items[`${itemarray}`])} 💸\``); break;
      }
    }
    //return some message!
    if (!args[0])
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`🧸 **${user == message.author ? "You": user.username}** ${user == message.author ? "have": "has"} \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸\`, those can you sell:`)
        .setDescription(`${theitems.length != 0 ? ">>> "+theitems.join("\n\n") : `${nFormatter(Math.floor(data.balance))} 💸\` in ${user == message.author ? "You ": "He/She"} ${user == message.author ? "have": "has"} no Items yet!`}`)
        .addField("To sell items:", `\`${prefix}sell Pen 2\``)
      );

    let amountofbuy = Number(args[1]) || 1;
      if (amountofbuy == 0)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> You cannot sell 0 Items`)
          .setDescription(`Usage: \`${prefix}sell <Item> <Amount>\`\n\n\Example: \`${prefix}sell Pen 2\``)
        );
      
      var prize = 0;
      switch (args[0].toLowerCase()) {
        case "yacht": prize = 75000; break;
        case "lamborghini": prize = 50000; break;
        case "car": prize = 6400; break;
        case "motorbike": prize = 1500; break;
        case "bicycle": prize = 500; break;

        case "nike": prize = 300; break;
        case "tshirt": prize = 60; break;

        case "mansion": prize = 45000; break;
        case "house": prize = 8000; break;
        case "dirthut": prize = 150; break;

        case "pensil": prize = 20; break;
        case "pen": prize = 10; break;
        case "condom": prize = 30; break;
        case "bottle": prize = 50; break;

        case "fish": prize = 1000; break;
        case "hamster": prize = 1500; break;
        case "dog": prize = 2000; break;
        case "cat": prize = 2000; break;
        default: prize = false; break;
      }

      if (!prize)
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`🧸 **${user == message.author ? "You": user.username}** ${user == message.author ? "have": "has"} \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸\`, those can you sell:`)
          .setDescription(`${theitems.length != 0 ? ">>> "+theitems.join("\n\n") : `${nFormatter(Math.floor(data.balance))} 💸\` in ${user == message.author ? "You ": "He/She"} ${user == message.author ? "have": "has"} no Items yet!`}`)
          .addField("To sell items:", `\`${prefix}sell Pen 2\``)
        );
      if(data.items[`${args[0].toLowerCase()}`] == 0)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> You cannot sell an Item which you don't have`)
          .setDescription(`Buy it with: \`${prefix}buy <Item> <Amount>\`\n\n\Example: \`${prefix}buy ${args[0].toLowerCase()} 1\``)
        );
      if (amountofbuy > data.items[`${args[0].toLowerCase()}`])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> You cannot sell More ${args[0]} then you have (\`${ data.items[`${args[0].toLowerCase()}`]}\`)`)
          .setDescription(`Usage: \`${prefix}sell <Item> <Amount>\`\n\n\Example: \`${prefix}sell ${args[0].toLowerCase()} ${data.items[`${args[0].toLowerCase()}`]}\``)
        );

      var endprize = (prize * amountofbuy) * 0.9;
      
      client.economy.math(`${message.guild.id}-${user.id}`, "-", amountofbuy, `items.${args[0].toLowerCase()}`)
      client.economy.math(`${message.guild.id}-${user.id}`, "+", endprize, `balance`)
      data = client.economy.get(`${message.guild.id}-${user.id}`)

      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`<a:yes:833101995723194437> **Successfully sold ${nFormatter(amountofbuy)} ${args[0]} for \`${nFormatter(endprize)} 💸\`**`)
        .setDescription(`👛 You have (\`${nFormatter(data.balance)} 💸\`) in your Pocket \n\n🧸 **You have \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸\`**\n\n**To see your Items, type:**\n\`${prefix}items\``)
      );
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
