const current_token = require("../query/current_token")

async function check_status(axios, link_api, ctx) {
    try {

        const data = await current_token(ctx)

        let status = await axios(
            {
                method: 'get',
                url: `${link_api}dash/settings/available/status`,
                headers: {
                    Authorization: data.token,
                }
            }
        )

        status = status.data.data.online

        if (status === false) {
            return 'anda sedang dalam mode OFFLINE'
        } else {
            return 'anda sedang dalam mode ONLINE'
        }
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = check_status