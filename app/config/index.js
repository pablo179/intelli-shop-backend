const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const getEnvVar = (value) => {
    if (!process.env[value]) {
        throw new Error(`missing ${value} from env`)
    }
    return process.env[value]
}

module.exports = {
    env: getEnvVar('NODE_ENV'),
    port: getEnvVar('PORT'),
}
