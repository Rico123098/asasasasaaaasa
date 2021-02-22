const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server",
    description: "server",

    run(msg) {
        const { channel } = msg

      
        const embed = new MessageEmbed() 
            .setTitle("info o serwerze")
            .addField("Nazwa serwera:", msg.guild.name, true)
            .addField("Właściciel serwera:", msg.guild.owner, true)
            .addField('\u200b', '\u200b')
            .addField("Data stworzenia serwera: ", msg.guild.createdAt, true)
            .addField('\u200b', '\u200b')
            .addField("Data dołączenia przez bota", msg.guild.joinedAt, false)
            .addField('\u200b', '\u200b')
            .addField("Data dołączenia na serwer:", msg.member.joinedAt, false)
            .setColor('#ebe534')
            .setFooter(msg.member.user.tag)
            .setThumbnail(msg.guild.iconURL)
    
        channel.send(embed);
      msg.delete

    }

}