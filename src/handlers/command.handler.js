const { Collection } = require("discord.js")

const { Client, MessageEmbed, RichEmbed, Message } = require('discord.js');

const { readdirSync } = require("fs")

const { prefix, owner } = require(__dirname + "/../config/config.js")

const ascii = require("ascii-table");
const { cooldown } = require("../commands/clear.command");
const { botPermissions } = require("../commands/kick.command");


const table =  new ascii().setHeading("Komenda", "Aktualny status")

module.exports = (client) => {
    // Commands
    client.commands = new Collection()

    const cooldowns = new Collection()

    const commandFiles = readdirSync(__dirname + "/../commands").filter(file => file.endsWith(".command.js"),)

    


    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)




        if (command.name) {

            client.commands.set(command.name, command)
            table.addRow(file, "✅")
        } else {
            table.addRow(file, "❌ -> Błąd! Brak `name`")
            continue
        }

    }


    console.log(table.toString())
    

    client.on('message', (msg) => {
        const { author, guild, channel } = msg

        
      
        if (msg.content.indexOf(prefix) !== 0) return

      
      
        const args = msg.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g)
      
        const cmdName = args.shift().toLowerCase()


        if (!client.commands.has(cmdName)) return

        const cmd = client.commands.get(cmdName)

        if (cmd.botPermissions && cmd.botPermissions.length) {
          if(!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
            return channel.send(`potrzebujesz więcej permisji: ${cmd.botPermissions.join("`,`")}\`,`)
          }

        }

        if (cmd.userPermissions && cmd.botPermissions.length) {
          if (!msg.member.permissionsIn(channel).has(cmd.userPermissions)) {
            const embed = new MessageEmbed()  
              .setTitle("Nie posiadasz uprawnień do korzystania z tej komendy!")
              .setColor("RED")
              .setDescription(`<a:discordbetter2:802486096293789706> • Wymagane uprawnienia: ** ${cmd.botPermissions.join("`,`")}\ **`)
            channel.send(embed);
            return
          }
          
        }

        if (cmd.ownerOnly) {
          if (author.id !== owner) {
            return msg.reply("Tylko właściciel bota może wykonać to polecenie!")
          }
        }




        if(cmd.args && !args.length) {
            let reply = `Nie podałeś żadnego argumentu! Podaj go! ${msg.author}`
            if (cmd.usage) {
                reply += "\nThe proper usage would be: \` ${prefix}${cmdName}${cmd.usage} ` "
            }

        }
        if (cmd.guildOnly && !guild) {
            return msg.reply("Tą komende możesz tylko wykonać w gildi!")
          }


          if (!cooldowns.has(cmdName)) {
            cooldowns.set(cmdName, new Collection())
          }
      
          const now = Date.now()
          const timestamps = cooldowns.get(cmdName)
          const cooldownAmount = (cmd.cooldown || 3) * 1000
      
          if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
      
            if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / 1000
              return msg.reply(
                  
                `Poczekaj ${timeLeft.toFixed(
                  1,
                )} przed wpisaniem następnej komendy! \`${cmdName}\` command.`,
              )
            }
          }
      
          timestamps.set(msg.author.id, now)
          setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)
      

        try {
            client.commands.get(cmdName).run(msg, args)
        } catch(error) {
            console.log(error)
            const embed = new MessageEmbed()
            .setTitle("ERROR!")
            .setColor('RED')
            .setDescription('Wystąpił nieoczekiwany błąd komendy! Przepraszamy')
            .setFooter("Błąd!", msg.author.iconURL)
            channel.send(embed);

        }
      
      



        }
    )}
