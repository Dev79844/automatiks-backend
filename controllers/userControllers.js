const user = require('../models/user')
const User = require('../models/user')

exports.signup = async(req,res) => {
    try {
        const {name,email,password} = req.body 

        if(!name || !email || !password){
            res.status(400).json({
                error: "Please enter all the details"
            })
        }

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

        let token = user.getJwtToken()

        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_TIME * 24*60*60*1000
            ),
            httpOnly: true
        }

        res.status(200).cookie('token',token,options).json({
            message:"User signup successful"
        })

    } catch (error) {
        throw error
    }
}