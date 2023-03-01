async function list_clinic(axios, link_api, data) {
    try {
        let get_clinic_list = await axios(
            {
                method: 'get',
                url: `${link_api}switch/store-list`,
                headers: {
                    Authorization: data.token,
                }
            }
        )

        return get_clinic_list.data.data
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = list_clinic