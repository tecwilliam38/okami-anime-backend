const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    user_name: String,
    user_email: String,    
    user_birthday:String,
    password: String
})

const UserModel = mongoose.model("cadastro/user", userSchema)
module.exports = UserModel;