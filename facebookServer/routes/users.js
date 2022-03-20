const router=require('express').Router()
const Users=require('../models/users')
const bcrypt=require("bcrypt")

// update user 
router.put('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        if(req.body.password){
            try{
                const salt= await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
            }catch(e){
                res.status(400).json("error"+e)
            }  
        }
        try{
            const updated=await Users.findByIdAndUpdate(req.body.userId,{...req.body},{new:true})
            res.status(200).json({msg:"sucessfully updated",data:updated})
        }catch(e){
            res.status(400).json("error"+e)
        }
    }
    else{
        res.status(404).json("you can update only your own account ")
    }
})
// delete user 
router.delete('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
            try{
                const data=await Users.findByIdAndDelete(req.body.userId)
                data?res.status(200).json({msg:"User deleted successfullly",data}):res.status(404).json("User does not exist")
               
            }catch(e){
                res.status(400).json("error"+e)
            }  
    }
    else{
        res.status(404).json("you can delete only your own account ")
    }
})
// get a user
router.get('/',async (req,res)=>{
    const userId=req.query.userId
    const username=req.query.username
    try{
        const user=userId?await Users.findById(userId):await Users.findOne({email:username}) 
        if(user)  {
            const {password,updatedAt,...other}=user._doc ;
            res.status(200).json(other)
        }else{
            res.status(404).json("No user available")
        }
    }catch(e){
        res.status(404).json("No user available")
    }
        })

// follow a user 
router.put('/:id/follow',async(req,res)=>{
    if(req.params.id!==req.body.userId){
        try{
            const user=await Users.findById(req.params.id)
            console.log(user)
            const currUser=await Users.findById(req.body.userId)
            console.log(currUser)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json(`You are now following ${user.email}`)
            }else{
                res.status(402).json("you are already following")
            }
        }catch(e){
            res.status(401).json(e)
        }
    }
    else{
        res.status(403).json("cannot follow own account")
    }
})
// unfollow a user
router.put('/:id/unfollow',async(req,res)=>{
    if(req.params.id!==req.body.userId){
        try{
            const user=await Users.findById(req.params.id)
            const currUser=await Users.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json(`You have unfollowed ${user.email}`)
            }else{
                res.status(402).json(` Cant unfollow!, you are not following ${user.email}`)
            }
        }catch(e){
            res.status(401).json(e)
        }
    }
    else{
        res.status(403).json("cannot unfollow own account")
    }
})
//get followers os a user
router.get('/followings',async(req,res)=>{
    let all_arr=[]
    const userId=req.query.userId
    const username=req.query.username
    try{
        const currentUser=userId?await Users.findById(userId):await Users.findOne({email:username})
        // the promise all is used because the map returns more than one promises for every id stored in following
        console.log(currentUser.followings)
        const followingsarr=await Promise.all(currentUser.followings.map((followings)=>{
            return ( Users.findOne({_id:followings}).select('-password -updatedAt'));
        }));
            // concating two arrays into one
            all_arr=all_arr.concat(...followingsarr)
            all_arr.length?res.status(200).json(all_arr):res.status(401).json("Not followings any user")     
    }catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
//get followers of a user
router.get('/followers',async(req,res)=>{
    let all_arr=[]
    const userId=req.query.userId
    const username=req.query.username
    try{
        const currentUser=userId?await Users.findById(userId):await Users.findOne({email:username})
        // the promise all is used because the map returns more than one promises for every id stored in following
        console.log(currentUser.followers)
        const followersarr=await Promise.all(currentUser.followers.map((followers)=>{
            return ( Users.findOne({_id:followers}).select('-password -updatedAt'));
        }));
            // concating two arrays into one
            all_arr=all_arr.concat(...followersarr)
            all_arr.length?res.status(200).json(all_arr):res.status(401).json("No followers yet")     
    }catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})

module.exports=router