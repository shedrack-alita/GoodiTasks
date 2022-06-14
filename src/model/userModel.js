
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const register_Schema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true,  'First name is required']
    },
    last_name:{
        type: String,
        required: [true,  'Last name is required']
    },
    email: {
        type: String,
        unique: [true, 'A valid email address is required'],
        required: true
    },
    phone_no: {
        type: String,
        unique: [true, 'Type in your phone number'],
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Type in your password']
    },
    confirm_pass: {
        type: String,
        required: [true, 'Password must match with confirm password']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

register_Schema.pre('save', async function(){
    let Salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, Salt);
})

const register_Model = mongoose.model("register", register_Schema);
module.exports = register_Model;