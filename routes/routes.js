const express = require('express')
const {signup,verify} = require('../controllers/userControllers')

const router = express.Router()

router.post("/signup",signup)
router.get("/verify/:token",verify)

module.exports = router