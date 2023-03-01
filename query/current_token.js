const { Doctor_login } = require("../model");
const { ObjectID } = require("bson");


async function current_token(ctx) {
    try {
        let id_user = ctx.state.id_user

        const data = await Doctor_login.findById(ObjectID(id_user))

        return data
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = current_token