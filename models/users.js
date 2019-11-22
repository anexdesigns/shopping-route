const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const itemSchema = new mongoose.Schema({
     name: String, isle: Number
})

const UserSchema = new mongoose.Schema({
     username: String,
     password: String,
     email: String,
     items: [itemSchema]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)