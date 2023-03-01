const axios = require('axios')
const { link_api } = process.env

async function api_get_doctor_profile(ctx) {
    try {
        let data_doctor = await axios(
            {
                method: 'get',
                url: `${link_api}dash/settings/profile/data`,
                headers: {
                    Authorization: ctx.state.token_login,
                }
            }
        )

        return data_doctor.data.data
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = api_get_doctor_profile