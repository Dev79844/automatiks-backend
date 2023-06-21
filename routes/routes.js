const express = require('express')
const {signup,verify,login} = require('../controllers/userControllers')

const router = express.Router()

router.post("/signup",signup)
router.get("/verify/:token",verify)
router.post("/login",login)

module.exports = router