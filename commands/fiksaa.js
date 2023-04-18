const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fiksaa')
    .setDescription('Fiksaa leipäkone.'),
  async execute(interaction, client) {
    if (client.borked) {
      client.borked = false
      return 'Korjasit leipäkoneen! Mahtavaa!'
    }
    else {
      return 'Ei leipäkone ole hajalla, senkin töhelö!'
    }
  }
}

