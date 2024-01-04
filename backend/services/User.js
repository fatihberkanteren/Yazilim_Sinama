const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    balance:Number
})

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel;