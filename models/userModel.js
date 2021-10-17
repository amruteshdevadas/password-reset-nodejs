const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = new schema({
    _id:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
})

const User = mongoose.model('Users',userSchema,'users')
module.exports= User;