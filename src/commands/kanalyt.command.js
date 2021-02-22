const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kanalyt",
    description: "kanal",

    run(msg) {
        const { channel } = msg

      
        const embed = new MessageEmbed() 
            .setTitle("YouTube kanał!")
            .addField("Kanał właściciela:", `[Klikni mnie](https://www.youtube.com/channel/UCqmCBWBRvPalLgtH8YmiPzw)`)

            .setColor('#ebe574')
            .setFooter(msg.member.user.tag)
            .setThumbnail(msg.guild.iconURL)
    
        channel.send(embed);
      msg.delete

    }

}