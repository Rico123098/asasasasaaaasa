const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "help",

    run(msg) {
        const { channel } = msg
        const botAdmin = "**ban, kick, clear, ogłoszenie, botstatus**"
        const botPraktyczne = "**server, kanalyt, mcserver, userinfo, info**"
        const botName = "Pomoc BarteQ BOT"
        const embed = new MessageEmbed()  
          .setTitle(botName)
          .setColor(0xff0000)
          .addField("<a:discordbetter2:802486096293789706> |Administartorskie:  (5)", botAdmin, false) 

          .addField("<a:discordbetter:802486140644622366> |Praktyczne:  (5)", botPraktyczne, false)

    
        channel.send(embed);
      msg.delete

    }

}
