const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
    type:String,
    required:true,
    trim:true
    }
})

const AccountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',AccountSchema);
module.exports={User,Account}