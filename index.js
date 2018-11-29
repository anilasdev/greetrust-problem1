const { askRulers, alliesOfRulers } = require('./questions')
const Secrets = require('./secrets')
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
    // console.log('str')
    // console.log(str)
    //console.log(key)
    if (key.name === 'return' && intialized) {
        // if (winCount < 3) {
        //     readSecrets()
        // }
        // else {
        //     winCount = 0
        // }
        readSecrets()
    }
});

const questionInterface = async (question) => {
    // console.log(question)
    return new Promise((resolve, reject) => {
        readInterface.question(`${question}`, (answer) => {
            if (!isWon) {
                resolve(`Ouput: None`)
            }
            else {
                decodeSecret(answer)
            }
        })
    })
}
const init = async () => {
    let askRuler = await questionInterface(askRulers)
    console.log(askRuler)
    let alliesOfRuler = await questionInterface(alliesOfRulers)
    console.log(alliesOfRuler)
    intialized = true
    //await questionInterface(``)
}

const readSecrets = async () => {
    return new Promise((resolve, reject) => {
        readInterface.question(``, (answer) => {
            //console.log(answer)
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
    console.log('insde decodeSecret', secret)
    let kingdom
    let secretCode
    let splits = secret.split(',')
    if (splits.length >= 2 && splits[0]) {
        kingdom = splits[0]
        splits.shift()
        secretCode = splits.join('')
        if (verifyCode(kingdom, secretCode)) {
            ++winCount
            wonKingdoms.push(kingdom)
            if (winCount === 3) {
                //console.log(wonKingdoms)
                await printWinner(wonKingdoms)
                console.log('end')
                readInterface.close()
            }
        }
    }
}
const printWinner = async (wonKingdoms) => {
    // await questionInterface(askRulers)
    // console.log('Output: King Shan')
    await questionInterface(alliesOfRulers)
    console.log(wonKingdoms.join(', '))
    return
}
init()
//console.log(decodeSecret('Ice, “zmzmzmzaztzozh”'))


