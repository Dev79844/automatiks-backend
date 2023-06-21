const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimiter = require('express-rate-limit')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// for logging
app.use(morgan('tiny'))

//for cookies
app.use(cookieParser())

//for rate-limiting
const limiter = rateLimiter({
    windowMs: 5*60*1000,// 5 minute window
    max: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: function (req, res) {
        return res.status(429).json({
          error: 'You sent too many requests. Please wait a while then try again'
        })
    }
})

app.use(limiter)

// routes
const user = require('./routes/routes')

app.use("/api/v1",user)

module.exports = app