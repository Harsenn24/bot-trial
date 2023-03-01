const {Composer } = require('telegraf');
const clinic_list = require('../controller/clinic_list');
const axios = require('axios');
const choose_clinic = require('../controller/choose_clinic');
const { link_api } = process.env



let clinic_choice = new Composer

clinic_choice.command('/clinic', async (ctx) => {

    let clinic_docs = await clinic_list(axios, link_api, ctx)

    ctx.reply(clinic_docs)

    

})

clinic_choice.hashtag(`#choose`, async (ctx) => {

    let result = await choose_clinic(ctx, axios, link_api)

    ctx.reply(result)

})

module.exports = clinic_choice