const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const user_schema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    patronymic: { type: String },
    groupname: { type: String },
    studentnumber: { type: String },
    educationbegindate: { type: String }
})

module.exports = mongoose.model('users', user_schema);