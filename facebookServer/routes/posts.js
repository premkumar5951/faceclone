const Posts= require("../models/posts")
const router=require('express').Router()
const Users=require('../models/users')


// create a post 
router.post('/create',async(req,res)=>{
    try{
        const post=await new Posts(req.body)
        if(post){
            const post_detail=await post.save()
            res.status(200).json(post_detail)
        }
    }catch(e){
        res.status(401).json(e)
    }
})


// update a post 
router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const post=await Posts.findById(id)
        if(post){
            if(post.userId===req.body.userId){
                const updated=await post.updateOne({$set:req.body},{new:true})
                res.status(200).json("post updated")
            }
            else{
                res.status(401).json("cannot update others post")
            }
        }else{
            res.status(401).json("Post not available")
        }
    }catch(e){
        res.status(401).json(e)
    }

})
// delete a post 
router.delete('/:id',async(req,res)=>{
    try{
        const _id=req.params.id
        const post=await Posts.findById(_id)
        if(post){
            if(post.userId===req.body.userId){
                const deleted=await post.deleteOne()
                res.status(200).json({"msg":"post deleted","data":deleted})
            }
            else{
                res.status(401).json("cannot delete others post")
            }
        }else{
            res.status(401).json("Post not available")
        }
    }catch(e){
        res.status(401).send(e)
    }
})

// like a post 
router.put('/:id/like',async(req,res)=>{
    try{
        const post=await Posts.findById(req.params.id)
        if(post){
            if(!post.likes.includes(req.body.userId))
            {
                console.log(req.body)
               await post.updateOne({$push:{likes:req.body.userId}}) 
               console.log(post.likes)
               res.status(200).json("post liked")
               
            }else{
                await post.updateOne({$pull:{likes:req.body.userId}})
                console.log(post.likes)
                res.status(200).json("post unliked")
            }
        }
        else{
            res.status(401).json("post not available")
        }
    }catch(e){
        console.log(e)
        res.status(401).json(e)
    }
    
})
// get a post 
router.get('/:id',async(req,res)=>{
    try{
        const post=await Posts.findById(req.params.id)
        post?res.status(200).json(post):res.status(401).json("post not available")
    }catch(e){
        res.status(401).send(e)
    }
})
// get timiline Posts
router.get('/timeline/:userId',async(req,res)=>{
    let all_arr=[]
    try{
        const currentUser=await Users.findById(req.params.userId)
        const userPosts=await Posts.find({userId:req.params.userId})
        // the promise all is used because the map returns more than one promises for every id stored in following
        const followingPosts=await Promise.all(currentUser.followings.map((followings)=>{
            return Posts.find({userId:followings});
        }));
            // concating two arrays into one
            all_arr=userPosts.concat(...followingPosts)
            console.log(all_arr)
            all_arr.length?res.status(200).json(all_arr):res.status(401).json("No posts to display")     
    }catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
// get profile Posts
router.get('/profile/:email',async(req,res)=>{

    try{
        const currentUser=await Users.findOne({email:req.params.email})
        const userPosts=await Posts.find({userId:currentUser._id})
        // the promise all is used because the map returns more than one promises for every id stored in following
            userPosts.length?res.status(200).json(userPosts):res.status(401).json("No posts to display")     
    }catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})

// router.delete('/delete/all',async(req,res)=>{
//     await Posts.deleteMany({})
//     res.send("all deleted")
// })

module.exports=router