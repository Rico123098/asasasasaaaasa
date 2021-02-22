const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    description: "info",

    run(msg) {
        const { channel } = msg
        const botAuthor = "{ ... }#8122(746769944024318084) "
        const botVersion = "1.0.0"
        const botName = "BarteQ BOT"
        const botDescription = "¯\_(ツ)_/¯"
      
        const embed = new MessageEmbed() 
          .setTitle(botName)
          .setColor(0xff0000)
          .setDescription(botDescription)
          .addField("Bota stworzył", botAuthor, true)
          .addField("Wersja", botVersion, true)
    
        channel.send(embed);
      msg.delete

    }

}