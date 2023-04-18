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
    const prompt = interaction.data.options[0].value

    const body = {
      key: SD_API_KEY,
      prompt,
      negative_prompt: '',
      samples: 4,
      width: 512,
      height: 512,
      num_inference_steps: 20,
      seed: null,
      guidance_scale: 7.5,
      webhook: null,
      track_id: null
    }
    console.log(body)

    const res = await axios.post(API_URL, {
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(res.data)

    return res.data.output.join(' ')
  }
}

