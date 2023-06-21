const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = async(req,res) => {
    try {
        const {name,email,password} = req.body 

        if(!name || !email || !password){
            res.status(400).json({
                error: "Please enter all the details"
            })
        }

        // checks is a user with given email exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            res.status(400).json({
                error: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        // generates token
        let token = user.getJwtToken()

        if(!token){
            res.status(500).json({
                error: "Internal Server Error"
            })
        }

        // options for cookie
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_TIME * 24*60*60*1000
            ),
            httpOnly: true
        }

        // if successful cookie with name token and value is generated
        res.status(200).cookie('token',token,options).json({
            message:"User signup successful"
        })

    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

exports.verify = async(req,res) => {
    try {
        const token = req.params.token

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)

        if(!user){
            res.status(404).json({
                error:"User not found"
            })
        }

        user.isVerified = true

        await user.save()

        res.status(200).json({
            message:"User account verified"
        })

    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

