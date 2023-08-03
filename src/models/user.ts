// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
import {IUser} from '../types/user'
import {model, Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const userSchema:Schema = new Schema({
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

// hashes the password before saving it to database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
})

// method to validate password
userSchema.methods.isValidatedPassword = async function(userPassword:string){
    return await bcrypt.compare(userPassword, this.password)
}

// method to generate jwt token for a user
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}

export default model<IUser>('User',userSchema)