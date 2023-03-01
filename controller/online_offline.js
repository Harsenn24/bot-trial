const current_token = require("../query/current_token");

async function online_offline(ctx, args, axios, link_api){
    try {
        const data_token = await current_token(ctx)

        const toggle_onoff = await axios(
            {
                method: 'post',
                url: `${link_api}dash/settings/available`,
                headers: {
                    Authorization: data_token.token,
                },
                data: {
                    online: args
                }
            }
        )

        if(toggle_onoff.data.data.success === true){
            if(args === true){
                return ctx.reply("Status konsultasi dalam keadaan ONLINE")
            } else {
                return ctx.reply("Status konsultasi dalam keadaan OFFLINE")
            }
        } else {
            return ctx.reply("Gagal mengubah status")
        }

    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = online_offline