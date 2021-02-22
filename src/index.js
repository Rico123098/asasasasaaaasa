const { Client, MessageEmbed, RichEmbed, Message, DiscordAPIError } = require('discord.js');

const client = new Client();

const chalk = require('chalk');

const { token, prefix } = require("./config/config.js")

const commandHanler = require("./handlers/command.handler") 

const eventHandler = require("./handlers/events.handler")

const apiHandler = require("./handlers/api.handler")
const token = new Client();

const log = console.log 

commandHanler(client)
eventHandler(client)
apiHandler(client)


client.on('ready', () => {
  console.log(chalk.red(`Logowanie przebiegło pomyślnie!`));
  console.log(`Zalogowano do bota: ${client.user.tag}!`);

});

client.login(process.env.token);