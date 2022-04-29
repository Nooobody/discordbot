const fs = require('node:fs')
const { Collection } = require('discord.js')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file !== 'index.js');

const commands = new Collection()
const cmds = []

for (const file of commandFiles) {
  const cmd = require(`./${file}`)

  cmds.push(cmd.data)
  commands.set(cmd.data.name, cmd);
}

module.exports = {
  restCmds: cmds,
  commands
}
