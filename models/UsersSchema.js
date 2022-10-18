const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{timestamps: {createdAt: 'created_at'}})


module.exports = mongoose.model('users', usersSchema)