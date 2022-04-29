
const dotenv = require("dotenv");
dotenv.config()

const fs = require('node:fs')
const { Client, Intents } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const discordToken = process.env.DISCORD_TOKEN
if (!discordToken) {
  throw "No DISCORD_TOKEN has been defined!";
}

const { restCmds, commands } = require('./commands')

const rest = new REST({ version: '9' }).setToken(discordToken)

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.commands = commands
client.pity = 0

client.once('ready', () => {
  console.log('Kohta tulleepi leipää!')
});

(async () => {
  const cache = fs.readFileSync('./cached_commands', 'utf8')
  if (JSON.stringify(restCmds) === cache) {
    return
  }
  try {
    console.log('Started refreshing application commands!')

    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.TEST_SERVER),
      { body: restCmds },
    )
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.NFR_SERVER),
      { body: restCmds },
    )

    console.log('Successfully reloaded application commands.')

    fs.writeFileSync('./cached_commands', JSON.stringify(restCmds), 'utf8')
  }
  catch (err) {
    console.error(err)
  }
})()

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return
  }

  const cmd = client.commands.get(interaction.commandName)
  if (!cmd) {
    return
  }

  if (client.borked) {
    if (interaction.commandName === 'fiksaa') {
      await cmd.execute(interaction)
    }
    else {
      await interaction.reply({ content: 'Leipäkone ei toimi kun se on hajonnut. Mälsää.'})
    }
    return
  }

  try {
    await cmd.execute(interaction)
  }
  catch (err) {
    console.error(err)
    interaction.client.borked = true
    await interaction.reply({ content: 'Leipäkone hajos, häpeäisit!' })
  }
})

client.login(discordToken)
