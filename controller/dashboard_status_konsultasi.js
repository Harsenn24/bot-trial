const current_token = require("../query/current_token");

async function dashboard_status_konsultasi(ctx, axios, link_api) {
    try {
        let data_token = await current_token(ctx)

        const get_data = await axios(
            {
                method: 'get',
                url: `${link_api}dash/data`,
                headers: {
                    Authorization: data_token.token,
                },
            }
        )
        

        const rating = get_data.data.data.stats.rating
        const todays_consult = get_data.data.data.stats.today_consult
        const total_consult = get_data.data.data.stats.total_consult
        const patient_male = get_data.data.data.patient.gender.male
        const patient_female = get_data.data.data.patient.gender.female
        const patient_other = get_data.data.data.patient.gender.other




        return ctx.reply(`
Rating                         : ${rating.toFixed(2)}
Konsultasi Hari Ini    : ${todays_consult} 
Total Konsultasi        : ${total_consult} \n

Jenis Kelamin :
1. Pria                         : ${patient_male}
2. Wanita                    : ${patient_female}
3. Lainnya                  : ${patient_other}
`)

    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = dashboard_status_konsultasi