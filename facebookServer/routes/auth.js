const router = require('express').Router()
const User = require('../models/users')
const express = require('express')
const app=express()
const bcrypt=require('bcrypt')
app.use(express.json())
const jwt=require('jsonwebtoken')
const auth = require('../config/authmiddle')



//REGISTER
router.post('/register', async (req, res) => {
    try {
        //hassing the password
        const username=req.body.username
        const email=req.body.email
        console.log(username)
        console.log(email)
        const usere =await User.findOne({email})
        const usern =await User.findOne({username})
        if(usern){
                res.status(400).json("username already exists")
            }
            else if(usere){
                res.status(400).json("user email already exists")
            }
else{
    const salt= await bcrypt.genSalt(10)
        const hasedPassword= await bcrypt.hash(req.body.password,salt)
        //creating user with hased password
        const newUser = new User({...req.body,password:hasedPassword})
        //saving user and returing it
        const user_detail=await newUser.save()
        res.status(200).json("user created")
}      
    }
    catch(e){
        res.send(e)
    }
})


//LOGIN
router.post('/login',async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        const user =await User.findOne({email})
        if(user){
            const match= await bcrypt.compare(password,user.password)
            if(match){
                user.token="";
                const token=await user.generateAuthToken()
                res.cookie("jwt",token,{
                    expires:new Date(Date.now() + 2600000000),
                    httpOnly:true,
                })
                res.status(200).json(user)
            }
            else{
                res.status(404).json("password or email incorrect")
            }
        }else{
            res.status(404).json("user not found")
        }
    }catch(e){
                res.status(404).send("error part"+e)
                console.log(e)
    }
    
})

router.get('/logout',auth,async(req,res)=>{
    try{
res.clearCookie("jwt")
res.user.token=""
await res.user.save()
res.status(200).json("logged out successfully")
    }catch(e){
        console.log(e)
        res.status(400).json("user not logged in")
    }
})
module.exports = router