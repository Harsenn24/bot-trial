const { Composer } = require('telegraf');
const login_command = require('../controller/login_command');
const login_success = require('../controller/login_success');
const { on_help } = require('../middleware/auth');
const fs = require('fs');
const { Doctor_login } = require('../model');


let login_page = new Composer()



login_page.command('/login', async (ctx) => {

    ctx.reply(login_command())

})


login_page.command('/login_to', async (ctx, next) => {

    let resp = await login_success(ctx)

    ctx.reply(resp.message)


})


login_page.on('text', async (ctx, next) => {

    on_help(ctx, next)

})


module.exports = login_page
