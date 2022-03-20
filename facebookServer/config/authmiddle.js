const jwt=require('jsonwebtoken')
const User=require('../models/users')


const auth=async (req,res,next)=>{
    try{
    const token=req.cookies.jwt
    const VarifyUser=jwt.verify(token,process.env.SECRET_KEY)
    console.log(VarifyUser)
    const user= await User.findById({_id:VarifyUser})
    console.log(user)
    res.user=user
    next();
    }catch(e){
        console.log(e)
        res.status(404).json(e.toString())
    }
}
module.exports=auth