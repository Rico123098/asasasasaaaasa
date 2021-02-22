const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "ogłoszenie",
    description: "propozycja",
    args: true,

    async run(msg, args) {
        const wiadomoscc = args.join(" ")

        const embed = new MessageEmbed().addField(`**Użytkownik ${msg.author.username} dodał nowe ogłoszenie!  **`, wiadomoscc, false).setColor('#43eb34').setDescription(msg.author.username, msg.author.displayAvatarURL())

        msg.delete
        msg.channel.send(embed).then(async m => {
            await m.react("<a:Like:811125037984776192>")
            await m.react("<a:Dislike:811125037728792596>")
})
    }

}