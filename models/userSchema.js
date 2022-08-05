const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:100,
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:100,
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Vayus",userSchema);