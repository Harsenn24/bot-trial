const mongoose = require('mongoose');
const doctor_schema = require('../schema');
const Schema = mongoose.Schema


const doctors = new Schema(
    doctor_schema,
    {
        collection: 'login_doctor_telegram'
    }
)

const Doctor_login = mongoose.model('Doctor', doctors)

module.exports = {
    Doctor_login
}