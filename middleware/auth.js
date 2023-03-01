const fs = require('fs');
const { Doctor_login } = require('../model');


async function read_token(ctx, next) {

    let data = ctx.state.id_user

    console.log(data, "dari read token")

    try {
        if (!ctx) {
            return ctx.reply("You are not login")
        } else {
            return next(ctx)
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

async function read_token_seller(ctx, next) {
    let data = fs.readFileSync('./json/token.json', 'utf-8');

    data = JSON.parse(data)

    try {
        if (!data) {
            return ctx.reply("Kamu belum memilih klinik")
        } else {
            ctx.state = data
            return next(ctx)
        }
    } catch (error) {
        console.log(error)
        return error
    }
}


async function on_help(ctx, next) {
    try {
        const read_folder = fs.readdirSync('json1')

        const id_login = await Doctor_login.aggregate(
            [
                {
                    '$project': {
                        '_id': 0,
                        'id_user': '$_id'
                    }
                }
            ]
        )

        let flag = false



        for (let i = 0; i < read_folder.length; i++) {
            console.log(read_folder[i])
            for (let j = 0; j < id_login.length; j++) {
                console.log(id_login[i].id_user.toString())
                if (read_folder[i] === id_login[i].id_user.toString()) {
                    flag = true
                    ctx.state.id_user = id_login[i].id_user.toString()
                }
            }
        }

        let message = `
    Selamat datang di Bot Telegram dokter Cermin Ajaib \n
berikut beberapa menu yang anda dapat lakukan disini : \n
1. /login       ---  Memaasukan email dan password anda
2. /login_help  ---  Petunjuk cara pemakaian
        `

        if (flag === false) {
            return ctx.reply(message)
        } else {
            return await next(ctx)
        }
    } catch (error) {

    }


}

module.exports = { read_token, on_help, read_token_seller }