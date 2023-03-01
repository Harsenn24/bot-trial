const { Doctor_login } = require("../model");
const { ObjectID } = require("bson");
const list_clinic = require("../api/list_clinic");
const current_token = require("../query/current_token");


async function choose_clinic(ctx, axios, link_api) {
    try {

        const data_token = await current_token(ctx)

        const data = await await list_clinic(axios, link_api, data_token)

        if (data.length === 0) {

            return 'data empty'

        } else {

            let message = ctx.message.text

            let array_message = message.split(" ")

            array_message.shift()

            let new_word = array_message.join(" ")

            var store_id = 0

            for (let i = 0; i < data.length; i++) {
                if (data[i].store_name === new_word) {
                    store_id = data[i].store_id
                }
            }


            const result_axios = await axios(
                {
                    method: 'post',
                    url: `${link_api}switch`,
                    headers: {
                        Authorization: data_token.token,
                    },
                    data: {
                        store_id: store_id
                    }
                }
            )

            let new_token = result_axios.data.data.token

            await Doctor_login.findByIdAndUpdate(
                {
                    '_id' : ObjectID(id_user)
                },
                [
                    {
                        '$set': { token: new_token }
                    }
                ]
            )

            let message_reply = `
            Anda sudah memilih Klinik ${new_word} untuk berkonsultasi \n
berikut menu-menu yang dapat anda lakukan: \n
/help - bantuan atau petunjuk perintah \n
/profil - melihat profil anda \n
/status - melihat status online atau offline anda \n
            `

            return message_reply
        }


    } catch (error) {
        console.log(error);
        return error
    }



}

module.exports = choose_clinic