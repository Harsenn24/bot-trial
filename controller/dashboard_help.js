const current_clinic = require("../api/current_clinic");
const api_get_doctor_profile = require("../api/profile_docs");

async function dashboard_help(ctx) {
    try {
        let data_doctor = await api_get_doctor_profile(ctx)

        let clinic_id = await current_clinic(ctx)

        let get_clinic = require("../json/store.json")

        var clinic_name

        for (let i = 0; i < get_clinic.length; i++) {
            if(get_clinic[i].store_id === clinic_id.store_id) {
                clinic_name = get_clinic[i].store_name
            }

        }

        let full_name = data_doctor.personal_fullname

        let message = `
Hallo dr ${full_name}, anda sedang dalam klinik ${clinic_name} \n
berikut menu-menu yang dapat anda lakukan:
/help - bantuan atau petunjuk perintah 
/profil - melihat profil anda 
/status - melihat status online atau offline anda 
        `

        return message
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = dashboard_help