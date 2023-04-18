const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

const API_URL = 'https://stablediffusionapi.com/api/v3/text2img'
const SD_API_KEY = process.env.SD_API_KEY

module.exports = {
  data: new SlashCommandBuilder()
    .setName('maalaa')
    .setDescription('Luo kuvia')
    .addStringOption(option => 
      option.setName('prompt')
        .setDescription('Prompt')
        .setRequired(true)),
  async execute(interaction) {
    const { prompt } = interaction.data.options
    const res = await axios.post(API_URL, {
      body: {
        key: SD_API_KEY
        prompt,
        samples: 4
        width: 512,
        height: 512,
        num_inference_steps: 20,
        guidance_scale: 8
      }
    })

    const json = await res.json()
    return json.output.join(' ')
  }
}

