
const dotenv = require("dotenv");
dotenv.config()

// const fs = require('node:fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const PUBLIC_KEY = process.env.PUBLIC_KEY
if (!PUBLIC_KEY) {
  throw "No PUBLIC_KEY has been defined!"
}

const discordToken = process.env.DISCORD_TOKEN
if (!discordToken) {
  throw "No DISCORD_TOKEN has been defined!"
}

const { 
  InteractionType, 
  InteractionResponseType, 
  verifyKeyMiddleware
} = require('discord-interactions')

const { restCmds, commands } = require('./commands')

const rest = new REST({ version: '9' }).setToken(discordToken)

const express = require('express')
const app = express()

// (async () => {
  // const cache = fs.readFileSync('./cached_commands', 'utf8')
  // if (JSON.stringify(restCmds) === cache) {
  //   return
  // }
  // try {
  //   console.log('Started refreshing application commands!')
  //
  //   await rest.put(
  //     Routes.applicationGuildCommands(process.env.BOT_ID, process.env.TEST_SERVER),
  //     { body: restCmds },
  //   )
  //   await rest.put(
  //     Routes.applicationGuildCommands(process.env.BOT_ID, process.env.NFR_SERVER),
  //     { body: restCmds },
  //   )
  //
  //   console.log('Successfully reloaded application commands.')
  //
    // fs.writeFileSync('./cached_commands', JSON.stringify(restCmds), 'utf8')
//   }
//   catch (err) {
//     console.error(err)
//   }
// })()

const sendReply = (res, content) => {
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content
    }
  })
}

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async ( req, res ) => {
  const interaction = req.body
  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return
  }

  const commandName = interaction.data.name

  const cmd = commands.get(commandName)
  if (!cmd) {
    return
  }

  try {
    const reply = await cmd.execute(interaction)
    sendReply(res, reply)
  }
  catch (err) {
    console.error(err)
    sendReply(res, 'Leipäkone hajos, häpeäisit!')
  }
})

app.listen(8999)
