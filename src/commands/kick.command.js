const { MessageEmbed, embedABC } = require("discord.js")
const {
    Permissions: { FLAGS },
  } = require("discord.js")
  
  module.exports = {
    name: "kick",
    description: "Kick user.",
    args: true,
    usage: "<user> [reason]",
    guildOnly: true,
    botPermissions: [FLAGS.KICK_MEMBERS],
    userPermissions: [FLAGS.KICK_MEMBERS],
  
    run(msg, args) {

      const { channel, guild, mentions, author } = msg
  
      const reasonArg = [...args].slice(1).join(" ")
  
      const userToKick = mentions.users.first()
  
      if (!userToKick) {
        const embed = new MessageEmbed()  
            .setAuthor("Wystąpił błąd!")
            .setColor("#FF0000")
            .setDescription("Nie możesz wyrzucić podanego użytkownika, ponieważ ma on zawysokie uprawnienia lub nie ma go na serwerze!")
            .setFooter("Błąd użytkowanika")
        channel.send(embed);
        return
      }
  
      if (userToKick.id === author.id) {
        const embed = new MessageEmbed()  
            .setAuthor("Wystąpił błąd!")
            .setColor("#FF0000")
            .setDescription("Nie możesz wyrzucić sam siebię!")
            .setFooter("Błąd użytkowanika")
        channel.send(embed);
        return
        
        
      }
  
      const memberToKick = guild.members.cache.get(userToKick.id)
  
      if (!memberToKick.kickable) {
        const embed = new MessageEmbed()  
            .setTitle("Nie posiadasz uprawnień do korzystania z tej komendy!")
            .setColor("RED")
            .setDescription("<a:discordbetter2:802486096293789706> • Wymagane uprawnienia: **Wyrzucanie członków**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        channel.send(embed);
        return

      }
  
      memberToKick.kick(reasonArg).then((res) => {
        const embed = new MessageEmbed()
          .setColor("#00FF00")
          .addField("Wyrzucił:", author.username, false)
          .addField('Wyrzucony:', res.displayName, false)
          .addField("Wyrzucony za:", reasonArg, false)
          .addField("Wyrzucony o:", msg.createdAt, false)
          .setTitle("Wyrzucnie użytkowników!")
        channel.send(embed)

        const embedABC = new MessageEmbed()
          .setTitle("Zostałeś wyrzucony!")
          .setColor("RED") 
          .addField("Zostałeś wyrzucony przez:", author.username, false)
          .addField("Zostałeś wyrzucony za:", reasonArg, false)
          .addField("Zostałeś wyrzucony o:", msg.createdAt, false)
          .setTitle("Zostałeś wyrzucony z serwera!")
        memberToKick.send(embedABC).catch(console.error)


      })
      
    },
  }