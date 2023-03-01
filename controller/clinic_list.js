const list_clinic = require("../api/list_clinic")
const current_token = require("../query/current_token");


async function clinic_list(axios, link_api, ctx) {
    try {
        const data = await current_token(ctx)

        let list_clinics = await list_clinic(axios, link_api, data)

        let clinic = ''

        for (let i = 0; i < list_clinics.length; i++) {
            clinic += `${i + 1}. ${list_clinics[i].store_name} \n`
        }

        let reply_response = `
Silakan pilih klinik sebelum memulai konsultasi :  \n
${clinic}
`
        return reply_response
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = clinic_list