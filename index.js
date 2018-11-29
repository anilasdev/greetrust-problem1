const { askRulers, alliesOfRulers } = require('./questions')
const Secrets = require('./secrets')
const Config = require('./config')
const readline = require('readline')
const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.emitKeypressEvents(process.stdin);


let intialized = false
let isWon = false
let winCount = 0
let wonKingdoms = []
process.stdin.on('keypress', (str, key) => {
    if (key.name === 'return' && intialized && !isWon) {
        readSecrets()
    }
});

const init = async () => {
    outputToConsole(askRulers)
    outputToConsole(Config.no_ruler_text)
    outputToConsole(alliesOfRulers)
    outputToConsole(Config.no_ruler_text)
    intialized = true
    outputToConsole(`Input Messages to kingdoms from ${Config.ruler}:`)
    readSecrets()
}

const readSecrets = async () => {
    return new Promise((resolve, reject) => {
        readInterface.question(``, (answer) => {
            decodeSecret(answer)
        })
    })
}
const verifyCode = (kingdom, secretCode) => {
    if (Secrets.hasOwnProperty(kingdom.toUpperCase())) {
        let arrayOfSecretLetters = Secrets[kingdom.toUpperCase()].toLowerCase().split('')
        let arrayOfSecretCodeLetters = secretCode.toLowerCase().split('')
        let check = arrayOfSecretLetters.map((each, index) => {
            let indexOfSecretLetterInCode = arrayOfSecretCodeLetters.indexOf(each)
            if (indexOfSecretLetterInCode !== -1) {
                arrayOfSecretCodeLetters.splice(indexOfSecretLetterInCode, 1)
                return true
            }
            else if (index === arrayOfSecretLetters.length - 1) {
                return true
            }
            else {
                return false
            }
        })
        return check.filter((v) => !v).length === 0
    }
    return false
}
const decodeSecret = async (secret) => {
    let kingdom
    let secretCode
    let splits = secret.split(',')
    if (splits.length >= 2 && splits[0]) {
        kingdom = splits[0]
        splits.shift()
        secretCode = splits.join('')
        if (verifyCode(kingdom, secretCode)) {
            if (!wonKingdoms.includes(kingdom)) {
                ++winCount
                wonKingdoms.push(kingdom)
            }
            if (winCount === 3) {
                isWon = true
                printWinner(wonKingdoms)
                readInterface.close()
            }
        }
    }
}
const printWinner = (wonKingdoms) => {
    outputToConsole(askRulers)
    outputToConsole(Config.ruler)
    outputToConsole(alliesOfRulers)
    outputToConsole(wonKingdoms.join(', '))
    return
}
const outputToConsole = (input) => {
    console.log(input)
}
init()


