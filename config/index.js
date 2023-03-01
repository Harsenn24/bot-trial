const mongoose = require('mongoose');
const testLocal = process.env.develop
var configMongo = 0


if (testLocal) {
    configMongo = require("../sm-app/config/deployment.json")
} else {
    let result = fs.readFileSync('/sm-app/config/deployment.json', 'utf-8')
    configMongo = JSON.parse(result)
}

let MONGO_SETUP = {
    STRING: null,
    HOST: configMongo['mongo']['master']['ip'],
    PORT: configMongo['mongo']['master']['port'],
    USERNAME: configMongo['mongo']['master']['username'],
    PASSWORD: configMongo['mongo']['master']['password'],
    SOURCE: configMongo['mongo']['master']['source']
}

const database = `mongodb://${MONGO_SETUP.USERNAME}:${MONGO_SETUP.PASSWORD}@${MONGO_SETUP.HOST}:${MONGO_SETUP.PORT}/skinmystery?authSource=${MONGO_SETUP.SOURCE}&readPreference=primary&ssl=false`
async function connectionSkinMistery() {
    try {
        const testConnection = await mongoose.connect(database)
        return testConnection
    } catch (error) {
        throw error;
    }
}

connectionSkinMistery()

module.exports = { connectionSkinMistery }