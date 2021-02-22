const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");

const {
    Permissions: { FLAGS },
  } = require("discord.js")
  
  module.exports = {
    name: "clear",
    description: "",
    args: true,
    usage: "<amount>",
    cooldowns: 60,
    guildOnly: true,


  
    run(msg, args) {
      const { channel, guild, member } = msg

    
  
      const amountArg = parseInt(args[0])
  
      if (!Number.isInteger(amountArg)) {
        return channel.send("Musisz podać liczbę wiadomości które chcesz usunąć!")
      }
  
      if (amountArg < 1 || amountArg >= 100) {
        return channel.send(
          "Liczba wiadomości do usunięcia musi być większa niż 1 i mniejsza niż 100.",
        )
      }
      
      channel.bulkDelete(amountArg)
      const embed = new MessageEmbed()  
          .setTitle("CLEAR!")
          .setColor('#00FF00')
          .setDescription(`**Pomyślnie wyczyszono ${amountArg} lini! **`)
        channel.send(embed);
    },
  }