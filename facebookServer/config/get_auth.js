const router = require('express').Router()
const auth = require('./authmiddle')
const jwt=require('jsonwebtoken')
const User=require('../models/users')

router.get('/', async (req, res) => {
    try {
        const token=req.cookies.jwt
        const VarifyUser=jwt.verify(token,process.env.SECRET_KEY)
        console.log(VarifyUser)
        const user= await User.findById({_id:VarifyUser})
        const {
            password,
            createdAt,
            ...others
        } = user._doc
        res.status(200).json({
            ...others
        })
    } catch (e) {
        console.log(e)
        res.status(400).json("invalid credentials please login again!")
    }
})


module.exports = router