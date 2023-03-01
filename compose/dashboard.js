const { Composer } = require('telegraf');
const axios = require('axios');
const profile_docs = require('../controller/profil');
const check_status = require('../controller/check_status');
const dashboard_help = require('../controller/dashboard_help');
const online_offline = require('../controller/online_offline');
const dashboard_status_konsultasi = require('../controller/dashboard_status_konsultasi');
const { link_api } = process.env


let dashboard = new Composer()

dashboard.command('/dashboard_status_konsultasi', async (ctx) => {

    await dashboard_status_konsultasi(ctx, axios, link_api)

})


dashboard.command('/dashboard_status', async (ctx) => {

    let response = await check_status(axios, link_api, ctx)

    ctx.reply(response)

})

dashboard.command('/dashboard_online', async (ctx) => {

    await online_offline(ctx, true, axios, link_api)

})

dashboard.command('/dashboard_offline', async (ctx) => {

    await online_offline(ctx, false, axios, link_api)

})


dashboard.command('/help', async (ctx) => {

    let response = await dashboard_help(ctx)

    ctx.reply(response)
})



dashboard.command('/profil', async (ctx) => {


    const profile = await profile_docs(ctx)

    ctx.reply(profile.profile_data)

    ctx.replyWithPhoto(profile.profile_image)

})

dashboard.command('/logout', async (ctx) => {

    ctx.state = {}

    fs.openSync("./json/token.json", 'w')

    fs.openSync("./json/store.json", 'w')

    ctx.reply("kamu sudah logout")

})







dashboard.on('text', async (ctx) => {

    let response = await dashboard_help(ctx)

    ctx.reply(response)
})

module.exports = dashboard