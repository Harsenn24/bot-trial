"use strict";

require("dotenv").config()
const { Telegraf } = require('telegraf');
const token = process.env.token_tele
const bot = new Telegraf(token);
const { read_token, read_token_seller } = require("./middleware/auth");
const login_page = require("./compose/login_page");
const clinic_choice = require("./compose/choose_clinic");
const dashboard = require("./compose/dashboard");
const { connectionSkinMistery } = require("./config");

bot.use(login_page)

bot.use(async (ctx, next) => {
    await read_token(ctx, next)
})

bot.use(clinic_choice)

// bot.use(async (ctx, next) => {
//     await read_token_seller(ctx, next)
// })

bot.use(dashboard)

connectionSkinMistery().then(async () => {
    console.log("Success Connected to MongoDB!");
    bot.launch()
});

