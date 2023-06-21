const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required: [true, 'Please enter your email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength: [6,'Your password must be atleast 6 characters']
    },
    isVerified:{
        type:Boolean,
        default: false
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isValidatePassword = async function(userPassword){
    return await bcrypt.compare(userPassword,this.password)
}

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = mongoose.model('User',userSchema)