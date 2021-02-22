const { MessageEmbed, embedABC } = require("discord.js")
const {
    Permissions: { FLAGS },
  } = require("discord.js")
  
  module.exports = {
    name: "ban",
    description: "Ban user.",
    args: true,
    usage: "<user> [days(0-7)] [reason]",
    botPermissions: [FLAGS.BAN_MEMBERS],
    userPermissions: [FLAGS.BAN_MEMBERS],
  
    run(msg, args) {
      const { channel, guild, mentions, author } = msg
  
      let daysArg = +args[1]
  
      // Validate days
      if (!isNaN(daysArg)) {
        if (daysArg < 0) daysArg = 0
        if (daysArg > 7) daysArg = 7
      }
  
      const reasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(" ")
  
      const userToBan = mentions.users.first()
  
      if (!userToBan) {
        const embed = new MessageEmbed()  
            .setAuthor("Wystąpił błąd!")
            .setColor("#FF0000")
            .setDescription("Nie możesz zbanować podanego użytkownika, ponieważ ma on zawysokie uprawnienia lub nie ma go na serwerze!")
            .setFooter("Błąd użytkowanika")
        channel.send(embed);
      }
  
      if (userToBan.id === author.id) {
        const embed = new MessageEmbed()  
            .setAuthor("Wystąpił błąd!")
            .setColor("#FF0000")
            .setDescription("Nie możesz zbanować się!")
            .setFooter("Błąd użytkowanika")
        channel.send(embed);
        return
      }
  
      const memberToBan = guild.members.cache.get(userToBan.id)
  
      if (!memberToBan.bannable) {
        const embed = new MessageEmbed()  
            .setTitle("Nie posiadasz uprawnień do korzystania z tej komendy!")
            .setColor("RED")
            .setDescription("<a:discordbetter2:802486096293789706> • Wymagane uprawnienia: **Banowanie członków**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        channel.send(embed);
        return
      }
  
      // Add ban options
      const banOptions = {
        reason: reasonArg,
      }
  
      // Add number of days of messages to delete
      if (!isNaN(daysArg)) banOptions.days = daysArg
  
      // Ban user
      memberToBan.ban(banOptions).then((bannedUser) => {
        const embed = new MessageEmbed()
          .setColor("#00FF00")
          .addField("Zbanował:", author.username, false)
          .addField('Zbanowany:', bannedUser.displayName, false)
          .addField("Zbanowany za:", reasonArg, false)
          .addField("Zbanowany o:", msg.createdAt, false)
          .setTitle("Banowanie użytkowników!")
        channel.send(embed)

        const embedABC = new MessageEmbed()
          .setTitle("Zostałeś zbanowany!")
          .setColor("RED") 
          .addField("Zostałeś zbanowany przez:", author.username, false)
          .addField("Zostałeś zbanowany za:", reasonArg, false)
          .addField("Zostałeś zbanowany o:", msg.createdAt, false)
          .setTitle("Zostałeś zbanowany z serwera!`")
        memberToBan.send(embedABC).catch(console.error)
      })
    },
  }