const fs = require('fs')
require('dotenv').config()
const ethers = require('ethers')

const data = fs.readFileSync('wordlist.txt', 'utf-8', async (err, data) => {
  if (err) throw err
  return data
})

const words = data.toString().split('\r\n')

// Connect your provider
const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL)

function insertAt(array, index, ...elementsArray) {
  array.splice(index, 0, ...elementsArray)
}

const run = async () => {
  const words_copy = [...words]

  // Insert your 11 words. It doesn't matter on which position
  // the lost word is, but it is important that the order of
  // the 11 words is correct

  // THIS IS AN EXAMPLE SEED PHRASE
  const mnemonic = [
    'waste',
    'still',
    'toast',
    'mansion',
    'gloom',
    'wave',
    'traffic',
    'news',
    'science',
    'actress',
    'funny',
  ]

  for (let i = 0; i <= 11; i++) {
    for (let j = 0; j < words_copy.length; j++) {
      const mnemonic_copy = [...mnemonic]
      insertAt(mnemonic_copy, i, words_copy[j])
      const seed_phrase = mnemonic_copy.join(' ')
      try {
        const walletMnemonic = ethers.Wallet.fromPhrase(seed_phrase)
        const wallet = walletMnemonic.connect(provider)

        // if you have the public adress, use this:
        if (wallet.address == process.env.PUBLIC_ADDRESS) {
          console.log(wallet)
        }

        // otherwhise, if you have any balance above 0 in your wallet,
        // use this (it will take a while):
        /*
        const balance = await provider.getBalance(wallet.address)
        if (balance > 0) {
          console.log(wallet)
        }
        */
      } catch (error) {
        continue
      }
    }
  }
}

run()
