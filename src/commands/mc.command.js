const util = require('minecraft-server-util');
const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: 'mcserver',
    description: 'get information about a minecraft server',
    run(msg, args) {
        if(!args[0]) return msg.channel.send('Podaj ip serewra!  -mcserwer `ip` `port`');
        if(!args[1]) return msg.channel.send('Podaj port serewra!  -mcserwer `ip` `port`');
 
        util.status(args[0], {port: parseInt(args[1])}).then((response) =>{
            console.log(response);
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Serwer minecraft')
            .addFields(
                {name: 'Ip serwera', value: response.host,}, response.port,
                {name: 'Graczy', value: response.onlinePlayers},
                {name: 'Maksymalnie graczy', value: response.maxPlayers},
                {name: 'Wersja', value: response.version}
            )
            .setFooter('Serwer Mc używany przez Game Up');
 
            msg.channel.send(embed);
        })
        .catch ((error) =>{
            msg.channel.send('Wystąpił błąd podczas wyszukiwania tego serwera');
            throw error;
        })
    }
}