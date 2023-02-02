let express = require("express");
const { BotTelegram } = require("../controller");
let router = express.Router();

router.get('/', BotTelegram.get_bot)

module.exports = { router }