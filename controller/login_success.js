const { encryptId } = require("../helper/encrypt_decrypt");
const axios = require('axios');
const { link_api } = process.env
const fs = require('fs');
const { Doctor_login } = require("../model");

async function login_success(ctx) {
    try {

        let reply_message = ctx.message.text

        let array_message = reply_message.split(" ")

        array_message.shift()

        let email_user = array_message[1];
        let password_user = array_message[3];

        email_user = encryptId(email_user, 8)
        password_user = encryptId(password_user, 8)

        const login_data = await axios(
            {
                method: 'post',
                url: `${link_api}auth/login`,
                data: {
                    email: email_user,
                    password: password_user,
                    myref: null
                }
            }
        )

        let token_login = login_data.data.data.token

        const new_user = await Doctor_login(
            {
                token: token_login
            }
        )

        await new_user.save()

        let id_user = new_user._id.toString()

        let id_json = {
            id: id_user
        }

        let message

        if (token_login === null) {
            message = "username or password is incorrect"
        } else {
            fs.writeFileSync(`./json1/${id_user}`, JSON.stringify(id_json, null, 2))
            message = "Congratulation you already logged"
        }

        return { message, id_user }

    } catch (error) {
        console.log(error);
        return error
    }

}






module.exports = login_success