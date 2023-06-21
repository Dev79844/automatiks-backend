const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// for logging
app.use(morgan('tiny'))

module.exports = app