const { SlashCommandBuilder } = require('@discordjs/builders')

const star1 = [
  'voita',
  'kinkkua',
  'meetwursti',
  'juustoa',
  'sulatejuustoa',
  'tuorejuustoa',
  'avokadoa',
  'majoneesia',
  'tomaatti siivuja',
  'mango siivuja ',
  'lenkkimakkaraa',
  'HKn sininen',
]

const star2 = [
  'pekonia',
  'kanasuikaleita',
  'lihasuikaleita',
  'jauhelihakastiketta',
  'sipulirenkaita',
  'kevätsipulia',
  'sipulia',
  'spagettia',
  'pasta bolognesea',
  'ratatouillea',
  'ranskalaiset',
  'hot dogi',
  'hampurilainen',
  'voileipä',
]

const star3 = [
  'karmelaadi',
  'paprikaa',
  'habanero (kokonainen)',
  'persiljaa',
  'laventelia',
  'timjamia',
  'korianteria',
  'tähtianista',
  'sokeria',
  'merisuolaa',
  'ketsuppia',
  'sinappia',
  'mansikoita',
  'vadelmia',
  'vadelmahilloa',
  'mustikoita',
  'banaani siivuja (pitkittäin)',
  'pannacotta',
  'tiramisu',
  'jäätelöä',
  'eskimopuikko',
  'syntymäpäiväkakku (1/3 siivu)',
  'syntymäpäiväkakku (1/16 siivu)',
  'syntymäpäiväkakku (1/4 siivu)',
  'syntymäpäiväkakku (1/8 siivu)',
  'kermavaahtoa',
  'vaahtokarkkeja',
  'nallekarkkeja',
  'salmiakkia',
]

const star4 = [
  'sitruuna (kokonainen)',
  'vesimelooni (kokonainen)',
  'hunajamelooni (kokonainen)',
  'tomaatti (kokonainen)',
  'mango (kokonainen)',
  'appelsiini (kokonainen)',
  'appelsiini siivuja',
  'banaani (kokonainen)',
  'avokado (kokonainen)',
  'nuudeleita (keittämätön)',
  'kahvinpuruja (keitettyjä)',
  'pikakahvia',
  'teepussi (käyttämätön)',
  'riisiä (keittämätöntä)',
  'ylikypsää riisiä',
  'ylikypsää pastaa',
  'huonot sukat',
  'se vihu siellä north southissa',
  'koirankarvoja',
  'paperimassaa',
  'se nakki mitä kukaan ei halua',
  'anopinkieli',
  'jäähdytinnestettä',
]

const star5 = [
  'leipäkone',
  'TPSn voittomahdollisuudet',
  'taikalamppu',
  'kolme toivetta',
  'elämän tarkoitus',
  'eurojackpotin oikeat numerot',
]

const adjectives = [
  'hienolta',
  'klassikolta',
  'tylsältä',
  'upeelta',
  'kivalta',
  'siltä että haluat yhden rieseneistäni',
  'siltä että tämän teki joku botti',
  'Taitaa nurkan takana olla patukkaa tarjolla tätä leipää vastaan.',
  'Torille!',
  'Olispa kaljaa.',
]

const chances = [
  0.01,
  0.11,
  0.26,
  0.56,
  1,
]

const ingredients = [
  star5,
  star4,
  star3,
  star2,
  star1,
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leipä')
    .setDescription('Tee leipä.'),
  async execute(interaction) {
    const pity = interaction.client.pity
    const ingrds = []
    let pityChecked = false
    for (let i = 0; i < 3; i++) {
      const random = Math.random()
      let arr
      
      if (!pityChecked && pity >= 20) {
        arr = star5
        interaction.client.pity = 0
        pityChecked = true
      }
      else if (!pityChecked && pity % 5 === 0) {
        if (random < 0.25) {
          arr = star5
        }
        else {
          arr = star4
        }
        pityChecked = true
      }
      else {
        for (let i in chances) {
          if (random < chances[i]) {
            arr = ingredients[i]
            break
          }
        }
      }
      const ind = Math.floor(Math.random() * arr.length)
      ingrds.push(arr[ind])
    }

    interaction.client.pity += 1

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    let ending = `Kuulostaa ${adj}!`
    if (adj[0] === adj[0].toUpperCase()) {
      ending = adj
    }
    const str = `Sait leivän jossa on ${ingrds.join(', ')} ja kaksi viipaletta leipää. ${ending} Pity: ${pity}`
    await interaction.reply(str)
  }
}
