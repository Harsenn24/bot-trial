const api_get_doctor_profile = require("../api/profile_docs")

async function profile_docs(ctx) {
    try {
        let data_doctor = await api_get_doctor_profile(ctx)

        let profile_data = `
Nama Lengkap    : ${data_doctor.personal_fullname}
Jenis Kelamin   : ${data_doctor.personal_gender}
Spesialis       : ${data_doctor.professional_specialize}
Universitas     : ${data_doctor.professional_university}
No Hp           : ${data_doctor.personal_phone}
        `

        let profile_image = data_doctor.image

        return { profile_data, profile_image }
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = profile_docs