const axios = require('axios')
const { link_api } = process.env

async function current_clinic(ctx) {
    try {
        let clinic_id = await axios(
            {
                method: 'get',
                url: `${link_api}switch/current`,
                headers: {
                    Authorization: ctx.state.token_seller,
                }
            }
        )

        return clinic_id.data.data
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = current_clinic