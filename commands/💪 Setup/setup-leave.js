var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-leave",
  category: "💪 Setup",
  aliases: ["setupleave"],
  cooldown: 5,
  usage: "setup-leave --> and follow the steps",
  description: "Manage the Leave Message System",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==** Manage the leave Message in a **Channel**\n\n2️⃣ **==** Manage the leave Message for **DM MESSAGES**`)
        .setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "channel"
          else if (reaction.emoji.name === "2️⃣") temptype = "dm"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      if (temptype == "channel") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What do you want to do? | CHANNEL leave")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`
        1️⃣ **==** **Enable** / Set Channel *for this Server*

        2️⃣ **==** **Disable** leave *for this Server*

        3️⃣ **==** Manage **Image** *for the leave Message*

        4️⃣ **==** Set **Message** *for the leave Message*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Enable / Set Channel - CHANNEL
            if (reaction.emoji.name === "1️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("In which Channel shall I send the leave Message?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Please Ping the Channel now!`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();
                  var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                  if (channel) {

                    try {
                      client.settings.set(message.guild.id, channel.id, "leave.channel")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> The new leave Cannel is: \`${channel.name}\``)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-leave  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  } else {
                    throw "you didn't ping a valid channel"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {

              try {
                client.settings.set(reaction.message.guild.id, "nochannel", "leave.channel")
                return reaction.message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Disabled the leave **Message**`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`If Someone joins this Server, no message will be sent into a Channel!\nSet a Channel with: \`${prefix}setup-leave\` --> Pick 1️⃣ --> Pick 1️⃣`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("What do you want to do?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "leave.frame") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "leave.discriminator") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "leave.membercount") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "leave.servername") ? "**Disable**" : "**Enable**"} **Servername Text **
 
                🔟 **==** ${client.settings.get(message.guild.id, "leave.pb") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
                ⬜ **==** **Manage Frame/Text Color**


                *React with the Right Emoji according to the Right action*`)

                .setFooter(es.footertext, es.footericon)
              })
              try {
                tempmsg.react("3️⃣")
                tempmsg.react("6️⃣")
                tempmsg.react("7️⃣")
                tempmsg.react("8️⃣")
                tempmsg.react("9️⃣")
                tempmsg.react("🔟")
                tempmsg.react("⬜")
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              }
              await tempmsg.awaitReactions(filter, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var reaction = collected.first()
                  reaction.users.remove(message.author.id)
                  var url = "";
                  if (reaction.emoji.name === "1️⃣") {

                    try {
                      client.settings.set(message.guild.id, false, "leave.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send no Image with the leave Message`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with__out__ an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send an Image with the leave Message`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle("Please add an Image now")
                      .setDescription("Mind, that the Format is: \`2100 px\` : \`750 px\`")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, "no", "leave.custom")
                            client.settings.set(message.guild.id, url, "leave.background")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Background image`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | Your Attachment is not a valid Image!")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "leave.custom")
                            client.settings.set(message.guild.id, url, "leave.background")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Background image`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | You didn't entered a valid Link!")
                              .setDescription("Please retry the whole process")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.image")
                      client.settings.get(message.guild.id, "transparent", "leave.background")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send an Auto generated Image with an transparent Background, including your Guild Avatar`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle("Please add an Image now")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, url, "leave.custom")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom image`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | Your Attachment is not a valid Image!")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "leave.custom")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Image`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | You didn't entered a valid Link!")
                              .setDescription("Please retry the whole process")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.frame"), "leave.frame")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.frame") ? "Enabled the Frame for the Automated leave Image" : "Disabled the Frame for the Automated leave Image"}`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminator"), "leave.discriminator")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.discriminator") ? "Enabled the Discrimantor (4 Numbers with #) for the Automated leave Image" : "Disabled the Discrimantor (4 Numbers with #) for the Automated leave Image"}`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercount"), "leave.membercount")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.membercount") ? "Enabled the MemberCount Text for the Automated leave Image" : "Disabled the MemberCount Text for the Automated leave Image"}`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servername"), "leave.servername")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.servername") ? "Enabled Servername Text Frame for the Automated leave Image" : "Disabled the Servername Text for the Automated leave Image"}`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pb"), "leave.pb")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.pb") ? "Enabled Profile Picture for the Automated leave Image" : "Disabled Profile Picture for the Automated leave Image"}`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }
                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.channel.send(new Discord.MessageEmbed()
                      .setTitle("What do you want to do?")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`
                *React to the Color you want the Frame/Text to be like ;)*`)

                      .setFooter(es.footertext, es.footericon)
                    )
                    try {
                      tempmsg.react("⬜")
                      tempmsg.react("🟨")
                      tempmsg.react("🟧")
                      tempmsg.react("🟥")
                      tempmsg.react("🟩")
                      tempmsg.react("🟦")
                      tempmsg.react("🟪")
                      tempmsg.react("⬛")
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                    await tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var reaction = collected.first()
                        reaction.users.remove(message.author.id)
                        var color = "#fffff9";
                        if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                        if (reaction.emoji.name === "🟨") color = "#FAFA25";
                        if (reaction.emoji.name === "🟧") color = "#FA9E25";
                        if (reaction.emoji.name === "🟥") color = "#FA2525";
                        if (reaction.emoji.name === "🟩") color = "#25FA6C";
                        if (reaction.emoji.name === "🟦") color = "#3A98F0";
                        if (reaction.emoji.name === "🟪") color = "#8525FA";
                        if (reaction.emoji.name === "⬛") color = "#030303";
                        try {
                          client.settings.set(message.guild.id, color, "leave.framecolor")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(`<a:yes:833101995723194437> CHANGED THE COLOR FOR THE FRAME`)
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                            .setColor(es.wrongcolor)
                            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                            .setFooter(es.footertext, es.footericon)
                          );
                        }

                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("What should be the leave Message?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Note that \`{user}\` will ping the User\n\nEnter your Message now!`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();

                  try {
                    client.settings.set(message.guild.id, message.content, "leave.msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<a:yes:833101995723194437> The new leave Message is:`)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`If Someone joins this Server, this message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL YET"}!\n\n${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                      .setColor(es.wrongcolor)
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invite"), "leave.invite")
                return reaction.message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.invite") ? "Enabled Invite Information" : "Disabled INvite INformation"}`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`If Someone joins this Server, a message with Invite Information will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-leave  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else if (temptype == "dm") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What do you want to do? | CHANNEL leave")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`
        1️⃣ **==** Enable *for this Server (in DM)*

        2️⃣ **==** Disable leave *for this Server (in DM)*

        3️⃣ **==** Manage Image *for the leave Message (in DM)*

        4️⃣ **==** Set Message *for the leave Message (in DM)*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Enable / Set Channel - CHANNEL
            if (reaction.emoji.name === "1️⃣") {
              try {
                client.settings.set(message.guild.id, true, "leave.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now send leave-Messages to a new User in his DMS`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {
              try {
                client.settings.set(message.guild.id, false, "leave.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now send **NO** leave-Messages to a new User in his DMS`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("What do you want to do?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "leave.framedm") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "leave.discriminatordm") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "leave.membercountdm") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "leave.servernamedm") ? "**Disable**" : "**Enable**"} **Servername Text **
                
                🔟 **==** ${client.settings.get(message.guild.id, "leave.pbdm") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
                ⬜ **==** **Manage Frame/Text Color**

                *React with the Right Emoji according to the Right action*`)

                .setFooter(es.footertext, es.footericon)
              })
              try {
                tempmsg.react("6️⃣")
                tempmsg.react("7️⃣")
                tempmsg.react("8️⃣")
                tempmsg.react("9️⃣")
                tempmsg.react("🔟")
                tempmsg.react("⬜")
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              }
              await tempmsg.awaitReactions(filter, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var reaction = collected.first()
                  reaction.users.remove(message.author.id)
                  var url = "";
                  if (reaction.emoji.name === "1️⃣") {

                    try {
                      client.settings.set(message.guild.id, false, "leave.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send no Image with the leave Message (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send an Image with the leave Message (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle("Please add an Image now")
                      .setDescription("Mind, that the Format is: \`2100 px\` : \`750 px\`")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, "no", "leave.customdm")
                            client.settings.set(message.guild.id, url, "leave.backgrounddm")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Background image (dm)`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | Your Attachment is not a valid Image!")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "leave.customdm")
                            client.settings.set(message.guild.id, url, "leave.backgrounddm")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Background image`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | You didn't entered a valid Link!")
                              .setDescription("Please retry the whole process")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.imagedm")
                      client.settings.get(message.guild.id, "transparent", "leave.backgrounddm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> I will now send an Auto generated Image with an transparent Background, including your Guild Avatar (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle("Please add an Image now")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, url, "leave.customdm")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom image (DM)`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | Your Attachment is not a valid Image!")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "leave.customdm")
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<a:yes:833101995723194437> I will now use your Custom Image (DM)`)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.channel.send(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> Error | You didn't entered a valid Link!")
                              .setDescription("Please retry the whole process")
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.framedm"), "leave.framedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.framedm") ? "Enabled the Frame for the Automated leave Image" : "Disabled the Frame for the Automated leave Image"} (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminatordm"), "leave.discriminatordm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.discriminatordm") ? "Enabled the Discrimantor (4 Numbers with #) for the Automated leave Image" : "Disabled the Discrimantor (4 Numbers with #) for the Automated leave Image"} (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercountdm"), "leave.membercountdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.membercountdm") ? "Enabled the MemberCount Text for the Automated leave Image" : "Disabled the MemberCount Textthe Automated leave Image"} (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servernamedm"), "leave.servernamedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.servernamedm") ? "Enabled Servername Text Frame for the Automated leave Image" : "Disabled the Servername Text for the Automated leave Image"} (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pbdm"), "leave.pbdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.pbdm") ? "Enabled Profile Picture for the Automated leave Image" : "Disabled Profile Picture for the Automated leave Image"} (DM)`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.channel.send(new Discord.MessageEmbed()
                      .setTitle("What do you want to do?")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`
                *React to the Color you want the Frame/Text to be like ;)*`)

                      .setFooter(es.footertext, es.footericon)
                    )
                    try {
                      tempmsg.react("⬜")
                      tempmsg.react("🟨")
                      tempmsg.react("🟧")
                      tempmsg.react("🟥")
                      tempmsg.react("🟩")
                      tempmsg.react("🟦")
                      tempmsg.react("🟪")
                      tempmsg.react("⬛")
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                    await tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var reaction = collected.first()
                        reaction.users.remove(message.author.id)
                        var color = "#fffff9";
                        if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                        if (reaction.emoji.name === "🟨") color = "#FAFA25";
                        if (reaction.emoji.name === "🟧") color = "#FA9E25";
                        if (reaction.emoji.name === "🟥") color = "#FA2525";
                        if (reaction.emoji.name === "🟩") color = "#25FA6C";
                        if (reaction.emoji.name === "🟦") color = "#3A98F0";
                        if (reaction.emoji.name === "🟪") color = "#8525FA";
                        if (reaction.emoji.name === "⬛") color = "#030303";
                        try {
                          client.settings.set(message.guild.id, color, "leave.framecolordm")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(`<a:yes:833101995723194437> CHANGED THE COLOR FOR THE FRAME (DM)`)
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                            .setColor(es.wrongcolor)
                            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                            .setFooter(es.footertext, es.footericon)
                          );
                        }

                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("What should be the leave Message? (DM")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Note that \`{user}\` will ping the User\n\nEnter your Message now!`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();

                  try {
                    client.settings.set(message.guild.id, message.content, "leave.dm_msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<a:yes:833101995723194437> The new leave Message is: (DM)`)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                      .setColor(es.wrongcolor)
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invitedm"), "leave.invite")
                return reaction.message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "leave.invitedm") ? "Enabled Invite Information" : "Disabled INvite INformation"}`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else if (temptype == "roles") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What do you want to do? | CHANNEL leave")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`
        1️⃣ **==** **Add** Role

        2️⃣ **==** **Remove** Role

        3️⃣ **==** **Show** Roles


        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Add Role
            if (reaction.emoji.name === "1️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("Which Role do you wanna add?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Please Ping the Role now!`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();
                  var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                  if (role) {
                    var leaveroles = client.settings.get(message.guild.id, "leave.roles")
                    if (leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<:no:833101993668771842> ERROR | The role: \`${role.name}\` is already registered as an leave Role`)
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.push(message.guild.id, role.id, "leave.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<a:yes:833101995723194437> The role: \`${role.name}\` is now registered as an leave Role`)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } else {
                    throw "you didn't ping a valid Role"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Remove Role
            else if (reaction.emoji.name === "2️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("Which Role do you wanna remove?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Please Ping the Role now!`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();
                  var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                  if (role) {
                    var leaveroles = client.settings.get(message.guild.id, "leave.roles")
                    if (!leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<:no:833101993668771842> ERROR | The role: \`${role.name}\` is not registered as an leave Role yet`)
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.remove(message.guild.id, role.id, "leave.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<a:yes:833101995723194437> Remove the role: \`${role.name}\` from the leave Roles`)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } else {
                    throw "you didn't ping a valid Role"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Show Roles
            else if (reaction.emoji.name === "3️⃣") {
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`Everyone who joins will get those Roles now:`)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                .setFooter(es.footertext, es.footericon)
              );
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | PLEASE CONTACT `Tomato#6966`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
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
