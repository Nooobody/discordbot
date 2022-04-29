const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fiksaa')
    .setDescription('Fiksaa leipäkone.'),
  async execute(interaction) {
    if (interaction.client.borked) {
      interaction.client.borked = false
      await interaction.reply('Korjasit leipäkoneen! Mahtavaa!')
    }
    else {
      await interaction.reply('Ei leipäkone ole hajalla, senkin töhelö!')
    }
  }
}

