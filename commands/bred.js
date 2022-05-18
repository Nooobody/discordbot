const { SlashCommandBuilder } = require('@discordjs/builders')

class RandArray {
  constructor(arr) {
    this.arr = arr
  }

  get arr() {
    return this.arr
  }

  get rand() {
    return this.arr[Math.floor(Math.random() * this.arr.length)]
  }
}

const star1 = new RandArray([
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
  'salaatinlehti',
  'pekonia',
  'suolakurkkua',
  'maapähkinävoita',
  'suklaalevitettä',
  'katkarapuja',
  'porkkanaraastetta',
  'tonnikalaa',
])

const star2 = new RandArray([
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
  'munakokkelia',
  'raejuustoa',
  'tilliä',
  'hummusta',
  'silliä',
  'sieniä',
  'kantterelleja',
  'majoneesia',
  'BBQ-kastiketta',
])

const star3 = new RandArray([
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
  'sulatettua juustoa',
  'worcesterkastiketta',
  'pikkelöityjä vihanneksia',
  'kalakeittoa',
  'kesäkeittoa',
  'Kallen mätitahnaa',
  'omenapiirakka',
  'broileri (kokonainen)',
])

const star4 = new RandArray([
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
  'sinapinsiemeniä',
  'kanelia',
  'viinietikkaa',
  'balsamiviinietikkaa',
  'päärynä (kokonainen)',
  'porkkana (kokonainen)',
  'kasvisliemikuutio',
  'joulukinkku (kokonainen)',
])

const star5 = new RandArray([
  'leipäkone',
  'TPSn voittomahdollisuudet',
  'taikalamppu',
  'kolme toivetta',
  'elämän tarkoitus',
  'eurojackpotin oikeat numerot',
  'kärpässieni',
  'työhakemus',
  'työsopimus',
  'Hallituksen epäluottamuslause',
  'Windows 95 bluescreen',
  '500 virhe, palvelimella virhe',
  '408 virhe, palvelupyyntö aikakatkaistiin',
  'palvelin ei juuri nyt ole saatavilla',
  'yritä myöhemmin uudestaan' 
])

const adjectives = new RandArray([
  'hienolta',
  'klassikolta',
  'tylsältä',
  'upeelta',
  'kivalta',
  'siltä että haluat yhden rieseneistäni',
  'siltä että tämän teki joku botti',
  'Taidatkin haluta yhden rieseneistäni.',
  'Tämänkin leivän tarjosi leipäbotti.',
  'LEIPÄ JUMISSA!!',
  'Jaaha, aika lähteä lomalle.',
  'Se vihu on sielä nurkasa!',
  'Torille!',
  'Olispa kaljaa.',
  'Aika perus.',
  'Aika paske.',
  '',
])

const chances = [
  0.01, // 1% for 5-star
  0.11, // 10% for 4-star
  0.26, // 15% for 3-star
  0.56, // 30% for 2-star
  1,    // 44% for 1-star
]

const breadTypes = new RandArray([
  'leivän',
  'sämpylän',
  'hampurilaisen',
  'patongin',
])

const grainTypes = new RandArray([
  '',
  'ruis',
  'ohra',
  'kaura',
  'riisi',
  'monivilja'
])

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
      ingrds.push(arr.rand)
    }

    interaction.client.pity += 1

    const adj = adjectives.rand
    let ending = `Kuulostaa ${adj}!`
    if (!adj[0] || adj[0] === adj[0].toUpperCase()) {
      ending = adj
    }
    const str = `Sait ${breadTypes.rand} jossa on ${ingrds.join(', ')} ja kaksi viipaletta ${grainTypes.rand}leipää. ${ending}`
    await interaction.reply(str)
  }
}
