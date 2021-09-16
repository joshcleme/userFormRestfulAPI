// Import Mongoose
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

 
// define the schema for Sign Up model 
const signUpTemplate = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    permission:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userinfo', signUpTemplate)