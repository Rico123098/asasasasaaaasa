const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Commando = require('discord.js-commando')

module.exports = {
    name: "userinfo",
    description: "profil",

    run(msg) {
      const { guild, channel } = msg

    const user = msg.mentions.users.first() || msg.member.user
    const member = guild.members.cache.get(user.id)


    const embed = new MessageEmbed()
      .setAuthor(`Informacje o użytkowniku ${user.username}`, user.displayAvatarURL())
      .setColor(`BLUE`)
      .addFields(
        {
          name: 'Discord tag:',
          value: user.tag,
        },
        {
          name: 'Id użytkownika:',
          value: user.id,
        },
        {
          name: 'Nazwa użytkownika:',
          value: user.username,
        },
        {
          name: 'Dołączył/a na serwer:',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'Konto utworzone:',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        
        {
          name: 'Ilość ról:',
          value: member.roles.cache.size - 1,
        }
      )

    channel.send(embed)


    }

}