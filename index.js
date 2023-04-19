
const dotenv = require("dotenv");
dotenv.config()

// const fs = require('node:fs')
const { Routes } = require('discord-api-types/v9')
const axios = require('axios')

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

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${discordToken}`
  }
});

const express = require('express')
const app = express()

app.get('/register_commands', async (req, res) => {
  try {
    console.log('Started refreshing application commands!')

    const sendCommands = (server) => {
      return discord_api.put(`/applications/${process.env.BOT_ID}/guilds/${server}/commands`, restCmds)
    }

    await sendCommands(process.env.TEST_SERVER)
    await sendCommands(process.env.NFR_SERVER)

    console.log('Successfully reloaded application commands.')
  }
  catch (err) {
    console.error(err)
  }
})

const sendReply = (res, content, type) => {
  res.send({
    type: type ?? InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content
    }
  })
}

const sendReplyRes = (res) => {
  return (content, type) => sendReply(res, content, type)
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
    const reply = await cmd.execute(interaction, sendReplyRes(res), discord_api)
    if (reply) {
      sendReply(res, reply)
    }
  }
  catch (err) {
    console.error(err)
    sendReply(res, 'Leipäkone hajos, häpeäisit!')
  }
})

app.listen(8999)
