const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')
const { InteractionResponseType } = require('discord-interactions')

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
  async execute(interaction, sendReply, discordApi) {

    // sendReply("Generating!", InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE)

    await discordApi.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        "content": "Generating!"
      }
    })

    await discordApi.post(`/channels/${537053633884192772}/webhooks`, { name: 'test webhook' })

    const prompt = interaction.data.options[0].value

    const body = {
      key: SD_API_KEY,
      prompt,
      negative_prompt: '',
      samples: 1,
      width: 512,
      height: 512,
      num_inference_steps: 20,
      seed: null,
      guidance_scale: 7.5,
      webhook: null,
      track_id: null
    }
    console.log(body)

    console.log("Generating image")
    const res = await axios.post(API_URL, body)
    console.log(res.data)


    await discordApi.patch(`webhooks/${process.env.BOT_ID}/${interaction.token}/messages/@original`, {
      content: "Prompt finished",
      attachments: res.data.output.map((v, i) => ({ filename: `gen${i}`, url: v }))
    })
  }
}

